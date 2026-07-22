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

## 10. Estándar de Imágenes en Infografías Interactivas

> **REGLA DE CONSISTENCIA VISUAL**: Todas las infografías interactivas deben usar el mismo layout de imagen hero Y el mismo estilo artístico. El estándar de layout es el componente `InteractiveInfographic_EgyptM8.js` (Abu Simbel).

### 10.1 Layout obligatorio del Hero:
```jsx
// Grid del hero: SIEMPRE 1fr 1fr (50/50)
gridTemplateColumns: '1fr 1fr'
minHeight: '280px'

// Contenedor de imagen: SIEMPRE con height explícito
position: 'relative'
overflow: 'hidden'
height: '100%'  // ← OBLIGATORIO para que cover llene la celda del grid

// Imagen hero: SIEMPRE cover completo
width: '100%'
height: '100%'
objectFit: 'cover'
opacity: 0.9
minHeight: '280px'
```

### 10.2 Estilo Artístico Obligatorio ("Nilo de Nut"):
Todas las imágenes generadas para infografías (btn_*, hero_*, bg_*) DEBEN seguir este estilo:
- **Tipo**: Ilustración digital estilizada / vector art con detalles — NO fotorrealista, NO flat cartoon.
- **Paleta**: Tonos profundos de azul índigo + ámbar/dorado cálido. Cielos nocturnos con Vía Láctea, reflejos dorados.
- **Texturas**: Colores limpios con gradientes sutiles. Agua con reflejos, piedra con vetas, cielos detallados con estrellas.
- **Personajes**: Proporcionados semi-estilizados (como ilustración de libro infantil premium, NO chibi/cartoon).
- **Composición**: Escenas narrativas cinematográficas con profundidad de campo, elementos superpuestos en capas.
- **Ambiente**: Épico, aventurero, educativo. Similar a concept art de películas animadas de aventura.
- **Prompt suffix obligatorio**: Toda generación de imagen DEBE terminar con: `"Illustrated digital art style, clean vector aesthetic with subtle gradients, deep indigo blue and warm golden amber palette, detailed night sky with stars, stylized semi-realistic proportions, educational adventure illustration for children ages 8-13, cinematic composition with depth. No text, no letters, no words."`

### 10.3 Lo que NUNCA hacer:
- ❌ NO usar `gridTemplateColumns: '280px 1fr'` — hace la imagen demasiado pequeña.
- ❌ NO usar `maxWidth: 220` ni `height: 'auto'` en imágenes hero — rompe la consistencia.
- ❌ NO omitir `height: '100%'` en el div contenedor de la imagen — causa que la imagen no llene la celda.
- ❌ NO cambiar el ratio 50/50 del grid sin autorización del usuario.
- ❌ NO generar imágenes fotorrealistas ni flat/cartoon — solo estilo "Nilo de Nut" ilustrado.
- ❌ NO crear componentes de infografía nuevos con layouts diferentes al estándar.

### 10.4 Verificación (pre-commit checklist):
- [ ] `gridTemplateColumns` del hero es `'1fr 1fr'`
- [ ] Imagen usa `objectFit: 'cover'` con `width: '100%'` y `height: '100%'`
- [ ] Contenedor de imagen tiene `height: '100%'`
- [ ] Todas las imágenes son PNG (no SVG placeholders)
- [ ] Estilo artístico coincide con referencia "Nilo de Nut" (ilustración digital estilizada)

## 11. Bibliografía Obligatoria en Infografías Interactivas

> **REGLA DE SUSTENTABILIDAD ACADÉMICA**: Toda infografía interactiva DEBE incluir una sección de bibliografía al pie del componente que liste las fuentes académicas de donde se extrajo la información.

