import { CaretRight, CheckCircle, Circle, CloudCheck } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ChapterMapTrigger, chapterSummaries } from "@/components/course/ChapterMap";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { getChapter, lastAvailableChapter } from "@/content";
import { chapterStages, sectionKey, type ChapterStage } from "@/lib/course";

function StageGroup({
  stage,
  chapterNumber,
  sectionId,
  completedSections,
  sectionIndex,
  onSelect,
}: {
  stage: ChapterStage;
  chapterNumber: number;
  sectionId: string;
  completedSections: string[];
  sectionIndex: (id: string) => number;
  onSelect: (sectionId: string) => void;
}) {
  const containsCurrent = stage.sections.some((section) => section.id === sectionId);
  const [open, setOpen] = useState(containsCurrent);
  const completed = stage.sections.filter((section) =>
    completedSections.includes(sectionKey(chapterNumber, section.id)),
  ).length;

  useEffect(() => {
    if (containsCurrent) setOpen(true);
  }, [containsCurrent]);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="group/stage">
      <SidebarGroup className="py-1">
        <SidebarGroupLabel
          render={<CollapsibleTrigger />}
          className="w-full cursor-pointer gap-2 text-xs font-semibold tracking-wide uppercase hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {stage.label}
          <span className="ml-auto tabular-nums">
            {completed}/{stage.sections.length}
          </span>
          <CaretRight className="transition-transform group-data-[open]/stage:rotate-90" />
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {stage.sections.map((section) => {
                const complete = completedSections.includes(
                  sectionKey(chapterNumber, section.id),
                );
                const current = section.id === sectionId;
                return (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton
                      isActive={current}
                      aria-current={current ? "step" : undefined}
                      onClick={() => onSelect(section.id)}
                      className="h-auto min-h-9 items-start py-2 [&>span:last-child]:whitespace-normal [&>svg]:mt-0.5"
                    >
                      {complete ? (
                        <CheckCircle weight="fill" className="text-primary" aria-label="Concluída" />
                      ) : (
                        <Circle className="text-muted-foreground" aria-hidden />
                      )}
                      <span className="mt-px w-8 shrink-0 text-xs text-muted-foreground tabular-nums">
                        {chapterNumber}.{sectionIndex(section.id) + 1}
                      </span>
                      <span className="leading-snug">{section.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

export function ChapterSidebar({
  chapterNumber,
  sectionId,
  completedSections,
  onNavigate,
  onOpenMap,
}: {
  chapterNumber: number;
  sectionId: string;
  completedSections: string[];
  onNavigate: (chapterNumber: number, sectionId: string) => void;
  onOpenMap: () => void;
}) {
  const { setOpenMobile } = useSidebar();
  const chapter = getChapter(chapterNumber);
  const summary = chapterSummaries(completedSections)[chapterNumber - 1];

  function select(nextSection: string) {
    onNavigate(chapter.number, nextSection);
    setOpenMobile(false);
  }

  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <ChapterMapTrigger
            summary={summary}
            onOpen={() => {
              setOpenMobile(false);
              onOpenMap();
            }}
          />
        </SidebarGroup>

        <nav aria-label="Seções do capítulo">
          {chapterStages(chapter).map((stage) => (
            <StageGroup
              key={`${chapter.number}:${stage.label}`}
              stage={stage}
              chapterNumber={chapter.number}
              sectionId={sectionId}
              completedSections={completedSections}
              sectionIndex={(id) => chapter.sections.findIndex((item) => item.id === id)}
              onSelect={select}
            />
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="flex items-center gap-3 px-2 py-1 text-xs text-muted-foreground">
          <CloudCheck weight="duotone" className="size-5 text-primary" aria-hidden />
          <span>
            Progresso salvo neste dispositivo · capítulos 1 a {lastAvailableChapter} disponíveis
          </span>
        </div>
      </SidebarFooter>
    </>
  );
}
