import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Brain,
  Bug,
  CaretDown,
  CaretRight,
  Check,
  CheckCircle,
  Circle,
  CloudCheck,
  Coffee,
  Copy,
  DownloadSimple,
  FileZip,
  Image as ImageIcon,
  Keyboard,
  Lifebuoy,
  Lightbulb,
  List,
  ShieldCheck,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import {
  Children,
  type ComponentType,
  isValidElement,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Practices } from "./Practices";
import {
  chapters,
  courseOutline,
  getChapter,
  lastAvailableChapter,
  type LessonSection,
  TOTAL_COURSE_CHAPTERS,
} from "./content";

const STORAGE_KEY = "apostila-python-progress-v1";

type CourseProgress = {
  completedSections: string[];
  lastLocation: string;
};

type RouteState = {
  chapterNumber: number;
  sectionId: string;
};

type StarterPackage = {
  chapterNumber: number;
  chapterFolder: string;
  zipFilename: string;
  includedFiles: string[];
};

type StarterManifest = {
  version: number;
  chapters: StarterPackage[];
};

const emptyProgress: CourseProgress = {
  completedSections: [],
  lastLocation: "",
};

function sectionKey(chapterNumber: number, sectionId: string) {
  return `${chapterNumber}:${sectionId}`;
}

function readProgress(): CourseProgress {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return emptyProgress;
    const parsed = JSON.parse(saved) as Partial<CourseProgress>;
    return {
      completedSections: Array.isArray(parsed.completedSections)
        ? parsed.completedSections
        : [],
      lastLocation:
        typeof parsed.lastLocation === "string" ? parsed.lastLocation : "",
    };
  } catch {
    return emptyProgress;
  }
}

function routeFromHash(): RouteState | null {
  const match = window.location.hash.match(
    /^#\/capitulo\/(\d+)\/([^/?#]+)$/,
  );
  if (!match) return null;

  const chapter = getChapter(Number(match[1]));
  const sectionExists = chapter.sections.some(
    (section) => section.id === match[2],
  );

  return {
    chapterNumber: chapter.number,
    sectionId: sectionExists ? match[2] : chapter.sections[0].id,
  };
}

function routeFromSavedProgress() {
  const saved = readProgress();
  const savedMatch = saved.lastLocation.match(/^(\d+):(.+)$/);
  if (savedMatch) {
    const chapter = getChapter(Number(savedMatch[1]));
    if (chapter.sections.some((section) => section.id === savedMatch[2])) {
      return {
        chapterNumber: chapter.number,
        sectionId: savedMatch[2],
      };
    }
  }

  return {
    chapterNumber: chapters[0].number,
    sectionId: chapters[0].sections[0].id,
  };
}

function pathFor(chapterNumber: number, sectionId: string) {
  return `#/capitulo/${chapterNumber}/${sectionId}`;
}

function useCourseRoute() {
  const [route, setRoute] = useState<RouteState>(() => {
    return routeFromHash() ?? routeFromSavedProgress();
  });

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(
        null,
        "",
        pathFor(route.chapterNumber, route.sectionId),
      );
    }

    const syncRoute = () => {
      const next = routeFromHash();
      if (next) setRoute(next);
    };

    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  function navigate(chapterNumber: number, sectionId: string) {
    const nextPath = pathFor(chapterNumber, sectionId);
    if (window.location.hash === nextPath.slice(1)) {
      setRoute({ chapterNumber, sectionId });
      return;
    }
    window.location.hash = nextPath.slice(1);
  }

  return { route, navigate };
}

// Rótulo por linguagem da cerca de código. Blocos que o estudante digita ou
// reaproveita (Python, terminal, JSON) mostram "Copiar"; blocos de saída ou
// diagramas (```text```) são apenas leitura e não convidam à cópia.
const CODE_LABELS: Record<string, string> = {
  python: "Python",
  powershell: "Terminal",
  bash: "Terminal",
  console: "Terminal",
  json: "JSON",
  text: "Saída",
};
const COPYABLE_LANGUAGES = new Set(["python", "powershell", "bash", "console", "json"]);

