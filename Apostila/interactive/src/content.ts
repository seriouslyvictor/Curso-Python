import chapter01Raw from "../../01_primeiros_passos/capitulo.md?raw";
import chapter02Raw from "../../02_variaveis_e_entrada/capitulo.md?raw";
import chapter03Raw from "../../03_tipos_e_calculos/capitulo.md?raw";
import chapter04Raw from "../../04_condicionais_e_validacao/capitulo.md?raw";
import chapter05Raw from "../../05_listas_e_colecoes/capitulo.md?raw";
import chapter06Raw from "../../06_lacos_e_processamento/capitulo.md?raw";
import chapter07Raw from "../../07_funcoes_e_decomposicao/capitulo.md?raw";
import chapter08Raw from "../../08_dicionarios_e_registros/capitulo.md?raw";
import chapter09Raw from "../../09_modulos_e_organizacao/capitulo.md?raw";
import chapter10Raw from "../../10_arquivos_e_json/capitulo.md?raw";
import chapter11Raw from "../../11_excecoes_e_depuracao/capitulo.md?raw";
import chapter12Raw from "../../12_objetos_estado_comportamento/capitulo.md?raw";
import chapter13Raw from "../../13_conversando_com_llms/capitulo.md?raw";

export type LessonSection = {
  id: string;
  title: string;
  markdown: string;
};

export type Chapter = {
  number: number;
  title: string;
  shortTitle: string;
  raw: string;
  sections: LessonSection[];
};

function plainText(value: string) {
  return value.replace(/[`*_]/g, "").trim();
}

function slugify(value: string) {
  return plainText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseChapter(
  number: number,
  shortTitle: string,
  raw: string,
): Chapter {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const lines = normalized.split("\n");
  const documentTitle = plainText(lines[0].replace(/^#\s+/, ""));
  const sections: LessonSection[] = [];
  let currentTitle = "Boas-vindas";
  let currentLines: string[] = [];

  function commitSection() {
    const markdown = currentLines.join("\n").trim();
    if (!markdown) return;

    const baseId = slugify(currentTitle) || `secao-${sections.length + 1}`;
    const duplicateCount = sections.filter((section) =>
      section.id.startsWith(baseId),
    ).length;

    sections.push({
      id: duplicateCount ? `${baseId}-${duplicateCount + 1}` : baseId,
      title: plainText(currentTitle),
      markdown,
    });
  }

  for (const line of lines.slice(1)) {
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      commitSection();
      currentTitle = sectionMatch[1];
      currentLines = [];
      continue;
    }

    currentLines.push(line);
  }

  commitSection();

  return {
    number,
    title: documentTitle,
    shortTitle,
    raw: normalized,
    sections,
  };
}

export const chapters: Chapter[] = [
  parseChapter(1, "Primeiros passos", chapter01Raw),
  parseChapter(2, "Variáveis, textos, entrada e saída", chapter02Raw),
  parseChapter(3, "Tipos de dados, conversões e cálculos", chapter03Raw),
  parseChapter(4, "Decisões e regras de validação", chapter04Raw),
  parseChapter(5, "Listas e coleções ordenadas", chapter05Raw),
  parseChapter(6, "Laços e processamento repetido", chapter06Raw),
  parseChapter(7, "Funções e decomposição de problemas", chapter07Raw),
  parseChapter(8, "Dicionários e registros estruturados", chapter08Raw),
  parseChapter(9, "Módulos e organização em arquivos", chapter09Raw),
  parseChapter(10, "Arquivos de texto e JSON", chapter10Raw),
  parseChapter(11, "Validação, exceções e depuração", chapter11Raw),
  parseChapter(12, "Objetos: dados e comportamento", chapter12Raw),
  parseChapter(13, "Conversando com um modelo de linguagem", chapter13Raw),
];

export function getChapter(number: number) {
  return chapters.find((chapter) => chapter.number === number) ?? chapters[0];
}

// O curso completo tem 16 capítulos (ver Apostila/PLANO_CONTEUDO.md).
// Esta versão interativa entrega os capítulos disponíveis abaixo; os demais
// estão em produção. A interface reflete esse estado de forma intencional.
export const TOTAL_COURSE_CHAPTERS = 16;

const plannedTitles: Record<number, string> = {
  1: "Primeiros passos",
  2: "Variáveis, textos, entrada e saída",
  3: "Tipos de dados, conversões e cálculos",
  4: "Decisões e regras de validação",
  5: "Listas e coleções ordenadas",
  6: "Laços e processamento repetido",
  7: "Funções e decomposição de problemas",
  8: "Dicionários e registros estruturados",
  9: "Módulos e organização em arquivos",
  10: "Arquivos de texto e JSON",
  11: "Validação, exceções e depuração",
  12: "Objetos: dados e comportamento",
  13: "Conversando com um modelo de linguagem",
  14: "Organizando uma aplicação com objetos",
  15: "Construindo uma interface com Streamlit",
  16: "Concluir e publicar a aplicação",
};

export type OutlineEntry = {
  number: number;
  shortTitle: string;
  available: boolean;
};

export const courseOutline: OutlineEntry[] = Array.from(
  { length: TOTAL_COURSE_CHAPTERS },
  (_, index) => {
    const number = index + 1;
    const built = chapters.find((chapter) => chapter.number === number);
    return {
      number,
      shortTitle: built?.shortTitle ?? plannedTitles[number] ?? `Capítulo ${number}`,
      available: Boolean(built),
    };
  },
);

export function isChapterAvailable(number: number) {
  return chapters.some((chapter) => chapter.number === number);
}

export const lastAvailableChapter = chapters[chapters.length - 1].number;
