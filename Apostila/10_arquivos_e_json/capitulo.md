# Capítulo 10 — Arquivos de texto e JSON

Variáveis, listas e dicionários existem enquanto o programa está executando. Quando ele termina, esses valores desaparecem. Arquivos permitem persistir informações para uma execução futura.

Neste encontro, vamos ler e gravar texto e usar JSON para preservar uma lista de produtos.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 10 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Leitura, gravação e persistência em JSON |
| Produto do encontro | Um catálogo carregado e salvo em arquivo |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Este capítulo é autocontido. Baixe e extraia o pacote inicial desta seção. Se estiver usando a pasta completa da apostila, copie `starter/`. Abra a cópia no VS Code e mantenha o terminal nessa pasta.

```text
starter/
├── catalogo_base.py
├── modo_incorreto.py
├── produtos.json
└── rascunho.txt
```

Você precisa saber usar módulos, listas de dicionários, laços e funções.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- explicar por que dados em variáveis não são persistentes;
- abrir arquivos com `with`;
- usar os modos `r`, `w` e `a`;
- trabalhar com codificação UTF-8;
- usar `read()`, `readlines()` e `write()`;
- reconhecer o risco de sobrescrita;
- carregar JSON com `json.load()`;
- gravar JSON com `json.dump()`;
- identificar estruturas compatíveis com JSON;
- diagnosticar uma operação incompatível com o modo do arquivo.

## Situação-problema

Um catálogo funciona durante a execução, mas volta a ficar vazio sempre que o programa termina. Para continuar o trabalho depois, precisamos gravar os produtos em um arquivo e carregá-los na próxima execução.

Neste capítulo, arquivos de texto guardarão anotações simples e JSON preservará uma lista de produtos com seus campos.

## Abrindo com `with`

```python
with open("rascunho.txt", mode="r", encoding="utf-8") as arquivo:
    conteudo = arquivo.read()

print(conteudo)
```

`with` mantém o arquivo aberto durante o bloco e garante seu fechamento ao sair. `arquivo` representa a conexão temporária com o arquivo.

### Caminho relativo

`"rascunho.txt"` é um caminho relativo. Python procura o arquivo a partir da pasta de trabalho do terminal. Para estes exemplos, abra o terminal na pasta que contém o script e o arquivo de dados.

> **Erro comum:** o arquivo existe, mas o programa é iniciado em outra pasta. Confira o prompt do terminal e a estrutura do projeto.

## Modos de abertura

| Modo | Uso | Cuidado |
|---|---|---|
| `r` | Ler | O arquivo precisa existir. |
| `w` | Escrever do início | Apaga o conteúdo anterior ao abrir. |
| `a` | Acrescentar ao final | Não substitui o conteúdo existente. |

### Leitura completa

```python
with open("rascunho.txt", mode="r", encoding="utf-8") as arquivo:
    conteudo = arquivo.read()
```

### Leitura por linhas

```python
with open("rascunho.txt", mode="r", encoding="utf-8") as arquivo:
    linhas = arquivo.readlines()

for linha in linhas:
    print(linha.strip())
```

`readlines()` retorna uma lista. `strip()` remove espaços e quebras de linha das extremidades para apresentação.

### Gravação com `w`

```python
with open("resumo.txt", mode="w", encoding="utf-8") as arquivo:
    arquivo.write("Resumo do estoque\n")
    arquivo.write("Total de produtos: 4\n")
```

`write()` não adiciona quebra automaticamente. Use `\n` quando precisar iniciar outra linha.

> **Atenção:** abrir com `w` limpa o arquivo imediatamente. Confirme o caminho antes de executar.

### Acréscimo com `a`

```python
with open("historico.txt", mode="a", encoding="utf-8") as arquivo:
    arquivo.write("Produto cadastrado: Caderno\n")
```

Cada execução acrescenta uma linha ao final.

## Por que UTF-8?

Codificação define como caracteres são transformados em bytes. Declarar `encoding="utf-8"` ajuda a preservar acentos e torna a intenção explícita.

Use a mesma codificação para gravar e ler.

## JSON representa dados estruturados

Um arquivo `produtos.json` pode conter:

```json
[
  {
    "nome": "Caderno",
    "preco": 8.5,
    "quantidade": 10
  },
  {
    "nome": "Caneta",
    "preco": 3.2,
    "quantidade": 5
  }
]
```

JSON possui semelhanças com listas e dicionários, mas é um formato de texto independente de Python. Strings e chaves usam aspas duplas.

## Carregando JSON

```python
import json

with open("produtos.json", mode="r", encoding="utf-8") as arquivo:
    produtos = json.load(arquivo)

print(type(produtos))
print(produtos[0]["nome"])
```

`json.load()` lê o arquivo e converte sua estrutura para valores Python.

Saída para o exemplo de `produtos.json`:

```text
<class 'list'>
Caderno
```

## Gravando JSON

