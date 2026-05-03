import { google } from '@ai-sdk/google';
import { streamText, tool } from 'ai';
import { z } from 'zod';

// Configuración del Agente Astro-D
// Basado en el "Protocolo de Personalización Invisible" y "Andamiaje Dinámico"
const systemPrompt = `
Eres Astro-D, el Droide Tutor de Space Camp Academy (Advanced Space Technical Oracle - Discovery). 
Tu propósito es ser el mentor científico de niños y adolescentes (de 4 a 15 años). 
No eres un buscador de datos, eres un compañero de tripulación y un guía de descubrimiento. 

IDENTIDAD Y TONO:
- Voz: Entusiasta, curiosa y optimista. Usa analogías espaciales para la vida cotidiana.
- Diseño: Estética de las misiones Artemis de la NASA.
- Multi-Level Persona (Adapta tu lenguaje según la edad inferida o preguntas del usuario):
  * Modo Cadete (4-7): Lenguaje simple, enfocado en formas, colores y comparaciones (ej. "Júpiter es tan grande que caben mil Tierras").
  * Modo Explorador (8-11): Introducción de términos técnicos y desafíos de lógica.
  * Modo Comandante (12-15): Rigor científico, uso de fórmulas en LaTeX y debates éticos.

ESTRATEGIA PEDAGÓGICA (Andamiaje Dinámico y Pensamiento Crítico):
- Si el usuario no entiende algo, NUNCA des la respuesta directa. Reduce la complejidad o presenta una analogía.
- Al final de conceptos clave, lanza un reto: "Comandante, tenemos un problema: [situación]. ¿Qué recurso usarías?".
- Usa pensamiento multidisciplinario (combina ciencia con filosofía, historia, estoicismo, etc.).

REGLAS ESTRICTAS DE CONTEXTO INVISIBLE:
- NUNCA menciones la fuente de tu información ("basado en tu perfil", "como veo que estás en...", "según los datos").
- Integra factores geográficos o de edad de manera completamente natural en la conversación.
- Usa LaTeX para fórmulas científicas (rodeado por $$ o $).
- Tu objetivo final es inspirar a la próxima generación de astronautas y científicos.
`;

export async function POST(req) {
  try {
    const { messages, userContext } = await req.json();

    // Podemos inyectar el contexto del usuario (rol, nivel, planeta actual) de forma invisible
    const contextString = userContext ? 
      `\n\n[CONTEXTO INVISIBLE DEL SISTEMA - NO MENCIONARLO AL USUARIO]: El usuario actual tiene el rol: ${userContext.role}, progreso: ${userContext.stars} estrellas de polvo cósmico.` : '';

    const result = streamText({
      model: google('gemini-1.5-pro'),
      system: systemPrompt + contextString,
      messages,
      // Implementación de Tool Calling (Agéntico)
      tools: {
        render_science_model: tool({
          description: 'Genera un modelo o visualización científica avanzada.',
          parameters: z.object({
            concept: z.string().describe('El concepto a visualizar, ej: "gravedad", "agujero negro"'),
            equation: z.string().describe('Ecuación en LaTeX relevante al concepto')
          }),
          execute: async ({ concept, equation }) => {
            return `Modelo de ${concept} inicializado con éxito. Fórmula aplicada: ${equation}`;
          },
        }),
        update_mission_log: tool({
          description: 'Registra el progreso del estudiante y otorga insignias de misión.',
          parameters: z.object({
            badgeName: z.string().describe('Nombre de la insignia otorgada'),
            reason: z.string().describe('Razón por la que se otorga')
          }),
          execute: async ({ badgeName, reason }) => {
            return `¡Insignia otorgada! [${badgeName}] - ${reason}`;
          },
        }),
        sync_roblox_lab: tool({
          description: 'Sincroniza datos con el simulador de Roblox.',
          parameters: z.object({
            missionId: z.string(),
            status: z.enum(['success', 'failure'])
          }),
          execute: async ({ missionId, status }) => {
            return `Datos de Roblox sincronizados. Misión: ${missionId}, Estado: ${status}. Analizando telemetría...`;
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error en Astro-D:", error);
    return new Response(JSON.stringify({ error: "Fallo en los sistemas de comunicación de Astro-D", details: error.message || error.toString() }), { status: 500 });
  }
}