### Estructura obligatoria:
```jsx
// 1. Definir BIBLIOGRAPHY como const antes del array de nodos
const BIBLIOGRAPHY = [
  'Autor, A. (Año). Título de la obra, Editorial',
  'Autor, B. et al. (Año). "Título del artículo", Revista, Vol',
  // 4-8 fuentes por infografía
];

// 2. Renderizar footer de bibliografía al final del componente
<div style={{
  marginTop: '2rem', padding: '1.5rem 2rem',
  borderTop: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(0,0,0,0.3)',
  borderRadius: '0 0 16px 16px',
}}>
  <h4>📚 Fuentes y Referencias</h4>
  <ul>{BIBLIOGRAPHY.map((ref, i) => <li key={i}>• {ref}</li>)}</ul>
</div>
```

### Requisitos de las fuentes:
- **Mínimo 4, máximo 8** fuentes por infografía.
- Fuentes deben ser **verificables**: libros publicados, artículos en journals peer-reviewed, reportes de instituciones reconocidas (NASA, UNESCO, CNRS, etc.).
- ❌ NO usar Wikipedia como fuente directa (se puede usar como punto de partida para encontrar fuentes primarias).
- ❌ NO inventar títulos de artículos, años de publicación, o nombres de autores.
- ❌ NO usar blogs, videos de YouTube, o redes sociales como fuentes académicas.
- Las fuentes deben cubrir los temas principales del módulo (no ser genéricas).

### Verificación:
- Antes de hacer commit de cualquier infografía, verificar que existe `const BIBLIOGRAPHY` con al menos 4 entradas reales.
- Verificar que el footer de bibliografía se renderiza al final del componente.

## 12. Estructura Obligatoria del ContentPanel en Infografías Interactivas

> **REGLA DE ESTRUCTURA MODELO**: El componente de referencia es `InteractiveInfographic_BttfM2.js` (Viajes en el Tiempo). Toda infografía DEBE replicar esta estructura exacta en su ContentPanel.

### 12.1 Hero Section (Two-Column Layout):
El hero SIEMPRE sigue el estándar de la Regla 10 (1fr 1fr, cover). El usuario ha validado que la proporción imagen-texto es correcta en este modelo.

### 12.2 Mini-Avatar junto al Título (OBLIGATORIO):
Al lado del título de cada nodo, DEBE haber una imagen circular pequeña (40x40px) que muestra la `btnImage` del nodo. Este detalle es **inviolable**.
```jsx
<h3 style={{
  display: 'flex', alignItems: 'center', gap: '0.6rem',
}}>
  <span style={{
    display: 'inline-flex', width: '40px', height: '40px',
    borderRadius: '50%', overflow: 'hidden',
    border: `2px solid ${node.color}40`,
    flexShrink: 0,
  }}>
    <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </span>
  {node.title}
</h3>
```

### 12.3 Secciones Expandibles / Colapsables (OBLIGATORIO):
Cada nodo DEBE tener al menos 2 botones colapsables en el array `expandables`. Estas secciones mantienen la curiosidad y la interactividad.

**Estructura del dato:**
```jsx
expandables: [
  { label: '¿Sabías que...?', icon: 'clock', text: '...' },
  { label: 'Dato Científico', icon: 'atom', text: '...' },
],
```

**Tipos de expandables disponibles:**
| Label | Icon | Cuándo usar |
|---|---|---|
| `¿Sabías que...?` | `clock` | Dato curioso relacionado al tema |
| `Dato Científico` | `atom` | Explicación técnica/científica ampliada |
| `En la Película` | `zap` | **SOLO para cursos basados en películas** |

**Componente ExpandableSection:**
- Botón con icono circular, label en color del nodo, y chevron de apertura
- Al expandirse: animación con dirección aleatoria (up/down/left/right)
- Contenido con border-left de 3px en color del nodo
- hover effect con fondo semitransparente

### 12.4 Sección "En la Película" (OBLIGATORIO en cursos de películas):
**APLICA EXCLUSIVAMENTE** a cursos cuya temática está basada en una película (ej: "La Ciencia de Volver al Futuro", "La Ciencia de Star Wars", etc.).

