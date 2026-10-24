# Capítulo 2 — Variáveis, textos, entrada e saída

No primeiro capítulo, nossos programas exibiam mensagens fixas. Eles faziam sempre a mesma coisa, independentemente de quem os executava.

Neste encontro, o programa começará a receber informações do usuário. Vamos guardar essas informações em variáveis, reutilizá-las e produzir mensagens personalizadas. Esse é o primeiro passo para transformar uma sequência fixa de instruções em um programa que trabalha com dados.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 2 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Variáveis, strings, `input()` e `print()` |
| Produto do encontro | Um cadastro textual de produto executado no terminal |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Você não precisa recuperar os arquivos produzidos no encontro anterior.

### O que você já precisa saber

- abrir uma pasta no VS Code;
- reconhecer um arquivo `.py`;
- salvar um arquivo;
- executar pelo botão **Run Python File** ou pelo terminal;
- usar `print()` para exibir uma string;
- localizar a linha indicada por uma mensagem de erro simples.

Se alguma dessas ações ainda não estiver clara, peça ajuda antes da prática independente.

### Arquivos iniciais

```text
starter/
├── ficha_base.py
└── nome_incorreto.py
```

Copie a pasta `starter/` para um local em que você possa editar os arquivos. Abra a cópia no VS Code.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- criar variáveis com nomes significativos;
- explicar atribuição e reatribuição;
- receber texto com `input()`;
- combinar valores em mensagens usando f-strings;
- distinguir o texto do prompt da resposta armazenada;
- usar comentários e `snake_case` de maneira consistente;
- rastrear o valor atual de uma variável;
- investigar um `NameError` simples.

## Situação-problema

Uma loja deseja registrar as informações básicas de um produto antes de adicioná-lo ao inventário. O programa precisa perguntar o nome, a categoria, o código e a localização do item. Depois, deve apresentar uma ficha organizada para conferência.

Uma execução possível será:

```text
Nome do produto: Caderno
Categoria: Papelaria
Código interno: CAD-001
Localização: Prateleira A

--- FICHA DO PRODUTO ---
Produto: Caderno
Categoria: Papelaria
Código: CAD-001
Localização: Prateleira A
```

Ainda não realizaremos cálculos. Mesmo que o usuário digite algarismos, `input()` entrega texto ao programa. Conversões e operações numéricas serão estudadas no próximo capítulo.

## O que é uma variável?

Uma variável é um nome usado para acessar um valor durante a execução do programa.

```python
nome_produto = "Caderno"
```

Nessa instrução:

| Parte | Função |
|---|---|
| `nome_produto` | Nome escolhido para acessar o valor. |
| `=` | Operador de atribuição. |
| `"Caderno"` | Valor atribuído. |

Leia a instrução como: “`nome_produto` recebe o valor `Caderno`”. Não leia `=` como uma pergunta matemática. Aqui, ele realiza uma atribuição.

Depois da atribuição, podemos usar o nome da variável:

```python
nome_produto = "Caderno"
print(nome_produto)
```

Saída esperada:

```text
Caderno
```

Observe a diferença:

```python
print("nome_produto")
print(nome_produto)
```

Saída:

```text
nome_produto
Caderno
```

Com aspas, `nome_produto` é apenas um texto. Sem aspas, Python procura a variável com esse nome.

> **Teste mental:** se `categoria = "Papelaria"`, qual será a diferença entre `print("categoria")` e `print(categoria)`?

## Atribuição e reatribuição

O valor associado a uma variável pode mudar:

```python
status_produto = "Aguardando cadastro"
print(status_produto)

status_produto = "Cadastrado"
print(status_produto)
```

Saída esperada:

```text
Aguardando cadastro
Cadastrado
```

### Como o Python executa esse código

1. Associa `status_produto` ao texto `Aguardando cadastro`.
2. Exibe o valor atual.
3. Reassocia o mesmo nome ao texto `Cadastrado`.
4. Exibe o novo valor.

A segunda atribuição não cria duas variáveis com o mesmo nome. Ela substitui o valor acessado por aquele nome.

### Rastreando o estado

Considere:

```python
setor = "Recebimento"
print(setor)

setor = "Estoque"
print(setor)

setor = "Expedição"
print(setor)
```

Preencha antes de executar:

| Momento | Valor atual de `setor` |
|---|---|
| Depois da primeira atribuição | [responda] |
| Depois da segunda atribuição | [responda] |
| Depois da terceira atribuição | [responda] |

Esse acompanhamento recebe o nome de **rastreamento**. Ele será útil quando os programas crescerem.

> **Erro comum:** esperar que a variável guarde automaticamente todo o histórico. Ela fornece o valor atual. Se quisermos preservar vários valores, precisaremos de outra estratégia, como uma lista, estudada mais adiante.

## Recebendo texto com `input()`

`input()` pausa o programa, apresenta uma mensagem e espera o usuário digitar uma resposta.

```python
input("Digite o nome do produto: ")
```

Essa instrução recebe uma resposta, mas não guarda o resultado. Para usá-lo depois, fazemos uma atribuição:

```python
nome_produto = input("Digite o nome do produto: ")
print(nome_produto)
```

Se o usuário digitar `Caderno`, a interação será semelhante a:

```text
Digite o nome do produto: Caderno
Caderno
```

### Prompt e resposta

No exemplo:

```python
categoria = input("Digite a categoria: ")
```

- `Digite a categoria: ` é o **prompt**, a mensagem apresentada pelo programa;
- o texto digitado pelo usuário é a resposta;
- `categoria` recebe essa resposta.

O espaço antes da aspa final do prompt melhora a leitura porque separa a mensagem do que será digitado.

```python
# Sem espaço
produto = input("Produto:")

# Com espaço
produto = input("Produto: ")
```

### `input()` entrega texto

Observe:

```python
quantidade = input("Quantidade: ")
print(quantidade)
```

Se a pessoa digitar `25`, a variável recebe os caracteres `2` e `5` como texto. Não tente calcular com esse valor ainda. No Capítulo 3, aprenderemos a converter entradas para tipos numéricos.

> **Atenção:** o programa não adivinha se uma resposta representa nome, quantidade, preço ou código. O tratamento correto depende das instruções que escreveremos.

## Combinando textos

Frequentemente queremos misturar uma mensagem fixa com o valor de uma variável.

### Concatenação

Podemos unir strings com `+`:

```python
nome_produto = "Caderno"
print("Produto cadastrado: " + nome_produto)
```

Saída:

```text
Produto cadastrado: Caderno
```

Os espaços também são caracteres. Compare:

```python
print("Produto:" + nome_produto)
print("Produto: " + nome_produto)
```

Saída:

```text
Produto:Caderno
Produto: Caderno
```

### F-strings

Uma f-string permite inserir valores dentro de uma string de forma mais legível:

```python
nome_produto = "Caderno"
categoria = "Papelaria"

print(f"Produto: {nome_produto}")
print(f"Categoria: {categoria}")
```

Saída:

```text
Produto: Caderno
Categoria: Papelaria
```

A letra `f` aparece antes da primeira aspa. As chaves indicam onde o valor será inserido.

```text
f"texto fixo {variavel}"
```

> **Erro comum:** esquecer o `f`. `print("Produto: {nome_produto}")` exibe as chaves e o nome literalmente.

### Experimente

Antes de executar, preveja a saída:

```python
cor = "azul"
tamanho = "grande"
print(f"Caixa {cor} de tamanho {tamanho}.")
```

Depois, altere os dois valores e execute novamente.

## Quebras de linha em strings

O caractere especial `\n` representa uma quebra de linha dentro de uma string:

```python
print("CADASTRO\nDE PRODUTO")
```

Saída:

```text
CADASTRO
DE PRODUTO
```

A barra invertida e a letra `n` trabalham juntas. Elas não aparecem na saída.

Para programas iniciantes, várias chamadas de `print()` costumam ser mais fáceis de ler. Use `\n` quando ele realmente deixar a mensagem mais clara.

## Escolhendo bons nomes

Um bom nome reduz a quantidade de explicações necessárias.

Compare:

```python
x = "Caderno"
c = "Papelaria"
```

com:

```python
nome_produto = "Caderno"
categoria_produto = "Papelaria"
```

A segunda versão comunica melhor a intenção.

### Regras essenciais

- Use letras, algarismos e `_`.
- Não use espaços.
- Não comece com algarismo.
- Não use palavras reservadas da linguagem.
- Não substitua nomes importantes, como `print` e `input`.
- Prefira letras minúsculas.
- Separe palavras com `_`, seguindo `snake_case`.
- Nos identificadores do curso, não use acentos.

