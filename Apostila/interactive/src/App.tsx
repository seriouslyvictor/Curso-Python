import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Bug,
  CaretRight,
  CheckCircle,
  Circle,
  DownloadSimple,
  FileZip,
  Keyboard,
  Lifebuoy,
  Lightbulb,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import AnimatedContent from "@/components/AnimatedContent";
import ClickSpark from "@/components/ClickSpark";
import SpringCheck from "@/components/SpringCheck";
import { AppShell } from "@/components/course/AppShell";
import { ChapterSidebar } from "@/components/course/ChapterSidebar";
import { LessonMarkdown } from "@/components/course/LessonMarkdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Practices } from "@/Practices";
import {
  chapters,
  getChapter,
  lastAvailableChapter,
  type LessonSection,
  TOTAL_COURSE_CHAPTERS,
} from "@/content";
import {
  pathFor,
  readProgress,
  routeFromHash,
  routeFromSavedProgress,
  sectionKey,
  STORAGE_KEY,
  writeProgress,
  type CourseProgress,
  type RouteState,
  type StarterManifest,
  type StarterPackage,
} from "@/lib/course";

function useCourseRoute() {
  const [route, setRoute] = useState<RouteState>(
    () => routeFromHash() ?? routeFromSavedProgress(),
  );

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", pathFor(route.chapterNumber, route.sectionId));
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
    if (window.location.hash === nextPath) {
      setRoute({ chapterNumber, sectionId });
      return;
    }
    window.location.hash = nextPath.slice(1);
  }

  return { route, navigate };
}

