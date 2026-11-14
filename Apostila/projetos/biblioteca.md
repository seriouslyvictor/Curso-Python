## O desafio

A biblioteca do Instituto precisa saber quais livros tem, quantos exemplares estão disponíveis e quem está com cada um. Desenvolvam um sistema que organize o **acervo** e acompanhe **empréstimos, devoluções e atrasos**.

## Investiguem antes de construir

Conversem com os responsáveis pela biblioteca. Comecem pelo guia [Como conduzir a entrevista](#/projetos/guia/entrevista) e usem o [banco de perguntas](#/projetos/guia/perguntas). Pontos específicos deste projeto:

- Como os livros são cadastrados e consultados hoje? Já existe planilha ou catálogo?
- O que identifica uma obra e cada exemplar? Há livros com várias cópias?
- Quem pode pegar livros emprestados? Que dados dessas pessoas são realmente necessários?
- Qual é o prazo de empréstimo? Pode renovar? Há limite de livros por pessoa?
- O que acontece em caso de atraso, perda ou dano?
- Quem vai usar o sistema: só a equipe da biblioteca ou também os leitores?

## O que a primeira versão deve fazer

A **Lista de entrega** desta página resume o mínimo e pode ser marcada conforme a equipe avança. Alguns detalhes:

- **Obra e exemplar são coisas diferentes:** um livro pode ter três cópias, e cada empréstimo usa uma cópia.
- **Disponibilidade sempre correta:** emprestar diminui e devolver aumenta. O sistema bloqueia empréstimo sem cópia disponível e devolução repetida.
- **Atrasos** calculados pelas regras que a biblioteca validar.

Comecem com uma amostra pequena do acervo: cadastrar todos os livros não deve travar o desenvolvimento.

### Preparação do acervo

Se já existir uma planilha, avaliem importar os dados com um script Python em vez de digitar tudo. O script pode conferir campos obrigatórios, sinalizar possíveis duplicatas e preparar o arquivo para importação. Registros duvidosos devem ser marcados para revisão, não descartados.

Reservas, multas e notificações podem ser propostas como evoluções, se a biblioteca precisar delas.

## Como verificar a entrega

Na demonstração, mostrem: cadastrar e buscar um livro e um leitor, fazer um empréstimo e a devolução, conferindo a disponibilidade antes e depois. Listem os empréstimos em aberto. Tentem emprestar um livro indisponível e devolver o mesmo empréstimo duas vezes. Reiniciem a aplicação para provar que os dados persistem.

## Design system

Criem um design system simples, coerente com a identidade do Instituto Eurofarma, e usem-no em todas as telas. Consultem o [site oficial do Instituto](https://www.institutoeurofarma.org.br/), peçam os materiais de marca disponíveis e validem a proposta visual com um representante.

O guia visual deve mostrar cores, tipografia, espaçamentos e os componentes usados (botões, campos, filtros, mensagens), incluindo os estados de **sucesso**, **erro** e **nenhum resultado**. Garantam contraste adequado e rótulos claros em todos os campos.

## Tecnologia e publicação

A stack recomendada é **Flask + SQLite**, publicada no **PythonAnywhere**. Outra escolha é aceita se a equipe justificar e conseguir publicar.

- [Stack recomendada](#/projetos/guia/stack): estrutura de pastas, dependências e quando considerar Django.
- [Publicar no PythonAnywhere](#/projetos/guia/deploy): passo a passo e erros comuns.
- [Ferramentas de IA](#/projetos/guia/ferramentas-ia): podem e devem ser usadas, desde que a equipe entenda o sistema que entregou.

## Entregáveis

1. **Requisitos:** problema, pessoas envolvidas, fluxo atual, regras, prioridades e decisões validadas (incluindo as notas das entrevistas).
2. **Protótipo e design system:** telas propostas e guia visual com exemplos dos componentes.
3. **Aplicação publicada:** link funcionando no PythonAnywhere com as funcionalidades essenciais.
4. **Código-fonte:** repositório organizado com `README.md`, `requirements.txt` e instruções para rodar localmente.
5. **[Mapa do sistema](#/projetos/guia/mapa-do-sistema):** rotas, dados, o que é protegido, dependências e notas de deploy.
6. **Testes:** cenários testados, resultados, problemas encontrados e correções.
7. **Manual de uso:** instruções curtas, com capturas de tela, para quem vai usar no dia a dia.
8. **Apresentação:** demonstração do fluxo completo, justificativa das escolhas, feedback recebido e próximos passos.

> **Segurança**
> Usem apenas dados fictícios no desenvolvimento e nos testes. Antes de qualquer dado real, combinem com a instituição quem terá acesso, onde o sistema ficará hospedado e como os dados serão protegidos e copiados.
