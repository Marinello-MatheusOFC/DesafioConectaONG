-- ============================================================
-- TABELAS DO BANCO DE DADOS - SOS Focinho Carente
-- ============================================================

-- Extensão para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------
-- Usuários
-- -----------------------------------------------------------
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------
-- Animais
-- -----------------------------------------------------------
CREATE TABLE animais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  idade INTEGER,
  sexo VARCHAR(20) CHECK (sexo IN ('macho', 'femea')),
  porte VARCHAR(20) CHECK (porte IN ('pequeno', 'medio', 'grande')),
  descricao TEXT,
  vacinado BOOLEAN DEFAULT FALSE,
  castrado BOOLEAN DEFAULT FALSE,
  adotado BOOLEAN DEFAULT FALSE,
  imagem_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------
-- Eventos
-- -----------------------------------------------------------
CREATE TABLE eventos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  data DATE NOT NULL,
  local VARCHAR(255),
  imagem_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------
-- Produtos do Brechó
-- -----------------------------------------------------------
CREATE TABLE produtos_brecho (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(100),
  imagem_url TEXT,
  disponivel BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- -----------------------------------------------------------
-- Mensagens
-- -----------------------------------------------------------
CREATE TABLE mensagens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  assunto VARCHAR(255),
  mensagem TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
