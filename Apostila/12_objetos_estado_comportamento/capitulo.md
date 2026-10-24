# Capítulo 12 — Objetos como dados mais comportamento

Nos capítulos anteriores, um produto foi representado por um dicionário, enquanto funções separadas calculavam seu valor, validavam alterações e classificavam o estoque. Essa organização funciona, mas exige passar o registro correto para cada função e conhecer exatamente suas chaves.

Objetos permitem agrupar o estado de um produto e os comportamentos que operam sobre esse estado.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 12 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Classes, instâncias, atributos e métodos |
| Produto do encontro | Uma classe `Produto` com estado e operações próprias |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Baixe e extraia o pacote inicial desta seção. Se estiver usando a pasta completa da apostila, copie `starter/`. Abra a cópia no VS Code.

```text
starter/
├── produto_base.py
└── self_incorreto.py
```

Você precisa saber usar funções, validação com `raise`, dicionários e f-strings.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- explicar classe e instância;
- criar objetos;
- usar `__init__` e `self`;
- distinguir parâmetro de atributo;
- criar métodos de consulta e alteração;
- proteger mudanças de estado com validação;
- criar várias instâncias independentes;
- personalizar apresentação com `__str__()`;
- reconhecer erros causados pela ausência de `self`.

## Situação-problema

Um produto pode ser guardado em um dicionário, mas as regras para calcular seu valor e alterar seu estoque ficam em funções separadas. Conforme o programa cresce, é preciso lembrar quais funções operam sobre o registro e quais chaves elas esperam.

Neste capítulo, cada produto reunirá seus próprios dados e as operações permitidas sobre eles:

```text
Produto
├── estado: nome, preço, quantidade e estoque mínimo
└── comportamento: calcular, classificar, adicionar e remover
```

O objetivo é coordenar dados e regras relacionadas. Não vamos trabalhar com herança, composição ou atributos de classe.

## Do registro ao objeto

Antes:

```python
produto = {"nome": "Caderno", "preco": 8.50, "quantidade": 10}


def calcular_valor(produto):
    return produto["preco"] * produto["quantidade"]
```

Com objeto:

```python
produto.valor_estoque()
```

A intenção fica ligada ao próprio produto. Isso não torna dicionários ruins; cada estrutura resolve problemas diferentes.

## Classe e instância

Uma classe descreve como objetos daquele tipo serão criados e quais operações oferecerão.

```python
class Produto:
    pass
```

Uma instância é um objeto concreto:

```python
caderno = Produto()
caneta = Produto()
```

`caderno` e `caneta` são instâncias diferentes da mesma classe.

## Inicializando com `__init__`

```python
class Produto:
    def __init__(self, nome, preco, quantidade):
        self.nome = nome
        self.preco = preco
        self.quantidade = quantidade
```

Criando:

```python
caderno = Produto("Caderno", 8.50, 10)
```

`__init__` executa durante a criação. Os argumentos correspondem a `nome`, `preco` e `quantidade`. `self` representa a instância que está sendo inicializada e é fornecido automaticamente na chamada.

### Parâmetros e atributos

```python
self.nome = nome
```

- `nome`, à direita, é o parâmetro recebido;
- `self.nome`, à esquerda, é o atributo armazenado no objeto.

Cada instância possui seus próprios atributos:

```python
caderno = Produto("Caderno", 8.50, 10)
caneta = Produto("Caneta", 3.20, 5)

print(caderno.nome)
print(caneta.nome)
```

## Métodos consultam o estado

Método é uma função definida dentro da classe:

```python
class Produto:
    def __init__(self, nome, preco, quantidade):
        self.nome = nome
        self.preco = preco
        self.quantidade = quantidade

    def valor_estoque(self):
        return self.preco * self.quantidade
```

Chamada:

```python
print(caderno.valor_estoque())
```

Não passamos `caderno` entre os parênteses. A chamada pelo objeto fornece `self` automaticamente.

## Métodos alteram o estado

```python
def adicionar_estoque(self, quantidade):
    if quantidade <= 0:
        raise ValueError("A entrada deve ser maior que zero.")
    self.quantidade += quantidade
```

```python
caderno.adicionar_estoque(5)
print(caderno.quantidade)
```

Saída:

```text
15
```

A validação está próxima da mudança que protege.

### Remoção segura

```python
def remover_estoque(self, quantidade):
    if quantidade <= 0:
        raise ValueError("A saída deve ser maior que zero.")
    if quantidade > self.quantidade:
        raise ValueError("Estoque insuficiente.")
    self.quantidade -= quantidade
```

