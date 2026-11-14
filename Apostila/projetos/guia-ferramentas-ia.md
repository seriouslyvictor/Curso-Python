Ferramentas de IA para programar são **permitidas e recomendadas** nos projetos. Elas aceleram muito o trabalho, mas também facilitam entregar um sistema que ninguém da equipe entende. Este guia apresenta as principais opções e o combinado mínimo para usá-las bem.

## O combinado: entender o sistema, não cada linha

Não esperamos que a equipe revise cada linha gerada pela IA. Esperamos que **todos saibam explicar como o sistema funciona**:

- **Rotas:** quais páginas e endereços existem e o que cada um faz.
- **Dados:** onde ficam, quais são as tabelas e como se relacionam.
- **Acesso:** o que é público, o que exige login e onde ficam os segredos.
- **Dependências:** o que foi instalado, por quê, e o que isso muda no deploy.

Esse entendimento é registrado no [Mapa do sistema](#/projetos/guia/mapa-do-sistema) e cobrado na apresentação. Se a IA criou uma rota que ninguém sabe para que serve, ela não deveria estar lá.

## As ferramentas

Todas funcionam com Python e Flask. A diferença principal é **onde** você trabalha: dentro de um editor visual ou no terminal.

### Editores com IA integrada

| Ferramenta | O que é | Bom para |
| --- | --- | --- |
| **[Antigravity](https://antigravity.google/)** | Editor do Google, baseado no VS Code, centrado em agentes que planejam e executam tarefas | Quem quer delegar tarefas inteiras e acompanhar o plano do agente |
| **[Cursor](https://cursor.com/)** | Editor baseado no VS Code com chat, autocompletar e modo agente | Quem já usa VS Code e quer a transição mais suave |

Como os dois são baseados no VS Code, atalhos, extensões e o terminal integrado funcionam como no curso.

### Agentes no terminal

| Ferramenta | O que é | Bom para |
| --- | --- | --- |
| **[Claude Code](https://www.anthropic.com/claude-code)** | Agente da Anthropic que lê o projeto, edita arquivos e roda comandos | Tarefas com vários arquivos e investigação de erros |
| **[Codex CLI](https://github.com/openai/codex)** | Agente de código da OpenAI no terminal | Quem já usa ChatGPT e quer trazê-lo para o projeto |
| **[OpenCode](https://opencode.ai/)** | Agente de código aberto que funciona com vários provedores de modelo | Quem quer flexibilidade para escolher ou trocar de modelo |

Agentes de terminal funcionam com qualquer editor: deixem o VS Code aberto para ver as mudanças e usem o agente no terminal ao lado.

> **Atenção**
> Planos, limites gratuitos e preços mudam com frequência. Confiram o site de cada ferramenta antes de escolher, e verifiquem se há benefícios para estudantes.

## Como pedir bem

A qualidade do resultado depende muito do pedido. Compare:

```text
Ruim:  faz um sistema de biblioteca

Bom:   Projeto Flask + SQLite (veja app.py e schema.sql).
       Crie a rota POST /emprestimos que registra um empréstimo.
       Regras: só emprestar se houver exemplar disponível;
       prazo de 14 dias; mostrar mensagem de erro clara se não houver.
       Não adicione bibliotecas novas. Explique o que mudou.
```

Hábitos que ajudam:

- **Uma tarefa por vez.** "Crie a rota de devolução" funciona melhor que "termine o sistema".
- **Diga a stack e as restrições:** Flask, SQLite, sem novas dependências, SQL com `?`.
- **Cole as regras validadas na entrevista.** A IA não conhece a rotina do Instituto; vocês conhecem.
- **Peça explicação:** "Explique em poucas linhas o que esta rota faz e quais tabelas ela usa." A resposta já ajuda a montar o Mapa do sistema.
- **Peça para listar riscos:** "Que rotas alteram dados sem exigir login?"

## Cuidados

- **Commits pequenos e frequentes.** Antes de pedir uma mudança grande, façam commit. Se a IA bagunçar o projeto, basta voltar.
- **Desconfiem de dependências novas.** Se a IA adicionar um pacote, perguntem se ele é necessário e se funciona no PythonAnywhere.
- **Nunca colem segredos** (senhas, chaves de API, dados reais) no chat da ferramenta.
- **Testem o fluxo de verdade.** "A IA disse que funciona" não é teste: abram a aplicação e façam o cadastro, a busca e o erro.
- **Atenção ao que é protegido.** É comum a IA criar uma rota de edição sem conferir login. Revisem toda rota que altera dados.

> **Segurança**
> Peça à ferramenta: "Liste todas as rotas, o método HTTP de cada uma e se exigem login." Confira a lista com o Mapa do sistema. Essa é a revisão de segurança mais valiosa que a equipe pode fazer em 5 minutos.