```python
import json

produtos = [
    {"nome": "Caderno", "preco": 8.50, "quantidade": 10},
]

with open("produtos.json", mode="w", encoding="utf-8") as arquivo:
    json.dump(produtos, arquivo, ensure_ascii=False, indent=2)
```

- `ensure_ascii=False` preserva os caracteres legíveis;
- `indent=2` organiza o arquivo para leitura humana.

`json.dump()` grava no arquivo. `json.dumps()` produziria uma string; não precisamos dele nesta atividade.

## Valores compatíveis

JSON representa diretamente:

- dicionários com chaves textuais;
- listas;
- strings;
- números;
- booleanos;
- ausência de valor (`None` vira `null`).

Objetos personalizados, que estudaremos mais adiante, precisarão ser transformados em dicionários antes da gravação.

## Prática acompanhada — Carregar, alterar e salvar

Abra `starter/catalogo_base.py`.

1. Importe `json`.
2. Abra `produtos.json` em modo de leitura.
3. Carregue a lista.
4. Exiba cada produto com um `for`.
5. Crie um novo dicionário com dados fornecidos no arquivo.
6. Adicione-o à lista.
7. Abra o mesmo arquivo em modo `w`.
8. Grave a lista com UTF-8 e indentação.
9. Abra o JSON no VS Code e confira o resultado.

Trabalhe em uma cópia. O exercício modifica o arquivo.

Com os arquivos iniciais, a saída esperada é:

```text
Caderno: 10
Caneta: 5
Produtos salvos: 3
```

Antes de continuar, confira se `produtos.json` possui três produtos e continua legível no VS Code.

> **Pausa sugerida:** este é um bom ponto para o intervalo.

## Oficina de depuração — Modo incompatível

Abra `starter/modo_incorreto.py`:

```python
with open("rascunho.txt", mode="w", encoding="utf-8") as arquivo:
    conteudo = arquivo.read()
```

O modo `w` permite escrita, não leitura. Além disso, ele apaga o conteúdo quando abre o arquivo.

Investigue:

1. Qual operação o programa tenta fazer?
2. Qual modo foi escolhido?
3. O arquivo deveria ser apenas lido ou substituído?
4. Qual modo atende à intenção?
5. Por que essa atividade usa uma cópia descartável?

## Exercício independente — Catálogo persistente

Crie `adicionar_produto.py` e uma cópia limpa de `produtos.json`.

O programa deverá:

1. carregar a lista existente;
2. receber nome, categoria, preço e quantidade;
3. criar um dicionário;
4. acrescentá-lo à lista;
5. gravar a lista inteira no mesmo JSON;
6. exibir quantos produtos estão cadastrados;
7. encerrar sem menu e sem repetição de cadastro.

Não use tratamento de exceções, classes ou inteligência artificial. Use entradas válidas e execute em uma cópia.

Partindo do JSON inicial, o programa deve terminar com:

```text
Produtos cadastrados: 3
```

<details>
<summary>Mostrar pista</summary>

Primeiro use `json.load()`. Depois de `append()`, abra novamente com `w` e use `json.dump()`.

</details>

## Resumo do capítulo

- Dados em memória desaparecem ao fim da execução.
- `with` gerencia abertura e fechamento.
- `r` lê, `w` substitui e `a` acrescenta.
- `encoding="utf-8"` explicita a codificação.
- `read()` lê tudo e `readlines()` cria uma lista de linhas.
- `write()` não acrescenta quebra automaticamente.
- JSON representa dados estruturados em texto.
- `json.load()` carrega e `json.dump()` grava.
- `ensure_ascii=False` e `indent` melhoram a leitura do arquivo.

## Verifique seu aprendizado

1. O que acontece ao abrir um arquivo existente com `w`?
2. Quando usar `a`?
3. Por que usar `with`?
4. Qual diferença existe entre `read()` e `readlines()`?
5. O que `json.load()` retorna para uma lista JSON?
6. Por que trabalhar em cópia durante os primeiros testes de gravação?

## Tarefa de saída

Crie `salvar_resumo.py` que grava nome, quantidade e preço de um produto em `resumo.txt`, uma informação por linha. Depois, abra o arquivo em modo de leitura e exiba seu conteúdo.

Conclua quando o terminal e o arquivo mostrarem as mesmas três informações, cada uma em sua própria linha.

## Vocabulário

| Termo | Significado |
|---|---|
| Persistência | Permanência dos dados depois da execução. |
| Caminho relativo | Localização interpretada a partir da pasta de trabalho. |
| Codificação | Regra que representa caracteres como bytes. |
| Serialização | Conversão de uma estrutura para formato armazenável. |
| JSON | Formato textual de dados estruturados. |
| Sobrescrita | Substituição do conteúdo anterior. |

## Referências e continuidade

- [Leitura e escrita de arquivos](https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files)
- [Módulo `json`](https://docs.python.org/3/library/json.html)

No próximo capítulo, protegeremos leitura, conversão e gravação contra falhas previsíveis.
