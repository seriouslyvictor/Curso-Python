# Apostila de Python — Plano de Conteúdo

## 1. Propósito

Esta apostila reorganiza e atualiza os conceitos presentes em `Licoes/` para um curso introdutório de Python com 64 horas agendadas. O material será autocontido, adequado a pessoas que nunca programaram e estruturado em Markdown para permitir reaproveitamento posterior por diferentes ferramentas e LLMs.

O curso não será uma introdução genérica a todas as possibilidades de Python. Seu objetivo é construir uma base segura, chegar a uma orientação a objetos simples e natural em Python e concluir com uma aplicação de inventário usando Streamlit.

### Público-alvo

- Pessoas sem experiência anterior em programação.
- Estudantes que sabem usar funções básicas do Windows, mas podem não compreender pastas de projeto, extensões, terminal, PATH ou interpretadores.
- Pessoas interessadas em Python como primeira linguagem.

### Resultados esperados

Ao concluir o curso, o estudante deverá conseguir:

- preparar e verificar um ambiente local de Python no Windows;
- criar, localizar e executar arquivos `.py` no VS Code;
- distinguir editor, interface gráfica, terminal e saída do programa;
- receber, armazenar, transformar e exibir dados;
- tomar decisões e repetir operações;
- organizar coleções com listas e dicionários;
- decompor problemas em funções e módulos;
- persistir dados em arquivos de texto e JSON;
- investigar erros e tratar falhas previsíveis;
- modelar entidades simples com classes e objetos;
- organizar uma aplicação pequena usando composição;
- integrar um programa a um modelo de linguagem por meio de uma API;
- criar uma interface web interativa com Streamlit;
- publicar uma aplicação no Streamlit Community Cloud por meio do GitHub;
- usar IA em um projeto longo de forma contextualizada, verificável e responsável.

## 2. Premissas do curso

### Carga horária e encontros

- 64 horas agendadas.
- 16 encontros de 4 horas.
- Um intervalo de 15 minutos faz parte de cada encontro.
- Aproximadamente 3 horas e 45 minutos de atividade formativa por encontro.
- Encontros duplos reúnem dois capítulos completos, sem fundi-los.
- Um capítulo corresponde a um encontro.

Os capítulos não terão blocos rígidos de minutos. Alguns conceitos exigem mais demonstração; outros, mais prática. A estrutura didática será consistente, mas o ritmo permanecerá flexível.

### Ambiente oficial

- Windows.
- Python instalado localmente.
- Visual Studio Code.
- Extensão oficial de Python para VS Code.
- Terminal integrado do VS Code.
- Streamlit instalado apenas na etapa de interfaces.

No laboratório institucional, Python e VS Code já estarão instalados. O Capítulo 1 deverá ensinar a verificar e usar esse ambiente. O mesmo capítulo também deverá apresentar, separadamente, o processo completo de instalação por usuário para que os estudantes consigam preparar seus computadores em casa sem depender de privilégios administrativos.

### Idioma e voz

- Explicações, exercícios e mensagens em português brasileiro.
- Palavras reservadas, APIs e nomes da linguagem permanecem em inglês.
- Termos técnicos aparecem primeiro de modo intuitivo e, quando útil, acompanhados do termo comum em inglês.
- Identificadores usam português sem acentos e `snake_case`.
- Mensagens mostradas ao usuário mantêm acentuação normal.
- O texto será amigável, direto e adulto, sem infantilização, memes ou excesso de gírias.
- Mitologia, jogos e referências de cultura pop não formarão a identidade do curso.

## 3. Estrutura curricular — 16 capítulos

### Capítulo 1 — Preparando o ambiente e criando o primeiro programa

**Objetivo:** reduzir a barreira inicial entre o estudante e a execução de um programa.

**Conteúdos:**

