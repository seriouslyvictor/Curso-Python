# Capítulo 3 — Tipos de dados, conversões e cálculos

No capítulo anterior, `input()` permitiu receber informações do usuário. Porém, todas as respostas chegaram ao programa como texto. Isso funciona para nomes e códigos, mas cria um problema quando precisamos somar quantidades ou calcular o custo de uma compra.

Neste encontro, vamos distinguir texto, números e valores lógicos. Depois, aprenderemos a converter entradas e construir uma calculadora simples para o inventário.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 3 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Tipos básicos, conversões e operadores aritméticos |
| Produto do encontro | Uma calculadora de custo para reposição de estoque |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Você não precisa recuperar os arquivos do encontro anterior.

### O que você já precisa saber

- criar e executar um arquivo `.py`;
- usar `print()` e `input()`;
- armazenar valores em variáveis;
- produzir mensagens com f-strings;
- ler a linha final de uma mensagem de erro.

### Arquivos iniciais

```text
starter/
├── calculadora_base.py
└── soma_textual.py
```

Copie a pasta `starter/` para um local em que você possa editar os arquivos. Abra a cópia no VS Code.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- reconhecer valores `str`, `int`, `float` e `bool`;
- inspecionar um tipo com `type()`;
- explicar por que `input()` retorna uma string;
- converter texto com `int()` e `float()`;
- usar operadores aritméticos em cálculos simples;
- aplicar a precedência de operadores conscientemente;
- diferenciar `/`, `//` e `%`;
- diagnosticar um resultado incorreto causado pelo tipo dos dados.

## Situação-problema

Uma loja precisa calcular o custo de um lote antes de repor seu estoque. O programa receberá o nome do produto, a quantidade comprada e o preço unitário. Depois, apresentará o custo total.

Uma execução possível será:

```text
Produto: Caderno
Quantidade comprada: 12
Preço unitário: 8.50

--- RESUMO DA REPOSIÇÃO ---
Produto: Caderno
Quantidade: 12
Preço unitário: R$ 8.50
Custo do lote: R$ 102.00
```

Para chegar a esse resultado, o programa precisa saber que `12` representa uma quantidade inteira e que `8.50` representa um número com parte decimal.

## Valores possuem tipos

O tipo informa que espécie de valor está sendo usada e quais operações fazem sentido para ela.

### String — `str`

Uma string representa texto e é delimitada por aspas:

```python
nome_produto = "Caderno"
codigo_produto = "CAD-001"
```

Um código formado apenas por algarismos também pode ser texto:

```python
codigo_barras = "001234"
```

Manter esse valor como string preserva os zeros à esquerda e comunica que ele é um identificador, não uma quantidade usada em cálculo.

### Inteiro — `int`

Um inteiro não possui parte decimal:

```python
quantidade = 12
estoque_minimo = 5
```

### Ponto flutuante — `float`

Um float representa números com parte decimal:

```python
preco_unitario = 8.50
peso_caixa = 2.75
```

No código Python, o separador decimal é o ponto. Escreva `8.50`, não `8,50`.

> **Atenção:** a vírgula possui outros significados na sintaxe Python. Para criar um número decimal, use ponto mesmo que a escrita brasileira normalmente utilize vírgula.

### Booleano — `bool`

Um booleano possui apenas dois valores possíveis:

```python
produto_ativo = True
produto_esgotado = False
```

`True` e `False` começam com letra maiúscula e não possuem aspas. Eles serão especialmente úteis no próximo capítulo, quando o programa aprender a tomar decisões.

### Mesmo conteúdo visual, tipos diferentes

Compare:

```python
quantidade_texto = "12"
quantidade_numero = 12
```

O primeiro valor é texto. O segundo é um inteiro. Eles podem parecer semelhantes ao serem exibidos, mas se comportam de maneiras diferentes.

## Descobrindo o tipo com `type()`

`type()` informa o tipo de um valor:

```python
print(type("Caderno"))
print(type(12))
print(type(8.50))
print(type(True))
```

Saída esperada:

```text
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
```

Não precisamos memorizar a aparência completa da saída. Observe principalmente `str`, `int`, `float` e `bool`.

Também podemos investigar variáveis:

```python
quantidade = 12
print(type(quantidade))
```

> **Dica:** durante a depuração, `print(type(variavel))` ajuda a conferir se o programa está trabalhando com o tipo que você imaginou.

### Experimente

Preveja os tipos antes de executar:

