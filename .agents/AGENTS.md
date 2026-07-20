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

## 8. Presupuesto de Generación de Imágenes (API)

> **REGLA DE PRESUPUESTO**: Cuando se use la API de Google AI Studio (Gemini / Imagen) para generar imágenes — ya sea porque la quota interna del IDE se agotó o por decisión de eficiencia — se debe respetar un **límite diario de $400 pesos mexicanos** (~$20 USD).

### Reglas de presupuesto:
- **Tope diario**: $400 MXN por día calendario en generación de imágenes vía API.
- **Tracking obligatorio**: Todo script de generación debe llevar un registro del gasto acumulado del día en un archivo `.api_spend_log.json` en la raíz del proyecto.
- **Cálculo de costos**: Usar los precios oficiales de la API de Google AI Studio al momento de ejecución. Referencia aproximada:
  - Imagen 4.0 Standard: ~$0.04 USD/imagen
  - Imagen 4.0 Ultra: ~$0.08 USD/imagen
  - Gemini Flash Image: ~$0.04 USD/imagen
- **Parada automática**: Si el gasto acumulado del día alcanza el 90% del tope ($360 MXN), el script debe detenerse e informar al usuario.
- **Tipo de cambio**: Usar 20 MXN = 1 USD como referencia conservadora. Si el tipo de cambio real es diferente, ajustar a favor de la protección del presupuesto.
- **Sin excepciones**: Esta regla aplica incluso si el agente está ejecutando tareas automatizadas o en segundo plano.
- **Notificación**: Siempre informar al usuario el costo estimado antes de iniciar una sesión de generación masiva.

## 9. Estrategia de Cuota Gratuita Primero (Free-First Billing)

> **REGLA INELUDIBLE**: Toda generación de imágenes o uso de APIs de Google AI DEBE agotar primero la cuota gratuita disponible antes de consumir créditos de paga. Esta regla optimiza el gasto mezclando recursos gratuitos y pagados.

### Orden de prioridad (cascada obligatoria):

1. **Cuota gratuita del IDE** (Antigravity / Gemini Code Assist): Usar la herramienta `generate_image` integrada del IDE siempre que esté disponible y funcional. Costo: $0.
2. **Free Tier de Google AI Studio API**: Cuando la cuota del IDE se agote, usar la API con el API key del proyecto. Los modelos gratuitos tienen límites de RPM/RPD (requests per minute/day). Respetar estos límites sin forzar.
3. **Créditos de paga de Google AI Studio**: Solo después de confirmar que la cuota gratuita se agotó (error 429 persistente o límite diario alcanzado), proceder con créditos de paga sujetos al tope de $400 MXN/día (Sección 8).

### Implementación técnica en scripts de generación:

```
CASCADA DE GENERACIÓN:
┌─────────────────────────┐
│ 1. Intentar FREE TIER   │ ← Pausas largas entre requests (12-15s)
│    (misma API, sin costo)│    para respetar RPM limits del free tier
├─────────────────────────┤
│ Si HTTP 429 persistente  │ ← Free quota agotada
│ (3+ intentos con 60s    │
│  espera entre cada uno)  │
├─────────────────────────┤
│ 2. PAID TIER             │ ← Pausas cortas (2-3s), sujeto a $400 MXN/día
│    (misma API, con costo)│
└─────────────────────────┘
```

### Reglas de detección de cuota:
- **HTTP 429**: Indica rate limit. En free tier, esperar 60s y reintentar hasta 3 veces.
- **3 x 429 consecutivos con 60s de espera**: Se considera cuota gratuita agotada → activar modo de paga.
- **Registrar en `.api_spend_log.json`**: Campo `freeQuotaExhausted: true` con timestamp cuando se detecte agotamiento.
- **Al inicio de cada sesión**: Asumir que la cuota gratuita está disponible (se reinicia diariamente).

### Lo que NUNCA hacer:
- ❌ NO saltar directamente a créditos de paga sin intentar la cuota gratuita primero.
- ❌ NO asumir que la cuota gratuita está agotada sin recibir errores 429 persistentes.
- ❌ NO usar pausas cortas (< 10s) cuando se está en modo gratuito — esto fuerza rate limits innecesariamente.
- ❌ NO generar más de 15 imágenes por minuto en modo gratuito (respetar RPM del free tier).

### Notificación al usuario:
- Informar claramente en qué modo se está operando: `[FREE]` o `[PAID]`.
- Al cambiar de free a paid, notificar: "⚠️ Cuota gratuita agotada. Cambiando a créditos de paga ($X MXN restante del presupuesto diario)."
- Al finalizar, reportar desglose: "X imágenes gratuitas + Y imágenes de paga = $Z MXN total."

