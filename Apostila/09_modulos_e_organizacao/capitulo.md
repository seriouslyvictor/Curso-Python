# Capítulo 9 — Módulos e organização em arquivos

Funções organizam responsabilidades dentro de um arquivo. Quando o programa cresce, ainda podemos terminar com dezenas de funções misturadas à entrada e à apresentação. Módulos permitem separar o código em arquivos importáveis.

Neste encontro, criaremos um arquivo para regras do inventário e outro para a execução principal.

## Visão geral do encontro

| Item | Informação |
|---|---|
| Encontro | 9 de 16 |
| Duração agendada | 4 horas, incluindo intervalo |
| Tema central | Imports, módulos próprios e ponto de entrada |
| Produto do encontro | Um programa dividido em arquivos com responsabilidades distintas |
| Uso de IA | Proibido neste encontro |

## Antes de começar

Copie a pasta `starter/` inteira. Os arquivos precisam permanecer juntos.

```text
starter/
├── app_base.py
├── importar_efeito.py
├── modulo_com_efeito.py
└── regras_estoque.py
```

Você precisa saber criar e chamar funções, trabalhar com listas e dicionários e executar um arquivo pelo terminal.

## Objetivos de aprendizagem

Ao concluir este capítulo, você deverá conseguir:

- explicar o que é um módulo;
- importar módulos da biblioteca padrão;
- usar `import modulo` e `from modulo import nome`;
- criar e importar um módulo próprio;
- separar regras de interação;
- criar uma função `main()`;
- usar `if __name__ == "__main__":`;
- reconhecer efeitos indesejados durante importação;
- diagnosticar `ModuleNotFoundError` básico.

## O que é um módulo?

Um módulo é um arquivo Python que pode fornecer funções, variáveis e classes a outros arquivos.

```python
import random
```

`random` pertence à biblioteca padrão, instalada junto com Python.

```python
numero = random.randint(1, 10)
print(numero)
```

O ponto indica que `randint` pertence ao módulo `random`.

### Outras operações úteis de `random`

```python
categorias = ["Papelaria", "Limpeza", "Alimentos"]

print(random.choice(categorias))
print(random.random())
random.shuffle(categorias)
print(categorias)
```

- `choice()` escolhe um item;
- `random()` produz um `float` de `0.0` até antes de `1.0`;
- `shuffle()` embaralha a própria lista.

Esses exemplos demonstram módulos; aleatoriedade não será o foco do projeto.

## Duas formas de importar

```python
import random
numero = random.randint(1, 10)
```

O nome do módulo deixa a origem visível.

```python
from random import randint
numero = randint(1, 10)
```

A segunda forma importa um nome específico. Neste curso, prefira a primeira quando ela tornar a origem mais clara.

## Criando um módulo próprio

Crie `regras_estoque.py`:

```python
def calcular_valor(quantidade, preco):
    return quantidade * preco


def classificar(quantidade, minimo):
    if quantidade < 0 or minimo < 0:
        return "inválido"
    if quantidade == 0:
        return "esgotado"
    if quantidade <= minimo:
        return "crítico"
    return "adequado"
```

Em `app.py`, importe o módulo:

```python
import regras_estoque

valor = regras_estoque.calcular_valor(4, 8.50)
situacao = regras_estoque.classificar(4, 5)

print(valor)
print(situacao)
```

Saída:

```text
34.0
crítico
```

Os dois arquivos devem estar na mesma pasta para este exemplo.

```text
projeto/
├── app.py
└── regras_estoque.py
```

> **Erro comum:** nomear o próprio arquivo `random.py`. Isso pode esconder o módulo da biblioteca padrão. Dê nomes relacionados à responsabilidade do arquivo.

## Separando regras e interação

Uma divisão simples:

- `regras_estoque.py`: cálculos e classificações;
- `app.py`: `input()`, chamadas e `print()`.

Essa separação permite testar regras sem responder perguntas no terminal e prepara a substituição futura da interface textual por Streamlit.

## A função `main()`

`main()` reúne o fluxo principal:

```python
import regras_estoque


def main():
    quantidade = int(input("Quantidade: "))
    preco = float(input("Preço: "))
    valor = regras_estoque.calcular_valor(quantidade, preco)
    print(f"Valor: R$ {valor:.2f}")


main()
```

Não existe palavra reservada especial chamada `main` em Python. É uma convenção que comunica onde o fluxo principal começa.

## Executar ou importar com segurança

Quando um arquivo é executado diretamente, Python define a variável especial `__name__` como `"__main__"`. Quando ele é importado, `__name__` recebe o nome do módulo.

```python
def main():
    print("Aplicação iniciada.")


if __name__ == "__main__":
    main()
```

Esse bloco significa: execute `main()` somente quando este arquivo for o ponto de entrada.

Não é preciso compreender todos os detalhes internos agora. O benefício prático é evitar que a interação execute apenas porque outro arquivo foi importado.

## Efeitos durante importação

Considere `modulo.py`:

```python
def saudacao():
    return "Módulo disponível."


print("Esta mensagem executa durante o import.")
```

Ao executar `import modulo`, a mensagem aparece. Instruções no nível principal são executadas na primeira importação.

Testes demonstrativos devem ser protegidos:

```python
if __name__ == "__main__":
    print(saudacao())
```

## Quando o módulo não é encontrado

`ModuleNotFoundError` pode indicar:

