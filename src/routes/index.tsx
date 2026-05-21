import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { I18nProvider } from "../lib/i18n";
import {
  Nav, Hero, Problem, Approach, Widget2Section, WhoFor, Expert,
  Cases, ROISection, Deliverable, FAQ, FinalCTA, Footer
} from "../components/landing/Sections";
import { ContactModal } from "../components/landing/ContactModal";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  return (
    <I18nProvider>
      <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
        <Nav openModal={openModal} />
        <main>
          <Hero openModal={openModal} />
          <Problem />
          <Approach />
          <Widget2Section />
          <WhoFor />
          <Expert />
          <Cases />
          <ROISection openModal={openModal} />
          <Deliverable />
          <FAQ />
          <FinalCTA openModal={openModal} />
        </main>
        <Footer />
        <ContactModal open={open} onClose={() => setOpen(false)} />
      </div>
    </I18nProvider>
  );
}