O objeto não aceita terminar em um estado negativo por meio desse método.

## Classificando o estoque

```python
def classificar_estoque(self):
    if self.quantidade == 0:
        return "esgotado"
    if self.quantidade <= self.estoque_minimo:
        return "crítico"
    return "adequado"
```

Para isso, inclua `estoque_minimo` no `__init__`.

A partir deste ponto, a classe passa a ter quatro parâmetros de dados. Substitua a versão anterior por esta versão completa:

```python
class Produto:
    def __init__(self, nome, preco, quantidade, estoque_minimo):
        self.nome = nome
        self.preco = preco
        self.quantidade = quantidade
        self.estoque_minimo = estoque_minimo

    def valor_estoque(self):
        return self.preco * self.quantidade

    def classificar_estoque(self):
        if self.quantidade == 0:
            return "esgotado"
        if self.quantidade <= self.estoque_minimo:
            return "crítico"
        return "adequado"
```

As criações também precisam fornecer o novo argumento:

```python
caderno = Produto("Caderno", 8.50, 10, 3)
caneta = Produto("Caneta", 3.20, 2, 5)
```

Se a classe usar `self.estoque_minimo`, mas o atributo não for criado no `__init__`, a chamada de `classificar_estoque()` causará `AttributeError`. Se a classe esperar quatro dados e a criação ainda fornecer apenas três, ocorrerá `TypeError`.

## Apresentação com `__str__()`

Sem personalização, `print(caderno)` mostra uma representação técnica. `__str__()` define uma forma textual útil:

```python
def __str__(self):
    return f"{self.nome} — {self.quantidade} unidades — R$ {self.preco:.2f}"
```

Agora:

```python
print(caderno)
```

Saída possível:

```text
Caderno — 10 unidades — R$ 8.50
```

`__str__()` retorna uma string; ele não deve imprimir diretamente.

## Validação na criação

Podemos impedir um objeto inválido desde o início:

```python
class Produto:
    def __init__(self, nome, preco, quantidade, estoque_minimo):
        if not nome:
            raise ValueError("O nome é obrigatório.")
        if preco <= 0:
            raise ValueError("O preço deve ser maior que zero.")
        if quantidade < 0 or estoque_minimo < 0:
            raise ValueError("Quantidades não podem ser negativas.")

        self.nome = nome
        self.preco = preco
        self.quantidade = quantidade
        self.estoque_minimo = estoque_minimo
```

O objetivo não é transformar todo atributo em formalidade. Validamos regras que preservam um estado coerente.

## Prática acompanhada — Classe `Produto`

Abra `starter/produto_base.py`. Implemente um método por vez e execute o arquivo depois de cada checkpoint:

1. `__init__` com nome, preço, quantidade e estoque mínimo;
2. validações de criação;
3. `valor_estoque()`;
4. `classificar_estoque()`;
5. `adicionar_estoque()`;
6. `remover_estoque()`;
7. `__str__()`;
8. duas instâncias com valores diferentes;
9. operações que mostrem independência entre elas.

Teste também uma remoção maior que o estoque dentro de `try` / `except ValueError`.

### Checkpoints

| Depois de implementar | Verificação |
|---|---|
| `__init__` | Duas instâncias guardam nomes e quantidades diferentes. |
| `valor_estoque()` | Um produto com preço `8.50` e quantidade `10` retorna `85.0`. |
| `classificar_estoque()` | Quantidade `0` é `esgotado`; quantidade menor ou igual ao mínimo é `crítico`. |
| Métodos de estoque | Alterar uma instância não muda a outra. |
| `__str__()` | `print(produto)` mostra nome, quantidade e preço legíveis. |
| Validações | Uma remoção acima do estoque produz `ValueError` e não altera a quantidade. |

Antes de seguir, confirme:

- [ ] todos os métodos de instância recebem `self` primeiro;
- [ ] cada validação acontece antes da alteração;
- [ ] os métodos de cálculo e classificação usam `return`;
- [ ] as duas instâncias mantêm estados independentes.

> **Pausa sugerida:** este é um bom ponto para o intervalo.

## Oficina de depuração — Quem é `self`?

Abra `starter/self_incorreto.py`:

```python
class Produto:
    def __init__(nome, preco, quantidade):
        nome.nome = nome
        nome.preco = preco
        nome.quantidade = quantidade


caderno = Produto("Caderno", 8.50, 10)
```

