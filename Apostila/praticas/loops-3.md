## Antes de começar

Pratique for loop, múltiplos acumuladores, contador, .append() com dados inspirados em API de Game. Copie os dados para um arquivo Python e resolva na sua IDE. Os dados já estão disponíveis: você não precisa consultar uma API nem configurar uma chave de acesso.

## Dados para praticar

```python
dados = {
    "personagem": "Guerreiro",
    "nivel": 15,
    "inventario": [
        {"item": "Espada de Ferro", "tipo": "arma", "dano": 25, "valor": 150},
        {"item": "Escudo de Madeira", "tipo": "defesa", "defesa": 10, "valor": 80},
        {"item": "Poção de Vida", "tipo": "consumivel", "cura": 50, "valor": 30},
        {"item": "Poção de Vida", "tipo": "consumivel", "cura": 50, "valor": 30},
        {"item": "Anel de Força", "tipo": "acessorio", "bonus": 5, "valor": 200},
        {"item": "Arco Longo", "tipo": "arma", "dano": 20, "valor": 120},
        {"item": "Poção de Mana", "tipo": "consumivel", "cura": 30, "valor": 25}
    ]
}
```

## Sua missão

1. Imprima todos os itens e seus valores em ouro:
   "Espada de Ferro - 150 ouro"

2. Calcule o valor total do inventário.

3. Conte quantos itens consumíveis o personagem tem.

4. Imprima os nomes dos itens que valem mais de 100 de ouro.

## Saída esperada

Compare o resultado do seu programa com esta referência.

```text
Espada de Ferro - 150 ouro
Escudo de Madeira - 80 ouro
Poção de Vida - 30 ouro
Poção de Vida - 30 ouro
Anel de Força - 200 ouro
Arco Longo - 120 ouro
Poção de Mana - 25 ouro

Valor total: 635 ouro
Consumíveis: 3
Itens valiosos (>100): Espada de Ferro, Anel de Força, Arco Longo
```

## Precisa de uma dica?

<details>
<summary>Dica 1</summary>

O inventário é uma lista de itens. Passe por cada um com um "for" — como se estivesse abrindo a mochila e vendo item por item. Comece só imprimindo o nome e valor de cada um.

</details>

<details>
<summary>Dica 2</summary>

Você vai precisar de "ajudantes" — variáveis que ficam anotando coisas enquanto você percorre os itens. Um ajudante soma o valor total, outro conta os consumíveis. Crie eles antes do loop, zerados.

</details>

<details>
<summary>Dica 3</summary>

Para o valor total: total += item["valor"]. Para consumíveis: if item["tipo"] == "consumivel", aí soma 1 no contador. Para itens valiosos, crie uma lista vazia antes do loop e use .append() para guardar o nome dos itens com valor > 100.

</details>

<details>
<summary>Dica extra</summary>

Use contadores separados: um para o total de valor, outro para contar consumíveis. Para itens valiosos, tente acumular em uma lista com .append().

</details>

## Verifique seu aprendizado

- Execute o programa e compare a saída com a referência.
- Altere um valor dos dados e observe como o resultado muda.
- Explique como você usou: for loop, múltiplos acumuladores, contador, .append().

Marque a prática como concluída quando conseguir explicar sua solução.
