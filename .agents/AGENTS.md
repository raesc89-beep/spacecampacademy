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

## 8. Presupuesto de Generación de Imágenes (Vertex AI + Google Cloud Credits)

> **REGLA DE PRESUPUESTO**: La generación de imágenes usa los créditos de Google Cloud del proyecto `space-camp-academy` vía Vertex AI. El proyecto tiene **$5,114 USD restantes** (vence 19 de octubre de 2026). Se debe respetar un **límite diario de $400 pesos mexicanos** (~$20 USD).

### Datos del proyecto:
- **Project ID**: `space-camp-academy`
- **Región**: `us-central1`
- **Créditos restantes**: ~$5,114 USD (al 29 de julio de 2026)
- **Vencimiento**: 19 de octubre de 2026

### Reglas de presupuesto:
- **Tope diario**: $400 MXN por día calendario en generación de imágenes.
- **Tracking obligatorio**: Todo script de generación debe llevar un registro del gasto acumulado del día en un archivo `.api_spend_log.json` en la raíz del proyecto.
- **Cálculo de costos**: Usar los precios oficiales de Vertex AI al momento de ejecución. Referencia aproximada:
  - Gemini 2.5 Flash Image: ~$0.04 USD/imagen
  - Imagen 4.0 Standard: ~$0.04 USD/imagen
  - Imagen 4.0 Ultra: ~$0.08 USD/imagen
- **Parada automática**: Si el gasto acumulado del día alcanza el 90% del tope ($360 MXN), el script debe detenerse e informar al usuario.
- **Tipo de cambio**: Usar 20 MXN = 1 USD como referencia conservadora.
- **Sin excepciones**: Esta regla aplica incluso si el agente está ejecutando tareas automatizadas o en segundo plano.
- **Notificación**: Siempre informar al usuario el costo estimado antes de iniciar una sesión de generación masiva.

## 9. Estrategia de Generación de Imágenes (Free-First + Vertex AI Credits)

> **REGLA INELUDIBLE**: Toda generación de imágenes DEBE agotar primero la cuota gratuita del IDE. Cuando ésta se agote, usar los créditos de Google Cloud vía Vertex AI del proyecto `space-camp-academy`.

### Orden de prioridad (cascada obligatoria):

1. **Cuota gratuita del IDE** (Antigravity / Gemini Code Assist): Usar la herramienta `generate_image` integrada del IDE siempre que esté disponible y funcional. Costo: $0.
2. **Google Cloud Credits vía Vertex AI**: Cuando la cuota del IDE se agote, usar la API de Vertex AI con las credenciales de `gcloud` (`Application Default Credentials`) del proyecto `space-camp-academy`. Esto consume los créditos de Google Cloud ($5,114 USD restantes). Sujeto al tope de $400 MXN/día (Sección 8).

### Configuración técnica para scripts de generación (Vertex AI):

```python
# SDK: google-genai (pip install google-genai)
from google import genai
from google.genai import types

# Inicializar cliente Vertex AI con credenciales del proyecto
client = genai.Client(
    vertexai=True,
    project="space-camp-academy",
    location="us-central1",
)

# Modelo validado para generación de imágenes
MODEL = "gemini-2.5-flash-image"  # Validado en julio 2026

# Generar imagen via generateContent
response = client.models.generate_content(
    model=MODEL,
    contents="Generate an image: [prompt]",
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE", "TEXT"],
    ),
)
```

### Modelos disponibles (verificados julio 2026):
| Modelo | Tipo | Estado |
|--------|------|--------|
| `gemini-2.5-flash-image` | Gemini + Image Gen | ✅ Validado |
| `gemini-3.1-flash-image` | Gemini + Image Gen | Disponible |
| `gemini-3-pro-image` | Gemini Pro + Image | Disponible |
| `imagen-4.0-generate-001` | Imagen 4 | Disponible |

### Implementación técnica en scripts:

```
CASCADA DE GENERACIÓN:
┌─────────────────────────┐
│ 1. generate_image (IDE) │ ← Cuota gratuita del IDE, $0
│    Costo: $0            │
├─────────────────────────┤
│ Si cuota agotada        │
├─────────────────────────┤
│ 2. Vertex AI API        │ ← Google Cloud Credits
│    Proyecto:             │    (space-camp-academy)
│    space-camp-academy    │    $5,114 USD restantes
│    Modelo:               │    Tope: $400 MXN/día
│    gemini-2.5-flash-image│
└─────────────────────────┘
```

