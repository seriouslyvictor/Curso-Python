import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, List, X } from "@phosphor-icons/react";
import catalog from "../../praticas/catalogo.json";

const sources = import.meta.glob("../../praticas/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;
const STORAGE_KEY = "apostila-python-practices-v1";
const ids = new Set(catalog.challenges.map((challenge) => challenge.id));
function readCompleted(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? [...new Set<string>(value.filter((id) => typeof id === "string" && ids.has(id)))] : [];
  } catch { return []; }
}
function chaptersPath() {
  try {
    const saved = JSON.parse(localStorage.getItem("apostila-python-progress-v1") ?? "{}");
    const match = typeof saved.lastLocation === "string" && saved.lastLocation.match(/^(\d+):([^/?#]+)$/);
    if (match) return `#/capitulo/${match[1]}/${match[2]}`;
  } catch { /* Use the chapter entry point. */ }
  return "#/capitulo/1/boas-vindas";
}

export function Practices({ hash, renderMarkdown }: { hash: string; renderMarkdown: (markdown: string) => ReactNode }) {
  const [completed, setCompleted] = useState(readCompleted);
  const [phase, setPhase] = useState("");
  const [railOpen, setRailOpen] = useState(false);
  const requestedId = hash.slice("#/praticas/".length);
  const challenge = catalog.challenges.find((item) => item.id === requestedId);
  const invalid = hash !== "#/praticas" && hash !== "#/praticas/" && !challenge;
  const activePhase = catalog.phases.find((item) => item.id === challenge?.fase);
  const index = challenge ? catalog.challenges.indexOf(challenge) : -1;
  const previous = catalog.challenges[index - 1];
  const next = catalog.challenges[index + 1];
  useEffect(() => {
    document.title = `${challenge?.titulo ?? "Práticas de Python"} · Apostila interativa`;
    setRailOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash]);
  function toggleComplete(id: string) {
    const updated = completed.includes(id) ? completed.filter((item) => item !== id) : [...completed, id];
    setCompleted(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* Keep progress for this session. */ }
  }
  const percentage = Math.round(completed.length / catalog.challenges.length * 100);
  return <div className="course-shell practices-shell">
    <a className="skip-link" href="#practice-content" onClick={(event) => { event.preventDefault(); document.getElementById("practice-content")?.focus(); }}>Pular para o conteúdo</a>
    <button className={`rail-scrim ${railOpen ? "is-visible" : ""}`} aria-label="Fechar práticas" onClick={() => setRailOpen(false)} />
    <aside className={`chapter-rail ${railOpen ? "is-open" : ""}`}>
      <nav className="course-navigation" aria-label="Áreas da apostila">
        <a href={chaptersPath()}>Capítulos</a><a href="#/praticas" aria-current="page">Práticas</a>
      </nav>
      <div className="rail-heading">
        <div className="eyebrow-row"><span>Aprenda fazendo</span><button className="icon-button rail-close" aria-label="Fechar práticas" onClick={() => setRailOpen(false)}><X size={20} /></button></div>
        <h1>Práticas de Python</h1>
        <div className="progress-track" role="progressbar" aria-label="Práticas concluídas" aria-valuenow={completed.length} aria-valuemin={0} aria-valuemax={catalog.challenges.length}><span style={{ width: `${percentage}%` }} /></div>
        <div className="progress-caption"><span>{completed.length} de {catalog.challenges.length} concluídas</span><strong>{percentage}%</strong></div>
      </div>
      <nav className="practice-rail-list" aria-label="Lista de práticas">
        <a className="practice-overview-link" href="#/praticas">Todas as práticas</a>
        {catalog.phases.map((group) => <div key={group.id}>
          <h2>{group.label}</h2>
          {catalog.challenges.filter((item) => item.fase === group.id).map((item) => <a key={item.id} href={`#/praticas/${item.id}`} aria-current={challenge?.id === item.id ? "page" : undefined}>
            <span>{item.numero}. {item.titulo}</span>{completed.includes(item.id) && <CheckCircle size={18} aria-label="Concluída" />}
          </a>)}
        </div>)}
      </nav>
    </aside>
    <header className="mobile-header"><button className="icon-button" aria-label="Abrir lista de práticas" onClick={() => setRailOpen(true)}><List size={22} /></button><div><span>Práticas independentes</span><strong>{challenge?.titulo ?? "Práticas de Python"}</strong></div></header>
    <main className="lesson-main" id="practice-content" tabIndex={-1}>
      <div className="lesson-toolbar"><a className="back-button" href={challenge ? "#/praticas" : chaptersPath()}><ArrowLeft size={18} />{challenge ? "Todas as práticas" : "Voltar aos capítulos"}</a><span>{challenge ? `${index + 1} de ${catalog.challenges.length}` : "18 desafios · 6 grupos"}</span></div>
      <article className="lesson-article">
        <header className="lesson-heading"><span className="lesson-number">{activePhase?.label ?? "Práticas"}</span><h1>{challenge?.titulo ?? "Pratique no seu ritmo"}</h1></header>
        {challenge ? <>
          <div className="practice-tags">{challenge.conceitos.map((concept) => <span key={concept}>{concept}</span>)}</div>
          <div className="markdown-body">{renderMarkdown(sources[`../../praticas/${challenge.id}.md`])}</div>
          <footer className="lesson-footer">
            <button className="back-button" aria-pressed={completed.includes(challenge.id)} onClick={() => toggleComplete(challenge.id)}><CheckCircle size={22} />{completed.includes(challenge.id) ? "Concluída · marcar como pendente" : "Marcar como concluída"}</button>
            {next && <a className="primary-action" href={`#/praticas/${next.id}`}><span><small>Próxima prática</small>{next.titulo}</span><ArrowRight size={20} /></a>}
          </footer>
          {previous && <a className="back-button" href={`#/praticas/${previous.id}`}><ArrowLeft size={18} />Prática anterior</a>}
        </> : <>
          <div className="markdown-body"><p>Escolha uma atividade sem depender do avanço nos capítulos. Copie os dados, resolva na sua IDE e compare com a saída esperada. Abra as dicas conforme precisar.</p><p>Os dados simulam respostas de APIs e já estão prontos para usar. Seu progresso nas práticas fica salvo neste navegador.</p>{invalid && <p role="status">Esta prática não foi encontrada. Escolha uma das atividades abaixo.</p>}</div>
          <div className="practice-filters" role="group" aria-label="Filtrar por grupo"><button aria-pressed={!phase} onClick={() => setPhase("")}>Todas (18)</button>{catalog.phases.map((group) => <button key={group.id} aria-pressed={phase === group.id} onClick={() => setPhase(group.id)}>{group.label}</button>)}</div>
          {catalog.phases.filter((group) => !phase || group.id === phase).map((group) => <section className="practice-group" key={group.id}><h2>{group.label}</h2><p>{group.desc}</p><div className="practice-cards">{catalog.challenges.filter((item) => item.fase === group.id).map((item) => <a className="practice-card" key={item.id} href={`#/praticas/${item.id}`}><span className="practice-card-meta">{item.tema}{completed.includes(item.id) && <span> · Concluída</span>}</span><h3>{item.numero}. {item.titulo}</h3><p>{item.conceitos.join(" · ")}</p><span className="practice-card-action">Abrir prática <ArrowRight size={17} /></span></a>)}</div></section>)}
        </>}
      </article>
    </main>
  </div>;
}
