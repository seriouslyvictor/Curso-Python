from google import genai

cliente = genai.Client()

primeira = cliente.interactions.create(
    model="gemini-3.8-flash",
    input="Meu nome é Ana. Responda apenas 'ok'.",
)
print(primeira.output_text)

# Antes de executar, preveja: o modelo vai lembrar o nome?
segunda = cliente.interactions.create(
    model="gemini-3.8-flash",
    input="Qual é o meu nome?",
)
print(segunda.output_text)
