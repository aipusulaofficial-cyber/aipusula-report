import { useState } from "react";
import { Menu, X, ArrowUpRight, ShieldCheck, Workflow, Fingerprint, FileCheck2, Network, LockKeyhole, ChevronRight, Factory, Zap, Building2, Shield, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

const demo = "https://demo.aipusula.net/";
const email = "ceyhun@aipusula.net";
const capabilities = [
  { icon: ShieldCheck, title: "Governed AI", description: "Deterministic policy gates between recommendations and sensitive actions." },
  { icon: Fingerprint, title: "Identity & Access", description: "Role-based permissions with separate operator and supervisor responsibilities." },
  { icon: Workflow, title: "Human Approval", description: "High-impact simulated actions require explicit supervisor authorization." },
  { icon: FileCheck2, title: "Evidence & Audit", description: "Revisioned source documents and tamper-evident demonstration records." },
  { icon: Network, title: "Industrial Workflows", description: "An integration architecture for industrial and enterprise environments." },
  { icon: LockKeyhole, title: "Controlled Execution", description: "No unrestricted AI access to operational control systems." },
];
const architecture = [
  { title: "AI Agent", note: "Evidence-grounded recommendation", code: "01" },
  { title: "Policy Engine", note: "Deterministic authorization gate", code: "02" },
  { title: "Human Approval", note: "Supervisor review for high-impact actions", code: "03" },
  { title: "Audit", note: "Signed, tamper-evident demo trail", code: "04" },
];
const evidence = [
  { title: "Synthetic MQTT-style event", detail: "A vibration event for simulated asset P-204 was accepted and queued through the demonstration API. This does not establish a live MQTT broker connection." },
  { title: "Role-based approval", detail: "An operator approval attempt returned HTTP 403; a supervisor identity approved the simulated response. The operator-facing error display needs improvement." },
  { title: "Versioned evidence sources", detail: "The demo references synthetic SOP-P204-07, POL-OT-12 and MAINT-P204-21 documents with revisions and SHA-256 hashes." },
  { title: "Audit-chain verification", detail: "One demonstration verification reported valid: true with 6 checked entries and 6 signed anchors. Keys and anchors are not independently hosted or WORM-backed." },
];
const sectors = [
  { icon: Factory, title: "Manufacturing", description: "Review abnormal equipment conditions with policy checks, evidence and operator oversight." },
  { icon: Zap, title: "Energy", description: "Explore governed decision support for safety-sensitive operational scenarios." },
  { icon: Building2, title: "Critical Infrastructure", description: "Prototype accountable workflows where traceability and approval matter." },
  { icon: Shield, title: "Enterprise Security", description: "Evaluate identity-aware recommendations, review gates and audit evidence." },
];
export default function EnterpriseHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedArchitectureStep, setSelectedArchitectureStep] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const copyEmail = async () => { try { await navigator.clipboard.writeText(email); setCopyStatus("Email address copied"); } catch { setCopyStatus("Copy the address shown below"); } };
  const closeMenu = () => setMenuOpen(false);
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111e] text-white">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <a href="/" aria-label="AIPUSULA Enterprise home" className="text-lg font-bold tracking-widest text-teal-300 sm:text-xl">AIPUSULA <span className="text-xs font-medium tracking-wider text-slate-400">ENTERPRISE</span></a>
        <button type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="enterprise-mobile-nav" onClick={() => setMenuOpen(v => !v)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/20 text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 md:hidden">{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
        <nav aria-label="Desktop navigation" className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <a href="#platform" className="hover:text-white">Platform</a>
          <a href="#evidence" className="hover:text-white">Evidence</a>
          <a href="#industries" className="hover:text-white">Industries</a>
          <Link href="/insights" className="hover:text-white">Insights</Link>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        {menuOpen && <nav id="enterprise-mobile-nav" aria-label="Mobile navigation" className="flex w-full flex-col gap-1 border-t border-white/10 pt-4 text-sm text-slate-200 md:hidden">
          <a href="#platform" onClick={closeMenu} className="rounded-lg px-3 py-3 hover:bg-white/10">Platform</a>
          <a href="#evidence" onClick={closeMenu} className="rounded-lg px-3 py-3 hover:bg-white/10">Evidence</a>
          <a href="#industries" onClick={closeMenu} className="rounded-lg px-3 py-3 hover:bg-white/10">Industries</a>
          <Link href="/insights" onClick={closeMenu} className="rounded-lg px-3 py-3 hover:bg-white/10">Insights</Link>
          <a href="#contact" onClick={closeMenu} className="rounded-lg px-3 py-3 hover:bg-white/10">Contact</a>
        </nav>}
      </header>
      <section className="border-y border-white/10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(20,184,166,.14),transparent_60%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.12fr_.88fr] lg:gap-16">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-teal-300">Industrial AI Governance · Technical Prototype</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl xl:text-6xl">AI recommendations.<br/><span className="text-teal-300">Human accountability.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">AIPUSULA is developing a governance and evidence layer for AI-assisted decisions in security-sensitive industrial and enterprise environments.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-teal-200">Explore Live Technical Demo <ArrowUpRight size={18}/></a>
              <a href="#platform" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold hover:border-teal-300">Explore Platform <ChevronRight size={18}/></a>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-400">Early-stage technical prototype · Synthetic industrial data · No live OT actuation · Not production-ready</p>
          </div>
          <div aria-label="Architecture diagram: AI Agent to Policy Engine to Human Approval to Audit" className="rounded-2xl border border-teal-300/20 bg-[#0b1b2c]/95 p-5 shadow-2xl shadow-teal-950/20 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3"><span className="text-xs font-semibold uppercase tracking-[.2em] text-teal-300">Governed response architecture</span><span className="rounded-full border border-teal-300/30 px-2 py-1 text-[10px] text-teal-200">SIMULATED</span></div>
            <div className="space-y-0">{architecture.map((step,i)=><div key={step.code}><button type="button" aria-expanded={selectedArchitectureStep===step.code} aria-controls="architecture-step-details" onClick={()=>setSelectedArchitectureStep(current=>current===step.code?null:step.code)} className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors hover:border-teal-300/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 ${selectedArchitectureStep===step.code?"border-teal-300/70 bg-[#17364a]":"border-white/10 bg-[#10283a]"}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-300/10 font-mono text-sm font-bold text-teal-300">{step.code}</span><span className="flex-1"><span className="block font-semibold text-white">{step.title}</span><span className="mt-1 block text-sm leading-5 text-slate-400">{step.note}</span></span><ChevronRight aria-hidden="true" className="mt-2 shrink-0 text-teal-300" size={18}/></button>{i<architecture.length-1&&<div aria-hidden="true" className="flex h-7 items-center justify-center"><div className="h-full w-px bg-teal-300/50"/><span className="-ml-[5px] mt-4 text-xs text-teal-300">▼</span></div>}</div>)}</div>
            {selectedArchitectureStep&&<div id="architecture-step-details" role="region" aria-label="Selected architecture step" className="mt-5 rounded-xl border border-teal-300/30 bg-[#10283a] p-4"><h3 className="font-semibold text-teal-200">{architecture.find(step=>step.code===selectedArchitectureStep)?.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{({ "01":"The simulated AI agent generates evidence-grounded recommendations. Recommendations do not authorize equipment control.", "02":"Deterministic policies evaluate the proposed action and the requesting identity before any simulated execution.", "03":"High-impact simulated actions require an authorized supervisor to explicitly approve or reject the proposal.", "04":"The demonstration records decisions and evidence in a traceable audit trail. This is not an independent production certification." } as Record<string,string>)[selectedArchitectureStep]}</p><a href={demo} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-300 hover:text-teal-200">Explore technical demo <ArrowUpRight size={16}/></a></div>}
            <p className="mt-5 text-xs leading-5 text-slate-400">AI does not directly control industrial equipment. Execution is simulated and gated by identity, policy and approval.</p>
          </div>
        </div>
      </section>
      <section id="platform" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-teal-300">Platform architecture</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Control, traceability and review by design.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{capabilities.map(({icon:Icon,title,description})=><article key={title} className="rounded-xl border border-white/10 bg-[#0e1d2e] p-6"><Icon className="mb-5 text-teal-300" size={28}/><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-400">{description}</p></article>)}</div>
      </section>
      <section id="evidence" className="scroll-mt-8 border-y border-white/10 bg-[#0b1828]"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.22em] text-teal-300">Prototype evidence</p><h2 className="mt-3 text-3xl font-semibold">What the current demonstration actually shows.</h2><p className="mt-4 max-w-3xl leading-7 text-slate-400">These are observations from a synthetic demonstration, not independent production certifications or claims of live industrial integration.</p><div className="mt-10 grid gap-5 md:grid-cols-2">{evidence.map(item=><article key={item.title} className="rounded-xl border border-white/10 bg-[#101f31] p-6"><CheckCircle2 className="mb-4 text-teal-300" size={23}/><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-3 leading-7 text-slate-400">{item.detail}</p></article>)}</div><a href={demo} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-teal-200">Inspect the technical demo <ArrowUpRight size={18}/></a></div></section>
      <section id="industries" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8"><p className="text-xs font-bold uppercase tracking-[.22em] text-teal-300">Potential use cases</p><h2 className="mt-3 text-3xl font-semibold">Designed for environments where decisions need oversight.</h2><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{sectors.map(({icon:Icon,title,description})=><button key={title} type="button" aria-expanded={selectedSector===title} aria-controls="industry-details" onClick={()=>setSelectedSector(current=>current===title?null:title)} className={`rounded-xl border p-6 text-left transition-colors hover:border-teal-300/60 hover:bg-[#152b40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 ${selectedSector===title?"border-teal-300 bg-[#152b40]":"border-white/10 bg-[#0e1d2e]"}`}><Icon size={28} className="mb-5 text-teal-300"/><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-400">{description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">Explore use case <ChevronRight size={17}/></span></button>)}</div>{selectedSector&&<div id="industry-details" role="region" aria-label={`${selectedSector} use case`} className="mt-6 rounded-xl border border-teal-300/30 bg-[#101f31] p-6"><h3 className="text-xl font-semibold">{selectedSector} — governed AI scenario</h3><p className="mt-3 max-w-3xl leading-7 text-slate-300">{sectors.find(item=>item.title===selectedSector)?.description} The prototype illustrates policy checks, human review and traceable evidence using synthetic data. It is not a production integration or sector certification.</p><div className="mt-5 flex flex-wrap gap-5"><a href={demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-teal-200">Open technical demo <ArrowUpRight size={17}/></a><a href="#contact" className="inline-flex items-center gap-2 font-semibold text-slate-200 hover:text-white">Discuss a pilot <ChevronRight size={17}/></a></div></div>}</section>
      <section id="contact" className="scroll-mt-8 border-t border-white/10 bg-[#0b1828]"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-teal-300">Technical evaluation & pilot collaboration</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold">Explore a controlled pilot together.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-400">We welcome discussions about evaluation criteria, architecture reviews, and scoped synthetic-data pilots. No commercial deployment or customer partnership is implied.</p></div><a href="https://mail.google.com/mail/?view=cm&fs=1&to=ceyhun%40aipusula.net&su=AIPUSULA%20Enterprise%20-%20Pilot%20Evaluation" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-teal-300 px-6 py-4 font-semibold text-slate-950 hover:bg-teal-200"><Mail size={19}/> Compose in Gmail <ArrowUpRight size={17}/></a><div className="flex flex-col items-start gap-2"><button type="button" onClick={copyEmail} className="min-h-12 rounded-lg border border-teal-300/50 px-5 py-3 text-sm font-semibold text-teal-200 hover:bg-teal-300/10">Copy Email Address</button><a className="break-all text-sm text-slate-300 underline underline-offset-4" href={`mailto:${email}`}>{email}</a><span role="status" aria-live="polite" className="text-xs text-teal-300">{copyStatus}</span></div></div></section>
      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-9 text-sm text-slate-400 sm:px-8"><span>© 2026 AIPUSULA · Enterprise AI Governance</span><div className="flex flex-wrap gap-6"><Link href="/insights" className="hover:text-white">AI Insights & Resources</Link><a href={`mailto:${email}`} className="hover:text-white">{email}</a></div></footer>
    </main>
  );
}