- o que são programa, código-fonte e linguagem de programação;
- arquivos, pastas, extensões e o arquivo `.py`;
- diferença entre editor, terminal, interface gráfica e saída;
- instalação doméstica do Python no Windows por perfil de usuário;
- instalação doméstica do VS Code e da extensão oficial de Python;
- verificação das instalações no laboratório;
- abertura de uma pasta de projeto no VS Code;
- seleção do interpretador;
- `print()`, strings, comentários e execução sequencial;
- execução pelo botão **Run Python File**;
- execução pelo terminal com `python nome_do_arquivo.py`;
- leitura inicial de mensagens de erro.

**Recursos visuais:** capturas de tela anotadas para as opções relevantes do instalador, extensão de Python, seleção do interpretador e botão de execução. Toda imagem deverá ser acompanhada por instruções textuais.

**Prática principal:** criar uma pasta, escrever um programa de apresentação, executá-lo de duas formas e corrigir um erro proposital.

**Fonte original:** `Variaveis.py`.

### Capítulo 2 — Variáveis, textos, entrada e saída

**Objetivo:** construir programas que guardam informações e conversam com o usuário.

**Conteúdos:**

- atribuição e reatribuição;
- modelo mental de variável como nome associado a um valor;
- `input()`;
- strings;
- concatenação;
- f-strings;
- caracteres de escape;
- nomes significativos e `snake_case`;
- palavras reservadas;
- rastreamento do valor de uma variável.

**Prática principal:** gerar uma ficha simples a partir dos dados informados pelo usuário.

**Fonte original:** `Variaveis.py`.

### Capítulo 3 — Tipos de dados, conversões e cálculos

**Objetivo:** reconhecer os tipos básicos e realizar cálculos com entradas do usuário.

**Conteúdos:**

- `str`, `int`, `float` e `bool`;
- `type()`;
- conversões com `str()`, `int()`, `float()` e `bool()`;
- operadores aritméticos;
- divisão comum e divisão inteira;
- resto da divisão;
- exponenciação;
- precedência de operadores;
- separador visual `_` em números;
- erros de conversão como primeiro contato com falhas em tempo de execução.

**Prática principal:** calculadora de custo de um pequeno inventário.

**Fonte original:** `Tipos_dados.py`.

### Capítulo 4 — Decisões e regras de validação

**Objetivo:** fazer o programa escolher comportamentos com base nos dados.

**Conteúdos:**

- valores booleanos;
- `if`, `elif` e `else`;
- indentação como parte da sintaxe;
- operadores de comparação;
- `and`, `or` e `not`;
- condições compostas;
- pertencimento com `in`;
- ordem das condições;
- regras simples de validação.

**Prática principal:** validar preço, quantidade e disponibilidade de um produto.

**Fontes originais:** `Condicionais.py` e exemplos selecionados de `python.py`.

### Capítulo 5 — Listas e coleções ordenadas

**Objetivo:** armazenar e modificar vários valores relacionados.

**Conteúdos:**

- criação de listas;
- índices positivos e acesso a itens;
- mutabilidade;
- `append()`, `insert()` e `remove()`;
- alteração de itens;
- `in` e `len()`;
- `sort()` e `reverse()`;
- diferenças entre um valor isolado e uma coleção;
- erros comuns de índice.

**Prática principal:** criar e manter uma lista de produtos e categorias.

**Fonte original:** `Listas.py`.

### Capítulo 6 — Laços e processamento repetido

**Objetivo:** processar coleções e repetir operações com controle.

**Conteúdos:**

- `for`;
- `range()`;
- percorrer listas e strings;
- contadores;
- acumuladores;
- laços com condicionais;
- `while`;
- condições de parada;
- risco de laços infinitos;
- escolha entre `for` e `while`.

**Prática principal:** calcular totais, localizar itens e produzir um resumo do inventário.

**Fontes originais:** `Loops.py` e exemplos selecionados de `python.py`.

### Capítulo 7 — Funções e decomposição de problemas

**Objetivo:** dividir programas em operações pequenas, nomeadas e reutilizáveis.

**Conteúdos:**

- definição com `def`;
- chamada de função;
- parâmetros e argumentos;
- valores de retorno;
- diferença entre `print()` e `return`;
- variáveis locais;
- funções pequenas com responsabilidade clara;
- composição de funções;
- casos de teste manuais e saídas esperadas.

