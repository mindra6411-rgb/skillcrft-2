# Skill Craft — Site institucional (Projeto Integrador 2026)

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide · Supabase Auth · PostgreSQL (Drizzle ORM).

> O projeto já existente (Next.js + PostgreSQL/Drizzle) foi preservado, em vez de migrar para Vite. A rota `/api/health` continua funcionando.

## Executar localmente

```bash
npm install
cp .env.example .env        # preencha DATABASE_URL e, para login, as chaves do Supabase
npx drizzle-kit push        # cria a tabela service_requests
npm run dev                 # http://localhost:3000
```

Build de produção: `npm run build && npm run start`.

## Estrutura

```
src/
  app/
    page.tsx                 página inicial (todas as seções)
    login/                   tela de login com Google
    area-do-aluno/           área protegida (perfil + pedidos do aluno)
    auth/callback/route.ts   retorno do OAuth (troca code → sessão)
    api/pedidos/route.ts     grava pedidos no PostgreSQL (validação no servidor)
    api/health/route.ts      healthcheck
    icon.svg                 favicon
  proxy.ts                   renova a sessão do Supabase (Next 16 "proxy")
  components/
    brand/                   Logo e geometria do símbolo SC
    IntroSplash.tsx          animação de abertura
    Navbar.tsx · Footer.tsx
    sections/                Hero, About, Services, HowItWorks, Differentials, Contact(+Form)
    auth/                    GoogleButton, SignOutButton, LoginCard
    ui/                      Reveal, SectionHeading
  data/services.ts           serviços e preços oficiais (fonte única)
  config/site.ts             contato configurável por variáveis de ambiente
  lib/                       validação, supabase (client/server), helpers
  db/                        Drizzle (schema + conexão)
```

## Logotipo

O símbolo SC está em `src/components/brand/mark-data.ts` (SVG vetorial, usado no site, na abertura e no favicon).
Para usar **exatamente** os arquivos originais da identidade, coloque-os em `public/brand/` (ex.: `logo.png`) e
substitua o conteúdo de `LogoMark` em `src/components/brand/Logo.tsx` por um `<Image src="/brand/logo.png" … />`
mantendo a proporção e a margem de segurança (1× a altura do símbolo).

## Login com Google (Supabase Auth)

1. Crie um projeto em <https://supabase.com>.
2. **Google Cloud Console** → APIs e serviços → Credenciais → *Criar ID do cliente OAuth* (tipo *Aplicativo da Web*).
   - *URIs de redirecionamento autorizados*: `https://SEU-PROJETO.supabase.co/auth/v1/callback`
   - Copie o *Client ID* e o *Client Secret*.
3. **Supabase** → Authentication → Providers → **Google** → ative e cole Client ID/Secret.
4. **Supabase** → Authentication → URL Configuration:
   - *Site URL*: URL de produção (ex.: `https://seu-site.vercel.app`)
   - *Redirect URLs*: `http://localhost:3000/auth/callback` e `https://seu-site.vercel.app/auth/callback`
5. Copie *Project URL* e *anon/publishable key* (Settings → API) para `NEXT_PUBLIC_SUPABASE_URL` e
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Sem essas variáveis, o login exibe um aviso de "não configurado" — nenhuma autenticação é simulada. O site
institucional funciona normalmente sem login.

## Formulário de contato

Os pedidos são validados no cliente e no servidor e **gravados na tabela `service_requests`** do PostgreSQL
(`DATABASE_URL`). Não há envio de e-mail/WhatsApp. Se o banco estiver indisponível, o usuário vê uma mensagem
de erro (não de sucesso). Se o aluno estiver logado, o pedido é vinculado à conta e aparece na Área do aluno.

## Publicar na Vercel

1. Suba o repositório no GitHub e importe em <https://vercel.com/new>.
2. Configure as variáveis de ambiente do `.env.example` (um PostgreSQL gerenciado — Supabase, Neon, Vercel Postgres — fornece `DATABASE_URL`).
3. Rode uma vez `npx drizzle-kit push` com a `DATABASE_URL` de produção para criar a tabela.
4. Faça o deploy e adicione a URL final nas *Redirect URLs* do Supabase.