**Requisitos:**
- CADA nodo del curso DEBE incluir un expandable con `label: 'En la Película'`
- El contenido DEBE ser información **verificable y real** de la película correlacionada con el tema científico del nodo
- El icono DEBE ser `'zap'` (⚡)
- El texto DEBE conectar el concepto científico con la escena/dato real de la película

**Ejemplo correcto:**
```jsx
{ label: 'En la Película', icon: 'zap',
  text: 'Marty no es el único que casi causa una paradoja. En BTTF II, el viejo Biff roba el DeLorean y se da el almanaque deportivo a sí mismo en 1955...' }
```

### 12.5 Lo que NUNCA hacer:
- ❌ NO omitir el mini-avatar circular junto al título — es un detalle de diseño inviolable
- ❌ NO crear nodos sin expandables — mínimo 2 secciones colapsables por nodo
- ❌ NO omitir "En la Película" en cursos basados en películas
- ❌ NO inventar datos falsos en expandables — toda información debe ser verificable
- ❌ NO crear expandables sin animación de apertura/cierre
- ❌ NO cambiar los iconos asignados a cada tipo de expandable

### 12.6 Verificación (pre-commit checklist):
- [ ] Cada nodo tiene mini-avatar (btnImage) junto al título
- [ ] Cada nodo tiene array `expandables` con ≥ 2 entradas
- [ ] Cursos de películas: cada nodo tiene expandable "En la Película"
- [ ] Expandables usan componente `ExpandableSection` con animaciones
- [ ] Información en expandables es verificable y real
- [ ] Si usa bannerImage: imagen panorámica presente y temáticamente correlacionada

### 12.7 Banner Panorámico entre Expandables (OPCIONAL):
Cada nodo del ContentPanel puede incluir un campo `bannerImage` (string, path a imagen PNG).
Si está presente, se renderiza como una imagen horizontal tipo banner panorámico a **ancho completo**
entre los dos bloques de expandables.

**Especificaciones:**
- `width: '100%'`, `borderRadius: '12px'`, `objectFit: 'cover'`
- `maxHeight: '180px'` para no dominar la sección
- Overlay gradient sutil en bordes para integración visual
- Caption temático sobre overlay gradient, `fontSize: '0.85rem'`, `fontStyle: 'italic'`, `color: '#FFF'` con `textShadow` para legibilidad

**Requisitos:**
- La imagen DEBE estar correlacionada temáticamente con el nodo (§2)
- Estilo artístico "Nilo de Nut" (§10.2)
- Formato PNG, resolución mínima para cubrir ancho completo
- Caption posicionado `absolute` sobre la imagen con gradient overlay inferior

**Ejemplo:**
```jsx
// En el data del nodo:
bannerImage: '/assets/starwars/infographic_mundos/banner_tatooine.png',
bannerCaption: 'El doble atardecer de Tatooine — inspirado por Kepler-16b'

// En ContentPanel, entre expandables:
{node.bannerImage && (
  <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
    <img src={node.bannerImage} alt={node.bannerCaption || ''} 
         style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
    {node.bannerCaption && (
      <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                  fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
        {node.bannerCaption}
      </p>
    )}
  </div>
)}
```

## 13. Estándar de Volumen de Contenido en Infografías Interactivas

> **REGLA DE DENSIDAD INFORMATIVA**: Toda infografía interactiva DEBE cumplir con umbrales mínimos de volumen de texto por nodo. Estos umbrales garantizan que cada nodo ofrezca una experiencia educativa completa, eliminando espacios vacíos y manteniendo consistencia visual con el estándar de referencia.

### 13.1 Componente de Referencia (Golden Standard):
El benchmark se establece a partir de `InteractiveInfographic_BttfM1.js` (La Ciencia del Viaje en el Tiempo), ajustado con un **+5% de margen de calidad** para asegurar que las futuras generaciones superen el estándar mínimo.

