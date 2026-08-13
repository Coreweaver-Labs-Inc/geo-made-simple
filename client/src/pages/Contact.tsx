import { ContactForm } from "@/components/ContactForm";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

export default function Contact() {
  return (
    <MarketingShell>
      <SeoHead title="Contact Coreweaver Labs | Signal Audit" description="Start a conversation with Coreweaver Labs about a practical signal audit, GEO infrastructure, or AI representation systems." path="/contact" />
      <main>
        <section className="contact-page section-pad"><div className="contact-intro"><SectionLabel>Work with us</SectionLabel><h1>Find the next useful move.</h1><p className="page-lede">Three quick prompts give us enough context to respond thoughtfully—without making you write a brief.</p><p className="contact-aside">Usually under a minute. No sales sequence.</p></div><ContactForm /></section>
      </main>
    </MarketingShell>
  );
}