function SupportPanel({
  chapterNumber,
  starterPackage,
  onNavigate,
}: {
  chapterNumber: number;
  starterPackage: StarterPackage | null;
  onNavigate: (chapterNumber: number, sectionId: string) => void;
}) {
  const chapter = getChapter(chapterNumber);
  const findSection = (term: string) =>
    chapter.sections.find((section) => section.title.toLowerCase().includes(term));

  const shortcuts = [
    { label: "Revisar objetivos", icon: BookOpenText, section: findSection("objetivos") },
    { label: "Ir para a oficina", icon: Bug, section: findSection("oficina") },
    { label: "Consultar vocabulário", icon: Lifebuoy, section: findSection("vocabulário") },
  ].filter(
    (shortcut): shortcut is typeof shortcut & { section: LessonSection } =>
      Boolean(shortcut.section),
  );

  return (
    <div className="flex flex-col gap-4">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Precisa de ajuda?</CardTitle>
          <CardDescription>Atalhos deste capítulo.</CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            {starterPackage ? (
              <Item size="xs" render={<a href={`/downloads/${starterPackage.zipFilename}`} download />}>
                <ItemMedia>
                  <DownloadSimple className="size-5 text-primary" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Baixar arquivos iniciais</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <FileZip className="size-4 text-muted-foreground" />
                </ItemActions>
              </Item>
            ) : null}
            {shortcuts.map(({ label, icon: Icon, section }) => (
              <Item
                size="xs"
                key={label}
                render={<button type="button" className="cursor-pointer text-left hover:bg-muted" />}
                onClick={() => onNavigate(chapter.number, section.id)}
              >
                <ItemMedia>
                  <Icon className="size-5 text-primary" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{label}</ItemTitle>
                </ItemContent>
                <ItemActions>
                  <CaretRight className="size-4 text-muted-foreground" />
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
      </Card>

      <Alert>
        <Lightbulb weight="duotone" />
        <AlertTitle>Dica de estudo</AlertTitle>
        <AlertDescription>
          Preveja a saída antes de executar. Comparar expectativa e resultado é parte da
          aprendizagem.
        </AlertDescription>
      </Alert>

      <Card size="sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="size-4" /> Atalhos de teclado
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            Seção anterior
            <KbdGroup><Kbd>Alt</Kbd><Kbd>←</Kbd></KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            Próxima seção
            <KbdGroup><Kbd>Alt</Kbd><Kbd>→</Kbd></KbdGroup>
          </div>
          <div className="flex items-center justify-between">
            Buscar
            <KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup>
          </div>
        </CardContent>
      </Card>
    </div>
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
    <Card className="mt-10">
      <CardHeader>
        <Badge variant="secondary" className="mb-1">
          <FileZip data-icon="inline-start" /> Pacote do estudante
        </Badge>
        <CardTitle className="font-heading text-lg">
          Arquivos iniciais do Capítulo {chapterNumber}
        </CardTitle>
        <CardDescription>
          Baixe um único arquivo ZIP com {starterPackage.includedFiles.length} itens. Extraia a
          pasta antes de abrir o projeto no VS Code.
        </CardDescription>
        <CardAction>
          <Button
            nativeButton={false}
            render={<a href={`/downloads/${starterPackage.zipFilename}`} download />}
          >
            <DownloadSimple data-icon="inline-start" />
            Baixar starter
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {starterPackage.includedFiles.map((file) => (
          <Badge variant="outline" key={file}>
            {file}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

function ReflectionCard({ storageId }: { storageId: string }) {
  const reflectionKey = `${STORAGE_KEY}:reflection:${storageId}`;
  const [checked, setChecked] = useState(() => {
    try {
      return window.localStorage.getItem(reflectionKey) === "true";
    } catch {
      return false;
    }
  });

  function toggleReflection(next: boolean) {
    setChecked(next);
    try {
      window.localStorage.setItem(reflectionKey, String(next));
    } catch {
      // Keep the answer for this visit only.
    }
  }

  return (
    <Card className="mt-10">
      <CardHeader>
        <CardDescription className="text-xs font-semibold tracking-wide text-primary uppercase">
          Antes de continuar
        </CardDescription>
        <CardTitle className="font-heading text-lg">Você conferiu sua própria resposta?</CardTitle>
        <CardDescription>
          Tente responder sem executar o código. Depois, use o resultado para verificar seu
          raciocínio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClickSpark sparkColor="var(--primary)" sparkRadius={28} className="inline-block w-auto">
          <SpringCheck
            label="Respondi primeiro e depois conferi."
            checked={checked}
            onChange={toggleReflection}
            color="var(--foreground)"
            fillColor="var(--primary)"
            checkColor="var(--primary-foreground)"
            fontSize={15}
            strike="none"
          />
        </ClickSpark>
      </CardContent>
    </Card>
  );
}

function ChaptersApp() {
  const { route, navigate } = useCourseRoute();
  const [progress, setProgress] = useState<CourseProgress>(() => readProgress());
  const [starterPackage, setStarterPackage] = useState<StarterPackage | null>(null);
  const chapter = getChapter(route.chapterNumber);
  const currentIndex = Math.max(
    0,
    chapter.sections.findIndex((section) => section.id === route.sectionId),
  );
  const currentSection = chapter.sections[currentIndex];
  const currentKey = sectionKey(chapter.number, currentSection.id);
  const isComplete = progress.completedSections.includes(currentKey);

  const allSections = useMemo(
    () =>
      chapters.flatMap((item) =>
        item.sections.map((section) => ({ chapterNumber: item.number, section })),
      ),
    [],
  );
  const absoluteIndex = allSections.findIndex(
    (item) => item.chapterNumber === chapter.number && item.section.id === currentSection.id,
  );
  const previous = allSections[absoluteIndex - 1];
  const next = allSections[absoluteIndex + 1];

  useEffect(() => {
    const nextProgress = { ...progress, lastLocation: currentKey };
    setProgress(nextProgress);
    writeProgress(nextProgress);
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
          manifest.chapters.find((item) => item.chapterNumber === chapter.number) ?? null,
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
    const nextProgress = {
      completedSections: completed,
      lastLocation: next ? sectionKey(next.chapterNumber, next.section.id) : currentKey,
    };
    setProgress(nextProgress);
    writeProgress(nextProgress);

    if (!isComplete) {
      toast.success("Seção concluída", {
        description: next ? `Próxima: ${next.section.title}` : "Você concluiu a prévia do curso.",
      });
    }
    if (next) navigate(next.chapterNumber, next.section.id);
  }

  const showReflection = currentSection.title
    .toLowerCase()
    .includes("verifique seu aprendizado");

  return (
    <AppShell
      area="capitulos"
      sidebar={
        <ChapterSidebar
          chapterNumber={chapter.number}
          sectionId={currentSection.id}
          completedSections={progress.completedSections}
          onNavigate={navigate}
        />
      }
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem className="hidden md:inline-flex">
              Capítulo {chapter.number} de {TOTAL_COURSE_CHAPTERS}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden sm:inline-flex">{chapter.shortTitle}</BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block" />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate">{currentSection.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      aside={
        <SupportPanel
          chapterNumber={chapter.number}
          starterPackage={starterPackage}
          onNavigate={navigate}
        />
      }
    >
      <article className="mx-auto max-w-3xl">
        <AnimatedContent
          key={currentKey}
          trigger="mount"
          distance={18}
          duration={0.5}
          blur={6}
          ease="power3.out"
        >
          <header className="mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge>
                {chapter.number}.{currentIndex + 1}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Seção {currentIndex + 1} de {chapter.sections.length}
              </span>
            </div>
            <h1 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">
              {currentSection.title}
            </h1>
          </header>

          <LessonMarkdown markdown={currentSection.markdown} />

          {currentSection.title.toLowerCase() === "antes de começar" && starterPackage ? (
            <StarterDownloadCard chapterNumber={chapter.number} starterPackage={starterPackage} />
          ) : null}

          {showReflection ? <ReflectionCard storageId={currentKey} /> : null}
        </AnimatedContent>

        <footer className="mt-12 flex flex-col gap-4 border-t pt-6">
          <p className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
            {isComplete ? (
              <>
                <CheckCircle weight="fill" className="size-5 text-primary" />
                Esta seção já está concluída.
              </>
            ) : (
              <>
                <Circle className="size-5" />
                Conclua quando se sentir pronto.
              </>
            )}
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-stretch">
            <Button
              variant="outline"
              size="lg"
              className="h-auto py-3"
              disabled={!previous}
              onClick={() => previous && navigate(previous.chapterNumber, previous.section.id)}
            >
              <ArrowLeft data-icon="inline-start" />
              Voltar
            </Button>
            <Button
              size="lg"
              className="h-auto flex-1 justify-between py-3 text-left"
              onClick={markCompleteAndContinue}
              disabled={!next && isComplete}
            >
              <span className="flex min-w-0 flex-col">
                <span className="text-xs font-normal opacity-80">
                  {next
                    ? isComplete
                      ? "Continuar para"
                      : "Concluir e continuar"
                    : isComplete
                      ? "Fim da prévia"
                      : "Concluir seção"}
                </span>
                <span className="truncate">
                  {next
                    ? next.section.title
                    : isComplete
                      ? `Capítulos 1 a ${lastAvailableChapter} concluídos`
                      : "Concluir e finalizar a prévia"}
                </span>
              </span>
              {next ? <ArrowRight data-icon="inline-end" /> : <CheckCircle data-icon="inline-end" />}
            </Button>
          </div>
          {!next ? (
            <Alert>
              <BookOpenText />
              <AlertDescription>
                Você chegou ao fim do conteúdo disponível nesta prévia. Os capítulos{" "}
                {lastAvailableChapter + 1} a {TOTAL_COURSE_CHAPTERS} ainda estão em produção.
              </AlertDescription>
            </Alert>
          ) : null}
        </footer>
      </article>
    </AppShell>
  );
}

export function App() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <TooltipProvider>
      {/^#\/praticas(?:\/|$)/.test(hash) ? <Practices hash={hash} /> : <ChaptersApp />}
      <Toaster position="bottom-center" richColors />
    </TooltipProvider>
  );
}