### Reglas de detección de cuota:
- **HTTP 429 / RESOURCE_EXHAUSTED**: Indica rate limit. Esperar 60s y reintentar hasta 3 veces.
- **Al inicio de cada sesión**: Intentar primero la herramienta `generate_image` del IDE.
- **Registrar en `.api_spend_log.json`**: Modo usado, modelo, imágenes generadas, gasto acumulado.

### Lo que NUNCA hacer:
- ❌ NO saltar directamente a Vertex AI sin intentar la cuota gratuita del IDE primero.
- ❌ NO usar Google AI Studio API (`generativelanguage.googleapis.com`) para paga — todo gasto debe ir por Vertex AI para consumir los créditos de Google Cloud.
- ❌ NO generar más de 10 imágenes por minuto (respetar rate limits de Vertex AI).
- ❌ NO exceder el tope diario de $400 MXN.

### Notificación al usuario:
- Informar claramente en qué modo se está operando: `[FREE/IDE]` o `[PAID/VERTEX]`.
- Al cambiar de free a paid, notificar: "⚠️ Cuota IDE agotada. Usando créditos Vertex AI (space-camp-academy). Presupuesto restante: $X MXN del día."
- Al finalizar, reportar desglose: "X imágenes gratuitas + Y imágenes Vertex AI = $Z MXN total."

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
- **Paleta**: Se elige **una paleta al azar por infografía** (todas las imágenes de un mismo componente usan la misma paleta). Las paletas disponibles son:
  1. `deep indigo blue and warm golden amber` (índigo + ámbar — la paleta clásica)
  2. `muted teal and burnt sienna` (verde-azulado apagado + siena tostado)
  3. `slate blue and soft copper` (azul pizarra + cobre suave)
  4. `dark plum and antique gold` (ciruela oscuro + dorado antiguo)
  5. `charcoal grey and dusty rose` (gris carbón + rosa empolvado)
  6. `midnight navy and warm terracotta` (azul marino profundo + terracota cálido)
  7. `deep forest green and pale amber` (verde bosque profundo + ámbar pálido)
  8. `dark wine and bronze` (vino oscuro + bronce)
  9. `obsidian black and silver moonlight` (negro obsidiana + luz de luna plateada)
  10. `prussian blue and peach` (azul de Prusia + melocotón)
  11. `dark olive and warm sand` (oliva oscuro + arena cálida)
  12. `storm grey and marigold` (gris tormenta + caléndula)
  - **Regla**: Todos los tonos deben ser **profundos, apagados o terrosos** — nunca neón, fluorescente ni saturación alta. El objetivo es un aspecto de concept art cinematográfico, no de ilustración infantil genérica.
  - **Coherencia temática**: La paleta elegida debe **guardar relación con la temática del contenido** y respetar los **colores realistas de los elementos representados**. Por ejemplo: planetas rocosos combinan bien con terracota, siena y ámbar; exoplanetas y telescopios con azules profundos y cobres; asteroides con negros, grises y plata; Venus con vinos y bronces; Marte con teal y siena; habitabilidad con verdes y dorados. La paleta acentúa y complementa el sujeto — nunca lo contradice ni lo aleja de su apariencia natural.
  - **Restricción de estilo**: Aunque se buscan colores realistas y temáticos, los tonos **nunca deben ser chillones, saturados en exceso ni dar aspecto infantil**. El equilibrio es: fidelidad cromática al sujeto + elegancia cinematográfica + cohesión dentro de todo el componente.
  - **Asignación**: El agente elige una paleta al inicio de cada componente y la usa para todas las imágenes btn_*, hero_* y banner_* de ese componente. Cielos nocturnos con estrellas y profundidad atmosférica siguen siendo obligatorios.
