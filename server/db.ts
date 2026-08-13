import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  contactSubmissions,
  caseStudyIntakes,
  caseStudies,
  InsertCaseStudyIntake,
  InsertContactSubmission,
  InsertGtmAccount,
  InsertGtmContact,
  InsertGtmOpportunity,
  InsertGtmRequest,
  InsertGtmSupportCase,
  InsertGtmWorkItem,
  InsertInsight,
  InsertUser,
  gtmAccounts,
  gtmContacts,
  gtmOpportunities,
  gtmRequests,
  gtmSupportCases,
  gtmWorkItems,
  insights,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createContactSubmission(input: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const result = await db.insert(contactSubmissions).values(input);
  return result[0];
}

export async function listContactSubmissions() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function listPublishedInsights() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(insights)
    .where(eq(insights.status, "published"))
    .orderBy(desc(insights.publishedAt));
}

export async function getPublishedInsightBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(insights)
    .where(and(eq(insights.slug, slug), eq(insights.status, "published")))
    .limit(1);
  return result[0];
}

export async function listInsightsForStudio() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(insights).orderBy(desc(insights.updatedAt));
}

export async function createInsight(input: Pick<InsertInsight, "title" | "slug" | "excerpt" | "content" | "category" | "status">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const values: InsertInsight = {
    ...input,
    author: "Mason Nguyen",
    publishedAt: input.status === "published" ? new Date() : null,
  };
  const result = await db.insert(insights).values(values);
  return result[0];
}

export async function createCaseStudyIntake(input: InsertCaseStudyIntake) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  const result = await db.insert(caseStudyIntakes).values(input);
  return result[0];
}

export async function listCaseStudyIntakes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(caseStudyIntakes).orderBy(desc(caseStudyIntakes.createdAt));
}

export async function updateCaseStudyHandoff(id: number, input: Pick<InsertCaseStudyIntake, "sourceOwnerApprovedBy" | "swellReviewer" | "privacyReviewedBy" | "plannedPublicationDate" | "handoffStatus">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.update(caseStudyIntakes).set(input).where(eq(caseStudyIntakes.id, id));
}

export async function listPublishedCaseStudies() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(caseStudies).where(eq(caseStudies.status, "published")).orderBy(desc(caseStudies.publishedAt));
}

export async function getPublishedCaseStudyBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(caseStudies).where(and(eq(caseStudies.slug, slug), eq(caseStudies.status, "published"))).limit(1);
  return result[0];
}

export async function createGtmRequest(input: InsertGtmRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.insert(gtmRequests).values(input);
}

export async function listGtmRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gtmRequests).orderBy(desc(gtmRequests.createdAt));
}

export async function updateGtmRequest(id: number, input: Pick<InsertGtmRequest, "status" | "ownerName">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.update(gtmRequests).set(input).where(eq(gtmRequests.id, id));
}

export async function createGtmAccount(input: InsertGtmAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.insert(gtmAccounts).values(input);
}

export async function listGtmAccounts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gtmAccounts).orderBy(desc(gtmAccounts.createdAt));
}

export async function updateGtmAccount(id: number, input: Pick<InsertGtmAccount, "status" | "ownerName">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.update(gtmAccounts).set(input).where(eq(gtmAccounts.id, id));
}

export async function createGtmContact(input: InsertGtmContact) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.insert(gtmContacts).values(input);
}

export async function listGtmContacts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gtmContacts).orderBy(desc(gtmContacts.createdAt));
}

export async function updateGtmContact(id: number, input: Pick<InsertGtmContact, "status">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.update(gtmContacts).set(input).where(eq(gtmContacts.id, id));
}

export async function createGtmOpportunity(input: InsertGtmOpportunity) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.insert(gtmOpportunities).values(input);
}

export async function listGtmOpportunities() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gtmOpportunities).orderBy(desc(gtmOpportunities.createdAt));
}

export async function updateGtmOpportunity(id: number, input: Pick<InsertGtmOpportunity, "stage" | "nextStep">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.update(gtmOpportunities).set(input).where(eq(gtmOpportunities.id, id));
}

export async function createGtmSupportCase(input: InsertGtmSupportCase) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.insert(gtmSupportCases).values(input);
}

export async function listGtmSupportCases() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gtmSupportCases).orderBy(desc(gtmSupportCases.createdAt));
}

export async function updateGtmSupportCase(id: number, input: Pick<InsertGtmSupportCase, "status">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.update(gtmSupportCases).set(input).where(eq(gtmSupportCases.id, id));
}

export async function createGtmWorkItem(input: InsertGtmWorkItem) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.insert(gtmWorkItems).values(input);
}

export async function listGtmWorkItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(gtmWorkItems).orderBy(desc(gtmWorkItems.createdAt));
}

export async function updateGtmWorkItem(id: number, input: Pick<InsertGtmWorkItem, "status">) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");
  return db.update(gtmWorkItems).set(input).where(eq(gtmWorkItems.id, id));
}
