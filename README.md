# Mag--verde-back-end
projeto Magé verde back-end  
# Magé Verde Online 🌿

Plataforma web do **Circuito Magé Verde**, com um site público de ecoturismo
(front-end) e uma **API REST** (back-end) que permite a administradores
autenticados gerenciar as atrações e a disponibilidade, enquanto visitantes
consultam as informações.

Trabalho acadêmico — Análise e Desenvolvimento de Sistemas (UNIFESO),
disciplinas de **Desenvolvimento de Back-End para MVP** e **MVP Mobile Development**.

---

## 👤 Integrante

- Rômulo Thadeu Lima Azeredo (projeto individual)

---

## 🌎 Situação-problema

**Circuito Magé Verde — Magé (RJ).**

A plataforma "Magé Verde Online" deve reunir informações sobre trilhas,
cachoeiras, eventos e o patrimônio natural da região (Parque Natural Municipal
Barão de Mauá e Serra dos Órgãos). Há dois perfis de uso:

- **Administradores**: mantêm o site atualizado (cadastram, editam, excluem
  atrações e controlam a disponibilidade).
- **Visitantes**: consultam informações públicas e, quando registrados,
  comentam e avaliam as atrações.

## 🎯 Objetivo do MVP

Entregar uma API que centralize o cadastro das atrações do circuito, com
login de administrador, controle de disponibilidade, comentários e avaliações,
e um front-end que consuma essa API no painel administrativo — substituindo
os dados fixos do protótipo por dados persistidos em banco.

---

## 📌 Escopo

**Dentro do escopo**

- Cadastro e login de usuários, com senha protegida por hash.
- Login de administrador com controle de acesso às rotas de gestão.
- CRUD de atrações (listar, consultar, cadastrar, editar, excluir).
- Gestão de disponibilidade das atrações (data, aberto/fechado, observações).
- Comentários e avaliações (1 a 5) de usuários registrados.
- Painel administrativo (front-end) conectado à API: login real, listagem,
  cadastro, edição e exclusão de atrações, e cadastro/exclusão de disponibilidade.
- Site público com páginas informativas das atrações.

**Fora do escopo (nesta versão)**

- Pagamentos e venda de ingressos.
- Aplicativo mobile nativo.
- Recomendação de atrações por IA.
- Integração automática com redes sociais.
- Moderação/aprovação de comentários antes da publicação.
- Categoria e imagem das atrações cadastradas pelo painel (o banco ainda não
  possui essas colunas).
- Páginas públicas alimentadas pela API (hoje o conteúdo público é estático).
- Rota de logout no servidor.

---

## ✅ Requisitos Funcionais (RF)

| ID | Descrição |
|----|-----------|
| RF01 | O usuário se cadastra informando nome, e-mail e senha. |
| RF02 | O usuário faz login com e-mail e senha. |
| RF03 | O administrador cadastra uma atração (nome, descrição, localização). |
| RF04 | O administrador edita uma atração existente. |
| RF05 | O administrador exclui uma atração. |
| RF06 | Visitantes consultam a lista de atrações e o detalhe de uma atração. |
| RF07 | O administrador cadastra a disponibilidade de uma atração (data, aberto/fechado, observações). |
| RF08 | O administrador edita ou exclui um registro de disponibilidade. |
| RF09 | O administrador consulta a disponibilidade de uma atração no painel. |
| RF10 | O usuário autenticado comenta uma atração. |
| RF11 | O usuário autenticado exclui um comentário. |
| RF12 | Visitantes consultam os comentários de uma atração. |
| RF13 | O usuário autenticado avalia uma atração de 1 a 5 (uma avaliação por usuário por atração). |
| RF14 | Visitantes consultam as avaliações de uma atração. |

## 🔒 Requisitos Não Funcionais (RNF)

| ID | Descrição |
|----|-----------|
| RNF01 | Senhas armazenadas com hash (bcrypt), nunca em texto puro. |
| RNF02 | Autenticação por token JWT em cookie HTTP-only, válido por 7 dias. |
| RNF03 | Rotas de criação, edição e exclusão de atrações e de disponibilidade exigem autenticação e perfil de administrador. |
| RNF04 | O back-end valida os dados de entrada antes de gravar no banco. |
| RNF05 | Um usuário só pode ter uma avaliação por atração (restrição de unicidade no banco). |
| RNF06 | Consultas públicas (atrações, comentários e avaliações) não exigem login. |
| RNF07 | O front-end é responsivo e utilizável em celular e computador. |

---

## 🚀 Tecnologias

| Camada | Tecnologias |
|---|---|
| Back-end | Node.js, Express, Prisma ORM, SQLite, JWT (jsonwebtoken), bcrypt, Zod, cookie-parser, cors |
| Front-end | HTML5, CSS3, JavaScript puro (`fetch`) |
| Protótipos | Figma |
| Ferramentas | VS Code, Live Server, Thunder Client |