function CodeBlock({
  children,
}: {
  children?: ReactNode;
}) {
  const child = Children.toArray(children)[0] as
    | { props?: { children?: ReactNode; className?: string } }
    | undefined;
  const code = String(child?.props?.children ?? "").replace(/\n$/, "");
  const language =
    child?.props?.className?.replace("language-", "") ?? "text";
  const label = CODE_LABELS[language] ?? "Saída";
  const canCopy = COPYABLE_LANGUAGES.has(language);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{label}</span>
        {canCopy ? (
          <button type="button" onClick={copyCode} aria-live="polite">
            <span
              className="t-icon-swap"
              data-state={copied ? "b" : "a"}
              aria-hidden="true"
            >
              <span className="t-icon" data-icon="a">
                <Copy size={17} />
              </span>
              <span className="t-icon" data-icon="b">
                <Check size={17} />
              </span>
            </span>
            {copied ? "Copiado" : "Copiar"}
          </button>
        ) : null}
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const groupRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);
  const characters = Array.from(value);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    group.classList.remove("is-animating");
    void group.offsetHeight;
    group.classList.add("is-animating");
  }, [value]);

  return (
    <span className="t-digit-group" ref={groupRef}>
      {characters.map((character, index) => {
        const distanceFromEnd = characters.length - index;
        const stagger =
          distanceFromEnd === 2 ? "1" : distanceFromEnd === 1 ? "2" : undefined;

        return (
          <span
            className="t-digit"
            data-stagger={stagger}
            key={`${index}:${character}`}
          >
            {character}
          </span>
        );
      })}
    </span>
  );
}

// Caixas didáticas: o texto (PLANO_CONTEUDO.md §5) usa rótulos em negrito
// distintos. Detectamos o rótulo para dar ícone e cor próprios a cada tipo,
// em vez de achatar tudo em um único estilo.
type CalloutVariant = { name: string; Icon: ComponentType<{ size?: number; weight?: "duotone"; "aria-hidden"?: boolean }> };

const CALLOUT_VARIANTS: Record<string, CalloutVariant> = {
  atencao: { name: "warning", Icon: WarningCircle },
  "erro comum": { name: "error", Icon: Bug },
  dica: { name: "tip", Icon: Lightbulb },
  "teste mental": { name: "think", Icon: Brain },
  seguranca: { name: "security", Icon: ShieldCheck },
  "pausa sugerida": { name: "pause", Icon: Coffee },
  "figura em producao": { name: "figure", Icon: ImageIcon },
};
const DEFAULT_CALLOUT: CalloutVariant = { name: "note", Icon: BookOpenText };

function normalizeLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .trim();
}

function firstStrongText(children: ReactNode): string | null {
  let result: string | null = null;
  Children.forEach(children, (child) => {
    if (result || !isValidElement(child)) return;
    const el = child as { type: unknown; props?: { children?: ReactNode } };
    if (el.type === "strong") {
      result = collectText(el.props?.children);
      return;
    }
    const nested = firstStrongText(el.props?.children);
    if (nested) result = nested;
  });
  return result;
}

