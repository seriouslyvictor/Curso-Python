A recomendação para os três projetos é **Flask + SQLite + templates HTML**, publicada no **PythonAnywhere**. É uma combinação pequena, toda em Python, que a equipe consegue entender por inteiro e publicar de graça.

## Por que esta stack

| Peça | O que faz | Por que escolhemos |
| --- | --- | --- |
| **Flask** | Recebe as requisições e decide o que responder em cada rota | Pouco código para começar; cada rota é uma função Python que vocês já sabem escrever |
| **SQLite** | Guarda os dados em um único arquivo `.db` | Vem com o Python (`import sqlite3`), não precisa de servidor e funciona no PythonAnywhere |
| **Jinja (templates)** | Monta o HTML das páginas com os dados | Já vem com o Flask; nada de framework de front-end para aprender |
| **CSS simples** | Aplica o design system | Um arquivo `static/style.css` com as variáveis de cor e tipografia da equipe |

> **Atenção**
> Streamlit é ótimo para protótipos, mas **não roda no PythonAnywhere**, que só aceita aplicações web no padrão WSGI (Flask, Django). Se a equipe prototipar em Streamlit, planeje a migração para Flask antes da publicação.

## Estrutura de pastas sugerida

```text
achados-e-perdidos/
├── app.py              ← cria o Flask e define as rotas
├── db.py               ← funções que conversam com o SQLite
├── schema.sql          ← CREATE TABLE de todas as tabelas
├── requirements.txt    ← dependências com versão
├── .env                ← segredos (NUNCA vai para o Git)
├── .gitignore          ← inclui .env, *.db, .venv/
├── README.md           ← como instalar, rodar e publicar
├── templates/
│   ├── base.html       ← layout comum (cabeçalho, menu, mensagens)
│   ├── lista.html
│   └── formulario.html
└── static/
    └── style.css       ← o design system em CSS
```

## Começando do zero

No terminal do VS Code, dentro da pasta do projeto:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install flask python-dotenv
pip freeze > requirements.txt
```

Um `app.py` mínimo, com uma rota de listagem e uma de cadastro:

```python
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "troque-isto-e-leia-do-.env"


def conectar():
    conexao = sqlite3.connect("dados.db")
    conexao.row_factory = sqlite3.Row  # permite usar linha["nome"]
    return conexao


@app.route("/")
def lista():
    with conectar() as conexao:
        objetos = conexao.execute("SELECT * FROM objetos ORDER BY data DESC").fetchall()
    return render_template("lista.html", objetos=objetos)


@app.route("/novo", methods=["GET", "POST"])
def novo():
    if request.method == "POST":
        descricao = request.form["descricao"].strip()
        if not descricao:
            flash("Descreva o objeto.", "erro")
            return render_template("formulario.html"), 400
        with conectar() as conexao:
            conexao.execute(
                "INSERT INTO objetos (descricao, data) VALUES (?, date('now'))",
                (descricao,),
            )
        flash("Objeto cadastrado.", "sucesso")
        return redirect(url_for("lista"))
    return render_template("formulario.html")


if __name__ == "__main__":
    app.run(debug=True)
```

> **Segurança**
> Sempre use `?` nos comandos SQL e passe os valores separados, como no exemplo. Montar o SQL com f-string (`f"... WHERE id = {id}"`) abre espaço para **injeção de SQL**.

## Login e áreas protegidas

Quase todo projeto tem uma parte **pública** (consultar eventos) e uma **protegida** (cadastrar, editar, cancelar). Para começar:

- Guarde senhas com `generate_password_hash` e confira com `check_password_hash`, de `werkzeug.security` (já instalado com o Flask). **Nunca** guarde a senha em texto puro.
- Use a `session` do Flask para lembrar quem está logado; ela depende de uma `SECRET_KEY` forte, lida do `.env`.
- Crie um decorador `@login_obrigatorio` e aplique-o em toda rota que altera dados.
- Se preferir algo pronto, a extensão **Flask-Login** cuida da sessão do usuário.

Proteger o link no menu não basta: **a rota em si** precisa conferir o login, senão qualquer pessoa que digitar a URL entra.

## Dependências e o que elas mudam no deploy

Cada pacote no `requirements.txt` precisa ser instalado também no servidor. Antes de adicionar um, pergunte:

- **Ele é mesmo necessário?** Muitos pacotes resolvem o que a biblioteca padrão já resolve.
- **A versão está fixada?** `flask==3.1.0` é previsível; `flask` sozinho instala a versão do dia.
- **Ele acessa a internet?** Contas gratuitas do PythonAnywhere só acessam uma lista de sites permitidos; uma API externa pode funcionar localmente e falhar no ar.
- **Ele precisa de segredo (chave de API, senha)?** Então precisa ir para o `.env` local **e** para o servidor.

Mais detalhes em [Publicar no PythonAnywhere](#/projetos/guia/deploy).

## E o Django?

O **Django** é uma alternativa válida, principalmente se o projeto precisar de muitas telas de cadastro: ele traz um **painel administrativo** e um **sistema de login** prontos, e o PythonAnywhere tem assistente de instalação para ele. Em troca, há mais conceitos para aprender antes de ver a primeira página funcionando.

| Escolha **Flask** se… | Considere **Django** se… |
| --- | --- |
| A equipe quer entender cada peça | A equipe já teve contato com Django |
| O sistema tem poucas telas | O "painel do administrador" resolve boa parte do projeto |
| Vocês preferem escrever o SQL | Vocês preferem trabalhar com modelos (ORM) |

Qualquer outra stack é aceita se a equipe justificar a escolha e conseguir publicar.

## Para aprender mais

- [Documentação do Flask – Quickstart](https://flask.palletsprojects.com/en/stable/quickstart/)
- [Tutorial oficial do Flask (com SQLite e login)](https://flask.palletsprojects.com/en/stable/tutorial/)
- [Módulo sqlite3 da biblioteca padrão](https://docs.python.org/pt-br/3/library/sqlite3.html)
- [Tutorial do Django](https://docs.djangoproject.com/pt-br/stable/intro/tutorial01/)
