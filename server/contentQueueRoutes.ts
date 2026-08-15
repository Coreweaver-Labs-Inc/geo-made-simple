import type { Express, Request, Response } from "express";
import { getContentBriefQueueByTaskUid, updateContentBriefQueue } from "./db";
import { runNextContentBriefDraft } from "./contentQueue";
import { sdk } from "./_core/sdk";

async function runScheduledContentBriefQueue(req: Request, res: Response) {
  try {
    const user = await sdk.authenticateRequest(req).catch(() => null);
    if (!user || !user.isCron || !user.taskUid) return res.status(403).json({ error: "cron-only" });

    const queue = await getContentBriefQueueByTaskUid(user.taskUid);
    if (!queue) return res.json({ ok: true, skipped: "orphan" });
    if (!queue.isEnabled) return res.json({ ok: true, skipped: "disabled" });

    const result = await runNextContentBriefDraft(queue);
    await updateContentBriefQueue(queue.id, {
      isEnabled: queue.isEnabled,
      cronExpression: queue.cronExpression,
      scheduleCronTaskUid: queue.scheduleCronTaskUid,
      model: queue.model,
      lastRunAt: new Date(),
    });
    return res.json({ ok: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Content queue] Scheduled run failed", error);
    return res.status(500).json({ error: message, context: { path: req.path }, timestamp: new Date().toISOString() });
  }
}

export function registerContentQueueRoutes(app: Express) {
  app.post("/api/scheduled/content-brief-queue", runScheduledContentBriefQueue);
}