function collectText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join("");
  if (isValidElement(node)) {
    return collectText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function calloutVariantFor(children: ReactNode): CalloutVariant {
  const label = firstStrongText(children);
  if (!label) return DEFAULT_CALLOUT;
  return CALLOUT_VARIANTS[normalizeLabel(label)] ?? DEFAULT_CALLOUT;
}

export function LessonMarkdown({ markdown }: { markdown: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre: CodeBlock,
        code({ className, children, ...props }) {
          return (
            <code className={className ?? "inline-code"} {...props}>
              {children}
            </code>
          );
        },
        blockquote({ children }) {
          const variant = calloutVariantFor(children);
          const Icon = variant.Icon;
          return (
            <aside className={`callout callout-${variant.name}`}>
              <Icon size={21} weight="duotone" aria-hidden="true" />
              <div>{children}</div>
            </aside>
          );
        },
        a({ href = "", children, ...props }) {
          const isExternal = /^https?:\/\//.test(href);
          return (
            <a
              href={href}
              {...props}
              {...(isExternal
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {children}
            </a>
          );
        },
        table({ children }) {
          return (
            <div className="table-scroll">
              <table>{children}</table>
            </div>
          );
        },
        details({ children, ...props }) {
          return (
            <details className="hint-details" {...props}>
              {children}
            </details>
          );
        },
        summary({ children, ...props }) {
          return (
            <summary {...props}>
              <Lifebuoy size={19} aria-hidden="true" />
              {children}
              <CaretDown
                className="summary-caret"
                size={18}
                aria-hidden="true"
              />
            </summary>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}

function SectionStateIcon({
  complete,
  current,
}: {
  complete: boolean;
  current: boolean;
}) {
  if (complete) {
    return <CheckCircle size={23} weight="fill" aria-hidden="true" />;
  }
  if (current) {
    return (
      <span className="current-dot" aria-hidden="true">
        <span />
      </span>
    );
  }
  return <Circle size={23} aria-hidden="true" />;
}

function RailStage({
  label,
  completed,
  total,
  active,
  children,
}: {
  label: string;
  completed: number;
  total: number;
  active: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return (
    <details
      className="rail-group"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <span>{label}</span>
        <small>
          {completed}/{total}
        </small>
        <CaretDown size={15} aria-hidden="true" />
      </summary>
      <div className="rail-group-items">{children}</div>
    </details>
  );
}

function ChapterRail({
  chapterNumber,
  sectionId,
  completedSections,
  isOpen,
  onClose,
  onNavigate,
}: {
  chapterNumber: number;
  sectionId: string;
  completedSections: string[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (chapterNumber: number, sectionId: string) => void;
}) {
  const chapter = getChapter(chapterNumber);
  const chapterCompleted = chapter.sections.filter((section) =>
    completedSections.includes(sectionKey(chapter.number, section.id)),
  ).length;
  const percentage = Math.round(
    (chapterCompleted / chapter.sections.length) * 100,
  );
  const conceptStart = Math.max(
    0,
    chapter.sections.findIndex((section) => {
      const title = section.title.toLowerCase();
      return ![
        "boas-vindas",
        "visão geral do encontro",
        "antes de começar",
        "objetivos de aprendizagem",
        "situação-problema",
      ].includes(title);
    }),
  );
  const practiceStart = chapter.sections.findIndex((section) =>
    section.title.toLowerCase().startsWith("prática acompanhada"),
  );
  const reviewStart = chapter.sections.findIndex((section) =>
    section.title.toLowerCase().startsWith("resumo do capítulo"),
  );
  const stageDefinitions = [
    {
      label: "Comece aqui",
      sections: chapter.sections.slice(0, conceptStart),
    },
    {
      label: "Conceitos",
      sections: chapter.sections.slice(
        conceptStart,
        practiceStart > -1 ? practiceStart : reviewStart,
      ),
    },
    {
      label: "Prática",
      sections: chapter.sections.slice(
        practiceStart > -1 ? practiceStart : reviewStart,
        reviewStart,
      ),
    },
    {
      label: "Revisão e fechamento",
      sections: chapter.sections.slice(reviewStart),
    },
  ].filter((stage) => stage.sections.length > 0);

  return (
    <>
      <button
        className={`rail-scrim ${isOpen ? "is-visible" : ""}`}
        type="button"
        aria-label="Fechar sumário"
        onClick={onClose}
      />
      <aside className={`chapter-rail ${isOpen ? "is-open" : ""}`}>
        <nav className="course-navigation" aria-label="Áreas da apostila">
          <a href={pathFor(chapter.number, sectionId)} aria-current="page">Capítulos</a>
          <a href="#/praticas">Práticas</a>
        </nav>
        <div className="rail-heading">
          <div className="eyebrow-row">
            <span>
              Capítulo {chapter.number} de {TOTAL_COURSE_CHAPTERS}
            </span>
            <button
              className="icon-button rail-close"
              type="button"
              onClick={onClose}
              aria-label="Fechar sumário"
            >
              <X size={20} />
            </button>
          </div>
          <h1>{chapter.shortTitle}</h1>
          <div
            className="progress-track"
            role="progressbar"
            aria-label={`Progresso do capítulo ${chapter.number}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
          >
            <span style={{ width: `${percentage}%` }} />
          </div>
          <div className="progress-caption">
            <span>
              {chapterCompleted} de {chapter.sections.length} seções
            </span>
            <strong>
              <AnimatedNumber value={`${percentage}%`} />
            </strong>
          </div>
        </div>

        <label className="chapter-picker">
          <span>Trocar de capítulo</span>
          <select
            value={chapter.number}
            onChange={(event) => {
              const nextChapter = getChapter(Number(event.target.value));
              onNavigate(nextChapter.number, nextChapter.sections[0].id);
              onClose();
            }}
          >
            {courseOutline.map((item) => (
              <option
                value={item.number}
                key={item.number}
                disabled={!item.available}
              >
                {item.number}. {item.shortTitle}
                {item.available ? "" : " (em produção)"}
              </option>
            ))}
          </select>
        </label>

        <p className="preview-note">
          Prévia do curso: capítulos 1 a {lastAvailableChapter} disponíveis.
          Os demais estão em produção.
        </p>

        <nav className="section-list" aria-label="Seções do capítulo">
          {stageDefinitions.map((stage) => {
            const containsCurrent = stage.sections.some(
              (section) => section.id === sectionId,
            );
            const completedInStage = stage.sections.filter((section) =>
              completedSections.includes(
                sectionKey(chapter.number, section.id),
              ),
            ).length;

            return (
              <RailStage
                label={stage.label}
                completed={completedInStage}
                total={stage.sections.length}
                active={containsCurrent}
                key={`${chapter.number}:${stage.label}`}
              >
                {stage.sections.map((section) => {
                  const index = chapter.sections.findIndex(
                    (item) => item.id === section.id,
                  );
                  const complete = completedSections.includes(
                    sectionKey(chapter.number, section.id),
                  );
                  const current = section.id === sectionId;

                  return (
                    <button
                      type="button"
                      className={current ? "is-current" : ""}
                      aria-current={current ? "step" : undefined}
                      key={section.id}
                      onClick={() => {
                        onNavigate(chapter.number, section.id);
                        onClose();
                      }}
                    >
                      <SectionStateIcon
                        complete={complete}
                        current={current}
                      />
                      <span className="section-number">
                        {chapter.number}.{index + 1}
                      </span>
                      <span className="section-label">{section.title}</span>
                      <CaretRight
                        className="section-caret"
                        size={16}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </RailStage>
            );
          })}
        </nav>

        <div className="saved-status">
          <CloudCheck size={25} weight="duotone" aria-hidden="true" />
          <div>
            <strong>Progresso salvo</strong>
            <span>Neste dispositivo</span>
          </div>
        </div>
      </aside>
    </>
  );
}

function SupportRail({
  chapterNumber,
  starterPackage,
  onNavigate,
}: {
  chapterNumber: number;
  starterPackage: StarterPackage | null;
  onNavigate: (chapterNumber: number, sectionId: string) => void;
}) {
  const chapter = getChapter(chapterNumber);

  function findSection(term: string) {
    return chapter.sections.find((section) =>
      section.title.toLowerCase().includes(term),
    );
  }

  const shortcuts = [
    {
      label: "Revisar objetivos",
      icon: BookOpenText,
      section: findSection("objetivos"),
    },
    {
      label: "Ir para a oficina",
      icon: Bug,
      section: findSection("oficina"),
    },
    {
      label: "Consultar vocabulário",
      icon: Lifebuoy,
      section: findSection("vocabulário"),
    },
  ].filter(
    (shortcut): shortcut is typeof shortcut & { section: LessonSection } =>
      Boolean(shortcut.section),
  );

  return (
    <aside className="support-rail" aria-label="Ajuda contextual">
      <div className="support-group">
        <h2>Precisa de ajuda?</h2>
        {starterPackage ? (
          <a
            className="support-download"
            href={`/downloads/${starterPackage.zipFilename}`}
            download
          >
            <DownloadSimple size={21} aria-hidden="true" />
            <span>Baixar arquivos iniciais</span>
            <FileZip size={17} aria-hidden="true" />
          </a>
        ) : null}
        {shortcuts.map(({ label, icon: Icon, section }) => (
          <button
            type="button"
            key={label}
            onClick={() => onNavigate(chapter.number, section.id)}
          >
            <Icon size={21} aria-hidden="true" />
            <span>{label}</span>
            <CaretRight size={16} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="study-tip">
        <Keyboard size={24} weight="duotone" aria-hidden="true" />
        <div>
          <strong>Dica de estudo</strong>
          <p>
            Preveja a saída antes de executar. Comparar expectativa e resultado
            é parte da aprendizagem.
          </p>
        </div>
      </div>
    </aside>
  );
}

function StarterDownloadCard({
  chapterNumber,
  starterPackage,
}: {
  chapterNumber: number;
  starterPackage: StarterPackage;
}) {
  return (
    <section className="starter-card" aria-labelledby="starter-card-title">
      <div className="starter-card-icon" aria-hidden="true">
        <FileZip size={28} weight="duotone" />
      </div>
      <div className="starter-card-copy">
        <span className="starter-kicker">Pacote do estudante</span>
        <h2 id="starter-card-title">
          Arquivos iniciais do Capítulo {chapterNumber}
        </h2>
        <p>
          Baixe um único arquivo ZIP com{" "}
          {starterPackage.includedFiles.length} itens. Extraia a pasta antes de
          abrir o projeto no VS Code.
        </p>
        <span className="starter-file-list">
          {starterPackage.includedFiles.join(" · ")}
        </span>
      </div>
      <a
        className="starter-download-button"
        href={`/downloads/${starterPackage.zipFilename}`}
        download
      >
        <DownloadSimple size={19} weight="bold" aria-hidden="true" />
        Baixar starter
      </a>
    </section>
  );
}

function ReflectionCard({
  storageId,
}: {
  storageId: string;
}) {
  const reflectionKey = `${STORAGE_KEY}:reflection:${storageId}`;
  const [checked, setChecked] = useState(() => {
    return window.localStorage.getItem(reflectionKey) === "true";
  });

  function toggleReflection() {
    const next = !checked;
    setChecked(next);
    window.localStorage.setItem(reflectionKey, String(next));
  }

  return (
    <section className="reflection-card" aria-labelledby="reflection-title">
      <div>
        <span className="reflection-kicker">Antes de continuar</span>
        <h2 id="reflection-title">Você conferiu sua própria resposta?</h2>
        <p>
          Tente responder sem executar o código. Depois, use o resultado para
          verificar seu raciocínio.
        </p>
      </div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={toggleReflection}
        />
        <span>Respondi primeiro e depois conferi.</span>
      </label>
    </section>
  );
}

function ChaptersApp() {
  const { route, navigate } = useCourseRoute();
  const [progress, setProgress] = useState<CourseProgress>(() =>
    readProgress(),
  );
  const [starterPackage, setStarterPackage] =
    useState<StarterPackage | null>(null);
  const [railOpen, setRailOpen] = useState(false);
  const chapter = getChapter(route.chapterNumber);
  const currentIndex = Math.max(
    0,
    chapter.sections.findIndex(
      (section) => section.id === route.sectionId,
    ),
  );
  const currentSection = chapter.sections[currentIndex];
  const currentKey = sectionKey(chapter.number, currentSection.id);
  const isComplete = progress.completedSections.includes(currentKey);

  const allSections = useMemo(
    () =>
      chapters.flatMap((item) =>
        item.sections.map((section) => ({
          chapterNumber: item.number,
          section,
        })),
      ),
    [],
  );
  const absoluteIndex = allSections.findIndex(
    (item) =>
      item.chapterNumber === chapter.number &&
      item.section.id === currentSection.id,
  );
  const previous = allSections[absoluteIndex - 1];
  const next = allSections[absoluteIndex + 1];

  useEffect(() => {
    const nextProgress = {
      ...progress,
      lastLocation: currentKey,
    };
    setProgress(nextProgress);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    document.title = `${currentSection.title} · ${chapter.shortTitle}`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentKey]);

  useEffect(() => {
    let cancelled = false;

    fetch("/downloads/manifest.json")
      .then((response) => {
        if (!response.ok) throw new Error("Starter manifest unavailable");
        return response.json() as Promise<StarterManifest>;
      })
      .then((manifest) => {
        if (cancelled) return;
        setStarterPackage(
          manifest.chapters.find(
            (item) => item.chapterNumber === chapter.number,
          ) ?? null,
        );
      })
      .catch(() => {
        if (!cancelled) setStarterPackage(null);
      });

    return () => {
      cancelled = true;
    };
  }, [chapter.number]);

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (!event.altKey) return;
      if (event.key === "ArrowLeft" && previous) {
        navigate(previous.chapterNumber, previous.section.id);
      }
      if (event.key === "ArrowRight" && next) {
        navigate(next.chapterNumber, next.section.id);
      }
    }

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [previous, next]);

  function markCompleteAndContinue() {
    const completed = isComplete
      ? progress.completedSections
      : [...progress.completedSections, currentKey];
    const nextLocation = next
      ? sectionKey(next.chapterNumber, next.section.id)
      : currentKey;
    const nextProgress = {
      completedSections: completed,
      lastLocation: nextLocation,
    };

    setProgress(nextProgress);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));

    if (next) navigate(next.chapterNumber, next.section.id);
  }

  function goToPrevious() {
    if (previous) navigate(previous.chapterNumber, previous.section.id);
  }

  const showReflection = currentSection.title
    .toLowerCase()
    .includes("verifique seu aprendizado");

  return (
    <div className="course-shell">
      <a className="skip-link" href="#lesson-content">
        Pular para o conteúdo
      </a>

      <ChapterRail
        chapterNumber={chapter.number}
        sectionId={currentSection.id}
        completedSections={progress.completedSections}
        isOpen={railOpen}
        onClose={() => setRailOpen(false)}
        onNavigate={navigate}
      />

      <header className="mobile-header">
        <button
          className="icon-button"
          type="button"
          onClick={() => setRailOpen(true)}
          aria-label="Abrir sumário do capítulo"
        >
          <List size={22} />
        </button>
        <div>
          <span>
            Capítulo {chapter.number} de {TOTAL_COURSE_CHAPTERS}
          </span>
          <strong>{chapter.shortTitle}</strong>
        </div>
        <span className="mobile-step">
          {currentIndex + 1}/{chapter.sections.length}
        </span>
      </header>

      <main className="lesson-main" id="lesson-content">
        <div className="lesson-toolbar">
          <button
            type="button"
            className="back-button"
            onClick={goToPrevious}
            disabled={!previous}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
          <span>
            Seção {currentIndex + 1} de {chapter.sections.length}
          </span>
        </div>

        <article className="lesson-article">
          <header className="lesson-heading">
            <span className="lesson-number">
              {chapter.number}.{currentIndex + 1}
            </span>
            <h1>{currentSection.title}</h1>
          </header>

          <div className="markdown-body">
            <LessonMarkdown markdown={currentSection.markdown} />
          </div>

          {currentSection.title.toLowerCase() === "antes de começar" &&
          starterPackage ? (
            <StarterDownloadCard
              chapterNumber={chapter.number}
              starterPackage={starterPackage}
            />
          ) : null}

          {showReflection ? (
            <ReflectionCard storageId={currentKey} />
          ) : null}

          <footer className="lesson-footer">
            <div className="completion-status" aria-live="polite">
              {isComplete ? (
                <>
                  <CheckCircle size={22} weight="fill" />
                  Esta seção já está concluída.
                </>
              ) : (
                <>
                  <Circle size={22} />
                  Conclua quando se sentir pronto.
                </>
              )}
            </div>

            {next ? (
              <button
                type="button"
                className="primary-action"
                onClick={markCompleteAndContinue}
              >
                <span>
                  <small>{isComplete ? "Continuar para" : "Concluir e continuar"}</small>
                  {next.section.title}
                </span>
                <ArrowRight size={20} weight="bold" />
              </button>
            ) : (
              <button
                type="button"
                className="primary-action"
                onClick={markCompleteAndContinue}
                disabled={isComplete}
              >
                <span>
                  <small>
                    {isComplete ? "Fim da prévia" : "Concluir seção"}
                  </small>
                  {isComplete
                    ? `Capítulos 1 a ${lastAvailableChapter} concluídos`
                    : "Concluir e finalizar a prévia"}
                </span>
                <CheckCircle size={21} weight="bold" />
              </button>
            )}
          </footer>

          {!next ? (
            <p className="preview-end-note">
              Você chegou ao fim do conteúdo disponível nesta prévia. Os
              capítulos {lastAvailableChapter + 1} a {TOTAL_COURSE_CHAPTERS}{" "}
              ainda estão em produção.
            </p>
          ) : null}
        </article>
      </main>

      <SupportRail
        chapterNumber={chapter.number}
        starterPackage={starterPackage}
        onNavigate={navigate}
      />
    </div>
  );
}

export function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return /^#\/praticas(?:\/|$)/.test(hash)
    ? <Practices hash={hash} renderMarkdown={(markdown) => <LessonMarkdown markdown={markdown} />} />
    : <ChaptersApp />;
}
