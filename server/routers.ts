import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { createCaseStudyIntake, createContactSubmission, createInsight, getPublishedCaseStudyBySlug, getPublishedInsightBySlug, listCaseStudyIntakes, listContactSubmissions, listInsightsForStudio, listPublishedCaseStudies, listPublishedInsights } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { caseStudyIntakeSchema, caseStudySlugSchema, contactSubmissionSchema, insightDraftSchema, insightSlugSchema } from "./contentSchemas";

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
      console.info(`[Contact] Owner notification ${notificationSent ? "accepted" : "not accepted"} for ${input.email}`);

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
  caseStudies: router({
    listPublic: publicProcedure.query(() => listPublishedCaseStudies()),
    bySlug: publicProcedure.input(caseStudySlugSchema).query(async ({ input }) => {
      const record = await getPublishedCaseStudyBySlug(input.slug);
      if (!record) throw new TRPCError({ code: "NOT_FOUND", message: "That approved case study is not available." });
      return record;
    }),
    submitIntake: publicProcedure.input(caseStudyIntakeSchema).mutation(async ({ input }) => {
      if (input.formWebsite) return { success: true } as const;
      const notificationSent = await notifyOwner({
        title: `New case-study evidence record: ${input.clientLabel}`,
        content: [`Client label: ${input.clientLabel}`, `Source name: ${input.sourceName}`, `Reporting window: ${input.reportingStart} to ${input.reportingEnd}`, `Review date: ${input.reviewDate}`, `Source: ${input.sourceReference}`, "", `Finding: ${input.supportableFinding}`, "", `Scope: ${input.scope}`, `Metric context: ${input.metricDefinition || "Not provided"}`, "", `Source-owner approval: ${input.sourceOwnerApproval}`, `Publication authorization: ${input.publicationAuthorization}`, "", "Privacy and claim-safety confirmations: complete"].join("\n"),
      });
      console.info(`[Case study] Owner notification ${notificationSent ? "accepted" : "not accepted"} for ${input.clientLabel}`);
      try {
        const { formWebsite: _formWebsite, ...record } = input;
        await createCaseStudyIntake({ ...record, replyEmail: record.replyEmail ?? null, authorizationConfirmed: true, privacyReviewConfirmed: true, claimReviewConfirmed: true });
      } catch (error) {
        console.error("[Case study] Failed to store evidence intake", error);
        if (notificationSent) return { success: true } as const;
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "We could not save the evidence record. Please try again." });
      }
      return { success: true } as const;
    }),
    listStudio: adminProcedure.query(() => listCaseStudyIntakes()),
  }),
});

export type AppRouter = typeof appRouter;
