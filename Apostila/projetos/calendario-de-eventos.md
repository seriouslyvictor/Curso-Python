## O desafio

A programação do Instituto se espalha por avisos, grupos e conversas, e muita gente só fica sabendo depois que o evento passou. Desenvolvam um **calendário de eventos** que ajude a comunidade a descobrir o que vai acontecer e permita que os responsáveis mantenham tudo atualizado.

## Investiguem antes de construir

Conversem com organizadores **e** com pessoas que vão consultar a programação: são públicos diferentes, com necessidades diferentes. Comecem pelo guia [Como conduzir a entrevista](#/projetos/guia/entrevista) e usem o [banco de perguntas](#/projetos/guia/perguntas). Pontos específicos deste projeto:

- Como os eventos são organizados e divulgados hoje? Já existe calendário ou planilha?
- Quem consulta a programação e o que precisa encontrar primeiro?
- Quem pode cadastrar, editar e cancelar eventos? Precisa de aprovação?
- Quais dados são necessários: data, horário, local, público, categoria, link de inscrição?
- Todos os eventos são públicos ou alguns são internos?
- Como avisar mudanças de horário, de local e cancelamentos?
- Há inscrições ou limite de vagas? Um link para um formulário existente resolve?

## O que a primeira versão deve fazer

A **Lista de entrega** desta página resume o mínimo e pode ser marcada conforme a equipe avança. Alguns detalhes:

- **Lista por data** já atende à primeira versão. Investiguem se uma visão mensal é realmente necessária antes de construí-la.
- **Consulta pública, edição protegida:** quem consulta não precisa de login; quem edita, sim.
- **Cancelamento visível:** um evento cancelado continua aparecendo, claramente marcado, em vez de sumir.
- **Passados separados dos futuros**, com histórico consultável.

Inscrições, vagas, eventos recorrentes e exportação para agendas são evoluções possíveis. Se o Instituto já usa um formulário de inscrição, talvez baste colocar o link no evento.

## Como verificar a entrega

Na demonstração, mostrem: cadastrar um evento futuro, encontrá-lo na programação, mudar o horário e cancelá-lo. Confiram que o cancelamento fica visível e que eventos encerrados aparecem separados. Testem dados inválidos e uma busca sem resultado. Reiniciem a aplicação para provar que os dados persistem.

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
