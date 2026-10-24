import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Circle,
  ListBullets,
  VideoCamera,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import catalog from "../../praticas/catalogo.json";
import AnimatedContent from "@/components/AnimatedContent";
import ClickSpark from "@/components/ClickSpark";
import Counter from "@/components/Counter";
import SpotlightCard from "@/components/SpotlightCard";
import SpringCheck from "@/components/SpringCheck";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sources = import.meta.glob("../../praticas/*.md", { eager: true, query: "?raw", import: "default" }) as Record<string, string>;
const STORAGE_KEY = "apostila-python-practices-v1";
const videoSources = import.meta.glob("../../videos/*.mp4", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const practiceVideos = Object.fromEntries(Object.entries(videoSources).map(([path, url]) => [path.match(/video-\d+-(.+)\.mp4$/)?.[1], import.meta.env.PROD ? `/media/${url.split("/").pop()}` : url]));

type Challenge = (typeof catalog.challenges)[number];

const ids = new Set(catalog.challenges.map((challenge) => challenge.id));
function readCompleted(): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? [...new Set<string>(value.filter((id) => typeof id === "string" && ids.has(id)))] : [];
  } catch { return []; }
}

function PracticeVideo({ src, title }: { src: string; title: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  function seek(seconds: number) {
    const player = video.current;
    if (player && Number.isFinite(player.duration)) {
      player.currentTime = Math.max(0, Math.min(player.duration, player.currentTime + seconds));
    }
  }
  return (
    <Card className="mt-10" aria-label={`Vídeo explicativo: ${title}`} role="region">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading text-lg">
          <VideoCamera className="size-5 text-primary" /> Vídeo explicativo
        </CardTitle>
        <CardDescription>
          Confira a explicação desta prática. Use os controles para pausar ou rever um trecho.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <video
          ref={video}
          src={src}
          controls
          playsInline
          preload="metadata"
          aria-label={`Explicação de ${title}`}
          className="aspect-video w-full rounded-xl bg-muted"
          onLoadedMetadata={() => setReady(true)}
          onError={() => setFailed(true)}
        />
        {failed ? (
          <Alert variant="destructive" className="mt-3">
            <AlertDescription>
              Não foi possível carregar o vídeo. <a href={src}>Abrir vídeo diretamente</a>.
            </AlertDescription>
          </Alert>
        ) : null}
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" disabled={!ready || failed} onClick={() => seek(-10)} aria-label="Retroceder 10 segundos">
          <ArrowCounterClockwise data-icon="inline-start" /> 10 s
        </Button>
        <Button variant="outline" size="sm" disabled={!ready || failed} onClick={() => seek(10)} aria-label="Avançar 10 segundos">
          10 s <ArrowClockwise data-icon="inline-end" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function PracticeSidebar({ challenge, completed }: { challenge?: Challenge; completed: string[] }) {
  const { setOpenMobile } = useSidebar();
  const percentage = Math.round((completed.length / catalog.challenges.length) * 100);
  const close = () => setOpenMobile(false);

  return (
    <SidebarContent>
      <SidebarGroup>
        <div className="flex flex-col gap-2 rounded-xl border bg-background p-3">
          <span className="text-xs text-muted-foreground">Aprenda fazendo</span>
          <span className="font-heading text-base leading-tight font-semibold">Práticas de Python</span>
          <Progress value={percentage} aria-label="Práticas concluídas" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {completed.length} de {catalog.challenges.length} concluídas
            </span>
            <Counter value={percentage} suffix="%" fontSize={12} fontWeight={600} intro={false} className="text-foreground" />
          </div>
        </div>
      </SidebarGroup>

      <nav aria-label="Lista de práticas">
        <SidebarGroup className="py-1">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={!challenge} render={<a href="#/praticas" onClick={close} />}>
                <ListBullets />
                Todas as práticas
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {catalog.phases.map((group) => (
          <SidebarGroup key={group.id} className="py-1">
            <SidebarGroupLabel className="text-xs font-semibold tracking-wide uppercase">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {catalog.challenges
                  .filter((item) => item.fase === group.id)
                  .map((item) => {
                    const done = completed.includes(item.id);
                    const current = challenge?.id === item.id;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={current}
                          aria-current={current ? "page" : undefined}
                          render={<a href={`#/praticas/${item.id}`} onClick={close} />}
                        >
                          {done ? (
                            <CheckCircle weight="fill" className="text-primary" aria-label="Concluída" />
                          ) : (
                            <Circle className="text-muted-foreground" aria-hidden />
                          )}
                          <span className="truncate">
                            {item.numero}. {item.titulo}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </nav>
    </SidebarContent>
  );
}

function PracticeCard({ item, done }: { item: Challenge; done: boolean }) {
  return (
    <a href={`#/praticas/${item.id}`} className="group block rounded-3xl outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
      <SpotlightCard
        theme="light"
        spotlightColor="var(--primary)"
        intensity={0.35}
        className="flex h-full flex-col gap-3 p-5 ring-1 ring-foreground/5"
      >
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{item.tema}</Badge>
          {done ? (
            <Badge variant="outline">
              <CheckCircle weight="fill" data-icon="inline-start" className="text-primary" /> Concluída
            </Badge>
          ) : null}
        </div>
        <h3 className="font-heading text-base leading-snug font-semibold">
          {item.numero}. {item.titulo}
        </h3>
        <p className="text-sm text-muted-foreground">{item.conceitos.join(" · ")}</p>
        <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
          Abrir prática <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </SpotlightCard>
    </a>
  );
}

export function Practices({ hash }: { hash: string }) {
  const [completed, setCompleted] = useState(readCompleted);
  const [phase, setPhase] = useState("");
  const requestedId = hash.slice("#/praticas/".length);
  const challenge = catalog.challenges.find((item) => item.id === requestedId);
  const invalid = hash !== "#/praticas" && hash !== "#/praticas/" && !challenge;
  const activePhase = catalog.phases.find((item) => item.id === challenge?.fase);
  const index = challenge ? catalog.challenges.indexOf(challenge) : -1;
  const previous = catalog.challenges[index - 1];
  const next = catalog.challenges[index + 1];

  useEffect(() => {
    document.title = `${challenge?.titulo ?? "Práticas de Python"} · Apostila interativa`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash]);

  function setComplete(id: string, done: boolean) {
    const updated = done ? [...new Set([...completed, id])] : completed.filter((item) => item !== id);
    setCompleted(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* Keep progress for this session. */ }
    if (done) toast.success("Prática concluída", { description: next ? `Próxima: ${next.titulo}` : "Você concluiu todas as práticas da lista." });
  }

  return (
    <AppShell
      area="praticas"
      sidebar={<PracticeSidebar challenge={challenge} completed={completed} />}
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            {challenge ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#/praticas">Práticas</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem className="hidden sm:inline-flex">{activePhase?.label}</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="truncate">{challenge.titulo}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>Práticas</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      }
    >
      <AnimatedContent key={hash} trigger="mount" distance={18} duration={0.5} blur={6} ease="power3.out">
        {challenge ? (
          <article className="mx-auto max-w-3xl">
            <header className="mb-8 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Badge>{activePhase?.label}</Badge>
                <span className="text-sm text-muted-foreground">
                  Prática {index + 1} de {catalog.challenges.length}
                </span>
              </div>
              <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
                {challenge.titulo}
              </h1>
              <div className="flex flex-wrap gap-1.5">
                {challenge.conceitos.map((concept) => (
                  <Badge variant="outline" key={concept}>{concept}</Badge>
                ))}
              </div>
            </header>

            <LessonMarkdown markdown={sources[`../../praticas/${challenge.id}.md`]} />
            {practiceVideos[challenge.id] ? (
              <PracticeVideo key={challenge.id} src={practiceVideos[challenge.id]} title={challenge.titulo} />
            ) : null}

            <footer className="mt-12 flex flex-col gap-5 border-t pt-6">
              <ClickSpark sparkColor="var(--primary)" sparkRadius={28} className="inline-block w-auto self-start">
                <SpringCheck
                  label={completed.includes(challenge.id) ? "Prática concluída" : "Marcar como concluída"}
                  checked={completed.includes(challenge.id)}
                  onChange={(done) => setComplete(challenge.id, done)}
                  color="var(--foreground)"
                  fillColor="var(--primary)"
                  checkColor="var(--primary-foreground)"
                  fontSize={15}
                  strike="none"
                />
              </ClickSpark>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-stretch">
                {previous ? (
                  <Button variant="outline" size="lg" className="h-auto py-3" nativeButton={false} render={<a href={`#/praticas/${previous.id}`} />}>
                    <ArrowLeft data-icon="inline-start" /> Prática anterior
                  </Button>
                ) : null}
                {next ? (
                  <Button size="lg" className="h-auto flex-1 justify-between py-3 text-left" nativeButton={false} render={<a href={`#/praticas/${next.id}`} />}>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs font-normal opacity-80">Próxima prática</span>
                      <span className="truncate">{next.titulo}</span>
                    </span>
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                ) : null}
              </div>
            </footer>
          </article>
        ) : (
          <div className="flex flex-col gap-8">
            <header className="flex max-w-3xl flex-col gap-3">
              <Badge className="self-start">Práticas</Badge>
              <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                Pratique no seu ritmo
              </h1>
              <p className="text-base text-muted-foreground">
                Escolha uma atividade sem depender do avanço nos capítulos. Copie os dados, resolva
                na sua IDE e compare com a saída esperada. Abra as dicas conforme precisar. Os dados
                simulam respostas de APIs e já estão prontos para usar; seu progresso fica salvo
                neste navegador.
              </p>
              {invalid ? (
                <Alert>
                  <AlertDescription>Esta prática não foi encontrada. Escolha uma das atividades abaixo.</AlertDescription>
                </Alert>
              ) : null}
            </header>

            <ToggleGroup
              aria-label="Filtrar por grupo"
              variant="outline"
              size="sm"
              className="flex-wrap"
              value={[phase || "todas"]}
              onValueChange={(value) => {
                const selected = value[0];
                setPhase(!selected || selected === "todas" ? "" : selected);
              }}
            >
              <ToggleGroupItem value="todas">Todas ({catalog.challenges.length})</ToggleGroupItem>
              {catalog.phases.map((group) => (
                <ToggleGroupItem key={group.id} value={group.id}>
                  {group.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            {catalog.phases
              .filter((group) => !phase || group.id === phase)
              .map((group) => (
                <section key={group.id} className="flex flex-col gap-4">
                  <div>
                    <h2 className="font-heading text-xl font-semibold">{group.label}</h2>
                    <p className="text-sm text-muted-foreground">{group.desc}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {catalog.challenges
                      .filter((item) => item.fase === group.id)
                      .map((item) => (
                        <PracticeCard key={item.id} item={item} done={completed.includes(item.id)} />
                      ))}
                  </div>
                </section>
              ))}
          </div>
        )}
      </AnimatedContent>
    </AppShell>
  );
}
