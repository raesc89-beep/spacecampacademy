'use client';
import Link from "next/link";
import { ArrowRight, UserPlus, Rocket, Brain, Trophy, Gamepad2, Smartphone, Star, ChevronRight } from 'lucide-react';
import AnimatedMainLogo from '@/components/AnimatedMainLogo';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "30+",  label: "Cursos disponibles" },
  { value: "500+", label: "Cadetes activos" },
  { value: "150+", label: "Infografias interactivas" },
  { value: "4.9",  label: "Calificacion promedio" },
];

const COURSES = [
  {
    category: "Exploracion Espacial",
    emoji: "🚀",
    color: "#00E4FF",
    glow: "rgba(0,228,255,0.25)",
    items: [
      { name: "Sistema Solar", desc: "Viaja a cada planeta del sistema solar con datos reales de la NASA", img: "/assets/rocosos/module_1.png", href: "/hub/solar-system", modules: 9 },
      { name: "Pioneros del Cosmos", desc: "Gagarin, Glenn, Tereshkova — los heroes que abrieron el camino", img: "/assets/pioneros/hub_alan.png", href: "/hub/pioneros", modules: 7 },
      { name: "Animales en el Espacio", desc: "Ham, Laika y los animales que fueron primero que nosotros", img: "/assets/animales/ham_ship_3d.png", href: "/hub/animales", modules: 4 },
      { name: "Robots en el Espacio", desc: "Rovers, sondas y satelites — la exploracion sin humanos", img: "/assets/robots/module_1.png", href: "/hub/robots-espacio", modules: 6 },
    ],
  },
  {
    category: "Ciencia en el Cine",
    emoji: "🎬",
    color: "#FFD700",
    glow: "rgba(255,215,0,0.25)",
    items: [
      { name: "Interstellar", desc: "Agujeros negros, relatividad y viaje interestelar — la ciencia real detras", img: "/assets/interstellar/gargantua_bg.png", href: "/hub/interstellar", modules: 5 },
      { name: "Star Wars", desc: "Fisica de hyperspace, planetas reales y tecnologia espacial", img: "/assets/starwars/banner_tatooine.png", href: "/hub/star-wars", modules: 9 },
      { name: "Arrival — La Llegada", desc: "Xenolinguistica, primer contacto y fisica del tiempo", img: "/assets/ciencia_arrival/infographic_m1/banner_xenolinguistica.png", href: "/hub/arrival-ciencia", modules: 6 },
      { name: "Volver al Futuro", desc: "Maquinas del tiempo, paradojas y ciencia cuantica", img: "/assets/bttf/module_1.png", href: "/hub/bttf", modules: 7 },
    ],
  },
  {
    category: "Grandes Misterios",
    emoji: "🔭",
    color: "#C52A85",
    glow: "rgba(197,42,133,0.25)",
    items: [
      { name: "Agujeros de Gusano", desc: "Wormholes, geometria del espacio-tiempo y viaje instantaneo", img: "/assets/interstellar/gargantua_bg.png", href: "/hub/agujeros-gusano", modules: 5 },
      { name: "Exoplanetas", desc: "Mundos mas alla del sistema solar — candidatos a tener vida", img: "/assets/exoplanetas/module_1.png", href: "/hub/exoplanetas", modules: 6 },
      { name: "Area 51 & OVNIS", desc: "Historia real, proyectos secretos y el fenomeno OVNI", img: "/assets/area51/module_1.png", href: "/hub/area51", modules: 5 },
      { name: "Objetos Interestelares", desc: "Oumuamua, Borisov y los visitantes del espacio profundo", img: "/assets/interestelar/module_1.png", href: "/hub/objetos-interestelares", modules: 5 },
    ],
  },
  {
    category: "Historia y Civilizaciones",
    emoji: "🏛️",
    color: "#E8C07A",
    glow: "rgba(232,192,122,0.25)",
    items: [
      { name: "Astronomia Egipcia", desc: "Piramides, constelaciones y la ciencia del antiguo Egipto", img: "/assets/egypt/module_1.png", href: "/hub/egypt-astro", modules: 14 },
      { name: "Astronomia Maya", desc: "El calendario mas preciso del mundo antiguo — 365.25 dias exactos", img: "/assets/maya/module_1.png", href: "/hub/maya-astro", modules: 15 },
      { name: "Griegos y la Ciencia", desc: "Eratostenes, Aristarco y los primeros modelos del universo", img: "/assets/griegos_ciencia/module_1.png", href: "/hub/griegos-ciencia", modules: 6 },
      { name: "Dinosaurios", desc: "El impacto de Chicxulub y la extincion que cambio la Tierra", img: "/assets/dinosaurios/module_1.png", href: "/hub/dinosaurios", modules: 8 },
    ],
  },
];

