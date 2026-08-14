import type { Express, Request, Response } from "express";
import {
  extractBearerToken,
  ingestGatewayEvent,
  isGatewayMailbox,
  isReviewableVapiEvent,
  loadGatewayConfiguration,
  normalizeHostingerEvent,
  normalizeVapiEvent,
  tokensMatch,
} from "./gateway";

function gatewayResponse(res: Response, status: number, body: { accepted: boolean; eventKey?: string; state: string }) {
  return res.status(status).json(body);
}

export function registerGatewayRoutes(app: Express) {
  app.post("/webhooks/hostinger/:mailbox", async (req: Request, res: Response) => {
    const mailboxValue = req.params.mailbox;
    if (!isGatewayMailbox(mailboxValue)) return gatewayResponse(res, 404, { accepted: false, state: "unknown_mailbox" });

    const config = await loadGatewayConfiguration();
    if (!tokensMatch(extractBearerToken(req.header("authorization")), config.hostingerWebhookTokens[mailboxValue])) {
      return gatewayResponse(res, 401, { accepted: false, state: "unauthorized" });
    }

    try {
      const result = await ingestGatewayEvent(normalizeHostingerEvent(req.body, mailboxValue), config);
      const status = result.validationStatus === "failed" ? 503 : result.validationStatus === "duplicate" ? 200 : 202;
      return gatewayResponse(res, status, { accepted: result.validationStatus !== "failed", eventKey: result.eventKey, state: result.actionStatus });
    } catch (error) {
      console.error("[Gateway] Hostinger ingestion failed", error);
      return gatewayResponse(res, 400, { accepted: false, state: "invalid_event" });
    }
  });

  app.post("/webhooks/vapi", async (req: Request, res: Response) => {
    const config = await loadGatewayConfiguration();
    if (!tokensMatch(extractBearerToken(req.header("authorization")), config.vapiWebhookToken)) {
      return gatewayResponse(res, 401, { accepted: false, state: "unauthorized" });
    }

    try {
      const event = normalizeVapiEvent(req.body);
      if (!isReviewableVapiEvent(event.eventType)) {
        return gatewayResponse(res, 200, { accepted: true, state: "ignored_nonterminal_event" });
      }
      const result = await ingestGatewayEvent(event, config);
      const status = result.validationStatus === "failed" ? 503 : result.validationStatus === "duplicate" ? 200 : 202;
      return gatewayResponse(res, status, { accepted: result.validationStatus !== "failed", eventKey: result.eventKey, state: result.actionStatus });
    } catch (error) {
      console.error("[Gateway] Vapi ingestion failed", error);
      return gatewayResponse(res, 400, { accepted: false, state: "invalid_event" });
    }
  });
}
