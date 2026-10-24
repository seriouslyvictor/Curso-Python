from google import genai

cliente = genai.Client()

resposta = cliente.interactions.create(
    model="gemini-3.8-flash",
    input="Explique em uma frase o que é Python.",
)

print(resposta.output_text)
