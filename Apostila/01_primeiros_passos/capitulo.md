# Capítulo 1 — Preparando o ambiente e criando o primeiro programa

Programar começa antes da primeira linha de código. Você precisa saber onde seus arquivos estão, qual programa será usado para editá-los e como pedir ao computador que execute suas instruções.

Neste encontro, vamos preparar esse caminho com calma. Ao final, você terá uma pasta de trabalho organizada, saberá executar um arquivo Python pelo VS Code e pelo terminal e conseguirá usar uma mensagem de erro para localizar um problema simples.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 1 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Preparação do ambiente e primeira execução |
| Produto do encontro | Um programa Python criado, salvo, executado e corrigido |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo não pressupõe experiência anterior com programação ou terminal.

No laboratório da instituição, Python e VS Code já estão instalados. Começaremos verificando esse ambiente. A seção de instalação doméstica será usada para que você consiga repetir a preparação em um computador Windows fora do laboratório.

### Arquivos iniciais

Os arquivos necessários estão na pasta `starter/` deste capítulo.

```text
starter/
├── README.md
├── mensagem_com_erro.py
└── verificar_ambiente.py
```

Não altere `mensagem_com_erro.py` ainda. Ele será usado na oficina de depuração.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- explicar a função do Python, do VS Code e da extensão de Python;
- criar e localizar uma pasta de projeto no Windows;
- reconhecer um arquivo Python pela extensão `.py`;
- selecionar um interpretador Python no VS Code;
- executar um arquivo pelo botão do VS Code e pelo terminal;
- usar `print()` para exibir texto;
- identificar a linha indicada por uma mensagem de erro simples.

## Três peças trabalham juntas

Quando usamos Python no VS Code, três ferramentas diferentes colaboram:

| Ferramenta | Função |
|---|---|
| **Python** | Interpreta e executa as instruções escritas no arquivo. |
| **VS Code** | Permite criar, organizar e editar arquivos. |
| **Extensão Python** | Ajuda o VS Code a reconhecer Python e oferece ações como selecionar o interpretador e executar o arquivo. |

> **Atenção:** instalar a extensão Python não instala a linguagem Python. A extensão conecta o editor ao interpretador que está no computador.

Uma forma útil de pensar nesse processo é:

```text
arquivo .py → interpretador Python → execução → saída ou mensagem de erro
```

O VS Code facilita esse caminho, mas quem executa o código é o interpretador Python.

## Editor, terminal e interface gráfica

Esses nomes aparecerão durante todo o curso.

### Editor

É a área do VS Code em que escrevemos e alteramos o código. Um arquivo aberto aparece em uma aba.

### Terminal

É uma interface baseada em texto. Em vez de clicar em botões, escrevemos comandos. O terminal integrado aparece normalmente na parte inferior do VS Code.

Um terminal PowerShell pode mostrar algo semelhante a:

```text
PS C:\Users\aluno\Documents\curso_python>
```

Essa parte é o **prompt**. Ela informa que o terminal está pronto e mostra a pasta atual. Você não deve copiar `PS C:\...>` ao executar um comando; deve escrever somente o comando depois do sinal `>`.

### Interface gráfica

É uma interface controlada principalmente por janelas, menus, botões e campos. O próprio VS Code é uma interface gráfica. Mais adiante no curso, criaremos uma interface gráfica no navegador usando Streamlit.

> **Teste mental:** quando você clica no botão de executar do VS Code e o resultado aparece no painel inferior, qual ferramenta realmente executou o arquivo: VS Code ou Python?

## Rota A — Verificando o computador do laboratório

No laboratório, não reinstale Python nem VS Code. Primeiro confirme que as ferramentas disponíveis funcionam.

### 1. Abra o VS Code

Use o menu Iniciar do Windows e procure por **Visual Studio Code**.

### 2. Confirme a extensão Python

1. Clique no ícone **Extensions** na barra lateral esquerda.
2. Pesquise por `Python`.
3. Localize a extensão chamada **Python**, publicada pela **Microsoft**.
4. Se aparecer **Disable** ou **Uninstall**, ela já está instalada.
5. Se aparecer **Install**, selecione a extensão correta e faça a instalação no seu perfil.

