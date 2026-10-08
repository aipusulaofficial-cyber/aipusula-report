import { ArrowUpRight, ShieldCheck, Workflow, Fingerprint, FileCheck2, Network, LockKeyhole, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const capabilities = [
  { icon: ShieldCheck, title: "Governed AI", description: "Deterministic policy gates between AI recommendations and sensitive actions." },
  { icon: Fingerprint, title: "Identity & Access", description: "Role-based permissions and clear separation of operator and supervisor responsibilities." },
  { icon: Workflow, title: "Human Approval", description: "High-impact decisions require explicit human review before simulated execution." },
  { icon: FileCheck2, title: "Evidence & Audit", description: "Source-linked recommendations and tamper-evident demonstration records." },
  { icon: Network, title: "Industrial Workflows", description: "A proposed integration layer for industrial and enterprise systems." },
  { icon: LockKeyhole, title: "Controlled Execution", description: "No unrestricted AI access to operational control systems." },
];

export default function EnterpriseHome() {
  return (
    <main className="min-h-screen bg-[#07111e] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6">
        <a href="/" className="text-xl font-bold tracking-widest text-teal-300">AIPUSULA<span className="ml-2 text-xs font-medium text-slate-400">ENTERPRISE</span></a>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          <a href="#platform" className="hover:text-white">Platform</a>
          <a href="#workflow" className="hover:text-white">Workflow</a>
          <Link href="/insights" className="hover:text-white">Insights</Link>
          <a href="mailto:ceyhun@aipusula.net" className="hover:text-white">Contact</a>
        </nav>
      </header>
      <section className="relative overflow-hidden border-y border-white/10 bg-[radial-gradient(ellipse_at_80%_20%,rgba(20,184,166,.17),transparent_55%)]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.28em] text-teal-300">Industrial AI Governance · Technical Prototype</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">AI recommendations.<br/><span className="text-teal-300">Human accountability.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">AIPUSULA is developing a governance and evidence layer for AI-assisted decisions in security-sensitive industrial and enterprise environments.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="https://demo.aipusula.net/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-teal-300 px-6 py-4 font-semibold text-slate-950 hover:bg-teal-200">Explore Live Technical Demo <ArrowUpRight size={19}/></a>
            <a href="#platform" className="inline-flex items-center gap-2 rounded-lg border border-slate-500 px-6 py-4 font-semibold hover:border-teal-300">Explore Platform <ChevronRight size={19}/></a>
          </div>
          <p className="mt-7 max-w-3xl text-sm text-slate-400">Early-stage technical prototype · Synthetic industrial data · No live OT actuation · Not production-ready · Independent proposal, not endorsed by Siemens</p>
        </div>
      </section>
      <section id="platform" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-teal-300">Platform architecture</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Built around control, traceability and review.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(({icon: Icon,title,description}) => <article key={title} className="rounded-xl border border-white/10 bg-[#0e1d2e] p-7"><Icon className="mb-5 text-teal-300" size={28}/><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-slate-400">{description}</p></article>)}</div>
      </section>
      <section id="workflow" className="border-y border-white/10 bg-[#0b1828]"><div className="mx-auto max-w-7xl px-6 py-20"><p className="text-xs font-bold uppercase tracking-[.22em] text-teal-300">Demonstration workflow</p><h2 className="mt-3 text-3xl font-semibold">From anomaly to governed response</h2><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["Detect & enrich","Recommend with evidence","Authorize & approve","Simulate, verify & audit"].map((step,i)=><div key={step} className="rounded-lg border border-white/10 p-5"><span className="text-sm text-teal-300">0{i+1}</span><p className="mt-3 font-semibold">{step}</p></div>)}</div><a href="https://demo.aipusula.net/" target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center gap-2 font-semibold text-teal-300 hover:text-teal-200">Open the technical demo <ArrowUpRight size={18}/></a></div></section>
      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-slate-400"><span>© 2026 AIPUSULA · Enterprise AI Governance</span><div className="flex gap-6"><Link href="/insights" className="hover:text-white">AI Insights & Resources</Link><a href="mailto:ceyhun@aipusula.net" className="hover:text-white">ceyhun@aipusula.net</a></div></footer>
    </main>
  );
}