Exemplos:

| Nome | Avaliação | Motivo |
|---|---|---|
| `nome_produto` | Bom | Descritivo e segue `snake_case`. |
| `produto2` | Válido, mas pouco claro | O número precisa ter significado no contexto. |
| `2produto` | Inválido | Começa com algarismo. |
| `nome produto` | Inválido | Contém espaço. |
| `preço` | Evitar no curso | Contém acento. Use `preco`. |
| `print` | Não usar | Esconde o nome da função `print()`. |

> **Dica:** um nome deve explicar o papel do valor, não apenas repetir que ele é um “dado” ou “texto”.

## Prática acompanhada — Ficha de produto

Abra `starter/ficha_base.py`. Vamos completar o programa em etapas.

### Etapa 1 — Receber o nome

Substitua o primeiro marcador pelo código:

```python
nome_produto = input("Nome do produto: ")
```

Exiba o valor para confirmar que foi armazenado:

```python
print(nome_produto)
```

Execute antes de continuar.

### Etapa 2 — Receber outros campos

Crie variáveis para:

- categoria;
- código interno;
- localização no estoque.

Use nomes em `snake_case` e prompts claros.

### Etapa 3 — Apresentar a ficha

Use f-strings para produzir:

```text
--- FICHA DO PRODUTO ---
Produto: [valor digitado]
Categoria: [valor digitado]
Código: [valor digitado]
Localização: [valor digitado]
```

Os colchetes acima representam valores variáveis. Eles não devem aparecer literalmente na saída.

### Etapa 4 — Melhorar a leitura

Antes do título da ficha, use:

```python
print()
```

Uma chamada de `print()` sem informação cria uma linha vazia.

### Checklist da prática

- [ ] O programa recebe quatro informações.
- [ ] Cada resposta fica em uma variável diferente.
- [ ] Os nomes seguem `snake_case`.
- [ ] A ficha usa os valores digitados.
- [ ] A saída tem título e organização consistente.
- [ ] O programa funciona pelo terminal.

> **Pausa sugerida:** este é um bom ponto para o intervalo antes da oficina de depuração.

## Oficina de depuração

Abra `starter/nome_incorreto.py` e execute:

```python
nome_produto = input("Nome do produto: ")
print(f"Produto cadastrado: {nome_produtos}")
```

Depois de receber a entrada, Python apresenta um `NameError`.

### Investigue antes de corrigir

1. Leia a última linha da mensagem de erro.
2. Localize a linha indicada.
3. Compare o nome criado na primeira linha com o nome usado na segunda.
4. Python diferencia singular e plural?
5. Qual é a menor correção possível?

Python exige correspondência exata entre os nomes. `nome_produto` e `nome_produtos` são identificadores diferentes.

> **Erro comum:** corrigir apenas uma ocorrência sem verificar onde a variável foi criada e onde foi usada. Compare os nomes caractere por caractere.

A versão corrigida está em `solucao/` e deverá ser consultada somente depois da investigação e da correção em grupo.

## Exercício independente — Cadastro inicial de produto

### Contexto

Crie um programa que recebe informações textuais de um produto e apresenta um comprovante de cadastro para conferência. Não é necessário salvar os dados em arquivo; eles existirão apenas durante a execução atual.

### Requisitos

Crie `cadastro_produto.py`. O programa deverá:

1. apresentar um título antes das perguntas;
2. perguntar o nome do produto;
3. perguntar a marca ou fabricante;
4. perguntar a categoria;
5. perguntar um código interno;
6. perguntar o corredor ou prateleira;
7. exibir um comprovante usando os cinco valores;
8. incluir pelo menos um comentário útil.

### Restrições de aprendizagem

- Use apenas `print()`, `input()`, variáveis, strings e f-strings.
- Não converta valores nem realize cálculos.
- Não use listas, condicionais ou funções.
- Não use inteligência artificial para produzir ou corrigir o código.

### Exemplo de execução

Entrada e saída podem aparecer juntas no terminal:

```text
=== NOVO PRODUTO ===
Nome: Caneta azul
Marca: Escrita Boa
Categoria: Papelaria
Código interno: CAN-AZ-01
Localização: Corredor 2

=== COMPROVANTE ===
Produto: Caneta azul
Marca: Escrita Boa
Categoria: Papelaria
Código: CAN-AZ-01
Localização: Corredor 2
Cadastro textual concluído.
```