- **Texturas**: Colores limpios con gradientes sutiles. Agua con reflejos, piedra con vetas, cielos detallados con estrellas.
- **Personajes**: Proporcionados semi-estilizados (como ilustración de libro infantil premium, NO chibi/cartoon).
- **Composición**: Escenas narrativas cinematográficas con profundidad de campo, elementos superpuestos en capas.
- **Ambiente**: Épico, aventurero, educativo. Similar a concept art de películas animadas de aventura.
- **Prompt suffix obligatorio**: Toda generación de imagen DEBE terminar con: `"Illustrated digital art style, clean vector aesthetic with subtle gradients, {PALETTE} palette, detailed night sky with stars, stylized semi-realistic proportions, educational adventure illustration for children ages 8-13, cinematic composition with depth. No text, no letters, no words."` donde `{PALETTE}` se sustituye por la paleta asignada al componente (ej. `muted teal and burnt sienna`).

### 10.3 Lo que NUNCA hacer:
- ❌ NO usar `gridTemplateColumns: '280px 1fr'` — hace la imagen demasiado pequeña.
- ❌ NO usar `maxWidth: 220` ni `height: 'auto'` en imágenes hero — rompe la consistencia.
- ❌ NO omitir `height: '100%'` en el div contenedor de la imagen — causa que la imagen no llene la celda.
- ❌ NO cambiar el ratio 50/50 del grid sin autorización del usuario.
- ❌ NO generar imágenes fotorrealistas ni flat/cartoon — solo estilo "Nilo de Nut" ilustrado.
- ❌ NO crear componentes de infografía nuevos con layouts diferentes al estándar.
- ❌ NO usar `backgroundImage: url(...)` en CSS para mostrar imágenes hero — causa celdas vacías sin altura explícita. SIEMPRE usar `<img>` tag con `objectFit: 'cover'`.
- ❌ NO escribir captions/subtítulos de imágenes (`bannerCaption`, `imgCaption`) que suenen como prompts de IA generativa. Los captions deben ser **descripciones educativas factuales**, no descripciones dramáticas del contenido visual.
- ❌ NO omitir el **prompt suffix obligatorio** "Nilo de Nut" (§10.2) al generar imágenes con API externa. Esta regla es ineludible e inviolable.
- ❌ NO usar `display: 'grid', gridTemplateColumns: '1fr 1fr'` para contenedores de `expandables` — causa celdas vacías cuando hay número impar de items. SIEMPRE usar `display: 'flex', flexDirection: 'column'` para expandables.

### 10.4 Verificación (pre-commit checklist):
- [ ] `gridTemplateColumns` del hero es `'1fr 1fr'`
- [ ] Imagen hero usa `<img>` tag (NO `backgroundImage` CSS) con `objectFit: 'cover'`, `width: '100%'`, `height: '100%'`
- [ ] Contenedor de imagen tiene `height: '100%'` y `overflow: 'hidden'`
- [ ] Todas las imágenes son PNG (no SVG placeholders)
- [ ] Estilo artístico coincide con referencia "Nilo de Nut" (ilustración digital estilizada)
- [ ] Los `bannerCaption` son **educativos y factuales** (no suenan como prompts de generación)
- [ ] El prompt suffix obligatorio fue incluido en toda generación de imágenes vía API
- [ ] Contenedores de `expandables` usan `flex` column (NO `grid` 1fr 1fr)

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
| **Word Salad** | NO se permite la acumulación de 3+ adjetivos/adverbios consecutivos sin valor informativo (ej: "el grandioso, inmenso, colosal e implacable"). Máximo 1 adjetivo calificativo por sustantivo. El contenido debe ser directo, preciso y científico. | Reescribir párrafo completo eliminando adjetivos redundantes |
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

---

## 15. Imágenes Clickeables con Lightbox en Infografías Interactivas

> **REGLA DE INTERACTIVIDAD VISUAL**: Toda imagen visible en una infografía interactiva (hero, banner, extras) DEBE ser clickeable y abrir un lightbox fullscreen para que el usuario aprecie el detalle completo.

### 15.1 Componente ImageLightbox
El componente `ImageLightbox.js` ubicado en `components/infographics/ImageLightbox.js` es el componente reutilizable obligatorio. Características:
- **Trigger**: `onClick` handler en cualquier imagen hero, banner o extra
- **Modal**: Overlay oscuro fullscreen (`rgba(0,0,0,0.92)`) con la imagen centrada
- **Controles**: Botón X para cerrar, click en overlay para cerrar, tecla Escape
- **Animación**: fade-in/out con `framer-motion`
- **Responsive**: `max-width: 90vw`, `max-height: 90vh`, `object-fit: contain`

