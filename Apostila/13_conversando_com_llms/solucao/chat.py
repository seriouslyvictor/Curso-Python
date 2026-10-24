from google import genai

from personagens import personalidades

MODELO = "gemini-3.8-flash"


def criar_cliente():
    try:
        return genai.Client()
    except ValueError:
        print("Chave de API não encontrada.")
        print("Grave a chave com setx GEMINI_API_KEY e reinicie o VS Code.")
        return None


def escolher_personagem():
    nomes = list(personalidades)

    print("Com quem você quer conversar?")
    for indice in range(len(nomes)):
        print(f"{indice + 1}. {nomes[indice]}")

    escolha = 0
    while escolha < 1 or escolha > len(nomes):
        try:
            escolha = int(input("Digite o número: "))
        except ValueError:
            print("Digite apenas o número da opção.")

    return nomes[escolha - 1]


def conversar(cliente, nome, instrucao):
    print(f"\nVocê está conversando com {nome}. Digite 'sair' para encerrar.\n")
    id_anterior = None

    mensagem = input("Você: ").strip()
    while mensagem != "sair":
        if mensagem == "":
            print("Digite alguma mensagem.")
        else:
            try:
                resposta = cliente.interactions.create(
                    model=MODELO,
                    input=mensagem,
                    system_instruction=instrucao,
                    previous_interaction_id=id_anterior,
                )
                print(f"{nome}: {resposta.output_text}\n")
                id_anterior = resposta.id
            except Exception as erro:
                print("[Não foi possível obter uma resposta agora. Tente novamente.]")
                print(f"[Detalhe: {str(erro)[:150]}]\n")

        mensagem = input("Você: ").strip()


cliente = criar_cliente()
if cliente is not None:
    nome = escolher_personagem()
    conversar(cliente, nome, personalidades[nome])
