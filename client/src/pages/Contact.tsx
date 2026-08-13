import { ContactForm } from "@/components/ContactForm";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

export default function Contact() {
  return (
    <MarketingShell>
      <SeoHead title="Contact Coreweaver Labs | Signal Audit" description="Start a conversation with Coreweaver Labs about a practical signal audit, GEO infrastructure, or AI representation systems." path="/contact" />
      <main>
        <section className="contact-page section-pad"><div className="contact-intro"><SectionLabel>Start a conversation</SectionLabel><h1>Start with the signal you already have.</h1><p className="page-lede">Tell us what you want to understand. We will review the context and respond with a useful next step.</p><p className="contact-aside">No sales sequence. You will hear back from a person.</p></div><ContactForm /></section>
      </main>
    </MarketingShell>
  );
}
