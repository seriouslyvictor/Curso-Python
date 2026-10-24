import { chapters, getChapter, type Chapter, type LessonSection } from "@/content";

export const STORAGE_KEY = "apostila-python-progress-v1";

export type CourseProgress = {
  completedSections: string[];
  lastLocation: string;
};

export type RouteState = {
  chapterNumber: number;
  sectionId: string;
};

export type StarterPackage = {
  chapterNumber: number;
  chapterFolder: string;
  zipFilename: string;
  includedFiles: string[];
};

export type StarterManifest = {
  version: number;
  chapters: StarterPackage[];
};

const emptyProgress: CourseProgress = {
  completedSections: [],
  lastLocation: "",
};

export function sectionKey(chapterNumber: number, sectionId: string) {
  return `${chapterNumber}:${sectionId}`;
}

export function pathFor(chapterNumber: number, sectionId: string) {
  return `#/capitulo/${chapterNumber}/${sectionId}`;
}

export function readProgress(): CourseProgress {
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

export function writeProgress(progress: CourseProgress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Progress stays in memory when storage is unavailable.
  }
}

export function routeFromHash(): RouteState | null {
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

export function routeFromSavedProgress(): RouteState {
  const saved = readProgress();
  const savedMatch = saved.lastLocation.match(/^(\d+):(.+)$/);
  if (savedMatch) {
    const chapter = getChapter(Number(savedMatch[1]));
    if (chapter.sections.some((section) => section.id === savedMatch[2])) {
      return { chapterNumber: chapter.number, sectionId: savedMatch[2] };
    }
  }

  return {
    chapterNumber: chapters[0].number,
    sectionId: chapters[0].sections[0].id,
  };
}

// Link back to the chapters view, resuming where the student stopped.
export function chaptersPath() {
  const route = routeFromSavedProgress();
  return pathFor(route.chapterNumber, route.sectionId);
}

export type ChapterStage = {
  label: string;
  sections: LessonSection[];
};

const INTRO_TITLES = [
  "boas-vindas",
  "visão geral do encontro",
  "antes de começar",
  "objetivos de aprendizagem",
  "situação-problema",
];

// Groups a chapter's sections into the four stages shown in the sidebar.
export function chapterStages(chapter: Chapter): ChapterStage[] {
  const conceptStart = Math.max(
    0,
    chapter.sections.findIndex(
      (section) => !INTRO_TITLES.includes(section.title.toLowerCase()),
    ),
  );
  const practiceStart = chapter.sections.findIndex((section) =>
    section.title.toLowerCase().startsWith("prática acompanhada"),
  );
  const reviewStart = chapter.sections.findIndex((section) =>
    section.title.toLowerCase().startsWith("resumo do capítulo"),
  );
  const conceptEnd = practiceStart > -1 ? practiceStart : reviewStart;

  return [
    { label: "Comece aqui", sections: chapter.sections.slice(0, conceptStart) },
    { label: "Conceitos", sections: chapter.sections.slice(conceptStart, conceptEnd) },
    { label: "Prática", sections: chapter.sections.slice(conceptEnd, reviewStart) },
    { label: "Revisão e fechamento", sections: chapter.sections.slice(reviewStart) },
  ].filter((stage) => stage.sections.length > 0);
}