> **Figura em produção:** captura da busca por Python na aba de extensões, com o nome do publicador Microsoft em destaque. Enquanto a imagem é finalizada, siga as instruções escritas acima.

> **Atenção:** confira o nome do publicador. Existem várias extensões com nomes parecidos.

### 3. Crie a pasta do curso

No Explorador de Arquivos do Windows:

1. Abra **Documentos**.
2. Crie uma pasta chamada `curso_python`.
3. Dentro dela, crie `01_primeiros_passos`.

O resultado deverá ser semelhante a:

```text
Documentos/
└── curso_python/
    └── 01_primeiros_passos/
```

Evite guardar os exercícios em locais aleatórios. Saber onde o arquivo está é parte do trabalho de programação.

### 4. Abra a pasta, não apenas um arquivo

No VS Code:

1. Abra o menu **File**.
2. Escolha **Open Folder**.
3. Selecione `01_primeiros_passos`.
4. Confirme em **Select Folder**.

Se o VS Code perguntar se você confia nos autores dos arquivos, confirme somente porque esta é uma pasta criada por você e contém os materiais do curso.

> **Dica:** abrir a pasta inteira permite que o explorador do VS Code mostre os arquivos relacionados e faz o terminal iniciar no lugar correto.

### 5. Abra o terminal integrado

Use o menu **Terminal > New Terminal**. Um painel será aberto na parte inferior.

Digite:

```powershell
python --version
```

Uma instalação funcional deverá responder com uma versão de Python 3:

```text
Python 3.x.x
```

Os números exatos podem mudar. O importante neste curso é que a versão comece com `3`.

Se `python` não for reconhecido, tente:

```powershell
py --version
```

Se apenas `py` funcionar, avise o professor antes de continuar. Não tente alterar configurações do computador institucional por conta própria.

### 6. Selecione o interpretador

1. Pressione `Ctrl+Shift+P` para abrir a paleta de comandos.
2. Pesquise por `Python: Select Interpreter`.
3. Escolha a instalação de Python 3 indicada pelo professor.

O interpretador selecionado também pode aparecer na barra de status do VS Code.

> **Figura em produção:** captura da seleção do interpretador, com o comando e a opção Python 3 destacados (sem caminhos pessoais). Enquanto a imagem é finalizada, siga as instruções escritas acima.

## Verificação prática do ambiente

Copie `verificar_ambiente.py` da pasta `starter/` para a pasta de trabalho aberta no VS Code. Depois, abra o arquivo.

O conteúdo é:

```python
print("Python conseguiu executar este arquivo.")
print("O ambiente está pronto para a primeira aula.")
```

### Execute pelo botão do VS Code

Com o arquivo aberto, clique no botão triangular **Run Python File**, no canto superior direito do editor.

> **Figura em produção:** captura do botão **Run Python File** em destaque, com o terminal visível. Enquanto a imagem é finalizada, siga as instruções escritas acima.

O VS Code abrirá ou reutilizará o terminal e pedirá ao Python que execute o arquivo.

Saída esperada:

```text
Python conseguiu executar este arquivo.
O ambiente está pronto para a primeira aula.
```

Se essa saída apareceu, as três peças estão colaborando: editor, extensão e interpretador.

## Rota B — Preparando um computador Windows em casa

Esta seção ensina a repetir a preparação fora do laboratório. As telas podem mudar com atualizações, mas o objetivo de cada etapa permanece o mesmo.

### 1. Instale Python para o seu usuário