const FEATURES = [
  { icon: "🗺️", title: "Mapas Interactivos", desc: "Navega cada tema como una mision espacial. Cada nodo revela informacion nueva y sorprendente." },
  { icon: "🧠", title: "Infografias Unicas", desc: "Mas de 150 infografias con datos que no encontraras en ningun libro de texto." },
  { icon: "🏆", title: "Sistema de Logros", desc: "Gana medallas, desbloquea rangos militares y conviertete en Comandante de la Academia." },
  { icon: "🎮", title: "Arcade Espacial", desc: "Juegos educativos entre modulos para consolidar el aprendizaje de forma divertida." },
  { icon: "📱", title: "Multi-dispositivo", desc: "Funciona perfecto en celular, tablet y computadora. Aprende donde quieras." },
  { icon: "🇲🇽", title: "100% en Espanol", desc: "Todo el contenido en espanol, creado por expertos mexicanos en divulgacion cientifica." },
];

const TESTIMONIALS = [
  { name: "Sofia R.", age: "13 anos", location: "CDMX", stars: 5, quote: "Nunca pense que la fisica fuera tan emocionante. Los modulos de Interstellar me hicieron querer estudiar astrofisica.", avatar: "🧑‍🚀" },
  { name: "Mama de Diego", age: "Padre de 11 anos", location: "Guadalajara", stars: 5, quote: "Mi hijo paso de odiar las ciencias a pedir tiempo extra para completar misiones. Increible herramienta.", avatar: "👩" },
  { name: "Emilio T.", age: "15 anos", location: "Monterrey", stars: 5, quote: "Los cursos de Star Wars y la ciencia real detras son brutales. Ya lei 3 libros de fisica cuantica por mi cuenta.", avatar: "👦" },
  { name: "Valeria M.", age: "12 anos", location: "Puebla", stars: 5, quote: "Me encanta el sistema de logros. Ya soy Capitan y voy por el rango de Comandante. Mis amigos ya se inscribieron.", avatar: "👧" },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#04060E", overflowX: "hidden" }}>

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav style={{
        padding: "1rem 2rem", display: "flex", justifyContent: "space-between",
        alignItems: "center", background: "rgba(4,6,14,0.9)",
        backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <AnimatedMainLogo size={44} />
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/auth" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500 }}>
            Iniciar Sesion
          </Link>
          <Link href="/auth?m=register" style={{
            background: "linear-gradient(90deg,#5A2E98,#C52A85)", color: "white",
            textDecoration: "none", padding: "0.55rem 1.3rem", borderRadius: "30px",
            fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.4rem",
          }}>
            <Rocket size={15} /> Comenzar Gratis
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1 }}>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section style={{
          position: "relative", minHeight: "95vh", display: "flex",
          flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "6rem 1.5rem 4rem", overflow: "hidden",
        }}>
          {/* Starfield background */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0,
            background: "radial-gradient(ellipse at 20% 60%, rgba(90,46,152,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,228,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(197,42,133,0.2) 0%, transparent 60%), #04060E",
          }} />
          {/* Animated stars */}
          <div id="starfield" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>
            <div style={{
              display: "inline-block", padding: "0.45rem 1.2rem",
              background: "rgba(0,228,255,0.08)", border: "1px solid rgba(0,228,255,0.25)",
              borderRadius: "30px", color: "#00E4FF", fontSize: "0.82rem",
              fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px",
              marginBottom: "1.5rem",
            }}>
              🌟 Mas de 500 cadetes ya despegaron
            </div>

            <h1 style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900,
              lineHeight: 1.05, margin: "0 0 1.5rem",
              background: "linear-gradient(135deg, #FFFFFF 0%, #00E4FF 60%, #C52A85 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              El Universo Entero<br />A Tu Alcance
            </h1>

            <p style={{
              fontSize: "clamp(1.05rem,2.5vw,1.35rem)", color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7, maxWidth: "620px", margin: "0 auto 2.5rem",
            }}>
              Explora el cosmos, descubre la ciencia detras de tus peliculas favoritas y conviertete en un astronauta certificado por la <strong style={{ color: "white" }}>Agencia Mexicana de Divulgacion Espacial</strong>.
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Link href="/auth?m=register" style={{
                background: "linear-gradient(90deg,#5A2E98,#C52A85)", color: "white",
                textDecoration: "none", padding: "1.1rem 2.2rem", borderRadius: "50px",
                fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center",
                gap: "0.6rem", boxShadow: "0 8px 30px rgba(197,42,133,0.4)",
                transition: "transform 0.2s",
              }}>
                <UserPlus size={20} /> Comenzar Mi Mision — Es Gratis
              </Link>
              <Link href="/auth" style={{
                color: "#00E4FF", textDecoration: "none",
                padding: "1.1rem 2rem", borderRadius: "50px",
                border: "1.5px solid rgba(0,228,255,0.35)",
                fontSize: "1rem", fontWeight: 600,
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(0,228,255,0.05)",
              }}>
                Ya tengo cuenta <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
              {["✅ Gratis siempre", "🏆 Certificacion AMDE", "📱 Funciona en celular", "🇲🇽 100% en espanol"].map(b => (
                <span key={b} style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", fontWeight: 500 }}>{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS BAR ─────────────────────────────────────────────── */}
        <section style={{
          background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "2.5rem 1.5rem",
        }}>
          <div style={{
            maxWidth: "900px", margin: "0 auto", display: "grid",
            gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", textAlign: "center",
          }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#00E4FF", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "0.4rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COURSES SHOWCASE ──────────────────────────────────────── */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <h2 style={{
                fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, margin: "0 0 1rem",
                background: "linear-gradient(135deg,#FFFFFF,#00E4FF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                30+ Cursos que te van a volar la mente
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                Desde la fisica de agujeros negros hasta los secretos de las piramides — todo explicado para que cualquiera lo entienda.
              </p>
            </div>

            {COURSES.map(({ category, emoji, color, glow, items }) => (
              <div key={category} style={{ marginBottom: "3.5rem" }}>
                <h3 style={{
                  fontSize: "1.1rem", fontWeight: 700, color, letterSpacing: "1px",
                  textTransform: "uppercase", marginBottom: "1.25rem",
                  display: "flex", alignItems: "center", gap: "0.5rem",
                }}>
                  <span style={{ fontSize: "1.3rem" }}>{emoji}</span> {category}
                </h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "1.25rem",
                }}>
                  {items.map(({ name, desc, img, href, modules }) => (
                    <Link key={name} href="/auth?m=register" style={{ textDecoration: "none" }}>
                      <div style={{
                        background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)`,
                        borderRadius: "16px", overflow: "hidden",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        cursor: "pointer",
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = `0 12px 30px ${glow}`;
                          e.currentTarget.style.borderColor = `${color}40`;
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        }}
                      >
                        <div style={{ height: "140px", overflow: "hidden", position: "relative", background: "#070B19" }}>
                          <img
                            src={img}
                            alt={name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                            onError={e => { e.target.style.display = "none"; }}
                          />
                          <div style={{
                            position: "absolute", top: "0.6rem", right: "0.6rem",
                            background: "rgba(0,0,0,0.65)", borderRadius: "8px",
                            padding: "0.25rem 0.6rem", fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", fontWeight: 600,
                          }}>
                            {modules} modulos
                          </div>
                        </div>
                        <div style={{ padding: "1rem" }}>
                          <div style={{ fontWeight: 700, color: "white", fontSize: "0.95rem", marginBottom: "0.35rem" }}>{name}</div>
                          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.5 }}>{desc}</div>
                          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.35rem", color, fontSize: "0.78rem", fontWeight: 600 }}>
                            Explorar <ChevronRight size={13} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES / DIFFERENTIATORS ────────────────────────────── */}
        <section style={{
          background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "5rem 1.5rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{
                fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, margin: "0 0 1rem",
                background: "linear-gradient(135deg,#FFFFFF,#FFD700)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                Una experiencia de aprendizaje diferente
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "550px", margin: "0 auto", fontSize: "1rem" }}>
                No es otro curso en video. Es una academia espacial interactiva donde tu decides el ritmo.
              </p>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem",
            }}>
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px", padding: "1.5rem",
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <div style={{ fontWeight: 700, color: "white", fontSize: "1rem", marginBottom: "0.4rem" }}>{title}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARCO VELEZ ───────────────────────────────────────────── */}
        <section style={{ padding: "5rem 1.5rem" }}>
          <div style={{
            maxWidth: "900px", margin: "0 auto",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px", padding: "3rem",
            display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", alignItems: "center",
          }}>
            <div style={{
              width: "180px", height: "180px", borderRadius: "50%", overflow: "hidden",
              border: "3px solid #00E4FF", boxShadow: "0 0 40px rgba(0,228,255,0.25)",
              flexShrink: 0, margin: "0 auto",
            }}>
              <img
                src="/assets/marco_velez.jpg"
                alt="Marco Antonio Velez Montano"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div>
              <div style={{ color: "#FFD700", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                Astrofisico &amp; Educador
              </div>
              <h2 style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 800, margin: "0 0 1rem", color: "white" }}>
                Marco Antonio Velez Montano
              </h2>
              <blockquote style={{
                borderLeft: "3px solid #00E4FF", paddingLeft: "1rem",
                color: "rgba(255,255,255,0.7)", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.7, margin: "0 0 1rem",
              }}>
                "Mi mision es demostrar que la ciencia no es aburrida — es la historia mas emocionante que existe, y empieza aqui mismo, en tu pantalla."
              </blockquote>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7, margin: "0 0 1rem" }}>
                Director de Divulgacion Cientifica y Coordinador Academico Internacional de la Agencia Mexicana de Divulgacion Espacial. Con mas de una decada inspirando a jovenes a explorar los grandes misterios del cosmos.
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["Astrofisica", "Divulgador Cientifico", "Director AMDE", "Educador Internacional"].map(tag => (
                  <span key={tag} style={{ padding: "0.35rem 0.85rem", background: "rgba(0,228,255,0.08)", border: "1px solid rgba(0,228,255,0.15)", borderRadius: "20px", fontSize: "0.75rem", color: "#00E4FF" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
        <section style={{
          background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "5rem 1.5rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <h2 style={{
              textAlign: "center", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800,
              marginBottom: "2.5rem", color: "white",
            }}>
              Lo que dicen nuestros cadetes
            </h2>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.25rem",
            }}>
              {TESTIMONIALS.map(({ name, age, location, stars, quote, avatar }) => (
                <div key={name} style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "16px", padding: "1.5rem",
                }}>
                  <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                    {[...Array(stars)].map((_, i) => <Star key={i} size={14} fill="#FFD700" color="#FFD700" />)}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.65, fontStyle: "italic", margin: "0 0 1rem" }}>
                    "{quote}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ fontSize: "1.8rem" }}>{avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "white", fontSize: "0.9rem" }}>{name}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{age} • {location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section style={{
          padding: "6rem 1.5rem", textAlign: "center",
          background: "radial-gradient(ellipse at center, rgba(90,46,152,0.3) 0%, rgba(4,6,14,1) 70%)",
        }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>
            <h2 style={{
              fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, margin: "0 0 1.25rem",
              background: "linear-gradient(135deg,#FFFFFF,#C52A85)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Listo para despegar?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.15rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Unete a cientos de cadetes mexicanos que ya estan explorando el universo. Sin tarjeta de credito, sin compromisos — solo ciencia increible.
            </p>
            <Link href="/auth?m=register" style={{
              display: "inline-flex", alignItems: "center", gap: "0.7rem",
              background: "linear-gradient(90deg,#5A2E98,#C52A85)",
              color: "white", textDecoration: "none",
              padding: "1.2rem 2.5rem", borderRadius: "50px",
              fontSize: "1.15rem", fontWeight: 800,
              boxShadow: "0 12px 40px rgba(197,42,133,0.5)",
            }}>
              <Rocket size={22} /> Comenzar Mi Mision — Es Gratis
            </Link>
            <p style={{ marginTop: "1.25rem", color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>
              Sin tarjeta de credito • Acceso inmediato • Certificacion AMDE incluida
            </p>
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.4)", padding: "2.5rem 2rem",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",
      }}>
        <AnimatedMainLogo size={50} />
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { label: "Privacidad", href: "#" },
            { label: "Terminos", href: "#" },
            { label: "Contacto", href: "#" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: "0.85rem" }}>
              {label}
            </Link>
          ))}
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", textAlign: "center", margin: 0 }}>
          © 2026 Agencia Mexicana de Divulgacion Espacial. Todos los derechos reservados.
        </p>
      </footer>

    </div>
  );
}
