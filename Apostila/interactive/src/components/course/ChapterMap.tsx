import { Check, Lock, MapTrifold } from "@phosphor-icons/react";
import { cn } from "cn";
import Counter from "@/components/Counter";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { courseOutline, getChapter, TOTAL_COURSE_CHAPTERS } from "@/content";
import { sectionKey } from "@/lib/course";

export type ChapterSummary = {
  number: number;
  shortTitle: string;
  available: boolean;
  completed: number;
  total: number;
  percentage: number;
};

export function chapterSummaries(completedSections: string[]): ChapterSummary[] {
  return courseOutline.map((item) => {
    if (!item.available) {
      return { ...item, completed: 0, total: 0, percentage: 0 };
    }
    const chapter = getChapter(item.number);
    const completed = chapter.sections.filter((section) =>
      completedSections.includes(sectionKey(chapter.number, section.id)),
    ).length;
    return {
      ...item,
      completed,
      total: chapter.sections.length,
      percentage: Math.round((completed / chapter.sections.length) * 100),
    };
  });
}

// Where a chapter link should land: the first section not yet completed.
export function resumeSectionId(chapterNumber: number, completedSections: string[]) {
  const chapter = getChapter(chapterNumber);
  const next = chapter.sections.find(
    (section) => !completedSections.includes(sectionKey(chapter.number, section.id)),
  );
  return (next ?? chapter.sections[0]).id;
}

function statusText(summary: ChapterSummary) {
  if (!summary.available) return "Em produção";
  if (summary.completed === 0) return `${summary.total} seções`;
  if (summary.percentage === 100) return "Concluído";
  return `${summary.completed} de ${summary.total} seções`;
}

function ProgressRing({
  summary,
  current = false,
  size = 36,
}: {
  summary: ChapterSummary;
  current?: boolean;
  size?: number;
}) {
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const done = summary.available && summary.percentage === 100;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-heading text-xs font-semibold tabular-nums",
        !summary.available && "bg-muted text-muted-foreground",
        done && "bg-primary text-primary-foreground",
        current && !done && "text-primary",
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {summary.available && !done ? (
        <svg className="absolute inset-0 size-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - summary.percentage / 100)}
          />
        </svg>
      ) : null}
      {done ? <Check weight="bold" /> : !summary.available ? <Lock /> : summary.number}
    </span>
  );
}

export function ChapterMapTrigger({
  summary,
  onOpen,
}: {
  summary: ChapterSummary;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex flex-col gap-2 rounded-xl border bg-background p-3 text-left transition-colors hover:border-primary/50 hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          Capítulo {summary.number} de {TOTAL_COURSE_CHAPTERS}
        </span>
        <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
          <MapTrifold className="size-3.5" /> Trocar capítulo
        </span>
      </span>
      <span className="font-heading text-base leading-tight font-semibold">
        {summary.shortTitle}
      </span>
      <Progress value={summary.percentage} aria-label={`Progresso do capítulo ${summary.number}`} />
      <span className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {summary.completed} de {summary.total} seções
        </span>
        <Counter
          value={summary.percentage}
          suffix="%"
          fontSize={12}
          fontWeight={600}
          intro={false}
          className="text-foreground"
        />
      </span>
    </button>
  );
}

export function ChapterMapDialog({
  open,
  onOpenChange,
  currentChapter,
  completedSections,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentChapter: number;
  completedSections: string[];
  onSelect: (chapterNumber: number) => void;
}) {
  const summaries = chapterSummaries(completedSections);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Mapa do curso</DialogTitle>
          <DialogDescription>
            Escolha um capítulo. Você continua da primeira seção que ainda não concluiu.
          </DialogDescription>
        </DialogHeader>
        <ol className="grid gap-2 sm:grid-cols-2">
          {summaries.map((summary) => {
            const current = summary.number === currentChapter;
            return (
              <li key={summary.number}>
                <button
                  type="button"
                  disabled={!summary.available}
                  onClick={() => {
                    onSelect(summary.number);
                    onOpenChange(false);
                  }}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                    "hover:border-primary/40 hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-border disabled:hover:bg-transparent",
                    current && "border-primary bg-primary/5 ring-1 ring-primary",
                  )}
                >
                  <ProgressRing summary={summary} current={current} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-sm leading-snug font-medium">{summary.shortTitle}</span>
                    <span className="text-xs text-muted-foreground">{statusText(summary)}</span>
                  </span>
                  {current ? <Badge>Atual</Badge> : null}
                </button>
              </li>
            );
          })}
        </ol>
      </DialogContent>
    </Dialog>
  );
}