```python
nome = "Caixa"
codigo = "2048"
quantidade = 20
peso = 1.5
disponivel = True

print(type(nome))
print(type(codigo))
print(type(quantidade))
print(type(peso))
print(type(disponivel))
```

## `input()` sempre entrega uma string

Considere:

```python
quantidade = input("Quantidade: ")
print(type(quantidade))
```

Mesmo que o usuário digite `12`, a saída será:

```text
Quantidade: 12
<class 'str'>
```

O terminal recebe caracteres digitados. Python não decide sozinho se eles representam quantidade, preço, telefone ou código. O programa precisa declarar a conversão desejada.

## Convertendo valores

Conversão significa produzir um valor de outro tipo a partir de um valor existente.

### Convertendo para inteiro com `int()`

```python
quantidade_texto = input("Quantidade: ")
quantidade = int(quantidade_texto)

print(type(quantidade_texto))
print(type(quantidade))
```

Se o usuário digitar `12`, a primeira variável será `str` e a segunda será `int`.

Podemos escrever a entrada e a conversão em uma única instrução:

```python
quantidade = int(input("Quantidade: "))
```

A versão em duas etapas é mais longa, mas pode facilitar a investigação no início. As duas são válidas.

### Convertendo para float com `float()`

```python
preco_unitario = float(input("Preço unitário: "))
```

Entrada válida:

```text
Preço unitário: 8.50
```

Entrada inválida neste momento:

```text
Preço unitário: oito reais
```

Se o texto não puder ser convertido, Python apresenta um `ValueError`. O tratamento desse erro será estudado no Capítulo 11. Por enquanto, leia o prompt e forneça o formato solicitado.

### Convertendo para string com `str()`

`str()` produz uma representação textual:

```python
quantidade = 12
quantidade_texto = str(quantidade)

print(type(quantidade_texto))
```

F-strings já realizam a representação necessária quando inserimos um número em uma mensagem. Portanto, raramente precisaremos chamar `str()` apenas para imprimir com uma f-string.

### Convertendo para booleano com `bool()`

`bool()` existe, mas seu comportamento com strings pode surpreender iniciantes:

```python
print(bool("False"))
print(bool(""))
```

Saída:

```text
True
False
```

Qualquer string não vazia é considerada verdadeira nessa conversão, inclusive `"False"`. Não usaremos `bool(input(...))` para interpretar respostas como “sim” ou “não”. Aprenderemos uma abordagem explícita com condicionais.

> **Erro comum:** acreditar que `bool("False")` produz `False`. As aspas tornam `"False"` uma string não vazia.

## Operadores aritméticos

Python oferece operadores para cálculos:

| Operador | Operação | Exemplo | Resultado |
|---|---|---|---:|
| `+` | Adição | `10 + 3` | `13` |
| `-` | Subtração | `10 - 3` | `7` |
| `*` | Multiplicação | `10 * 3` | `30` |
| `/` | Divisão comum | `10 / 4` | `2.5` |
| `//` | Divisão inteira | `10 // 4` | `2` |
| `%` | Resto da divisão | `10 % 4` | `2` |
| `**` | Exponenciação | `2 ** 3` | `8` |

### Calculando o custo do lote

```python
quantidade = 12
preco_unitario = 8.50
custo_lote = quantidade * preco_unitario

print(custo_lote)
```

Saída:

```text
102.0
```

Quando uma operação mistura `int` e `float`, o resultado costuma ser `float`.

### Divisão comum e divisão inteira

Uma caixa comporta 6 unidades. Com 20 unidades:

```python
unidades = 20
capacidade_caixa = 6

divisao_comum = unidades / capacidade_caixa
caixas_completas = unidades // capacidade_caixa
unidades_restantes = unidades % capacidade_caixa

print(divisao_comum)
print(caixas_completas)
print(unidades_restantes)
```

Saída:

```text
3.3333333333333335
3
2
```

- `/` responde “qual é o resultado matemático da divisão?”;
- `//` responde “quantas caixas completas podem ser preenchidas?”;
- `%` responde “quantas unidades ficam de fora?”.

O pequeno excesso de casas decimais na divisão comum acontece porque computadores representam muitos números decimais de forma aproximada. Para este curso, basta reconhecer que cálculos com `float` podem apresentar pequenas aproximações.

## Precedência de operadores

Python não executa todos os cálculos simplesmente da esquerda para a direita. A ordem básica é:

1. parênteses;
2. exponenciação;
3. multiplicação, divisão, divisão inteira e resto;
4. adição e subtração.

Compare:

