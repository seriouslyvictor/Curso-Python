from google import genai

MODELO = "gemini-3.8-flash"
INSTRUCAO = "Você é um assistente simpático. Responda em no máximo duas frases."

cliente = genai.Client()

mensagem = input("Você: ").strip()
while mensagem != "sair":
    id_anterior = None
    resposta = cliente.interactions.create(
        model=MODELO,
        input=mensagem,
        system_instruction=INSTRUCAO,
        previous_interaction_id=id_anterior,
    )
    print(f"Assistente: {resposta.output_text}\n")
    id_anterior = resposta.id

    mensagem = input("Você: ").strip()