- nome digitado incorretamente;
- arquivo em outra pasta;
- execução iniciada de um local inesperado;
- arquivo não salvo;
- pacote externo não instalado.

Neste capítulo, confirme primeiro nome, extensão e pasta. Não instale pacotes para resolver a importação de um arquivo que deveria ser local.

## Prática acompanhada — Duas camadas

Abra `starter/regras_estoque.py` e `starter/app_base.py`.

1. Complete `calcular_valor()` e `classificar()` no módulo.
2. Importe `regras_estoque` em `app_base.py`.
3. Crie `main()` com as entradas.
4. Chame as funções usando o nome do módulo.
5. Proteja a chamada de `main()` com o `__name__` guard.
6. Execute `python app_base.py` a partir da pasta `starter`.

### Checklist

- [ ] `app_base.py` importa `regras_estoque`.
- [ ] `main()` recebe nome, quantidade, preço e estoque mínimo.
- [ ] As funções são chamadas com o prefixo `regras_estoque.`.
- [ ] A chamada de `main()` está protegida pelo `__name__` guard.
- [ ] O resumo exibe nome, valor formatado e situação.

Teste com:

| Entrada | Resultado esperado |
|---|---|
| Nome `Caderno`, quantidade `4`, preço `8.50`, mínimo `5` | `Caderno: R$ 34.00 — crítico` |
| Nome `Caneta`, quantidade `0`, preço `3.20`, mínimo `5` | `Caneta: R$ 0.00 — esgotado` |

> **Pausa sugerida:** este é um bom ponto para o intervalo.

## Oficina de depuração — Importação com surpresa

Execute `starter/importar_efeito.py`. Uma mensagem de teste aparece antes da mensagem esperada porque `modulo_com_efeito.py` executa um `print()` durante a importação.

Antes da correção:

```text
Teste interno executado durante a importação.
Função importada com sucesso.
```

Investigue:

1. Qual arquivo contém a mensagem inesperada?
2. Ela está dentro de uma função?
3. O que acontece no nível principal durante o import?
4. Como o `__name__` guard protege o teste?

Mova apenas o `print()` de teste para um `__name__` guard e execute `importar_efeito.py` novamente. A saída deverá conter somente:

```text
Função importada com sucesso.
```

## Exercício independente — Orçamento modular

Crie uma pasta com:

```text
orcamento/
├── app.py
└── calculos.py
```

Abra a pasta `orcamento/` no VS Code. Com o terminal posicionado nessa pasta, execute `python app.py`; assim o Python encontrará `calculos.py` ao importar o módulo.

Em `calculos.py`, crie:

- `calcular_custo(quantidade, preco)`;
- `calcular_caixas(quantidade, capacidade)`;
- `calcular_sobra(quantidade, capacidade)`.

Em `app.py`:

1. importe `calculos`;
2. crie `main()`;
3. receba os dados;
4. chame as três funções;
5. apresente o resumo;
6. use o `__name__` guard.

Considere somente entradas válidas e use uma capacidade maior que zero. Não use arquivos JSON, classes ou inteligência artificial.

### Teste mínimo

Use quantidade `25`, preço `4.00` e capacidade `6`:

```text
Custo: R$ 100.00
Caixas completas: 4
Unidades restantes: 1
```

<details>
<summary>Pista</summary>

Em `calculos.py`, use multiplicação para o custo, divisão inteira para as caixas completas e resto da divisão para as unidades restantes.

</details>

## Resumo do capítulo

- Um módulo é um arquivo Python importável.
- A biblioteca padrão acompanha Python.
- `import modulo` preserva a origem dos nomes.
- Arquivos próprios podem ser importados quando estão organizados corretamente.
- Regras podem ser separadas da interação.
- `main()` comunica o fluxo principal.
- O `__name__` guard evita execução indesejada durante importação.
- `ModuleNotFoundError` exige verificar nome, local e instalação.

## Verifique seu aprendizado

1. O que diferencia um módulo de uma função?
2. Qual diferença existe entre `import random` e `from random import randint`?
3. Por que separar regras de `input()` e `print()`?
4. `main()` é uma exigência da linguagem?
5. O que o `__name__` guard evita?
6. Quais verificações fazer diante de `ModuleNotFoundError`?

## Tarefa de saída

Crie `mensagens.py` com uma função que retorna um cabeçalho. Importe-a em `app.py`, crie `main()` e proteja a chamada.

### Critérios

- [ ] `mensagens.py` não executa `input()` nem `print()` durante a importação.
- [ ] `app.py` chama a função usando o nome do módulo.
- [ ] A chamada de `main()` está protegida.
- [ ] Consigo explicar por que os dois arquivos têm responsabilidades diferentes.

## Vocabulário

| Termo | Significado |
|---|---|
| Módulo | Arquivo Python importável. |
| Biblioteca padrão | Conjunto de módulos distribuídos com Python. |
| Namespace | Contexto que organiza nomes, como `random.randint`. |
| Ponto de entrada | Arquivo e função que iniciam o fluxo principal. |
| Efeito colateral | Ação produzida além de entregar um valor, como imprimir durante importação. |
| `ModuleNotFoundError` | Erro quando um módulo solicitado não é localizado. |

## Referências e continuidade

- [Módulos — tutorial oficial](https://docs.python.org/3/tutorial/modules.html)
- [Módulo `random`](https://docs.python.org/3/library/random.html)

No próximo capítulo, usaremos módulos para ler e gravar dados persistentes em texto e JSON.