### 13.2 Umbrales Mínimos por Nodo (benchmark + 5%):

| Elemento | Mínimo requerido | Descripción |
|---|---|---|
| **Párrafos (`content[]`)** | **5 párrafos** | 2 en Hero Section + 3 en Magazine Body |
| **Chars por párrafo (avg)** | **≥ 400 caracteres** | Promedio de los 5 párrafos del nodo |
| **Chars por expandable (avg)** | **≥ 300 caracteres** | Promedio de los textos en `expandables[].text` |
| **Chars del fact** | **≥ 300 caracteres** | Campo `fact` del nodo |
| **Total por nodo (mínimo)** | **≥ 2,500 caracteres** | Suma de `content[]` + `expandables[].text` + `fact` |
| **Total por infografía** | **≥ 17,500 caracteres** | Suma de todos los nodos (asumiendo ≥ 7 nodos) |

### 13.3 Distribución del Contenido en el Layout:
```
┌───────────────────────────────────────────────┐
│  HERO SECTION (grid 1fr 1fr, minHeight 280px) │
│  ├─ Columna Izquierda: content[0] + content[1]│
│  └─ Columna Derecha: hero image (cover)       │
├───────────────────────────────────────────────┤
│  MAGAZINE BODY (grid 1fr 1fr, cards estilo)   │
│  ├─ Card ◆: content[2]                        │
│  ├─ Card ◇: content[3]                        │
│  └─ Card wide (1/-1): content[4]              │
├───────────────────────────────────────────────┤
│  EXPANDABLES (grid 1fr 1fr, colapsables)      │
│  ├─ expandables[0] (≥ 300 chars)              │
│  └─ expandables[1] (≥ 300 chars)              │
├───────────────────────────────────────────────┤
│  BANNER (opcional, §12.7)                     │
├───────────────────────────────────────────────┤
│  FACTO FASCINANTE (≥ 300 chars)               │
└───────────────────────────────────────────────┘
```

### 13.4 Requisitos de Calidad del Contenido:
- Cada párrafo DEBE contener al menos **un dato verificable** (fecha, cifra, nombre de científico, nombre de misión, etc.)
- Cada párrafo DEBE usar al menos **una analogía o metáfora** estilo Feynman para hacer el concepto accesible
- Los párrafos del body (content[2], [3], [4]) DEBEN profundizar progresivamente: dato general → mecanismo científico → implicación/conexión con la vida real
- El 5to párrafo (content[4]) DEBE servir como **cierre narrativo** que conecte con el futuro de la ciencia o invite a la reflexión
- Los expandables DEBEN aportar información **complementaria y NO redundante** con el contenido principal

### 13.5 Lo que NUNCA hacer:
- ❌ NO crear nodos con menos de 5 párrafos en `content[]`
- ❌ NO escribir párrafos de menos de 250 caracteres (mínimo absoluto por párrafo individual)
- ❌ NO dejar el Magazine Body con solo 2 párrafos (siempre 3: 2 en grid + 1 wide)
- ❌ NO copiar texto del `content[]` en los `expandables` ni en el `fact` — cada campo es contenido único
- ❌ NO usar `auto-fit` ni `minmax()` en el grid del body — siempre `1fr 1fr` fijo
- ❌ NO usar `minHeight` mayor a `280px` en el Hero Section — causa espacios vacíos

## 14. Auditoría Integral Pre-Commit (Científica + Extensión)

> **REGLA INELUDIBLE**: Antes de hacer `git commit` de CUALQUIER infografía interactiva (nueva o editada), el agente DEBE ejecutar una auditoría integral de dos fases: verificación científica y verificación de extensión de contenido. NO se puede hacer commit sin pasar ambas fases.

### 14.1 FASE 1 — Auditoría Científica:
Para CADA nodo de la infografía, verificar:

