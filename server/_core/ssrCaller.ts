import type { Request, Response } from "express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import type { SsrPrefetch } from "../../client/src/ssr/prefetch";

export async function buildSsrPrefetch(req: Request, res: Response): Promise<SsrPrefetch> {
  const context = await createContext({ req, res } as never);
  const caller = appRouter.createCaller(context);
  return { insightBySlug: slug => caller.insights.bySlug({ slug }) };
}
