Uma aplicação que só roda no computador de alguém da equipe não pode ser usada pela instituição. O **PythonAnywhere** hospeda aplicações Flask de graça, com um endereço como `seuusuario.pythonanywhere.com`, e é o destino recomendado para os três projetos.

> **Dica**
> Publiquem **cedo**, com uma única página "Olá" assim que o projeto existir. Descobrir um problema de deploy na véspera da apresentação é muito pior que descobri-lo na primeira semana.

## Antes de publicar

Confiram no projeto local:

- [ ] O código está em um repositório no GitHub.
- [ ] `requirements.txt` existe e lista as dependências com versão (`pip freeze > requirements.txt`).
- [ ] `.gitignore` inclui `.env`, `.venv/` e o arquivo `.db`.
- [ ] Segredos (`SECRET_KEY`, chaves de API) são lidos do `.env`, não escritos no código.
- [ ] Existe um `schema.sql` ou um script para criar as tabelas do zero.
- [ ] Caminhos de arquivo são montados a partir da pasta do projeto, não da pasta atual (veja "Erros comuns").

## Passo a passo

### 1. Criar a conta

Crie uma conta gratuita (*Beginner*) em [pythonanywhere.com](https://www.pythonanywhere.com/). O nome de usuário vira o endereço da aplicação, então escolham algo que identifique o projeto.

### 2. Trazer o código

Na aba **Consoles**, abra um console **Bash** e clone o repositório:

```bash
git clone https://github.com/sua-equipe/achados-e-perdidos.git
cd achados-e-perdidos
```

### 3. Criar o ambiente virtual e instalar as dependências

Ainda no Bash, troque `3.12` pela versão que vocês usaram localmente:

```bash
mkvirtualenv --python=/usr/bin/python3.12 projeto-venv
pip install -r requirements.txt
```

### 4. Criar o banco de dados

```bash
sqlite3 dados.db < schema.sql
```

### 5. Criar o segredo do servidor

Crie o `.env` direto no servidor (ele não veio pelo Git, e é assim que deve ser):

```bash
echo "SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')" > .env
```

### 6. Configurar a aplicação web

1. Na aba **Web**, clique em **Add a new web app**, escolha **Manual configuration** e a **mesma versão do Python** do passo 3.
2. Em **Virtualenv**, informe o nome `projeto-venv`.
3. Em **Code**, abra o **WSGI configuration file** e substitua todo o conteúdo por:

```python
import sys
from pathlib import Path
from dotenv import load_dotenv

projeto = Path("/home/SEUUSUARIO/achados-e-perdidos")
sys.path.insert(0, str(projeto))
load_dotenv(projeto / ".env")

from app import app as application  # noqa: E402
```

4. Em **Static files**, mapeie a URL `/static/` para `/home/SEUUSUARIO/achados-e-perdidos/static`.
5. Clique em **Reload** e abra o endereço da aplicação.

### 7. Atualizar depois de mudanças

Sempre que enviarem código novo ao GitHub:

```bash
cd ~/achados-e-perdidos
git pull
workon projeto-venv
pip install -r requirements.txt   # só se as dependências mudaram
```

Depois, clique em **Reload** na aba **Web**. Sem o reload, o servidor continua rodando o código antigo.

## Erros comuns

| Sintoma | Causa provável | Solução |
| --- | --- | --- |
| "Something went wrong :-(" | Erro no código ou no WSGI | Abra o **Error log** na aba Web; a última linha costuma dizer o problema |
| `ModuleNotFoundError` | Pacote faltando ou virtualenv errado | Confira o nome do virtualenv na aba Web e rode `pip install -r requirements.txt` com ele ativo |
| `no such table` | Banco criado em outra pasta ou não criado | Use o caminho completo do `.db`: `Path(__file__).parent / "dados.db"` |
| A página não tem estilo | Arquivos estáticos não mapeados | Configure **Static files** (passo 6.4) |
| Funciona local, falha no ar ao chamar uma API | Conta gratuita só acessa sites da lista permitida | Confira a lista de sites liberados do PythonAnywhere ou evite a chamada externa |
| Mudança não aparece | Faltou o **Reload** | Clique em Reload na aba Web |
| Aplicação saiu do ar depois de meses | Aplicações gratuitas expiram se não forem renovadas | Na aba Web, clique em **Run until 3 months from today** |

> **Erro comum**
> Usar `app.run()` no servidor. No PythonAnywhere quem inicia a aplicação é o arquivo WSGI; o `if __name__ == "__main__": app.run(debug=True)` serve só para rodar localmente e nunca deve ser executado em produção com `debug=True`.

## Cuidados com os dados

- **Backup:** o banco é um único arquivo. Baixem uma cópia do `dados.db` regularmente (aba **Files**), principalmente antes de mudanças grandes.
- **Mudanças no esquema:** alterar uma tabela em produção pode apagar dados. Testem o `ALTER TABLE` em uma cópia antes.
- **Dados reais** só depois de combinar com a instituição quem acessa e como os dados são protegidos.

## Para aprender mais

- [Ajuda oficial: publicar um projeto Flask existente](https://help.pythonanywhere.com/pages/Flask/)
- [Ajuda oficial: variáveis de ambiente e `.env`](https://help.pythonanywhere.com/pages/environment-variables-for-web-apps/)
- [Ajuda oficial: depurar erros da aplicação](https://help.pythonanywhere.com/pages/DebuggingImportError/)
