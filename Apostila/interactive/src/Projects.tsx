import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChatsCircle,
  CheckCircle,
  Circle,
  CloudArrowUp,
  Compass,
  FlagCheckered,
  Robot,
  Stack,
  TreeStructure,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import catalog from "../../projetos/catalogo.json";
import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import { AppShell } from "@/components/course/AppShell";
import { LessonMarkdown } from "@/components/course/LessonMarkdown";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const sources = import.meta.glob("../../projetos/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;
const STORAGE_KEY = "apostila-python-projetos-v1";

type Project = (typeof catalog.projetos)[number];
type Guide = (typeof catalog.guias)[number];
type Checklist = Record<string, number[]>;

export const PROJECTS_HOME = "#/projetos";
export const projectPath = (id: string) => `#/projetos/${id}`;
export const guidePath = (id: string) => `#/projetos/guia/${id}`;

const GUIDE_ICONS: Record<string, Icon> = {
  entrevista: ChatsCircle,
  perguntas: Compass,
  stack: Stack,
  "ferramentas-ia": Robot,
  deploy: CloudArrowUp,
  "mapa-do-sistema": TreeStructure,
};

// Guides in journey order (by stage), used for previous/next navigation.
const orderedGuides = catalog.etapas.flatMap((stage) => catalog.guias.filter((guide) => guide.etapa === stage.id));

function readChecklist(): Checklist {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const result: Checklist = {};
    for (const project of catalog.projetos) {
      const items = (value as Record<string, unknown>)[project.id];
      if (Array.isArray(items)) {
        result[project.id] = [...new Set(items.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < project.checklist.length))];
      }
    }
    return result;
  } catch {
    return {};
  }
}

function percentFor(project: Project, checklist: Checklist) {
  return Math.round(((checklist[project.id]?.length ?? 0) / project.checklist.length) * 100);
}

function stageLabel(id: string) {
  return catalog.etapas.find((stage) => stage.id === id)?.label ?? id;
}