Execute o arquivo antes de alterá-lo. A última linha do traceback deve indicar um `TypeError`. O texto exato pode variar conforme a versão do Python.

A primeira posição de um método de instância recebe o próprio objeto automaticamente. Nesse código, o parâmetro chamado `nome` ocupa essa posição, e a chamada ainda fornece três argumentos; por isso, quatro valores tentam ocupar apenas três parâmetros e ocorre `TypeError`.

`self` não é uma palavra reservada de Python, mas é a convenção usada universalmente e será obrigatória neste curso. O defeito não ocorre porque Python procura o nome `self`; ocorre porque falta um parâmetro para receber a instância antes de `nome`, `preco` e `quantidade`.

Investigue:

1. Quantos argumentos aparecem na criação?
2. Qual argumento adicional Python fornece automaticamente?
3. Qual deve ser o primeiro parâmetro de um método de instância?
4. Como diferenciar `self.nome` do parâmetro `nome`?

Corrija somente a assinatura e as atribuições do `__init__`. Ao final, `print(caderno.nome)` deve exibir `Caderno`.

## Exercício independente — Produto controlado

### Contexto

Você vai criar três produtos de um pequeno estoque. Cada objeto deverá proteger suas próprias alterações, sem depender de funções externas para receber o produto como argumento.

### Requisitos

Crie `produto_controlado.py` com uma classe `Produto` que:

- valide nome, preço, quantidade e mínimo;
- calcule o valor em estoque;
- classifique o estoque;
- permita entrada e saída de unidades com validação;
- possua `__str__()`.

Crie três produtos, altere dois deles e prove que os estados são independentes. Capture uma tentativa inválida com `except ValueError`.

Não use herança, atributos de classe, `@classmethod`, composição ou inteligência artificial.

### Testes mínimos

| Ação | Resultado esperado |
|---|---|
| Criar produto com preço `0` | `ValueError` |
| Adicionar `2` a uma quantidade `10` | Quantidade final `12` |
| Remover `1` de uma quantidade `2` | Quantidade final `1` |
| Remover `1` de uma quantidade `0` | `ValueError` e quantidade continua `0` |
| Alterar o primeiro produto | Os demais produtos não mudam |

<details>
<summary>Mostrar pista</summary>

Comece pelo `__init__` e por `__str__()`. Em seguida, implemente um método de consulta por vez. Deixe os métodos que alteram a quantidade por último e valide antes de usar `+=` ou `-=`.

</details>

## Resumo do capítulo

- Classe descreve estrutura e comportamentos.
- Instância é um objeto concreto.
- `__init__` prepara o estado inicial.
- `self` representa a instância atual.
- Atributos guardam estado.
- Métodos consultam ou alteram esse estado.
- Validação protege estados coerentes.
- Instâncias mantêm valores independentes.
- `__str__()` cria uma representação textual útil.

## Verifique seu aprendizado

1. Qual diferença existe entre classe e instância?
2. Quando `__init__` executa?
3. Por que `self` não é informado na chamada comum?
4. Qual diferença existe entre parâmetro e atributo?
5. Onde deve ficar a validação de uma alteração de estoque?
6. Por que `__str__()` retorna em vez de imprimir?

## Tarefa de saída

Crie uma classe `Categoria` com atributo `nome`, método `renomear(novo_nome)` que rejeita string vazia e `__str__()` que retorna o nome. Crie duas instâncias e altere apenas uma.

Conclua quando as duas categorias forem exibidas com nomes diferentes e uma tentativa de renomear com `""` produzir `ValueError` sem apagar o nome anterior.

## Vocabulário

| Termo | Significado |
|---|---|
| Classe | Descrição de um tipo de objeto. |
| Instância | Objeto concreto criado a partir da classe. |
| Atributo | Valor associado ao estado de uma instância. |
| Método | Função pertencente à classe. |
| Estado | Conjunto atual de valores do objeto. |
| Comportamento | Operação oferecida pelo objeto. |
| `self` | Referência à instância atual. |
| Método especial | Método reconhecido por Python, como `__init__` e `__str__`. |

## Referências e continuidade

- [Classes — tutorial oficial do Python](https://docs.python.org/3/tutorial/classes.html)

No próximo capítulo, seus programas passarão a conversar com um modelo de linguagem pela internet. Os objetos voltam no Capítulo 14, quando uma classe `Inventario` passará a coordenar vários objetos `Produto` por composição.