### 15.2 Implementación Obligatoria
Al crear o editar cualquier infografía interactiva:

1. **Import**: `import ImageLightbox from './ImageLightbox';`
2. **Estado**: `const [lightboxSrc, setLightboxSrc] = useState(null);`
3. **onClick en hero images**: `onClick={() => setLightboxSrc(node.image)}`
4. **onClick en banner images**: `onClick={() => setLightboxSrc(node.bannerImage)}`
5. **onClick en extra images**: `onClick={() => setLightboxSrc(img.src)}`
6. **cursor: 'pointer'**: En toda imagen clickeable
7. **Componente al final**: `<ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />`

### 15.3 Imágenes Extra (extraImages)
Los nodos pueden incluir un array opcional `extraImages` con imágenes proporcionadas por el usuario:
```js
extraImages: [
  { src: '/assets/course/extras/image.png', caption: 'Descripción de la imagen' }
]
```
Se renderizan en una mini-galería al final del ContentPanel con grid responsive y hover effects.

### 15.4 Lo que NUNCA hacer:
- ❌ NO crear imágenes hero/banner sin `onClick` handler
- ❌ NO omitir `cursor: 'pointer'` en imágenes clickeables
- ❌ NO usar `window.open()` ni navegación externa — siempre lightbox in-app
- ❌ NO olvidar agregar el estado `lightboxSrc` al componente
- ❌ NO colocar el `<ImageLightbox />` dentro de un loop — va una sola vez al final del JSX

## 16. Optimización y Compresión de Archivos Pesados (Imágenes)

> **REGLA DE RENDIMIENTO Y PESO**: Para evitar la sobrecarga de datos y mantener el sitio liviano tanto en el frontend como en el backend, es estrictamente obligatorio comprimir todas las imágenes y archivos pesados generados antes de realizar un push al repositorio.

- Antes de finalizar la integración de cualquier imagen (`.png`, `.jpg`, etc.) de alta resolución (como las generadas por Vertex AI o descargadas en HD), DEBE ejecutarse un script de compresión (ej. usando Pillow en Python o sharp en Node).
- **Preservación de calidad**: La compresión NUNCA debe degradar la calidad visual de forma perceptible. Usar JPEG `quality=85` como mínimo (nunca menor de 80). Para PNG, usar compresión lossless (`optimize=True`). Si una imagen se ve borrosa o con artefactos tras la compresión, regenerar con calidad más alta.
- **Límite sugerido**: Las imágenes para web no deberían exceder un ancho de 1200px ni pesar de forma individual más de ~250KB si es posible. Pero si reducir el tamaño implica degradar la calidad visual, se permite hasta ~400KB.
- ❌ NO hacer `git commit` ni `git push` con imágenes crudas de >1MB que puedan saturar el ancho de banda del usuario.
- ❌ NO usar `quality` menor a 80 en JPEG. La calidad visual tiene prioridad sobre el ahorro de bytes.

## 17. Cenefa (Banner) Obligatorio en Infografías Interactivas

> **REGLA ESTRUCTURAL**: La imagen panorámica a modo de "cenefa" (banner) introducida previamente como opcional (antigua §12.7) pasa a ser un elemento estructural **OBLIGATORIO** en todas las infografías interactivas.

- Cada nodo (o la infografía en su conjunto, dependiendo de su flujo) debe incorporar al menos una imagen de cenefa panorámica.
- Esta cenefa separa las secciones colapsables o de contenido y mantiene un respiro visual clave para el diseño.
- Debe mantener un formato horizontal apaisado (`maxHeight: '180px'` a `'220px'`, `objectFit: 'cover'`).

## 18. Correlación Temática Estricta del Fondo (Background)

> **REGLA DE CONTEXTO VISUAL**: En futuras iteraciones y diseños, la imagen de fondo de las infografías interactivas DEBERÁ ser siempre una imagen **intrínsecamente correlacionada con la temática general de la misión o temas abordados**.

