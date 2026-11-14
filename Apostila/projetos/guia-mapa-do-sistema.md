O **Mapa do sistema** é um documento de uma ou duas páginas que mostra que a equipe entende o que construiu. Ele não pede que cada linha de código seja explicada; pede que qualquer pessoa da equipe consiga responder: *que partes existem, onde ficam os dados, quem pode fazer o quê e o que é preciso para colocar no ar.*

Ele é um **entregável obrigatório** e serve de roteiro para as perguntas da apresentação. Coloquem-no no repositório como `MAPA.md`.

> **Dica**
> Preencham o mapa **durante** o projeto, não no fim. Ao criar uma rota, adicionem uma linha na tabela. Se usarem IA, peçam a ela um rascunho e corrijam o que estiver errado. Corrigir também é aprender.

## Modelo

Copiem o modelo abaixo e preencham com o seu projeto. O exemplo usa o Achados e perdidos.

````text
# Mapa do sistema – Achados e perdidos

Endereço publicado: https://equipe-achados.pythonanywhere.com
Repositório: https://github.com/equipe/achados-e-perdidos

## 1. Rotas

| Método | Rota                    | O que faz                        | Exige login? |
|--------|-------------------------|----------------------------------|--------------|
| GET    | /                       | Lista objetos guardados          | Sim          |
| GET    | /objetos/novo           | Mostra o formulário de cadastro  | Sim          |
| POST   | /objetos/novo           | Salva um novo objeto             | Sim          |
| POST   | /objetos/<id>/devolver  | Registra a devolução             | Sim          |
| GET    | /historico              | Lista objetos devolvidos         | Sim          |
| GET    | /login                  | Formulário de login              | Não          |

## 2. Dados

Banco: SQLite, arquivo dados.db (criado por schema.sql)

- objetos: id, descricao, categoria, local_guarda, data_achado, situacao
- devolucoes: id, objeto_id → objetos.id, nome_retirante, documento, data
- usuarios: id, email, senha_hash

Regra garantida no código: um objeto com situacao = "devolvido"
não aceita nova devolução (rota /objetos/<id>/devolver).

## 3. Acesso e segurança

- Público: apenas a tela de login.
- Equipe da recepção: tudo o mais, após login.
- Senhas guardadas com generate_password_hash.
- Segredos no .env (SECRET_KEY). O .env não está no Git.
- Dados pessoais guardados: nome de quem retirou e documento.
  Combinado com a instituição em 12/03.

## 4. Dependências

| Pacote        | Para quê                       |
|---------------|--------------------------------|
| flask         | Rotas e templates              |
| python-dotenv | Ler o .env                     |

## 5. Deploy

- Hospedagem: PythonAnywhere (conta gratuita), Python 3.12
- Para atualizar: git pull, Reload na aba Web
- Variáveis no servidor: SECRET_KEY (no .env do servidor)
- Backup: baixar dados.db toda sexta-feira (responsável: Carla)
- Limitações conhecidas: a aplicação gratuita precisa ser
  renovada a cada 3 meses na aba Web.
````

## O que cada seção responde

| Seção | Pergunta que responde | Como conferir |
| --- | --- | --- |
| **Rotas** | Que partes o sistema tem? | Todas as funções com `@app.route` estão na tabela? |
| **Dados** | Onde ficam as informações e como se ligam? | A lista bate com o `schema.sql`? |
| **Acesso** | Quem pode fazer o quê? O que está protegido? | Saia do login e tente abrir cada rota "Sim" pela URL. Ela deve bloquear. |
| **Dependências** | O que o sistema precisa para rodar? | A lista bate com o `requirements.txt`? Cada pacote tem um motivo? |
| **Deploy** | Como colocar no ar e manter funcionando? | Alguém que não publicou consegue atualizar seguindo só estas notas? |

## Perguntas que podem aparecer na apresentação

Qualquer pessoa da equipe deve conseguir responder:

- Mostre a rota que registra a devolução. O que impede uma devolução duplicada?
- Se eu digitar a URL de cadastro sem estar logado, o que acontece?
- Onde a senha dos usuários fica guardada? Em que formato?
- Por que vocês instalaram este pacote?
- O que precisaria mudar para o sistema guardar fotos?
- Se o servidor apagar o banco hoje, o que vocês perdem?

> **Teste mental**
> Escolham uma pessoa da equipe que **não** trabalhou na parte de login. Ela consegue explicar, olhando só para o mapa, quais rotas são protegidas e por quê? Se não consegue, o mapa precisa de ajustes.
