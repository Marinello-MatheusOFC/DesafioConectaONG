# SOS Focinho Carente — Backend

Camada de backend utilizando **Supabase** como BaaS (Backend as a Service) para o portal da ONG.

## Tecnologias

- React + Vite
- Supabase (Auth, Storage, Banco de Dados)
- JavaScript (ES Modules)

## Estrutura de pastas

```
src/
├── lib/
│   └── supabase.js          # Cliente Supabase centralizado
├── services/
│   ├── animalService.js      # CRUD de animais
│   ├── eventoService.js      # CRUD de eventos
│   ├── brechoService.js      # CRUD de produtos do brechó
│   ├── mensagemService.js    # CRUD de mensagens
│   ├── authService.js        # Autenticação (login, logout, etc.)
│   └── dashboardService.js   # Estatísticas do dashboard
├── hooks/
│   └── useAuth.js            # Hook React para estado de autenticação
└── utils/
    └── storage.js            # Utilitários de upload/remoção de imagens
database/
├── 01_tables.sql             # Criação das tabelas
├── 02_storage.sql            # Buckets e políticas de storage
└── 03_rls_policies.sql       # Políticas de segurança RLS
```

## Configuração

### 1. Variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha com as credenciais do seu projeto Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 2. Banco de dados

Execute os scripts SQL na ordem abaixo no SQL Editor do Supabase:

1. `database/01_tables.sql` — Cria todas as tabelas
2. `database/02_storage.sql` — Cria os buckets e políticas de storage
3. `database/03_rls_policies.sql` — Habilita RLS e define as políticas de segurança

### 3. Autenticação

No painel do Supabase, em **Authentication > Providers**, habilite o provedor **Email**.

Crie o primeiro usuário admin:

```sql
-- No SQL Editor, após criar o usuário no Auth:
INSERT INTO usuarios (id, nome, email, role)
VALUES (
  'uuid-do-usuario-criado-no-auth',
  'Nome do Admin',
  'email@admin.com',
  'admin'
);
```

### 4. Instalar dependências

```bash
npm install
```

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

## Como utilizar

### Autenticação

```jsx
import { login, logout } from '../services/authService.js'
import { useAuth } from '../hooks/useAuth.js'

function MeuComponente() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return <p>Carregando...</p>

  return (
    <div>
      {user ? <p>Bem-vindo, {user.nome}</p> : <p>Não logado</p>}
    </div>
  )
}
```

### Listar animais

```jsx
import { listar } from '../services/animalService.js'

const animais = await listar()
```

### Cadastrar animal com imagem

```jsx
import { cadastrar } from '../services/animalService.js'

const dados = {
  nome: 'Rex',
  idade: 3,
  sexo: 'macho',
  porte: 'grande',
  descricao: 'Cão amigável',
  vacinado: true,
  castrado: true,
}

const imagem = fileInput.files[0]
const novoAnimal = await cadastrar(dados, imagem)
```

### Dashboard

```jsx
import {
  getQuantidadeAnimais,
  getQuantidadeMensagens,
} from '../services/dashboardService.js'

const totalAnimais = await getQuantidadeAnimais()
const totalMensagens = await getQuantidadeMensagens()
```

## Segurança

- **RLS (Row Level Security)** está habilitado em todas as tabelas
- Visitantes não autenticados podem apenas **visualizar** animais, eventos e produtos, e **enviar** mensagens
- Apenas usuários autenticados (admin) podem criar, editar ou excluir registros
- Buckets de storage são públicos para leitura e restritos para escrita a admin