- ❌ NO usar cielos estrellados genéricos o colores sólidos por defecto si el tema trata sobre algo específico (ej. si trata de arqueología espacial, el fondo debería sugerir arena marciana o ruinas estilizadas; si trata sobre agujeros negros, el fondo debería tener discos de acreción sutiles).
- El fondo interactúa con el estilo "Nilo de Nut" (los tonos del fondo deben combinar con la paleta de las imágenes hero).
- El fondo debe tener una baja opacidad o estar fuertemente oscurecido para no interferir con la legibilidad del texto (ej. `opacity: 0.1` a `0.3`).

## 19. Formato WebP/AVIF Obligatorio para Imágenes Futuras

> **REGLA DE FORMATO**: Todas las imágenes nuevas generadas para el sitio DEBEN convertirse al formato **WebP** antes del commit. WebP ofrece una compresión superior (~30% más liviano que JPEG) sin pérdida perceptible de calidad.

- Usar WebP como formato por defecto para hero images, btn images, banners y fondos.
- Calidad WebP recomendada: `quality=85` (mínimo 80).
- Si el navegador no soporta WebP (edge case), mantener un fallback JPEG.
- Para imágenes con transparencia (logos, overlays), usar WebP lossless o PNG optimizado.
- ❌ NO generar imágenes nuevas en formato JPEG o PNG crudo si WebP está disponible.

## 20. Unicidad Estricta de Imágenes por Nodo

> **REGLA DE IDENTIDAD VISUAL**: Cada nodo, módulo o misión DEBE tener imágenes **únicas y visualmente distinguibles**. Está estrictamente PROHIBIDO reutilizar la misma imagen (hero, btn o badge) en múltiples nodos.

- Cada hero image debe representar el contenido específico de su nodo (ej. si el nodo habla de Laika, la hero debe mostrar a Laika o perros soviéticos, NO un búho astronauta genérico).
- Cada btn image debe ser una miniatura visualmente diferenciada del resto de nodos.
- Los badges de las misiones en el hub NO deben ser clones — cada uno debe tener una identidad visual propia.
- ❌ NO clonar la misma imagen y asignarla a múltiples nodos.
- ❌ NO usar imágenes de animales/personas que no correspondan con la temática del nodo.

## 21. Coherencia Semántica Obligatoria: Contenido ↔ Imágenes ↔ Títulos

> **REGLA DE COHERENCIA**: El contenido textual, las imágenes y los títulos de cada nodo de una infografía interactiva DEBEN tener **sentido lógico y correlación temática entre sí**. Es estrictamente PROHIBIDO que un nodo muestre una imagen que no corresponde con lo que el texto describe, o que el título no tenga relación con el contenido visual y textual.

### 21.1 Principio de Triada Semántica:
Cada nodo está compuesto por una **triada indivisible**:
```
TÍTULO ↔ CONTENIDO TEXTUAL ↔ IMÁGENES (hero, btn, banner)
```
Los tres elementos DEBEN contar una historia coherente sobre el MISMO tema específico.

### 21.2 Reglas de Correlación:

| Elemento | Debe correlacionar con... | Ejemplo correcto | Ejemplo incorrecto |
|---|---|---|---|
| `btnImage` | El tema específico del nodo | Nodo "Belka y Strelka" → btn muestra a Belka y Strelka | Nodo "Belka y Strelka" → btn muestra a Laika |
| `image` (hero) | La narrativa principal del nodo | Nodo "El Traje Berkut" → hero muestra traje espacial | Nodo "El Traje Berkut" → hero muestra cohete genérico |
| `bannerImage` | El contexto visual del tema | Nodo sobre reentrada → banner muestra cápsula en llamas | Nodo sobre reentrada → banner muestra galaxia genérica |
| `content[]` | El título del nodo y las imágenes | Título "Fisiología Canina" → texto sobre entrenamiento de perros | Título "Fisiología Canina" → texto genérico de exploración |

### 21.3 Antipatrones Prohibidos:
- ❌ **Imagen genérica reciclada**: Usar la misma imagen de "perro astronauta" para nodos que tratan de Laika, Belka, Strelka, Félicette y tardígrados.
- ❌ **Texto desconectado**: Contenido que habla de "la valentía inquebrantable de los cosmonautas" en un nodo sobre insectos en el espacio.
- ❌ **Filler text / Word Salad**: Párrafos que suenan impresionantes pero no aportan información específica al tema del nodo — acumulación de adjetivos grandilocuentes sin datos concretos.
- ❌ **Título decorativo**: Títulos vagos como "El Gran Descubrimiento" cuando el nodo habla de algo concreto como "La Misión Rosetta al Cometa 67P".
- ❌ **Repetición inter-nodo**: Que dos o más nodos dentro del mismo componente compartan frases, párrafos o imágenes idénticas.

