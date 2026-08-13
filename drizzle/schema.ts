import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Public inquiries submitted through the Coreweaver Labs contact form. */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  organization: varchar("organization", { length: 160 }),
  website: varchar("website", { length: 320 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "reviewed", "archived"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/** Editor-managed articles that power the public Insights listing and detail pages. */
export const insights = mysqlTable("insights", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  author: varchar("author", { length: 120 }).default("Mason Nguyen").notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Insight = typeof insights.$inferSelect;
export type InsertInsight = typeof insights.$inferInsert;

/** Private client-provided evidence records. These records are never public by default. */
export const caseStudyIntakes = mysqlTable("case_study_intakes", {
  id: int("id").autoincrement().primaryKey(),
  clientLabel: varchar("clientLabel", { length: 160 }).notNull(),
  sourceName: varchar("sourceName", { length: 220 }).notNull(),
  sourceReference: text("sourceReference").notNull(),
  supportableFinding: text("supportableFinding").notNull(),
  metricDefinition: text("metricDefinition"),
  scope: text("scope").notNull(),
  reportingStart: varchar("reportingStart", { length: 10 }).notNull(),
  reportingEnd: varchar("reportingEnd", { length: 10 }).notNull(),
  reviewDate: varchar("reviewDate", { length: 10 }).notNull(),
  sourceOwnerApproval: text("sourceOwnerApproval").notNull(),
  publicationAuthorization: text("publicationAuthorization").notNull(),
  replyEmail: varchar("replyEmail", { length: 320 }),
  authorizationConfirmed: boolean("authorizationConfirmed").default(false).notNull(),
  privacyReviewConfirmed: boolean("privacyReviewConfirmed").default(false).notNull(),
  claimReviewConfirmed: boolean("claimReviewConfirmed").default(false).notNull(),
  sourceOwnerApprovedBy: varchar("sourceOwnerApprovedBy", { length: 220 }),
  swellReviewer: varchar("swellReviewer", { length: 220 }),
  privacyReviewedBy: varchar("privacyReviewedBy", { length: 220 }),
  plannedPublicationDate: varchar("plannedPublicationDate", { length: 10 }),
  handoffStatus: mysqlEnum("handoffStatus", ["pending", "returned", "ready"]).default("pending").notNull(),
  status: mysqlEnum("status", ["received", "under_review", "approved", "declined"]).default("received").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CaseStudyIntake = typeof caseStudyIntakes.$inferSelect;
export type InsertCaseStudyIntake = typeof caseStudyIntakes.$inferInsert;

/** Approved public records only. Private intake evidence is never copied here automatically. */
export const caseStudies = mysqlTable("case_studies", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 220 }).notNull(),
  clientLabel: varchar("clientLabel", { length: 160 }).notNull(),
  sourceName: varchar("sourceName", { length: 220 }).notNull(),
  sourceAttribution: text("sourceAttribution").notNull(),
  sourceUrl: varchar("sourceUrl", { length: 320 }),
  supportableFinding: text("supportableFinding").notNull(),
  metricDefinition: text("metricDefinition"),
  scope: text("scope").notNull(),
  reportingStart: varchar("reportingStart", { length: 10 }).notNull(),
  reportingEnd: varchar("reportingEnd", { length: 10 }).notNull(),
  reviewDate: varchar("reviewDate", { length: 10 }).notNull(),
  publicationAuthorization: text("publicationAuthorization").notNull(),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CaseStudy = typeof caseStudies.$inferSelect;

/** Public service or support requests. Submission never creates protected GTM records automatically. */
export const gtmRequests = mysqlTable("gtm_requests", {
  id: int("id").autoincrement().primaryKey(),
  requestType: mysqlEnum("requestType", ["service_inquiry", "support_request"]).notNull(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  organization: varchar("organization", { length: 160 }),
  website: varchar("website", { length: 320 }),
  serviceInterest: varchar("serviceInterest", { length: 100 }),
  subject: varchar("subject", { length: 220 }),
  message: text("message").notNull(),
  urgency: mysqlEnum("urgency", ["standard", "high"]).default("standard").notNull(),
  status: mysqlEnum("status", ["new", "triaged", "closed"]).default("new").notNull(),
  ownerName: varchar("ownerName", { length: 160 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GtmRequest = typeof gtmRequests.$inferSelect;
export type InsertGtmRequest = typeof gtmRequests.$inferInsert;

/** Protected commercial organizations. Accounts are created only by an authorized operator. */
export const gtmAccounts = mysqlTable("gtm_accounts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  website: varchar("website", { length: 320 }),
  segment: varchar("segment", { length: 120 }),
  status: mysqlEnum("status", ["prospect", "client", "inactive"]).default("prospect").notNull(),
  ownerName: varchar("ownerName", { length: 160 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GtmAccount = typeof gtmAccounts.$inferSelect;
export type InsertGtmAccount = typeof gtmAccounts.$inferInsert;

/** Protected business contacts linked to an account by application-managed ID. */
export const gtmContacts = mysqlTable("gtm_contacts", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("accountId"),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  roleTitle: varchar("roleTitle", { length: 160 }),
  status: mysqlEnum("status", ["active", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GtmContact = typeof gtmContacts.$inferSelect;
export type InsertGtmContact = typeof gtmContacts.$inferInsert;

/** Protected sales opportunities. Manual operator action governs every stage transition. */
export const gtmOpportunities = mysqlTable("gtm_opportunities", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("accountId").notNull(),
  contactId: int("contactId"),
  serviceLine: mysqlEnum("serviceLine", ["signal_intelligence_audit", "gtm_enablement_sprint", "representation_operations", "custom"]).notNull(),
  title: varchar("title", { length: 220 }).notNull(),
  stage: mysqlEnum("stage", ["inquiry", "qualified", "discovery", "proposal", "won", "lost"]).default("inquiry").notNull(),
  ownerName: varchar("ownerName", { length: 160 }),
  nextStep: text("nextStep"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GtmOpportunity = typeof gtmOpportunities.$inferSelect;
export type InsertGtmOpportunity = typeof gtmOpportunities.$inferInsert;

/** Protected support cases. Public requests must be manually triaged into a case. */
export const gtmSupportCases = mysqlTable("gtm_support_cases", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("accountId"),
  contactId: int("contactId"),
  subject: varchar("subject", { length: 220 }).notNull(),
  detail: text("detail").notNull(),
  priority: mysqlEnum("priority", ["standard", "high", "urgent"]).default("standard").notNull(),
  status: mysqlEnum("status", ["new", "open", "waiting", "resolved", "closed"]).default("new").notNull(),
  ownerName: varchar("ownerName", { length: 160 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GtmSupportCase = typeof gtmSupportCases.$inferSelect;
export type InsertGtmSupportCase = typeof gtmSupportCases.$inferInsert;

/** Protected cross-functional delivery work. Functional area keeps ownership explicit. */
export const gtmWorkItems = mysqlTable("gtm_work_items", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("accountId"),
  opportunityId: int("opportunityId"),
  supportCaseId: int("supportCaseId"),
  title: varchar("title", { length: 220 }).notNull(),
  detail: text("detail"),
  functionalArea: mysqlEnum("functionalArea", ["sales", "support", "operations", "marketing", "research", "design"]).notNull(),
  status: mysqlEnum("status", ["planned", "in_progress", "blocked", "review", "done"]).default("planned").notNull(),
  ownerName: varchar("ownerName", { length: 160 }),
  dueDate: varchar("dueDate", { length: 10 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GtmWorkItem = typeof gtmWorkItems.$inferSelect;
export type InsertGtmWorkItem = typeof gtmWorkItems.$inferInsert;
