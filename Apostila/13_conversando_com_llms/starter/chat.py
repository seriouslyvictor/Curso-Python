from google import genai

from personagens import personalidades

MODELO = "gemini-3.8-flash"


def criar_cliente():
    # TODO 1: crie e retorne o cliente.
    # Se a chave não existir, genai.Client() gera ValueError:
    # mostre uma mensagem em português e retorne None.
    pass


def escolher_personagem():
    # TODO 2: exiba os personagens numerados a partir de 1,
    # repita a pergunta até receber um número válido
    # e retorne o nome escolhido.
    pass


def conversar(cliente, nome, instrucao):
    print(f"\nVocê está conversando com {nome}. Digite 'sair' para encerrar.\n")

    # TODO 3: leia uma mensagem, envie ao modelo com a instrução de sistema
    #         e exiba a resposta com o nome do personagem.
    # TODO 4: repita até a mensagem ser "sair".
    # TODO 5: guarde o id da última resposta e envie-o na próxima chamada.
    # TODO 6: não envie mensagens vazias.
    # TODO 7: proteja a chamada à API com try / except.
    pass


cliente = criar_cliente()
if cliente is not None:
    nome = escolher_personagem()
    conversar(cliente, nome, personalidades[nome])