```python
resultado_1 = 10 + 2 * 3
resultado_2 = (10 + 2) * 3

print(resultado_1)
print(resultado_2)
```

Saída:

```text
16
36
```

Use parênteses quando eles tornarem a intenção mais clara, mesmo quando você conhece a regra de precedência.

### Teste mental

Calcule antes de executar:

```python
total = 5 + 4 * 2
media = (5 + 4) / 2
print(total)
print(media)
```

## Números grandes e o separador `_`

Python permite usar `_` para facilitar a leitura de números:

```python
estoque_central = 1_000_000
print(estoque_central)
```

Saída:

```text
1000000
```

O `_` melhora a leitura do código e não aparece no valor exibido.

Não use ponto ou vírgula como separador de milhar em um literal numérico Python:

```python
quantidade = 1_000_000
```

## Formatando valores monetários

Uma f-string pode limitar um número a duas casas decimais:

```python
preco = 8.5
print(f"Preço: R$ {preco:.2f}")
```

Saída:

```text
Preço: R$ 8.50
```

Leia `:.2f` como um padrão útil para exibir um `float` com duas casas. Não é necessário memorizar outros formatos agora.

> **Atenção:** formatação muda a apresentação, não o valor usado no cálculo.

## Prática acompanhada — Custo de reposição

Abra `starter/calculadora_base.py`. Vamos completar o programa em etapas.

### Etapa 1 — Receber o produto

```python
nome_produto = input("Produto: ")
```

O nome permanece como string.

### Etapa 2 — Receber e converter a quantidade

```python
quantidade = int(input("Quantidade comprada: "))
```

Digite um número inteiro válido, como `12`.

### Etapa 3 — Receber e converter o preço

```python
preco_unitario = float(input("Preço unitário: "))
```

Use ponto para a parte decimal, como `8.50`.

### Etapa 4 — Calcular

```python
custo_lote = quantidade * preco_unitario
```

### Etapa 5 — Apresentar o resumo

Use f-strings para apresentar o nome, a quantidade, o preço unitário e o custo do lote. Formate os valores monetários com duas casas decimais.

### Checklist da prática

- [ ] O nome permanece como string.
- [ ] A quantidade é convertida para `int`.
- [ ] O preço é convertido para `float`.
- [ ] O custo usa multiplicação.
- [ ] Os valores monetários aparecem com duas casas.
- [ ] O programa funciona com os dados do exemplo.

> **Pausa sugerida:** este é um bom ponto para o intervalo antes da oficina de depuração.

## Oficina de depuração — Um programa que não quebra

Nem todo erro produz uma mensagem. Abra `starter/soma_textual.py`:

```python
quantidade_atual = input("Quantidade atual: ")
quantidade_recebida = input("Quantidade recebida: ")

quantidade_total = quantidade_atual + quantidade_recebida
print(f"Quantidade total: {quantidade_total}")
```

Use as entradas:

```text
Quantidade atual: 5
Quantidade recebida: 5
```

O programa exibe:

```text
Quantidade total: 55
```

O código executa até o fim, mas o resultado está errado. Isso é um **erro de lógica**.

### Investigue antes de corrigir

1. Qual resultado era esperado?
2. O operador `+` soma números e concatena strings. Qual operação aconteceu?
3. Use `print(type(quantidade_atual))` para testar sua hipótese.
4. Em que momento as entradas devem ser convertidas?
5. Faça a menor alteração possível e execute novamente.

> **Dica:** um programa terminar sem traceback não prova que o resultado está correto. Compare sempre a saída com uma expectativa calculada antecipadamente.

A versão corrigida está em `solucao/` e deverá ser consultada somente depois da investigação e da correção em grupo.

## Exercício independente — Orçamento de reposição

### Contexto

Um responsável pelo estoque precisa estimar o custo de uma reposição e descobrir quantas caixas completas serão formadas.

### Requisitos

Crie `orcamento_reposicao.py`. O programa deverá:

1. perguntar o nome do produto;
2. perguntar a quantidade que será comprada;
3. perguntar o preço unitário;
4. perguntar quantas unidades cabem em cada caixa;
5. calcular o custo total;
6. calcular quantas caixas completas podem ser preenchidas;
7. calcular quantas unidades ficarão fora das caixas completas;
8. apresentar um resumo organizado.

### Restrições de aprendizagem

- Use somente recursos estudados até este capítulo.
- Converta quantidade e capacidade para `int`.
- Converta preço para `float`.
- Use `//` e `%` para caixas e unidades restantes.
- Não use condicionais, listas ou funções.
- Não use inteligência artificial para produzir ou corrigir o código.