| Check | Criterio | Acción si falla |
|---|---|---|
| **Fechas** | Toda fecha mencionada es real y verificable | Corregir o eliminar |
| **Nombres propios** | Científicos, misiones, instituciones existen y están bien escritos | Corregir ortografía |
| **Cifras** | Temperaturas, distancias, masas, velocidades son precisas | Verificar con fuente y corregir |
| **Atribuciones** | Descubrimientos atribuidos a la persona/equipo correcto | Corregir atribución |
| **Analogías** | Las analogías son científicamente válidas (no distorsionan el concepto) | Reescribir analogía |
| **Consistencia interna** | No hay contradicciones entre párrafos del mismo nodo o entre nodos | Unificar datos |

### 14.2 FASE 2 — Auditoría de Extensión de Contenido:
Para CADA nodo de la infografía, verificar los umbrales de §13.2:

```
CHECKLIST DE EXTENSIÓN (ejecutar por cada nodo):
┌─────────────────────────────────────────────────────┐
│ □ content[] tiene exactamente 5 párrafos            │
│ □ content[0] ≥ 350 chars                            │
│ □ content[1] ≥ 350 chars                            │
│ □ content[2] ≥ 350 chars                            │
│ □ content[3] ≥ 350 chars                            │
│ □ content[4] ≥ 350 chars                            │
│ □ Promedio de los 5 párrafos ≥ 400 chars            │
│ □ expandables[0].text ≥ 300 chars                   │
│ □ expandables[1].text ≥ 300 chars                   │
│ □ fact ≥ 300 chars                                  │
│ □ Total del nodo ≥ 2,500 chars                      │
│ □ Grid del body usa '1fr 1fr' (no auto-fit)         │
│ □ Hero minHeight es '280px' (no mayor)              │
└─────────────────────────────────────────────────────┘

CHECKLIST GLOBAL (ejecutar una vez por infografía):
┌─────────────────────────────────────────────────────┐
│ □ Total de TODOS los nodos ≥ 17,500 chars           │
│ □ Ningún párrafo individual < 250 chars             │
│ □ No hay texto duplicado entre content/expandables  │
│ □ El body tiene 3 párrafos en grid cards (no plano) │
│ □ BIBLIOGRAPHY existe con ≥ 4 fuentes reales (§11) │
└─────────────────────────────────────────────────────┘
```

### 14.3 Formato de Reporte de Auditoría:
Al completar la auditoría, el agente DEBE generar un reporte breve en la respuesta al usuario con el siguiente formato:

```
📊 AUDITORÍA INTEGRAL — [Nombre de la Infografía]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔬 FASE 1 — Científica:
   ✅ Fechas verificadas: X/X
   ✅ Nombres validados: X/X
   ✅ Cifras precisas: X/X
   ✅ Atribuciones correctas: X/X
   ⚠️ Correcciones aplicadas: [lista si aplica]

📏 FASE 2 — Extensión:
   ✅ Párrafos por nodo: 5/5 en todos los nodos
   ✅ Promedio chars/párrafo: XXX (≥ 400 ✓)
   ✅ Promedio chars/expandable: XXX (≥ 300 ✓)
   ✅ Total por infografía: XX,XXX chars (≥ 17,500 ✓)
   ❌ Nodos bajo umbral: [lista si aplica]

RESULTADO: ✅ APROBADA / ❌ RECHAZADA (requiere corrección)
```

### 14.4 Lo que NUNCA hacer:
- ❌ NO hacer `git commit` de una infografía sin ejecutar ambas fases de auditoría
- ❌ NO omitir el reporte de auditoría en la respuesta al usuario
- ❌ NO marcar como "aprobada" una infografía que tenga algún nodo bajo los umbrales mínimos
- ❌ NO ignorar errores de la Fase 1 (científica) aunque la Fase 2 (extensión) pase correctamente
- ❌ NO asumir que el contenido anterior cumple — siempre re-auditar al editar

