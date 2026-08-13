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
