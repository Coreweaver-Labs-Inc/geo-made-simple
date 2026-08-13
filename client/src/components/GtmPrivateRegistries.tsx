import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

type AccountRecord = { id: number; name: string; website: string | null; segment: string | null; status: "prospect" | "client" | "inactive"; ownerName: string | null };
type ContactRecord = { id: number; accountId: number | null; fullName: string; email: string; roleTitle: string | null; status: "active" | "archived" };
type RequestRecord = { id: number; requestType: "service_inquiry" | "support_request"; fullName: string; email: string; organization: string | null; serviceInterest: string | null; subject: string | null; message: string; urgency: "standard" | "high"; status: "new" | "triaged" | "closed"; ownerName: string | null };

function AccountRow({ account }: { account: AccountRecord }) {
  const utils = trpc.useUtils();
  const [ownerName, setOwnerName] = useState(account.ownerName || "");
  const [status, setStatus] = useState<AccountRecord["status"]>(account.status);
  const update = trpc.gtm.updateAccount.useMutation({ onSuccess: () => utils.gtm.listAccounts.invalidate() });
  return <div className="gtm-registry-row"><div><strong>{account.name}</strong><span>{account.segment || "Segment unassigned"} · {account.website || "No website recorded"}</span></div><div className="gtm-registry-controls"><label>Owner<input value={ownerName} onChange={event => setOwnerName(event.target.value)} placeholder="Unassigned" /></label><label>State<select value={status} onChange={event => setStatus(event.target.value as AccountRecord["status"])}><option value="prospect">Prospect</option><option value="client">Client</option><option value="inactive">Inactive</option></select></label><button className="button button-secondary" type="button" disabled={update.isPending} onClick={() => update.mutate({ id: account.id, status, ownerName })}>{update.isPending ? <LoaderCircle className="spin" size={14} /> : "Save"}</button></div>{update.error && <p className="studio-error">{update.error.message}</p>}</div>;
}

function ContactRow({ contact, accountName }: { contact: ContactRecord; accountName: string }) {
  const utils = trpc.useUtils();
  const update = trpc.gtm.updateContact.useMutation({ onSuccess: () => utils.gtm.listContacts.invalidate() });
  return <div className="gtm-registry-row"><div><strong>{contact.fullName}</strong><span>{contact.email} · {contact.roleTitle || "No role recorded"} · {accountName}</span></div><div className="gtm-registry-controls"><label>Status<select value={contact.status} onChange={event => update.mutate({ id: contact.id, status: event.target.value as ContactRecord["status"] })}><option value="active">Active</option><option value="archived">Archived</option></select></label></div>{update.error && <p className="studio-error">{update.error.message}</p>}</div>;
}

function RequestRow({ request }: { request: RequestRecord }) {
  const utils = trpc.useUtils();
  const [ownerName, setOwnerName] = useState(request.ownerName || "");
  const [status, setStatus] = useState<RequestRecord["status"]>(request.status);
  const update = trpc.gtm.updateRequest.useMutation({ onSuccess: () => utils.gtm.listRequests.invalidate() });
  return <div className="gtm-registry-row"><div><strong>{request.requestType === "support_request" ? request.subject : request.fullName}</strong><span>{request.requestType.replace("_", " ")} · {request.urgency} · {request.organization || request.email}</span><p>{request.message}</p></div><div className="gtm-registry-controls"><label>Private owner<input value={ownerName} onChange={event => setOwnerName(event.target.value)} placeholder="Assign owner" /></label><label>Triage state<select value={status} onChange={event => setStatus(event.target.value as RequestRecord["status"])}><option value="new">New</option><option value="triaged">Triaged</option><option value="closed">Closed</option></select></label><button className="button button-primary" type="button" disabled={update.isPending} onClick={() => update.mutate({ id: request.id, status, ownerName })}>{update.isPending ? <LoaderCircle className="spin" size={14} /> : "Save triage"}</button></div><p className="gtm-manual-note">Triage assigns private ownership only. Create an account, opportunity, or support case separately after review.</p>{update.error && <p className="studio-error">{update.error.message}</p>}</div>;
}

export function GtmPrivateRegistries() {
  const { user } = useAuth();
  const enabled = user?.role === "admin";
  const accounts = trpc.gtm.listAccounts.useQuery(undefined, { enabled, retry: false });
  const contacts = trpc.gtm.listContacts.useQuery(undefined, { enabled, retry: false });
  const requests = trpc.gtm.listRequests.useQuery(undefined, { enabled, retry: false });
  if (!enabled) return null;
  const names = new Map((accounts.data || []).map(account => [account.id, account.name]));
  return <section className="gtm-private-registries"><div className="gtm-registry-grid"><section className="studio-card"><h2>Private account registry</h2><p className="studio-queue-note">Review ownership and lifecycle before associating commercial or delivery work.</p><div className="gtm-registry-list">{accounts.data?.length ? accounts.data.map(account => <AccountRow key={account.id} account={account} />) : <p className="gtm-empty">No private accounts have been created.</p>}</div></section><section className="studio-card"><h2>Private contact registry</h2><p className="studio-queue-note">Contacts remain separate from public inquiries until an operator records them here.</p><div className="gtm-registry-list">{contacts.data?.length ? contacts.data.map(contact => <ContactRow key={contact.id} contact={contact} accountName={contact.accountId ? names.get(contact.accountId) || `Account #${contact.accountId}` : "Unassigned"} />) : <p className="gtm-empty">No approved contacts have been recorded.</p>}</div></section></div><section className="studio-card gtm-triage-card"><h2>Private request triage</h2><p className="studio-queue-note">Assign an owner and resolve the intake path. The system never promotes a request automatically.</p><div className="gtm-registry-list">{requests.data?.length ? requests.data.map(request => <RequestRow key={request.id} request={request} />) : <p className="gtm-empty">No GTM or support requests are waiting for triage.</p>}</div></section></section>;
}
