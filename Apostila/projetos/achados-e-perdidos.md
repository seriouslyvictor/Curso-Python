## O desafio

Hoje, quando alguém esquece um objeto no Instituto, encontrá-lo depende da memória de quem estava na recepção. Desenvolvam um sistema de **achados e perdidos** que registre os objetos encontrados, ajude a localizá-los e controle a devolução para a pessoa certa.

## Investiguem antes de construir

Conversem com quem cuida dessa rotina antes de escrever código. Comecem pelo guia [Como conduzir a entrevista](#/projetos/guia/entrevista) e usem o [banco de perguntas](#/projetos/guia/perguntas). Pontos específicos deste projeto:

- Como os objetos são recebidos e guardados hoje? Quem participa?
- Que informações identificam um objeto e ajudam a encontrá-lo depois? (Descrição, cor, local onde foi achado, foto?)
- Quem pode cadastrar, consultar e alterar registros? Quem perdeu o objeto pode consultar sozinho?
- Como confirmar que a pessoa que veio buscar é a dona? O que registrar na devolução?
- O que acontece com itens não retirados depois de um tempo? E com documentos e objetos de valor?
- Como corrigir um registro ou uma devolução feita por engano?

## O que a primeira versão deve fazer

A **Lista de entrega** desta página resume o mínimo e pode ser marcada conforme a equipe avança. Alguns detalhes:

- **Cadastro** com informação suficiente para identificar o objeto e saber onde ele está guardado.
- **Busca e filtros** pelos critérios combinados com a instituição (por exemplo: categoria, data, situação).
- **Devolução** registrada uma única vez: o sistema deve impedir a devolução de um objeto já devolvido.
- **Histórico** que separa objetos guardados de devolvidos.

Fotos, avisos automáticos e descarte programado são opcionais e dependem do que vocês descobrirem.

> **Dica**
> Objetos perdidos podem envolver dados pessoais (documentos, crachás). Perguntem desde a primeira conversa o que pode ficar visível e para quem.

## Como verificar a entrega

Na demonstração, mostrem: cadastrar um objeto, encontrá-lo pela busca, registrar a devolução e localizá-lo no histórico. Reiniciem a aplicação para provar que os dados persistem. Mostrem também o que acontece com dados inválidos e com uma tentativa de devolver o mesmo objeto duas vezes.

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
