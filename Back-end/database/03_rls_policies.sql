-- ============================================================
-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY)
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE animais ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos_brecho ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensagens ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------
-- USUÁRIOS
-- -----------------------------------------------------------
CREATE POLICY "Usuários podem visualizar seus próprios dados"
  ON usuarios FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Apenas admin pode inserir usuários"
  ON usuarios FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- -----------------------------------------------------------
-- ANIMAIS
-- -----------------------------------------------------------
CREATE POLICY "Qualquer visitante pode visualizar animais"
  ON animais FOR SELECT
  USING (TRUE);

CREATE POLICY "Apenas administradores podem criar animais"
  ON animais FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem editar animais"
  ON animais FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem excluir animais"
  ON animais FOR DELETE
  USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------
-- EVENTOS
-- -----------------------------------------------------------
CREATE POLICY "Qualquer visitante pode visualizar eventos"
  ON eventos FOR SELECT
  USING (TRUE);

CREATE POLICY "Apenas administradores podem criar eventos"
  ON eventos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem editar eventos"
  ON eventos FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem excluir eventos"
  ON eventos FOR DELETE
  USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------
-- PRODUTOS DO BRECHÓ
-- -----------------------------------------------------------
CREATE POLICY "Qualquer visitante pode visualizar produtos"
  ON produtos_brecho FOR SELECT
  USING (TRUE);

CREATE POLICY "Apenas administradores podem criar produtos"
  ON produtos_brecho FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem editar produtos"
  ON produtos_brecho FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem excluir produtos"
  ON produtos_brecho FOR DELETE
  USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------
-- MENSAGENS
-- -----------------------------------------------------------
CREATE POLICY "Qualquer visitante pode enviar mensagens"
  ON mensagens FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Apenas administradores podem visualizar mensagens"
  ON mensagens FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem excluir mensagens"
  ON mensagens FOR DELETE
  USING (auth.role() = 'authenticated');