1. Acesse [python.org/downloads](https://www.python.org/downloads/).
2. Use a opção oficial de instalação indicada para Windows.
3. O caminho atual recomendado pela documentação é o **Python Install Manager**.
4. Execute o instalador e escolha **Install**.
5. Abra um terminal novo depois da instalação.
6. Digite `python --version`.

Na primeira utilização, o gerenciador poderá concluir a instalação da versão estável do Python. Siga apenas as mensagens do instalador oficial.

> **Figura em produção:** captura da página oficial do gerenciador de instalação do Python, com a ação principal de instalação em destaque. Enquanto a imagem é finalizada, siga as instruções escritas acima.

> **Segurança:** instale Python somente pelo site oficial ou pela Microsoft Store. Não use páginas de download desconhecidas.

### 2. Instale o VS Code sem privilégios administrativos

1. Acesse [code.visualstudio.com](https://code.visualstudio.com/).
2. Baixe o **User Installer** para Windows.
3. Execute o instalador.
4. Conclua a instalação usando as opções padrão.
5. Abra novamente qualquer terminal que já estivesse aberto.

O **User Installer** instala o VS Code apenas para o seu perfil e não exige privilégios administrativos.

### 3. Instale a extensão Python

Abra o VS Code, acesse **Extensions**, pesquise `Python` e instale a extensão publicada pela Microsoft.

### 4. Repita a verificação

Crie a pasta do curso, abra-a no VS Code, selecione o interpretador e execute `verificar_ambiente.py`.

> **Erro comum:** instalar corretamente e continuar usando um terminal que já estava aberto. Feche esse terminal, crie um novo e faça a verificação outra vez.

## Seu primeiro programa

Agora vamos criar um arquivo do zero.

### 1. Crie o arquivo

No explorador lateral do VS Code:

1. Clique no ícone **New File**.
2. Digite `primeiro_programa.py`.
3. Pressione `Enter`.

A extensão `.py` informa ao Windows e ao VS Code que aquele arquivo contém código Python.

> **Erro comum:** criar `primeiro_programa.py.txt`. Se o Windows estiver ocultando extensões conhecidas, confira o nome dentro do explorador do VS Code.

### 2. Escreva uma instrução

Digite:

```python
print("Olá, Python!")
```

`print()` pede que Python exiba uma informação. O texto entre aspas é uma **string**, isto é, uma sequência de caracteres.

### 3. Salve o arquivo

Pressione `Ctrl+S`.

Uma bolinha na aba do arquivo indica que existem alterações ainda não salvas. O Python executa o conteúdo salvo no arquivo, portanto salvar antes de executar evita confusão.

### 4. Execute pelo botão

Clique em **Run Python File**.

Saída esperada:

```text
Olá, Python!
```

### 5. Acrescente instruções

Altere o programa para:

```python
print("Olá, Python!")
print("Este é o meu primeiro programa.")
print("Cada linha será executada na ordem em que aparece.")
```

Saída esperada:

```text
Olá, Python!
Este é o meu primeiro programa.
Cada linha será executada na ordem em que aparece.
```

### Como o Python executa esse código

1. Abre o arquivo solicitado.
2. Lê a primeira instrução e exibe o primeiro texto.
3. Continua para a segunda instrução.
4. Continua para a terceira instrução.
5. Encerra porque não existem mais instruções.

Essa ordem é chamada de **execução sequencial**.

## Aspas fazem parte da sintaxe

Compare:

```python
print("Estoque aberto")
```

com:

```python
print(Estoque aberto)
```

Na primeira versão, as aspas delimitam o texto. Na segunda, Python não consegue interpretar `Estoque aberto` como uma string válida.

> **Teste mental:** qual é a diferença entre as aspas que fazem parte do código e as letras exibidas como resultado?

Você pode usar aspas duplas ou simples:

```python
print("Bom dia")
print('Boa tarde')
```

Neste material, usaremos aspas duplas na maioria dos exemplos para manter consistência.

## Comentários

Uma linha iniciada por `#` é um comentário. Python ignora essa linha durante a execução.

```python
# Este programa apresenta o sistema de inventário.
print("Sistema de inventário")
print("Ambiente preparado com sucesso.")
```

Comentários devem explicar uma intenção relevante. Não é necessário traduzir cada linha óbvia:

```python
# Exibe um texto na tela
print("Olá")
```

Esse comentário não acrescenta informação útil.

## Executando pelo terminal

O botão do VS Code é conveniente, mas aprenderemos também o que ele faz por trás da interface.

Com a pasta do capítulo aberta e `primeiro_programa.py` salvo:

1. Abra **Terminal > New Terminal**.
2. Observe se o prompt termina com o nome da pasta `01_primeiros_passos`.
3. Digite:

```powershell
python primeiro_programa.py
```

4. Pressione `Enter`.

O comando possui duas partes:

| Parte | Significado |
|---|---|
| `python` | Programa que executará as instruções. |
| `primeiro_programa.py` | Arquivo que será entregue ao Python. |

Se o laboratório usa o comando `py`, execute:

```powershell
py primeiro_programa.py
```

### Quando aparece “não foi possível abrir o arquivo”

Confira três coisas:

1. O nome foi digitado exatamente como aparece no explorador do VS Code?
2. O arquivo foi salvo?
3. O terminal está aberto na pasta que contém o arquivo?

Não troque várias configurações ao mesmo tempo. Verifique uma hipótese por vez.

## Prática acompanhada — Cartão de abertura

Crie `abertura_inventario.py` e construa a saída abaixo:

```text
==============================
     CONTROLE DE ESTOQUE
==============================
Programa iniciado com sucesso.
```

### Etapa 1 — Título

Comece com:

```python
print("CONTROLE DE ESTOQUE")
```

Execute e confirme a saída.

### Etapa 2 — Separadores

Use outras chamadas de `print()` para adicionar as linhas formadas por `=`.

### Etapa 3 — Mensagem final

Acrescente a mensagem `Programa iniciado com sucesso.` e um comentário que explique a finalidade do arquivo.

### Checklist da prática

- [ ] O arquivo se chama `abertura_inventario.py`.
- [ ] O título aparece entre duas linhas de separação.
- [ ] A mensagem final aparece na última linha.
- [ ] Há um comentário útil no código.
- [ ] O programa funciona pelo botão e pelo terminal.

> **Pausa sugerida:** este é um bom ponto para o intervalo antes da atividade de depuração.

## Oficina de depuração

Abra uma cópia de `starter/mensagem_com_erro.py` e execute o arquivo.

O código contém um problema intencional:

```python
print("Iniciando o controle de estoque...")
print("Carregando produtos...)
print("Sistema pronto.")
```

### Investigue antes de corrigir

1. Leia a última linha da mensagem de erro.
2. Procure o nome do arquivo e o número da linha.
3. Compare as aspas das três instruções.
4. Formule uma hipótese antes de editar.
5. Faça a menor alteração possível.
6. Salve e execute novamente.

Você deverá encontrar o nome `SyntaxError`. Ele indica que Python não conseguiu compreender a estrutura do código.

> **Atenção:** uma mensagem de erro não significa que você “não sabe programar”. Ela registra onde a execução encontrou um problema e fornece pistas para investigá-lo.

A versão corrigida está em `solucao/`, mas só deverá ser consultada depois da investigação e da correção em grupo.

## Exercício independente — Apresentação da loja

### Contexto

Uma pequena loja precisa de uma tela de abertura para seu futuro controle de estoque. Neste momento, o programa ainda não recebe dados nem realiza cálculos. Ele apenas apresenta informações fixas de forma organizada.

### Requisitos

Crie `apresentacao_loja.py`. O programa deverá:

1. exibir o nome fictício da loja;
2. exibir o texto `CONTROLE DE ESTOQUE`;
3. exibir uma linha separadora;
4. exibir duas mensagens explicando o que o sistema fará futuramente;
5. incluir um comentário útil no código;
6. funcionar pelo botão do VS Code e pelo terminal.

### Restrições de aprendizagem

- Use somente comentários e chamadas de `print()`.
- Não use variáveis, `input()` ou recursos ainda não apresentados.
- Não use inteligência artificial para produzir ou corrigir o código.

### Exemplo de saída

Você pode personalizar o nome e os textos. Uma execução possível seria:

```text
LOJA DO BAIRRO
CONTROLE DE ESTOQUE
------------------------------
Aqui será possível cadastrar produtos.
Aqui será possível consultar quantidades.
```

### Casos que você deve verificar

| Verificação | Resultado esperado |
|---|---|
| Execução pelo botão | As cinco linhas aparecem no terminal. |
| Execução pelo terminal | A mesma saída é apresentada. |
| Alteração sem salvar | A saída antiga ajuda a perceber que faltou salvar. |
| Remoção de uma aspa | Python apresenta uma mensagem de erro. |

### Pistas graduais

<details>
<summary>Pista 1</summary>

Cada linha da saída pode ser produzida por uma chamada separada de `print()`.

</details>

<details>
<summary>Pista 2</summary>

Comece fazendo apenas o nome da loja aparecer. Execute. Depois acrescente uma linha por vez.

</details>

A solução comentada está na pasta `solucao/` e deverá ser consultada somente depois da tentativa e da correção em grupo.

## Resumo do capítulo

Neste encontro, você aprendeu que:

- Python é o interpretador que executa o código;
- VS Code é o editor usado para organizar e alterar arquivos;
- a extensão Python conecta recursos do editor ao interpretador;
- arquivos Python normalmente terminam em `.py`;
- o terminal é uma interface baseada em comandos;
- `print()` exibe uma informação;
- strings precisam ser delimitadas por aspas;
- comentários começam com `#`;
- Python executa instruções sequenciais de cima para baixo;
- mensagens de erro oferecem pistas para depuração.

## Verifique seu aprendizado

Responda antes de testar no computador.

1. Instalar a extensão Python no VS Code também instala o interpretador? Explique.
2. O que a extensão `.py` comunica ao editor?
3. O que será exibido por duas chamadas consecutivas de `print()`?
4. Por que é importante salvar o arquivo antes de executá-lo?
5. Qual parte de uma mensagem de erro você deve procurar primeiro?
6. O que há de errado em `print("Estoque aberto)`?
7. Qual é a diferença entre clicar em **Run Python File** e digitar `python arquivo.py`?

## Tarefa de saída

Crie um arquivo chamado `status_ambiente.py` sem consultar a solução. Ele deverá:

1. possuir um comentário com a finalidade do programa;
2. exibir `Ambiente verificado.`;
3. exibir `Consigo executar Python pelo terminal.`;
4. ser executado pelo terminal integrado.

### Critérios de conclusão

- [ ] O arquivo está dentro da pasta correta.
- [ ] O nome termina em `.py`.
- [ ] As duas mensagens aparecem sem erro.
- [ ] Consigo apontar qual parte do comando é o interpretador e qual é o arquivo.
- [ ] Consigo explicar minha solução com minhas próprias palavras.

## Vocabulário

| Termo | Significado neste capítulo |
|---|---|
| Código-fonte | Texto com as instruções escritas pelo programador. |
| Python | Linguagem e interpretador usados para executar os programas do curso. |
| VS Code | Editor utilizado para criar e organizar os arquivos. |
| Extensão | Complemento que adiciona recursos ao VS Code. |
| Interpretador | Programa que lê e executa o código Python. |
| Terminal | Interface em que ações são solicitadas por comandos de texto. |
| Prompt | Linha do terminal que indica que ele está pronto para receber um comando. |
| Script | Arquivo contendo instruções executáveis, como um arquivo `.py`. |
| String | Sequência de caracteres delimitada por aspas. |
| Sintaxe | Regras de escrita que permitem ao Python compreender o código. |
| Depuração (*debugging*) | Processo de investigar e corrigir problemas no programa. |

## Referências e continuidade

- [Python no Windows — documentação oficial](https://docs.python.org/3/using/windows.html)
- [Python no VS Code — início rápido](https://code.visualstudio.com/docs/python/python-quick-start)
- [Executando Python no VS Code](https://code.visualstudio.com/docs/python/run)
- [Instalação do VS Code no Windows](https://code.visualstudio.com/docs/setup/windows)

No próximo capítulo, o programa deixará de exibir apenas textos fixos. Ele aprenderá a guardar informações em variáveis e a receber dados digitados pelo usuário.