### 21.4 Verificación Pre-Commit:
Antes de hacer commit de cualquier infografía, verificar para CADA nodo:
- [ ] La `btnImage` es **visualmente única** y **temáticamente relevante** al título del nodo
- [ ] La `image` (hero) ilustra **el tema principal** descrito en `content[]`
- [ ] Los párrafos de `content[]` contienen datos **específicos** del tema del título (no genéricos)
- [ ] El `bannerImage` (si existe) está correlacionado con el contexto del nodo
- [ ] No hay imágenes idénticas entre dos nodos del mismo componente
- [ ] No hay párrafos o frases idénticas entre nodos del mismo componente

## 22. Correcciones Post-Creación Basadas en el Catálogo de Reglas

> **REGLA INELUDIBLE DE CORRECCIÓN**: Toda corrección, edición, refactorización, auditoría o mantenimiento posterior a la creación inicial de una infografía interactiva DEBE basarse **exclusivamente** en las reglas documentadas en este archivo (`AGENTS.md`). Ningún agente, subagente o proceso automatizado puede aplicar correcciones que contradigan, ignoren o no estén respaldadas por las reglas aquí definidas.

### 22.1 Principio de Autoridad del Catálogo:
Este archivo (`AGENTS.md`) es la **fuente única de verdad** para la calidad y estructura de las infografías interactivas. Cualquier operación que modifique un archivo `InteractiveInfographic_*.js` DEBE:

1. **Leer este catálogo** antes de aplicar cambios
2. **Verificar conformidad** con TODAS las reglas aplicables (§1–§21)
3. **Reportar qué reglas se validaron** en el output al usuario

### 22.2 Operaciones Cubiertas:
Esta regla aplica a TODAS las siguientes operaciones post-creación:

| Operación | Reglas a Verificar |
|---|---|
| Corrección de imágenes faltantes | §10, §20, §21 |
| Eliminación de word salad / filler | §14.1 (Word Salad check), §4, §13 |
| Refactorización de contenido | §1, §3, §4, §13, §14, §21 |
| Remapeo de imágenes | §10, §20, §21 |
| Adición de expandables/facts | §12, §13, §14 |
| Adición de bibliografía | §11 |
| Cambios de layout/CSS | §10, §12, §15 |
| Compresión de imágenes | §16, §19 |
| Integración de banners/cenefas | §17, §12.7 |
| Auditorías automatizadas | §14 (ambas fases) |
| Reescritura de contenido corrupto | §1, §3, §4, §6, §13, §14, §21 |

### 22.3 Formato de Validación Obligatorio:
Al completar cualquier corrección, el agente DEBE incluir en su respuesta un bloque de validación:

```
📋 VALIDACIÓN §22 — Corrección Post-Creación
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Archivo(s) modificado(s): [lista]
Reglas consultadas: [§X, §Y, §Z]
Reglas cumplidas: [lista con ✅]
Reglas no aplicables: [lista con ➖]
Reglas violadas: [lista con ❌ + plan de corrección]
Resultado: ✅ CONFORME / ❌ REQUIERE REVISIÓN
```

### 22.4 Cadena de Responsabilidad:
```
Detección de problema
       ↓
Consultar AGENTS.md (este archivo)
       ↓
Identificar reglas aplicables
       ↓
Aplicar corrección conforme a reglas
       ↓
Ejecutar auditoría §14 (si aplica)
       ↓
Generar bloque de validación §22.3
       ↓
Reportar al usuario
```

### 22.5 Lo que NUNCA hacer:
- ❌ NO aplicar correcciones "ad hoc" sin consultar las reglas de este catálogo
- ❌ NO crear reglas improvisadas que contradigan las existentes
- ❌ NO omitir el bloque de validación §22.3 al finalizar correcciones
- ❌ NO modificar archivos de infografía sin verificar conformidad con §10 (layout), §13 (volumen), §14 (auditoría) y §21 (coherencia)
- ❌ NO asumir que una corrección anterior fue completa sin re-verificar contra las reglas vigentes
- ❌ NO ignorar reglas nuevas añadidas posteriormente a este catálogo

