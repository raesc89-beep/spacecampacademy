# Anti-Hallucination Rules for Educational Content

## REGLA MAESTRA: Cero Tolerancia a Alucinaciones

> Todo contenido educativo producido para Space Camp Academy debe ser **100% verificable**. Cualquier dato histórico, científico, biográfico o técnico que no pueda ser confirmado por fuentes confiables debe ser eliminado o marcado explícitamente como "según algunas fuentes" o "se estima que".

---

## 1. Verificación Factual Estricta

- **Fechas**: Cada fecha (nacimiento, muerte, descubrimiento, publicación) debe ser real y verificable. No aproximar ni inventar.
- **Nombres**: Escribir correctamente nombres de personas, instituciones, lugares, elementos químicos y misiones espaciales. Verificar acentos y caracteres especiales (ej: Skłodowska, no Sklodowska).
- **Logros**: No atribuir descubrimientos, premios o publicaciones a personas que no los realizaron. Especificar coautores cuando corresponda.
- **Cifras**: Cantidades, distancias, temperaturas, velocidades y porcentajes deben ser precisos. No redondear de forma engañosa.
- **Citas**: No inventar frases textuales. Solo usar citas documentadas con fuente conocida.

## 2. Correspondencia Imagen-Texto

- Cada `imgCaption` debe describir EXACTAMENTE lo que muestra la imagen generada.
- No describir elementos que no son visibles en la imagen.
- Si la imagen es genérica o simbólica, el caption debe reflejarlo ("Representación artística de..." en lugar de "Fotografía real de...").
- Las imágenes de módulos deben tener relación visual directa con el tema del módulo.

## 3. Estructura de Contenido

- **15 párrafos por sección**: Cada `contentEs.sections[].text` tiene EXACTAMENTE 15 párrafos únicos.
- **3 preguntas de quiz por módulo**: Cada `quizEs` tiene exactamente 3 preguntas con 4 opciones y 1 respuesta correcta.
- **Formato quiz**: Usar `{ q: '...', options: [...], a: N }` (formato del motor de quizzes). NUNCA usar `question`/`correct`.
- **Sin párrafos duplicados**: Ningún párrafo puede repetirse dentro del mismo curso ni entre cursos diferentes.
- **Sin preguntas duplicadas**: Cada pregunta de quiz debe ser única.

## 4. Lenguaje de Divulgación Científica (6-16 años)

- Español atractivo con metáforas espaciales y analogías comprensibles.
- Preguntas retóricas para despertar curiosidad ("¿Sabías que...", "¿Te imaginas...").
- Datos sorprendentes reales para mantener engagement.
- Voz activa y oraciones cortas para lectores jóvenes (6-10).
- Explicaciones más profundas y matizadas para lectores mayores (11-16).
- NUNCA ser condescendiente ni excesivamente simplista.
- Usar "¡" y "¿" correctamente siempre.

## 5. Consistencia Interna

- Los IDs de módulos siguen el formato `{prefix}_m{N}`.
- Los IDs de secciones siguen `{prefix}_m{N}_s{N}`.
- Los colores, títulos y links deben ser idénticos entre: courseData, hub page, y dashboard missions.
- Los badges (badgeEs) deben ser únicos por módulo.
- El `order` debe ser consecutivo dentro de cada curso.

## 6. Prohibiciones Explícitas

- ❌ NO inventar terminología científica inexistente.
- ❌ NO crear nombres de misiones espaciales, telescopios o instituciones ficticias.
- ❌ NO atribuir descubrimientos a la persona equivocada.
- ❌ NO confundir fechas de diferentes eventos.
- ❌ NO mezclar contenido de un curso con otro.
- ❌ NO reciclar párrafos entre módulos o cursos.
- ❌ NO usar datos de fuentes no verificables o rumores populares.
- ❌ NO simplificar un hecho científico hasta el punto de hacerlo incorrecto.

## 7. Proceso de Validación

Antes de finalizar cualquier archivo de curso:
1. Verificar que cada módulo tiene exactamente 15 párrafos.
2. Verificar que cada quiz tiene exactamente 3 preguntas con formato `{q, options, a}`.
3. Verificar que todos los hechos mencionados son reales.
4. Verificar que las rutas de imágenes coinciden con los archivos existentes.
5. Verificar que los IDs de módulo no colisionan con cursos existentes.