---

## 📁 Estrutura do repositório

```
mage-verde-online/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── modules/        (auth, places, comments, ratings, availability)
│   │   ├── middlewares/    (validateToken, isAdmin, validateSchema, validateScore)
│   │   ├── schemas/
│   │   ├── config/
│   │   ├── database/
│   │   ├── utils/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html, login.html, admin.html, ...
│   │   ├── css/
│   │   ├── js/             (login.js, admin.js)
│   │   └── assets/images/
│   ├── prototipos/
│   └── requisitos/
│
└── README.md
```

---

## ▶️ Como executar

Pré-requisitos: **Node.js** (v20 ou superior) e **VS Code** com a extensão **Live Server**.

### 1. Back-end

```bash
cd backend
```

Renomeie `.env.example` para `.env` e deixe assim:

```
PORT='3001'
DATABASE_URL='file:./dev.db'
JWT_SECRET='troque-por-um-segredo'
CLIENT_URL='http://127.0.0.1:5500'
```

Depois:

```bash
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

A API sobe em `http://127.0.0.1:3001`. Deixe esse terminal aberto.

### 2. Front-end

1. Abra a pasta `frontend` no VS Code.
2. Clique com o botão direito em `public/index.html` → **Open with Live Server**.
3. O site abre em `http://127.0.0.1:5500/public/index.html`.

> ⚠️ **Importante:** front e back-end devem usar o mesmo host (`127.0.0.1`).
> Misturar `localhost` com `127.0.0.1` faz o navegador bloquear o cookie de
> login (`SameSite=Lax`), e as ações de administrador falham.
> Se mudar a porta do Live Server, atualize `CLIENT_URL` no `.env` do back-end.
> A URL da API usada pelo front está em `frontend/public/js/login.js` e `admin.js`
> (constante `API_URL`).

### 3. Usuários de teste (criados pelo `npm run seed`)

| Nome | E-mail | Senha | Perfil |
|---|---|---|---|
| Ana Souza | ana@example.com | senha123 | usuário |
| Pedro Lima | pedro@example.com | senha123 | usuário |
| Carla Mendes | carla@example.com | senha123 | **administrador** |

Para acessar o painel: **Portal Administrativo** → login com `carla@example.com`.

---

## 🔌 Endpoints da API

Base: `http://127.0.0.1:3001`

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/auth/sign-up` | público | Cadastro de usuário |
| POST | `/auth/sign-in` | público | Login (grava o cookie de sessão) |
| GET | `/places` | público | Lista atrações |
| GET | `/places/:id` | público | Detalhe de uma atração |
| POST | `/places` | admin | Cadastra atração |
| PUT | `/places/:id` | admin | Edita atração |
| DELETE | `/places/:id` | admin | Exclui atração |
| POST | `/availability` | admin | Cadastra disponibilidade |
| GET | `/availability/:placeId` | admin | Lista disponibilidade de uma atração |
| PUT | `/availability/:id` | admin | Edita disponibilidade |
| DELETE | `/availability/:id` | admin | Exclui disponibilidade |
| GET | `/comments/:placeId` | público | Lista comentários |
| POST | `/comments` | logado | Cria comentário |
| DELETE | `/comments/:id` | logado | Exclui comentário |
| GET | `/ratings/:placeId` | público | Lista avaliações |
| POST | `/ratings` | logado | Cria/atualiza avaliação (1 a 5) |
| DELETE | `/ratings/:id` | logado | Exclui avaliação |

Exemplos de corpo (JSON):

```json
// POST /auth/sign-in
{ "email": "carla@example.com", "password": "senha123" }

// POST /places
{ "name": "Cachoeira dos Monjolos", "description": "Trilha leve com queda d'água", "location": "Magé - RJ" }

// POST /availability
{ "placeId": "<id da atração>", "date": "2026-11-20T09:00:00.000Z", "isOpen": true, "notes": "Aberto pela manhã" }
```

---

## ⚠️ Limitações conhecidas

- No cadastro (`/auth/sign-up`) o próprio usuário informa o `role`, então
  qualquer pessoa consegue se registrar como administrador. Em produção, o
  perfil de administrador deveria ser definido apenas pelo servidor.
- `GET /availability/:placeId` exige administrador; visitantes ainda não
  conseguem consultar a disponibilidade.
- Não há rota de logout: o botão "Sair" apenas volta à página inicial e o
  cookie continua válido até expirar.
- Não há rota de edição de comentários.

---

## 🔗 Links

- Repositório: _(adicione aqui o link do GitHub)_
- Protótipos: pasta `frontend/prototipos`
- Requisitos: pasta `frontend/requisitos`