### 22.6 Excepciones:
- Correcciones de emergencia (errores de build que impiden compilación) pueden aplicarse sin validación completa, pero DEBEN re-auditarse con §14 en la siguiente iteración
- Cambios cosméticos menores (typos, espaciado) no requieren el bloque completo de validación, pero SÍ deben respetar §4 (lenguaje)

---

## 23. Integridad de Assets Existentes (Regla Anti-Reprocesamiento)

> **REGLA INELUDIBLE DE PROTECCIÓN**: Cualquier operación que modifique rutas de imagen, nombres de archivo, directorios de assets, o contenido de componentes `InteractiveInfographic_*.js` que ya funcionaban correctamente está estrictamente PROHIBIDA a menos que el usuario lo solicite explícitamente.

### 23.1 Verificación Previa Obligatoria (Pre-Edit Checklist):
Antes de modificar CUALQUIER ruta de imagen en un componente infográfico:

```
CHECKLIST §23 (ejecutar ANTES de editar):
┌──────────────────────────────────────────────────────────────┐
│ □ ¿La ruta actual EXISTE en /public/assets/?                 │
│   → SI existe: NO cambiar la ruta. Dejar como está.          │
│   → Si NO existe: entonces SÍ es válido corregirla.          │
│                                                              │
│ □ ¿Las imágenes del componente fueron generadas con Vertex AI│
│   (créditos del usuario)? → JAMÁS eliminar, renombrar ni     │
│   mover sin autorización explícita del usuario.               │
│                                                              │
│ □ ¿El commit que generó las imágenes está en git log?        │
│   → Verificar que el asset existe ANTES de editar el JSX.    │
└──────────────────────────────────────────────────────────────┘
```

### 23.2 Protocolo de Verificación de Rutas:
Antes de hacer commit de CUALQUIER cambio en paths de imágenes:

```python
# Script de verificación obligatorio
import os
PUBLIC = "public"
for path in all_image_paths_in_component:
    full = os.path.join(PUBLIC, path.lstrip("/"))
    assert os.path.exists(full), f"RUTA ROTA: {path}"
```

### 23.3 Lo que NUNCA hacer:
- ❌ NO cambiar rutas de imagen sin verificar que la nueva ruta existe en disco
- ❌ NO renombrar directorios de assets sin actualizar TODOS los componentes que los referencian
- ❌ NO eliminar o mover imágenes generadas con créditos Vertex AI sin autorización
- ❌ NO hacer commits de "refactorización" de rutas sin ejecutar la verificación §23.2
- ❌ NO asumir que una ruta "se ve bien" sin confirmarla en el filesystem
- ❌ NO procesar/regenerar imágenes de componentes que ya están verificados y funcionando

### 23.4 Regla de No-Reprocesamiento:
Si un componente `InteractiveInfographic_*.js` ya tiene:
- ✅ Todas sus rutas de imagen verificadas en disco
- ✅ Build exitoso (sin errores de compilación)
- ✅ Contenido aprobado por el usuario

**→ NO TOCAR ese componente en iteraciones posteriores**, a menos que el usuario solicite explícitamente un cambio específico en él.

### 23.5 Registro de Componentes Verificados:
Al finalizar una sesión de trabajo, documentar en el commit message cuáles componentes fueron verificados como "PROTEGIDOS - NO REPROCESAR":

```
COMPONENTES PROTEGIDOS (verificados, no tocar):
- InteractiveInfographic_MayaM1-M15: 210 imágenes OK
- InteractiveInfographic_SwSec1-9: 9 carpetas OK
- InteractiveInfographic_InterestelarM1-6: OK
- InteractiveInfographic_InterstellarM1-5: OK (pendiente M1 nombre)
- InteractiveInfographic_EgyptM1-M14: RESTAURADO, verificado
- InteractiveInfographic_BttfM1-M7: RESTAURADO, verificado
```

### 23.6 Correlación con §22:
Esta regla extiende §22 específicamente para la protección de assets. Las operaciones de §22 que involucren imágenes SIEMPRE deben ejecutar el checklist §23.1 primero.