**Prática principal:** transformar cálculos e validações de inventário em funções independentes.

**Fonte original:** `Funcoes.py`.

### Capítulo 8 — Dicionários e registros estruturados

**Objetivo:** representar entidades com campos nomeados.

**Conteúdos:**

- pares chave–valor;
- criação e acesso;
- inclusão, alteração e remoção;
- acesso seguro com `get()`;
- `keys()`, `values()` e `items()`;
- iteração;
- dicionários aninhados;
- listas de dicionários;
- escolha entre lista e dicionário.

**Prática principal:** representar produtos como registros e consultar um pequeno inventário.

**Fontes originais:** `Dicionarios.py` e exercícios selecionados de `python.py`.

### Capítulo 9 — Módulos e organização em arquivos

**Objetivo:** separar responsabilidades sem esconder o fluxo do programa.

**Conteúdos:**

- o que é um módulo;
- `import` e `from ... import ...`;
- biblioteca padrão;
- uso pontual de `random` como exemplo de módulo;
- criação e importação de um módulo próprio;
- arquivo principal e arquivos auxiliares;
- introdução a `main()`;
- `if __name__ == "__main__":` como proteção para execução e importação;
- caminhos e organização básica do projeto.

**Prática principal:** separar regras do inventário e interação pelo terminal.

**Fonte original:** `Modulos.py`.

### Capítulo 10 — Arquivos de texto e JSON

**Objetivo:** manter informações depois que o programa termina.

**Conteúdos:**

- arquivos e caminhos relativos;
- abertura segura com `with`;
- modos `r`, `w` e `a`;
- codificação UTF-8;
- `read()`, `readlines()` e `write()`;
- risco de sobrescrita no modo `w`;
- JSON como formato de dados;
- `json.load()` e `json.dump()`;
- `ensure_ascii=False` e `indent`;
- estruturas Python compatíveis com JSON.

**Prática principal:** salvar e carregar registros de inventário.

**Fontes originais:** `Arquivos.py`, `test.txt`, `deuses.json` e `thor.json`, com dados e narrativa substituídos.

### Capítulo 11 — Validação, exceções e depuração sistemática

**Objetivo:** investigar problemas e construir fluxos que falham de maneira controlada.

**Conteúdos:**

- revisão do processo de depuração praticado desde o Capítulo 1;
- diferença entre erro de sintaxe, erro em tempo de execução e erro de lógica;
- leitura de traceback, arquivo, linha e mensagem final;
- inspeção intencional de valores com `print()`;
- `try` e `except`;
- exceções específicas;
- múltiplos blocos de tratamento;
- acesso ao objeto da exceção;
- `raise` para rejeitar estado inválido;
- validação de entradas;
- recuperação segura em leitura e gravação de JSON.

**Prática principal:** tornar o inventário persistente resistente a entradas e arquivos inválidos.

**Fonte original:** `Error.py`.

### Capítulo 12 — Objetos como dados mais comportamento

**Objetivo:** apresentar objetos como solução para coordenar estado e operações relacionadas.

**Conteúdos:**

- limitação prática de espalhar regras sobre dicionários e funções;
- classe e instância;
- `__init__`;
- `self`;
- atributos;
- métodos;
- alteração e validação de estado por métodos;
- criação de várias instâncias;
- `__str__()` como primeira personalização útil.

**Prática principal:** criar uma classe `Produto` que descreve e atualiza seu estado.

**Fontes originais:** `Objetos.py` e exemplos finais de `python.py`, com domínio substituído.

### Capítulo 13 — Conversando com um modelo de linguagem

**Objetivo:** integrar um programa Python a um modelo de linguagem por meio de uma API, aplicando funções, dicionários, laços e exceções já estudados.

**Conteúdos:**

