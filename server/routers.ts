import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { createContactSubmission, createInsight, getPublishedInsightBySlug, listContactSubmissions, listInsightsForStudio, listPublishedInsights } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { contactSubmissionSchema, insightDraftSchema, insightSlugSchema } from "./contentSchemas";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  contact: router({
    submit: publicProcedure.input(contactSubmissionSchema).mutation(async ({ input }) => {
      // Quietly accept bot honeypot submissions without storing them.
      if (input.formWebsite) return { success: true } as const;

      const notificationSent = await notifyOwner({
        title: `New Coreweaver Labs inquiry from ${input.fullName}`,
        content: [
          `Email: ${input.email}`,
          `Organization: ${input.organization || "Not provided"}`,
          `Website: ${input.website || "Not provided"}`,
          "",
          input.message,
        ].join("\n"),
      });

      try {
        await createContactSubmission({
          fullName: input.fullName,
          email: input.email,
          organization: input.organization ?? null,
          website: input.website ?? null,
          message: input.message,
        });
      } catch (error) {
        console.error("[Contact] Failed to store submission", error);
        if (notificationSent) return { success: true } as const;
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "We could not save your message. Please try again." });
      }

      return { success: true } as const;
    }),
    listStudio: adminProcedure.query(() => listContactSubmissions()),
  }),
  insights: router({
    listPublic: publicProcedure.query(() => listPublishedInsights()),
    bySlug: publicProcedure.input(insightSlugSchema).query(async ({ input }) => {
      const article = await getPublishedInsightBySlug(input.slug);
      if (!article) throw new TRPCError({ code: "NOT_FOUND", message: "That insight is not available." });
      return article;
    }),
    listStudio: adminProcedure.query(() => listInsightsForStudio()),
    create: adminProcedure.input(insightDraftSchema).mutation(async ({ input }) => {
      try {
        await createInsight(input);
        return { success: true } as const;
      } catch (error) {
        console.error("[Insights] Failed to create article", error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "We could not save this article." });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