### Casos que você deve testar

| Caso | Entrada | Resultado esperado |
|---|---|---|
| Palavras simples | `Caneta`, `Papelaria` | Valores aparecem completos. |
| Texto com espaços | `Caneta azul` | O espaço é preservado. |
| Código com letras e algarismos | `CAN-AZ-01` | O código aparece sem alteração. |
| Resposta vazia | apenas `Enter` | O campo aparece vazio; validação virá em outro capítulo. |

### Pistas graduais

<details>
<summary>Pista 1</summary>

Crie uma variável para cada resposta. Execute depois de receber apenas o primeiro campo.

</details>

<details>
<summary>Pista 2</summary>

Para apresentar um valor, use o padrão `print(f"Rótulo: {variavel}")`.

</details>

A solução comentada está na pasta `solucao/` e deverá ser consultada somente depois da tentativa e da correção em grupo.

## Resumo do capítulo

Neste encontro, você aprendeu que:

- uma variável é um nome usado para acessar um valor;
- `=` realiza uma atribuição;
- uma nova atribuição muda o valor atual acessado pelo nome;
- `input()` apresenta um prompt e retorna o texto digitado;
- a resposta precisa ser atribuída para ser reutilizada;
- concatenação une strings com `+`;
- f-strings inserem valores usando `{}`;
- `\n` representa uma quebra de linha;
- nomes significativos tornam o código mais compreensível;
- Python exige que o nome usado corresponda exatamente ao nome criado.

## Verifique seu aprendizado

Responda antes de executar qualquer exemplo.

1. Qual é a diferença entre `print("nome_produto")` e `print(nome_produto)`?
2. O que acontece com o valor anterior depois de uma reatribuição?
3. Em `cidade = input("Cidade: ")`, qual parte é o prompt e qual parte recebe a resposta?
4. Por que o espaço no final de `"Cidade: "` é útil?
5. O que acontecerá se esquecermos o `f` em `print("Produto: {produto}")`?
6. Por que `nome produto` não é um identificador válido?
7. `quantidade = input("Quantidade: ")` já permite somar 10 à resposta? Explique com o que sabemos até aqui.
8. Qual pista um `NameError` oferece?

## Tarefa de saída

Crie `identificacao_item.py`. O programa deverá:

1. perguntar uma descrição curta do item;
2. perguntar um código de identificação;
3. armazenar cada resposta em uma variável com nome significativo;
4. exibir `Item [descrição] identificado pelo código [código].` usando uma f-string;
5. ser executado pelo terminal.

### Critérios de conclusão

- [ ] Os dois valores digitados aparecem na mensagem final.
- [ ] Os identificadores usam `snake_case` e não possuem acentos.
- [ ] A mensagem não exibe nomes de variáveis entre chaves.
- [ ] Consigo explicar a diferença entre prompt, resposta e variável.
- [ ] Consigo explicar minha solução com minhas próprias palavras.

## Vocabulário

| Termo | Significado neste capítulo |
|---|---|
| Variável | Nome usado para acessar um valor durante a execução. |
| Atribuição | Associação realizada com `=` entre um nome e um valor. |
| Reatribuição | Nova atribuição feita a um nome que já foi usado. |
| Identificador | Nome de uma variável ou de outro elemento do programa. |
| Entrada (*input*) | Informação fornecida ao programa. |
| Saída (*output*) | Informação apresentada pelo programa. |
| Prompt | Mensagem que solicita uma entrada ao usuário. |
| Concatenação | União de strings. |
| F-string | String que permite inserir valores por meio de `{}`. |
| `snake_case` | Convenção que separa palavras com `_`. |
| `NameError` | Erro gerado quando Python não encontra um nome usado no código. |
| Rastreamento | Acompanhamento dos valores e passos durante a execução. |

## Referências e continuidade

- [Tutorial oficial do Python — uma introdução informal](https://docs.python.org/3/tutorial/introduction.html)
- [Funções embutidas — `input()`](https://docs.python.org/3/library/functions.html#input)
- [Literais de string formatados — f-strings](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)

No próximo capítulo, examinaremos os tipos dos valores e aprenderemos a converter entradas para realizar cálculos de preço, quantidade e total.