### Exemplo de execução

```text
Produto: Marcador
Quantidade comprada: 50
Preço unitário: 3.20
Unidades por caixa: 12

--- ORÇAMENTO ---
Produto: Marcador
Custo total: R$ 160.00
Caixas completas: 4
Unidades restantes: 2
```

### Casos que você deve testar

| Caso | Quantidade | Capacidade | Resultado esperado |
|---|---:|---:|---|
| Divisão exata | 24 | 12 | 2 caixas e 0 restantes |
| Com sobra | 50 | 12 | 4 caixas e 2 restantes |
| Menos que uma caixa | 5 | 12 | 0 caixas e 5 restantes |

Use apenas capacidades maiores que zero. A validação desse limite será estudada no próximo capítulo.

### Pistas graduais

<details>
<summary>Pista 1</summary>

O custo total é a quantidade multiplicada pelo preço unitário.

</details>

<details>
<summary>Pista 2</summary>

Use `quantidade // capacidade` para caixas completas e `quantidade % capacidade` para a sobra.

</details>

A solução comentada está na pasta `solucao/` e deverá ser consultada somente depois da tentativa e da correção em grupo.

## Resumo do capítulo

Neste encontro, você aprendeu que:

- valores possuem tipos;
- `str` representa texto;
- `int` representa números inteiros;
- `float` representa números com parte decimal;
- `bool` possui os valores `True` e `False`;
- `type()` ajuda a investigar o tipo de um valor;
- `input()` sempre retorna uma string;
- `int()` e `float()` convertem textos válidos para números;
- operadores aritméticos permitem calcular novos valores;
- `/`, `//` e `%` respondem perguntas diferentes;
- parênteses tornam a ordem de cálculo explícita;
- um resultado incorreto pode existir sem mensagem de erro.

## Verifique seu aprendizado

Responda antes de executar código.

1. Qual é a diferença entre `"25"` e `25`?
2. Por que um código como `"0015"` pode ser melhor representado por string?
3. Qual tipo é retornado por `input()`?
4. O que acontece em `int("dez")`?
5. Para que servem `//` e `%` no exemplo das caixas?
6. Qual é o resultado de `2 + 3 * 4`? E de `(2 + 3) * 4`?
7. Por que `bool("False")` resulta em `True`?
8. Como `type()` ajudaria a investigar o resultado `55` produzido pela soma de duas entradas `5`?
9. `:.2f` muda o número armazenado ou apenas sua apresentação?

## Tarefa de saída

Crie `total_caixas.py`. O programa deverá:

1. perguntar quantos pacotes foram recebidos;
2. perguntar quantas unidades existem em cada pacote;
3. converter as duas respostas para `int`;
4. calcular o total de unidades;
5. exibir `Total recebido: [valor] unidades.`;
6. ser executado pelo terminal.

### Critérios de conclusão

- [ ] As duas entradas foram convertidas.
- [ ] O cálculo usa multiplicação.
- [ ] O resultado corresponde a um teste feito manualmente.
- [ ] Consigo explicar por que o programa precisa de `int()`.
- [ ] Consigo explicar minha solução com minhas próprias palavras.

## Vocabulário

| Termo | Significado neste capítulo |
|---|---|
| Tipo de dado | Categoria que determina como um valor se comporta. |
| `str` | Tipo usado para strings. |
| `int` | Tipo usado para números inteiros. |
| `float` | Tipo usado para números com parte decimal. |
| `bool` | Tipo lógico com os valores `True` e `False`. |
| Conversão | Produção de um valor de outro tipo. |
| Operador | Símbolo que representa uma operação. |
| Precedência | Ordem em que operações são avaliadas. |
| Literal | Valor escrito diretamente no código, como `12` ou `"Caixa"`. |
| `ValueError` | Erro produzido quando um valor não pode ser usado na conversão solicitada. |
| Erro de lógica | Programa executa, mas produz comportamento ou resultado incorreto. |

## Referências e continuidade

- [Tipos embutidos — documentação oficial do Python](https://docs.python.org/3/library/stdtypes.html)
- [Funções embutidas — `type`, `int`, `float`, `str` e `bool`](https://docs.python.org/3/library/functions.html)
- [Expressões e operadores — referência oficial](https://docs.python.org/3/reference/expressions.html)

No próximo capítulo, usaremos comparações e valores booleanos para validar preços, quantidades e disponibilidade antes de aceitar uma operação.
