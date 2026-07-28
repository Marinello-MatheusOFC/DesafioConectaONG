-- ============================================================
-- CONFIGURAÇÃO DOS BUCKETS DE STORAGE
-- ============================================================

-- Criação dos buckets
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES
  ('animais', 'animais', TRUE, FALSE, 5242880, '{image/png,image/jpeg,image/webp,image/gif}'),
  ('eventos', 'eventos', TRUE, FALSE, 5242880, '{image/png,image/jpeg,image/webp,image/gif}'),
  ('brecho', 'brecho', TRUE, FALSE, 5242880, '{image/png,image/jpeg,image/webp,image/gif}')
ON CONFLICT (id) DO NOTHING;

-- Políticas para o bucket animais
CREATE POLICY "Qualquer um pode visualizar imagens de animais"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'animais');

CREATE POLICY "Apenas admin pode fazer upload de imagens de animais"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'animais'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Apenas admin pode atualizar imagens de animais"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'animais'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Apenas admin pode excluir imagens de animais"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'animais'
    AND auth.role() = 'authenticated'
  );

-- Políticas para o bucket eventos
CREATE POLICY "Qualquer um pode visualizar imagens de eventos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'eventos');

CREATE POLICY "Apenas admin pode fazer upload de imagens de eventos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'eventos'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Apenas admin pode atualizar imagens de eventos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'eventos'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Apenas admin pode excluir imagens de eventos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'eventos'
    AND auth.role() = 'authenticated'
  );

-- Políticas para o bucket brecho
CREATE POLICY "Qualquer um pode visualizar imagens de produtos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'brecho');

CREATE POLICY "Apenas admin pode fazer upload de imagens de produtos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'brecho'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Apenas admin pode atualizar imagens de produtos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'brecho'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Apenas admin pode excluir imagens de produtos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'brecho'
    AND auth.role() = 'authenticated'
  );