- o que é um modelo de linguagem e por que suas respostas variam e podem estar erradas;
- API e chave de API;
- criação da chave no Google AI Studio;
- chave guardada em variável de ambiente com `setx`, nunca no código;
- primeiro ambiente virtual com `.venv` e instalação de `google-genai` com `pip`;
- cliente, `interactions.create()` e `output_text`;
- independência entre chamadas e continuação da conversa com `previous_interaction_id`;
- instrução de sistema e critérios para escrever um bom personagem;
- dicionário de personagens em módulo separado;
- laço de conversa com mensagens vazias ignoradas;
- tratamento de falhas de comunicação e do limite do plano gratuito;
- uso responsável: personagens não são pessoas reais e respostas podem ser inventadas.

**Prática principal:** construir um chat de terminal em que o usuário escolhe um personagem e conversa com ele.

**Exercício independente:** cada estudante escolhe e escreve, sem IA, as instruções de sistema de pelo menos três personagens e registra testes de permanência no papel.

**Limite didático:** streaming, ferramentas, saída estruturada, imagens e outros recursos da API ficam fora do capítulo. O modelo é usado apenas por meio de texto.

**Referências técnicas:** [primeiros passos](https://ai.google.dev/gemini-api/docs/quickstart), [chaves de API](https://ai.google.dev/gemini-api/docs/api-key) e [Interactions API](https://ai.google.dev/gemini-api/docs/interactions).

### Capítulo 14 — Organizando uma aplicação com objetos

**Objetivo:** usar composição e responsabilidades claras para organizar um programa pequeno.

**Conteúdos:**

- responsabilidade de uma classe;
- listas de objetos;
- composição;
- classe `Inventario` contendo objetos `Produto`;
- métodos de instância;
- atributos de classe quando houver uso natural;
- introdução leve a `@classmethod`;
- convenção de atributos internos com `_`;
- conversão entre objetos e dicionários para JSON;
- separação entre regras do domínio e apresentação.

**Prática principal:** construir a camada de domínio de um inventário sem interface gráfica.

**Limite didático:** herança, polimorfismo formal, classes abstratas, hierarquias artificiais, propriedades sem necessidade, getters e setters mecânicos, decoradores avançados e padrões de projeto não fazem parte do núcleo. `@staticmethod` só deverá aparecer se surgir um caso natural. Composição vem antes de herança.

**Fontes originais:** `Objetos.py`, exemplos finais de `python.py` e refatoração dos conceitos anteriores.

### Capítulo 15 — Construindo uma interface com Streamlit

**Objetivo:** tornar visíveis e interativas as regras Python já dominadas.

**Conteúdos:**

- criação do ambiente virtual `.venv` do projeto, como no Capítulo 13;
- ativação no terminal integrado;
- instalação e verificação do Streamlit;
- execução local de uma aplicação;
- estrutura de um script Streamlit;
- execução de cima para baixo e nova execução após interação;
- títulos, textos, mensagens e métricas;
- `text_input`, `number_input`, `selectbox`, `checkbox` e botões;
- formulários;
- colunas e layout simples;
- exibição e filtragem de registros;
- estado de sessão no nível mínimo necessário;
- chamada de funções e objetos comuns a partir da interface;
- criação e conexão das contas GitHub e Streamlit Community Cloud;
- apresentação dos requisitos do projeto longo e das regras de uso de IA.

**Prática principal:** criar uma interface para consultar e alterar um inventário fornecido no pacote inicial.

**Fontes complementares:** exemplos existentes em `Streamlit/` e [documentação oficial de fundamentos do Streamlit](https://docs.streamlit.io/get-started/fundamentals).

### Capítulo 16 — Concluindo e publicando a aplicação

**Objetivo:** integrar, testar, explicar e publicar uma aplicação completa de inventário.

**Requisitos funcionais:**

- adicionar produtos;
- listar produtos;
- buscar e filtrar;
- atualizar produtos;
- remover produtos;
- validar preço e quantidade;
- salvar e carregar JSON;
- usar objetos simples para as regras do domínio;
- usar Streamlit para a interface.

**Conteúdos de entrega:**

- organização final dos arquivos;
- teste local antes da publicação;
- Git apenas como ferramenta de entrega;
- repositório, `git add`, `git commit` e `git push`;
- GitHub público;
- `requirements.txt`;
- caminhos compatíveis com execução local e Community Cloud;
- conexão do repositório ao Streamlit Community Cloud;
- seleção do arquivo de entrada e versão compatível do Python;
- leitura de logs e correção de falhas de implantação;
- apresentação e explicação do projeto.

**Projeto:** inventário pequeno com contexto personalizável, como produtos de uma loja, materiais de oficina, suprimentos de laboratório ou equipamentos de sala. O contexto pode variar; os requisitos essenciais permanecem os mesmos.

**Trabalho em equipe:** duplas são permitidas, mas não obrigatórias. Quando houver dupla, cada integrante deverá demonstrar compreensão individual do código.

**Recuperação:** o capítulo oferecerá um ponto de partida funcional para quem perdeu o Capítulo 15, sem entregar a solução final.

**Referências técnicas:** [organização de arquivos](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/file-organization), [dependências](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies) e [implantação no Community Cloud](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy).

## 4. Estrutura de cada pacote de capítulo

Cada encontro será autocontido. O estudante não dependerá do código produzido em uma aula anterior.

```text
Apostila/
├── 01_primeiros_passos/
│   ├── capitulo.md
│   ├── imagens/
│   ├── starter/
│   └── solucao/
├── 02_variaveis_e_entrada/
│   ├── capitulo.md
│   ├── imagens/
│   ├── starter/
│   └── solucao/
└── glossario.md
```

### Regras de empacotamento

- Prefixos numéricos preservam a ordem.
- Pastas e arquivos evitam espaços e acentos.
- Títulos visíveis usam português normal.
- Cada capítulo recebe seus próprios arquivos iniciais.
- Cada capítulo recebe uma solução completa em pasta separada.
- A solução não fica visível imediatamente após o exercício na apostila.
- O professor poderá liberar a pasta `solucao/` após a tentativa e a correção.
- Ausentes e estudantes atrasados deverão conseguir recomeçar pelo pacote do encontro atual.
- O capítulo não pressupõe que o estudante preservou corretamente o código anterior.

## 5. Estrutura didática de cada capítulo

Os capítulos usarão os mesmos pontos de apoio, sem cronograma rígido:

1. Situação-problema de abertura.
2. Objetivos de aprendizagem observáveis.
3. Conceitos necessários para o encontro.
4. Explicação em linguagem simples.
5. Sintaxe essencial.
6. Demonstração ou exemplo guiado.
7. Rastreamento de como o Python executa o código.
8. Erros comuns e prática de depuração.
9. Prática acompanhada.
10. Exercício independente.
11. Correção e discussão.
12. Resumo.
13. Tarefa curta de saída.

O intervalo ocorrerá em uma transição adequada ao conteúdo, sem posição fixa no texto.

Não haverá mapa de slides, roteiro de slides ou metadados específicos para apresentações. A futura geração de slides partirá diretamente do conteúdo final. Para facilitar esse uso sem duplicar manutenção, a escrita manterá:

- títulos descritivos;
- subseções curtas e focadas;
- um conceito principal por subseção;
- exemplos de código pequenos e autocontidos;
- saídas esperadas;
- caixas consistentes de **Atenção**, **Dica**, **Erro comum** e **Teste mental**.

## 6. Avaliação formativa

O curso adotará avaliação formativa devido ao tempo disponível. Não há material MSEP no repositório para mapear neste momento.

### Evidências de aprendizagem

- prática guiada;
- exercício independente;
- tarefa curta de saída ao fim de cada encontro;
- explicação oral ou escrita de decisões;
- adaptação de código para um novo caso;
- testes manuais com entradas e saídas esperadas;
- projeto final funcional e compreendido.

O projeto final não será a única evidência de aprendizagem. A correção observará a capacidade de explicar e modificar o código, e não apenas reproduzir uma solução.

Testes automatizados com frameworks ficam fora do núcleo. Casos de teste manuais serão usados desde o começo, e `assert` poderá aparecer apenas como leitura opcional depois do capítulo de funções.

## 7. Política de uso de inteligência artificial

### Durante as aulas e exercícios

O uso de IA será proibido nos capítulos 1 a 14 para:

- prática guiada;
- exercícios independentes;
- tarefas de saída;
- verificações formativas;
- produção de código que substitua o raciocínio esperado.

Consultar a pasta de solução antes da tentativa e copiar código gerado por IA serão tratados da mesma forma: ambos eliminam a prática necessária.

Quando travar sem poder usar IA, o estudante deverá: reler a seção anterior e as pistas graduais do exercício, registrar por escrito onde emperrou e chamar o professor. Pedir ajuda faz parte da prática; substituir o raciocínio por código pronto, não.

### Durante o projeto longo

O uso de IA será permitido nos capítulos 15 e 16, desde que siga uma prática semelhante à de desenvolvimento real:

- requisitos, modelo de dados e pseudocódigo são definidos antes da geração de código;
- o prompt fornece contexto, restrições e o estado atual do projeto;
- o estudante registra prompts relevantes e decisões tomadas;
- toda sugestão é lida, testada e adaptada;
- o estudante identifica o que aceitou, rejeitou ou modificou;
- nenhum integrante poderá entregar código que não consegue explicar e alterar;
- a responsabilidade por erros, segurança e funcionamento permanece com o estudante.

## 8. Limites do currículo

### Incluído no núcleo

- variáveis e tipos básicos;
- strings e operações essenciais;
- condicionais;
- listas;
- laços;
- funções;
- dicionários;
- módulos;
- arquivos e JSON;
- validação e exceções;
- classes e objetos;
- composição;
- Streamlit básico;
- Git mínimo para publicação;
- GitHub e Streamlit Community Cloud.

### Opcional ou fora do núcleo

- type hints;
- `assert`;
- tuplas e conjuntos;
- compreensões;
- recursão;
- lambdas;
- geradores;
- herança e polimorfismo formal;
- classes abstratas;
- decoradores avançados;
- padrões de projeto;
- testes com `pytest`;
- Pandas e gráficos;
- APIs externas, exceto a API do Gemini no Capítulo 13;
- bancos de dados;
- autenticação;
- aplicações Streamlit multipágina;
- caching;
- infraestrutura de nuvem além do Community Cloud.

Type hints são úteis e poderão aparecer em uma leitura opcional, mas não serão exigidos nos exemplos principais.

## 9. Princípios editoriais e técnicos

- Começar por problemas concretos e nomear a abstração depois.
- Introduzir um recurso quando ele resolver uma limitação já percebida.
- Explicar uma ideia nova por bloco de código.
- Mostrar a saída esperada de exemplos executáveis.
- Separar demonstração, enunciado e solução.
- Não depender de um projeto contínuo para acompanhar a aula atual.
- Reutilizar o domínio de inventário para reduzir vocabulário, mas variar exercícios menores para evitar monotonia.
- Ensinar depuração desde o primeiro encontro.
- Apresentar objetos como estado mais comportamento, não como taxonomia.
- Preferir composição, métodos pequenos e responsabilidades claras.
- Separar regras do domínio da interface Streamlit.
- Introduzir `.venv` apenas quando surgir a primeira biblioteca externa (`google-genai`, no Capítulo 13).
- Introduzir `main()` depois de funções e o `__name__` guard ao dividir o programa em módulos.
- Usar repositórios públicos somente com dados fictícios.
- Proibir senhas, tokens, dados pessoais e dados institucionais no repositório.
- Testar a aplicação localmente antes de tentar publicá-la.
- Usar a versão estável de Python compatível com Streamlit no momento da edição final e registrar a versão testada.

## 10. Correções necessárias no material antigo

O material em `Licoes/` será fonte conceitual, não texto para cópia literal.

- Corrigir a afirmação de que Python “não possui tipos”: a linguagem possui tipagem dinâmica.
- Diferenciar `_` como separador visual em literais numéricos de vírgulas passadas como argumentos.
- Trocar `except:` genérico por exceções específicas nos exemplos recomendados.
- Explicar o risco do modo `w` antes da gravação.
- Validar entradas antes de usá-las.
- Padronizar idioma, acentuação, estilo e nomes.
- Retirar mitologia, jogos, Turtle e controles por teclado da nova trilha.
- Corrigir exemplos que executam interação automaticamente quando importados.
- Distinguir claramente código demonstrativo, exercício e solução.
- Manter compatibilidade com Python 3 atual sem introduzir recursos avançados sem necessidade.

## 11. Mapa das fontes

| Fonte | Destino | Uso |
|---|---|---|
| `Licoes/Variaveis.py` | Capítulos 1–2 | Primeira execução, entrada, saída e variáveis |
| `Licoes/Tipos_dados.py` | Capítulo 3 | Tipos, conversões e operações |
| `Licoes/Condicionais.py` | Capítulo 4 | Decisões e lógica |
| `Licoes/Listas.py` | Capítulo 5 | Coleções ordenadas |
| `Licoes/Loops.py` | Capítulo 6 | Repetição e padrões de iteração |
| `Licoes/Funcoes.py` | Capítulo 7 | Funções e decomposição |
| `Licoes/Dicionarios.py` | Capítulo 8 | Registros chave–valor |
| `Licoes/Modulos.py` | Capítulo 9 | Imports e organização modular |
| `Licoes/Arquivos.py` | Capítulo 10 | Texto e JSON |
| `Licoes/Error.py` | Capítulo 11 | Exceções e validação |
| `Licoes/Objetos.py` | Capítulos 12–13 | Base para classes e objetos |
| `Licoes/python.py` | Capítulos 4–8 e 12–13 | Banco de exemplos e exercícios a revisar |
| `Licoes/test.txt`, `deuses.json`, `thor.json` | Capítulos 10–11 | Estruturas de dados a substituir por inventário |
| `Licoes/interface.py` | Fora da trilha | Material legado de Turtle |
| `Licoes/fundamentos_jogo.py` | Fora da trilha | Material legado de jogo e eventos |
| `Streamlit/*.py` | Capítulos 15–16 | Referência complementar a revisar |

## 12. Ordem de produção

1. Atualizar a estrutura de pastas e criar um modelo vazio de pacote de capítulo.
2. Produzir o Capítulo 1 com as duas rotas de ambiente: laboratório e instalação doméstica.
3. Validar a voz, o nível de detalhe, as capturas de tela e a carga do primeiro encontro.
4. Produzir os capítulos 2 a 4.
5. Produzir os capítulos 5 a 7 e revisar a progressão até funções.
6. Produzir os capítulos 8 a 11 e validar persistência e tratamento de erros.
7. Produzir os capítulos 12 e 14 e testar a abordagem de OOP com iniciantes.
8. Produzir o Capítulo 13 e testar chave de API, `.venv`, `pip` e a conversa com o Gemini.
9. Produzir o Capítulo 15 e testar reruns e Session State.
10. Produzir o Capítulo 16 e testar o fluxo completo de GitHub e Community Cloud.
11. Produzir e separar todas as soluções.
12. Fazer revisão técnica, didática, linguística e de acessibilidade.
13. Verificar novamente versões, links e capturas de tela antes da publicação.

## 13. Critério de conclusão por capítulo

Um capítulo estará pronto quando:

- couber em um encontro sem exigir ritmo artificial;
- puder ser iniciado sem o código da aula anterior;
- cobrir os conceitos previstos sem depender de conteúdo futuro;
- contiver objetivos observáveis;
- possuir exemplos executáveis e verificados;
- mostrar saídas esperadas;
- incluir prática de depuração;
- oferecer arquivos iniciais suficientes;
- possuir exercício independente e tarefa de saída;
- ter solução verificada e armazenada separadamente;
- usar terminologia consistente;
- respeitar a política de IA correspondente à etapa;
- não incluir dados pessoais, segredos ou dependências desnecessárias;
- funcionar no ambiente Windows definido para o curso.
