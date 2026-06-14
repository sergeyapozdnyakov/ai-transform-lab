import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { I18nProvider } from "../lib/i18n";
import {
  Nav,
  Hero,
  Problem,
  Approach,
  AuditOutput,
  Widget2Section,
  WhoFor,
  LeadMagnet,
  Expert,
  Cases,
  ROISection,
  Deliverable,
  FAQ,
  FinalCTA,
  Footer,
} from "../components/landing/Sections";
import { ContactModal } from "../components/landing/ContactModal";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [open, setOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<{
    team?: string;
    desc?: string;
  } | null>(null);
  const openModal = (prefill?: { team?: string; desc?: string }) => {
    setContactPrefill(prefill ?? null);
    setOpen(true);
  };
  return (
    <I18nProvider>
      <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
        <Nav openModal={openModal} />
        <main>
          <Hero openModal={openModal} />
          <Problem />
          <Approach openModal={openModal} />
          <AuditOutput openModal={openModal} />
          <Widget2Section />
          <WhoFor openModal={openModal} />
          <LeadMagnet openModal={openModal} />
          <Expert openModal={openModal} />
          <Cases openModal={openModal} />
          <ROISection openModal={openModal} />
          <Deliverable />
          <FAQ />
          <FinalCTA openModal={openModal} />
        </main>
        <Footer />
        <ContactModal open={open} onClose={() => setOpen(false)} prefill={contactPrefill} />
      </div>
    </I18nProvider>
  );
}
