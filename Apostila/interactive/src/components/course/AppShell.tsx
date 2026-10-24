import { BookOpenText, Barbell, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import catalog from "../../../../praticas/catalogo.json";
import { chapters } from "@/content";
import { chaptersPath, pathFor } from "@/lib/course";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CourseArea = "capitulos" | "praticas";

// Accent-insensitive substring match, so "funcao" finds "função".
function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function searchFilter(value: string, search: string) {
  return normalize(value).includes(normalize(search).trim()) ? 1 : 0;
}

function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  function go(hash: string) {
    onOpenChange(false);
    window.location.hash = hash.slice(1);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Buscar na apostila"
      description="Encontre uma seção de capítulo ou uma prática."
    >
      <Command filter={searchFilter}>
        <CommandInput placeholder="Buscar seção ou prática…" />
        <CommandList>
          <CommandEmpty>Nada encontrado com esse termo.</CommandEmpty>
          <CommandGroup heading="Práticas">
            {catalog.challenges.map((challenge) => (
              <CommandItem
                key={challenge.id}
                value={`pratica ${challenge.numero} ${challenge.titulo} ${challenge.conceitos.join(" ")}`}
                onSelect={() => go(`#/praticas/${challenge.id}`)}
              >
                <Barbell />
                <span>
                  {challenge.numero}. {challenge.titulo}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          {chapters.map((chapter) => (
            <CommandGroup
              key={chapter.number}
              heading={`Capítulo ${chapter.number} · ${chapter.shortTitle}`}
            >
              {chapter.sections.map((section, index) => (
                <CommandItem
                  key={section.id}
                  value={`${chapter.number}.${index + 1} ${section.title} ${chapter.shortTitle}`}
                  onSelect={() => go(pathFor(chapter.number, section.id))}
                >
                  <BookOpenText />
                  <span className="truncate">{section.title}</span>
                  <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                    {chapter.number}.{index + 1}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

export function AppShell({
  area,
  sidebar,
  breadcrumb,
  aside,
  children,
}: {
  area: CourseArea;
  sidebar: ReactNode;
  breadcrumb: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, []);

  return (
    <SidebarProvider style={{ "--sidebar-width": "20rem" } as CSSProperties}>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:shadow"
        href="#conteudo"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("conteudo")?.focus();
        }}
      >
        Pular para o conteúdo
      </a>

      <Sidebar>
        <SidebarHeader className="gap-3 px-3 pt-4">
          <div className="flex items-center gap-2.5 px-1">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-primary-foreground">
              Py
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-sm font-semibold">Apostila de Python</span>
              <span className="text-xs text-muted-foreground">Do zero à primeira aplicação</span>
            </div>
          </div>
          <Tabs
            value={area}
            onValueChange={(value) => {
              const target = value === "praticas" ? "#/praticas" : chaptersPath();
              window.location.hash = target.slice(1);
            }}
          >
            <TabsList className="w-full" aria-label="Áreas da apostila">
              <TabsTrigger value="capitulos">
                <BookOpenText />
                Capítulos
              </TabsTrigger>
              <TabsTrigger value="praticas">
                <Barbell />
                Práticas
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </SidebarHeader>
        {sidebar}
      </Sidebar>

      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 self-center data-[orientation=vertical]:h-4" />
          <div className="min-w-0 flex-1">{breadcrumb}</div>
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground"
            onClick={() => setSearchOpen(true)}
          >
            <MagnifyingGlass data-icon="inline-start" />
            <span className="hidden sm:inline">Buscar</span>
            <KbdGroup className="hidden sm:inline-flex">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
        </header>

        <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-8 sm:px-8 lg:py-12">
          <main id="conteudo" tabIndex={-1} className="min-w-0 flex-1 outline-none">
            {children}
          </main>
          {aside ? (
            <aside className="sticky top-24 hidden w-72 shrink-0 self-start xl:block">
              {aside}
            </aside>
          ) : null}
        </div>
      </SidebarInset>

      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </SidebarProvider>
  );
}
