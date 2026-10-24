import { CaretRight, CheckCircle, Circle, CloudCheck } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Counter from "@/components/Counter";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  courseOutline,
  getChapter,
  lastAvailableChapter,
  TOTAL_COURSE_CHAPTERS,
} from "@/content";
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
}: {
  chapterNumber: number;
  sectionId: string;
  completedSections: string[];
  onNavigate: (chapterNumber: number, sectionId: string) => void;
}) {
  const { setOpenMobile } = useSidebar();
  const chapter = getChapter(chapterNumber);
  const chapterCompleted = chapter.sections.filter((section) =>
    completedSections.includes(sectionKey(chapter.number, section.id)),
  ).length;
  const percentage = Math.round((chapterCompleted / chapter.sections.length) * 100);
  const chapterItems = courseOutline.map((item) => ({
    value: String(item.number),
    label: `${item.number}. ${item.shortTitle}`,
  }));

  function select(nextChapter: number, nextSection: string) {
    onNavigate(nextChapter, nextSection);
    setOpenMobile(false);
  }

  return (
    <>
      <SidebarContent>
        <SidebarGroup className="gap-3">
          <Select
            items={chapterItems}
            value={String(chapter.number)}
            onValueChange={(value) => {
              const next = getChapter(Number(value));
              select(next.number, next.sections[0].id);
            }}
          >
            <SelectTrigger className="w-full" aria-label="Trocar de capítulo">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {courseOutline.map((item) => (
                  <SelectItem
                    key={item.number}
                    value={String(item.number)}
                    disabled={!item.available}
                  >
                    {item.number}. {item.shortTitle}
                    {item.available ? null : (
                      <Badge variant="outline" className="ml-auto">
                        Em produção
                      </Badge>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex flex-col gap-2 rounded-xl border bg-background p-3">
            <span className="text-xs text-muted-foreground">
              Capítulo {chapter.number} de {TOTAL_COURSE_CHAPTERS}
            </span>
            <span className="font-heading text-base leading-tight font-semibold">
              {chapter.shortTitle}
            </span>
            <Progress value={percentage} aria-label={`Progresso do capítulo ${chapter.number}`} />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {chapterCompleted} de {chapter.sections.length} seções
              </span>
              <Counter
                value={percentage}
                suffix="%"
                fontSize={12}
                fontWeight={600}
                intro={false}
                className="text-foreground"
              />
            </div>
          </div>
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
              onSelect={(id) => select(chapter.number, id)}
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