function ProjectsSidebar({ currentId, checklist }: { currentId?: string; checklist: Checklist }) {
  const { setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);
  return (
    <SidebarContent>
      <nav aria-label="Projetos e guias">
        <SidebarGroup className="py-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={!currentId} render={<a href={PROJECTS_HOME} onClick={close} />}>
                <FlagCheckered />
                Visão geral
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="py-1">
          <SidebarGroupLabel className="text-xs font-semibold tracking-wide uppercase">Desafios</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {catalog.projetos.map((project) => {
                const current = currentId === project.id;
                const percent = percentFor(project, checklist);
                return (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      isActive={current}
                      aria-current={current ? "page" : undefined}
                      render={<a href={projectPath(project.id)} onClick={close} />}
                    >
                      {percent === 100 ? (
                        <CheckCircle weight="fill" className="text-primary" aria-label="Lista completa" />
                      ) : (
                        <Circle className="text-muted-foreground" aria-hidden />
                      )}
                      <span className="truncate">{project.titulo}</span>
                      {percent > 0 && percent < 100 ? (
                        <span className="ml-auto text-xs text-muted-foreground tabular-nums">{percent}%</span>
                      ) : null}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="py-1">
          <SidebarGroupLabel className="text-xs font-semibold tracking-wide uppercase">Guia do projeto</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {orderedGuides.map((guide) => {
                const GuideIcon = GUIDE_ICONS[guide.id] ?? BookOpen;
                const current = currentId === `guia/${guide.id}`;
                return (
                  <SidebarMenuItem key={guide.id}>
                    <SidebarMenuButton
                      isActive={current}
                      aria-current={current ? "page" : undefined}
                      render={<a href={guidePath(guide.id)} onClick={close} />}
                    >
                      <GuideIcon />
                      <span className="truncate">{guide.titulo}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </nav>
    </SidebarContent>
  );
}

function ChecklistCard({
  project,
  done,
  onToggle,
  idPrefix,
}: {
  project: Project;
  done: number[];
  onToggle: (index: number, checked: boolean) => void;
  idPrefix: string;
}) {
  const percent = Math.round((done.length / project.checklist.length) * 100);
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="font-heading text-base">Lista de entrega</CardTitle>
        <CardDescription>
          {done.length} de {project.checklist.length} itens · salvo neste navegador
        </CardDescription>
        <Progress value={percent} aria-label="Itens da lista de entrega concluídos" className="mt-1" />
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2.5">
          {project.checklist.map((item, index) => {
            const id = `${idPrefix}-${index}`;
            const checked = done.includes(index);
            return (
              <li key={item} className="flex items-start gap-2.5">
                <Checkbox id={id} checked={checked} onCheckedChange={(value) => onToggle(index, value)} className="mt-0.5" />
                <label htmlFor={id} className={`cursor-pointer text-sm leading-snug ${checked ? "text-muted-foreground line-through" : ""}`}>
                  {item}
                </label>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  const GuideIcon = GUIDE_ICONS[guide.id] ?? BookOpen;
  return (
    <a
      href={guidePath(guide.id)}
      className="group flex items-start gap-3 rounded-2xl border bg-card p-4 outline-none transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/40"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <GuideIcon className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-semibold group-hover:text-primary">{guide.titulo}</span>
        <span className="text-sm text-muted-foreground">{guide.resumo}</span>
      </span>
    </a>
  );
}

function Overview({ checklist, invalid }: { checklist: Checklist; invalid: boolean }) {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex max-w-3xl flex-col gap-3">
        <Badge className="self-start">Projetos</Badge>
        <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
          Construa um sistema real para o Instituto Eurofarma
        </h1>
        <p className="text-base text-muted-foreground">
          Em equipe, escolham um desafio, conversem com quem vive a rotina e entreguem uma aplicação
          publicada e explicada. O guia abaixo acompanha cada etapa: da entrevista ao deploy.
        </p>
        {invalid ? (
          <Alert>
            <AlertDescription>Esta página não foi encontrada. Escolha um desafio ou um guia abaixo.</AlertDescription>
          </Alert>
        ) : null}
      </header>

      <section className="flex flex-col gap-4" aria-labelledby="desafios">
        <div>
          <h2 id="desafios" className="font-heading text-xl font-semibold">Escolha um desafio</h2>
          <p className="text-sm text-muted-foreground">Os três têm o mesmo tamanho e os mesmos entregáveis.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {catalog.projetos.map((project) => {
            const percent = percentFor(project, checklist);
            return (
              <a
                key={project.id}
                href={projectPath(project.id)}
                className="group block rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <SpotlightCard
                  theme="light"
                  spotlightColor="var(--primary)"
                  intensity={0.35}
                  className="flex h-full flex-col gap-3 p-5 ring-1 ring-foreground/5"
                >
                  <h3 className="font-heading text-lg leading-snug font-semibold">{project.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{project.resumo}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.pessoas.map((person) => (
                      <Badge variant="outline" key={person}>{person}</Badge>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-col gap-3 pt-2">
                    {percent > 0 ? (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Progress value={percent} aria-label={`Lista de entrega de ${project.titulo}`} className="flex-1" />
                        <span className="tabular-nums">{percent}%</span>
                      </div>
                    ) : null}
                    <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                      Ver desafio <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </SpotlightCard>
              </a>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="guia">
        <div>
          <h2 id="guia" className="font-heading text-xl font-semibold">Guia do projeto</h2>
          <p className="text-sm text-muted-foreground">Vale para os três desafios. Sigam as etapas na ordem.</p>
        </div>
        <ol className="flex flex-col">
          {catalog.etapas.map((stage, index) => {
            const guides = catalog.guias.filter((guide) => guide.etapa === stage.id);
            const last = index === catalog.etapas.length - 1;
            return (
              <li key={stage.id} className="relative flex gap-4 pb-8 last:pb-0">
                {!last ? <span aria-hidden className="absolute top-9 bottom-0 left-[17px] w-px bg-border" /> : null}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-background font-heading text-sm font-semibold">
                  {index + 1}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1.5">
                  <div>
                    <h3 className="font-heading text-base font-semibold">{stage.label}</h3>
                    <p className="text-sm text-muted-foreground">{stage.desc}</p>
                  </div>
                  {guides.length ? (
                    <div className="grid gap-3 lg:grid-cols-2">
                      {guides.map((guide) => (
                        <GuideCard key={guide.id} guide={guide} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Usem o fluxo e as regras validadas na entrevista. A seção “O que a primeira versão deve fazer” de cada desafio é o ponto de partida.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

export function Projects({ hash }: { hash: string }) {
  const [checklist, setChecklist] = useState(readChecklist);
  const rest = hash.replace(/^#\/projetos\/?/, "").replace(/\/$/, "");
  const guideId = rest.startsWith("guia/") ? rest.slice("guia/".length) : undefined;
  const guide = guideId ? catalog.guias.find((item) => item.id === guideId) : undefined;
  const project = !guideId && rest ? catalog.projetos.find((item) => item.id === rest) : undefined;
  const invalid = rest !== "" && !guide && !project;
  const currentId = guide ? `guia/${guide.id}` : project?.id;

  useEffect(() => {
    document.title = `${guide?.titulo ?? project?.titulo ?? "Projetos"} · Apostila interativa`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash]);

  function toggle(target: Project, index: number, checked: boolean) {
    const current = checklist[target.id] ?? [];
    const updated = checked ? [...new Set([...current, index])] : current.filter((item) => item !== index);
    const next = { ...checklist, [target.id]: updated };
    setChecklist(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Keep progress for this session. */ }
    if (checked && updated.length === target.checklist.length) {
      toast.success("Lista de entrega completa", { description: "Revisem o Mapa do sistema antes de apresentar." });
    }
  }

  const guideIndex = guide ? orderedGuides.indexOf(guide) : -1;
  const previousGuide = orderedGuides[guideIndex - 1];
  const nextGuide = orderedGuides[guideIndex + 1];

  const pageTitle = guide?.titulo ?? project?.titulo;
  const breadcrumb = (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        {pageTitle ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={PROJECTS_HOME}>Projetos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block" />
            <BreadcrumbItem className="hidden sm:inline-flex">{guide ? "Guia" : "Desafio"}</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate">{pageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Projetos</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );

  const aside = project ? (
    <ChecklistCard project={project} done={checklist[project.id] ?? []} onToggle={(i, c) => toggle(project, i, c)} idPrefix="aside" />
  ) : undefined;

  return (
    <AppShell area="projetos" sidebar={<ProjectsSidebar currentId={currentId} checklist={checklist} />} breadcrumb={breadcrumb} aside={aside}>
      <AnimatedContent key={hash} trigger="mount" distance={18} duration={0.5} blur={6} ease="power3.out">
        {project ? (
          <article className="mx-auto max-w-3xl">
            <header className="mb-8 flex flex-col gap-3">
              <Badge className="self-start">Desafio</Badge>
              <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">{project.titulo}</h1>
              <p className="text-lg text-muted-foreground">{project.resumo}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                <UsersThree className="size-4 text-muted-foreground" aria-label="Pessoas envolvidas" />
                {project.pessoas.map((person) => (
                  <Badge variant="outline" key={person}>{person}</Badge>
                ))}
              </div>
            </header>
            <div className="mb-10 xl:hidden">
              <ChecklistCard project={project} done={checklist[project.id] ?? []} onToggle={(i, c) => toggle(project, i, c)} idPrefix="inline" />
            </div>
            <LessonMarkdown markdown={sources[`../../projetos/${project.id}.md`]} />
            <footer className="mt-12 flex flex-col gap-4 border-t pt-6">
              <h2 className="font-heading text-lg font-semibold">Comecem pelo guia</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {orderedGuides.slice(0, 2).map((item) => (
                  <GuideCard key={item.id} guide={item} />
                ))}
              </div>
            </footer>
          </article>
        ) : guide ? (
          <article className="mx-auto max-w-3xl">
            <header className="mb-8 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge>Etapa: {stageLabel(guide.etapa)}</Badge>
                <span className="text-sm text-muted-foreground">
                  Guia {guideIndex + 1} de {orderedGuides.length}
                </span>
              </div>
              <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">{guide.titulo}</h1>
              <p className="text-lg text-muted-foreground">{guide.resumo}</p>
            </header>
            <LessonMarkdown markdown={sources[`../../projetos/guia-${guide.id}.md`]} />
            <footer className="mt-12 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-stretch">
              {previousGuide ? (
                <Button variant="outline" size="lg" className="h-auto py-3" nativeButton={false} render={<a href={guidePath(previousGuide.id)} />}>
                  <ArrowLeft data-icon="inline-start" /> Guia anterior
                </Button>
              ) : null}
              {nextGuide ? (
                <Button size="lg" className="h-auto flex-1 justify-between py-3 text-left" nativeButton={false} render={<a href={guidePath(nextGuide.id)} />}>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs font-normal opacity-80">Próximo guia</span>
                    <span className="truncate">{nextGuide.titulo}</span>
                  </span>
                  <ArrowRight data-icon="inline-end" />
                </Button>
              ) : (
                <Button size="lg" className="h-auto flex-1 justify-between py-3 text-left" nativeButton={false} render={<a href={PROJECTS_HOME} />}>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs font-normal opacity-80">Fim do guia</span>
                    <span className="truncate">Voltar aos desafios</span>
                  </span>
                  <ArrowRight data-icon="inline-end" />
                </Button>
              )}
            </footer>
          </article>
        ) : (
          <Overview checklist={checklist} invalid={invalid} />
        )}
      </AnimatedContent>
    </AppShell>
  );
}
