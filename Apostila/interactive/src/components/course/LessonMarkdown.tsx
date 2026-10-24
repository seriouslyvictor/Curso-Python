import {
  BookOpenText,
  Brain,
  Bug,
  CaretDown,
  Check,
  Coffee,
  Copy,
  Image as ImageIcon,
  Lifebuoy,
  Lightbulb,
  ShieldCheck,
  WarningCircle,
  type Icon,
} from "@phosphor-icons/react";
import {
  Children,
  isValidElement,
  useState,
  type ReactNode,
} from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

function CodeBlock({ children }: { children?: ReactNode }) {
  const child = Children.toArray(children)[0] as
    | { props?: { children?: ReactNode; className?: string } }
    | undefined;
  const code = String(child?.props?.children ?? "").replace(/\n$/, "");
  const language = child?.props?.className?.replace("language-", "") ?? "text";
  const label = CODE_LABELS[language] ?? "Saída";
  const canCopy = COPYABLE_LANGUAGES.has(language);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="code-block" data-language={language}>
      <div className="code-toolbar">
        <Badge variant={language === "text" ? "outline" : "secondary"}>{label}</Badge>
        {canCopy ? (
          <Button variant="ghost" size="sm" onClick={copyCode} aria-live="polite">
            {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
            {copied ? "Copiado" : "Copiar"}
          </Button>
        ) : null}
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Caixas didáticas: o texto (PLANO_CONTEUDO.md §5) usa rótulos em negrito
// distintos. Detectamos o rótulo para dar ícone e cor próprios a cada tipo,
// em vez de achatar tudo em um único estilo.
type CalloutVariant = { name: string; Icon: Icon };

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

function collectText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectText).join("");
  if (isValidElement(node)) {
    return collectText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
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

function calloutVariantFor(children: ReactNode): CalloutVariant {
  const label = firstStrongText(children);
  if (!label) return DEFAULT_CALLOUT;
  return CALLOUT_VARIANTS[normalizeLabel(label)] ?? DEFAULT_CALLOUT;
}

function Hint({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  return (
    <Collapsible className="hint">
      <CollapsibleTrigger render={<button type="button" className="hint-trigger" />}>
        <Lifebuoy aria-hidden />
        <span>{summary}</span>
        <CaretDown className="hint-caret" aria-hidden />
      </CollapsibleTrigger>
      <CollapsibleContent className="hint-content">{children}</CollapsibleContent>
    </Collapsible>
  );
}

export function LessonMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="lesson-prose">
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
              <Alert role="note" className="callout" data-callout={variant.name}>
                <Icon weight="duotone" aria-hidden />
                <div className="callout-body">{children}</div>
              </Alert>
            );
          },
          a({ href = "", children, ...props }) {
            const isExternal = /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...props}
                {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="table-frame">
                <Table>{children}</Table>
              </div>
            );
          },
          thead: ({ children }) => <TableHeader>{children}</TableHeader>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          tr: ({ children }) => <TableRow>{children}</TableRow>,
          th: ({ children }) => <TableHead>{children}</TableHead>,
          td: ({ children }) => <TableCell>{children}</TableCell>,
          // <details> becomes a Collapsible; its <summary> child is the trigger.
          details({ children }) {
            const parts = Children.toArray(children);
            const summaryIndex = parts.findIndex(
              (part) => isValidElement(part) && part.type === "summary",
            );
            const summary =
              summaryIndex > -1
                ? (parts[summaryIndex] as { props: { children?: ReactNode } }).props.children
                : "Ver dica";
            const body = parts.filter((_, index) => index !== summaryIndex);
            return <Hint summary={summary}>{body}</Hint>;
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
