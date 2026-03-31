'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const COURSE_DATA = [
  {
    id: 'mercury', order: 1, 
    titleEn: 'Mercury', titleEs: 'Mercurio',
    badge: 'Speed Demon', badgeEs: 'Demonio Veloz',
    color: '#8C8C8C',
    contentEn: {
      intro: "Mercury is the smallest planet in our solar system and the closest to the Sun. It zips around the Sun faster than any other planet, which is why Romans named it after their swift-footed messenger god.",
      facts: ["It has no moons or rings.", "Your weight on Mercury would be 38% of your weight on Earth.", "A day on the surface of Mercury lasts 176 Earth days."],
      rareFacts: ["Even though it's closest to the Sun, it's not the hottest planet!", "Ice exists in its deep, dark craters where the sun never shines."]
    },
    contentEs: {
      intro: "Mercurio es el planeta más pequeño de nuestro sistema solar y el más cercano al Sol. Viaja alrededor del Sol más rápido que cualquier otro planeta.",
      facts: ["No tiene lunas ni anillos.", "Tu peso en Mercurio sería el 38% de tu peso en la Tierra.", "Un día en la superficie de Mercurio dura 176 días terrestres."],
      rareFacts: ["¡A pesar de ser el más cercano al Sol, no es el planeta más caliente!", "Hay hielo en sus cráteres profundos y oscuros donde el Sol nunca brilla."]
    },
    quizEn: [
      { q: "Is Mercury the hottest planet?", options: ["Yes", "No"], a: 1 },
      { q: "How many moons does Mercury have?", options: ["Zero", "One", "Two"], a: 0 }
    ],
    quizEs: [
      { q: "¿Es Mercurio el planeta más caliente?", options: ["Sí", "No"], a: 1 },
      { q: "¿Cuántas lunas tiene Mercurio?", options: ["Cero", "Una", "Dos"], a: 0 }
    ]
  },
  {
    id: 'venus', order: 2, 
    titleEn: 'Venus', titleEs: 'Venus',
    badge: 'Volcano Voyager', badgeEs: 'Viajero Volcánico',
    color: '#E1A95F',
    contentEn: {
      intro: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's the hottest planet in our solar system, with surface temperatures hot enough to melt lead.",
      facts: ["It spins backwards compared to most other planets.", "It has a thick, toxic atmosphere.", "It is the brightest natural object in Earth's night sky after the Moon."],
      rareFacts: ["A day on Venus is longer than a year on Venus!", "It has crushing surface air pressure, 90 times more than Earth's."]
    },
    contentEs: {
      intro: "Venus es el segundo planeta desde el Sol y el vecino más cercano a la Tierra. Es el planeta más caliente de nuestro sistema solar.",
      facts: ["Gira hacia atrás en comparación con la mayoría de los otros planetas.", "Tiene una atmósfera tóxica muy espesa.", "Es el objeto natural más brillante en el cielo nocturno de la Tierra después de la Luna."],
      rareFacts: ["¡Un día en Venus dura más que un año en Venus!", "Tiene una presión atmosférica aplastante, 90 veces superior a la de la Tierra."]
    },
    quizEn: [
      { q: "Is a day on Venus longer than its year?", options: ["Yes", "No"], a: 0 },
      { q: "What direction does Venus spin?", options: ["Normal", "Backwards"], a: 1 }
    ],
    quizEs: [
      { q: "¿Es un día en Venus más largo que su año?", options: ["Sí", "No"], a: 0 },
      { q: "¿En qué dirección gira Venus?", options: ["Normal", "Hacia atrás"], a: 1 }
    ]
  },
  {
    id: 'earth', order: 3, 
    titleEn: 'Earth', titleEs: 'Tierra',
    badge: 'Home Hero', badgeEs: 'Héroe del Hogar',
    color: '#2A82D7',
    contentEn: {
      intro: "Our home planet is the third planet from the Sun, and the only place we know of so far that's inhabited by living things.",
      facts: ["It's the only planet known to have liquid water on its surface.", "Earth's atmosphere is 78% nitrogen, 21% oxygen.", "It was once believed to be the center of the universe."],
      rareFacts: ["Earth's rotation is gradually slowing down.", "The Earth actually isn't a perfect sphere, it's slightly squashed at the poles."]
    },
    contentEs: {
      intro: "Nuestro planeta hogar es el tercer planeta desde el Sol, y el único lugar que conocemos hasta ahora habitado por seres vivos.",
      facts: ["Es el único planeta conocido que tiene agua líquida.", "La atmósfera de la Tierra es 78% nitrógeno, 21% oxígeno.", "Se creía que era el centro del universo."],
      rareFacts: ["La rotación de la Tierra se ralentiza gradualmente.", "La Tierra no es una esfera perfecta, está ligeramente achatada en los polos."]
    },
    quizEn: [
      { q: "What shape is the Earth really?", options: ["Perfect Sphere", "Slightly squashed sphere", "Flat"], a: 1 },
      { q: "Is Earth the only known planet to have liquid water on the surface?", options: ["Yes", "No"], a: 0 }
    ],
    quizEs: [
      { q: "¿Qué forma tiene la Tierra en realidad?", options: ["Esfera perfecta", "Esfera ligeramente achatada", "Plana"], a: 1 },
      { q: "¿Es la Tierra el único planeta conocido que tiene agua líquida?", options: ["Sí", "No"], a: 0 }
    ]
  },
  {
    id: 'mars', order: 4, 
    titleEn: 'Mars', titleEs: 'Marte',
    badge: 'Red Ranger', badgeEs: 'Ranger Rojo',
    color: '#E25A3D',
    contentEn: {
      intro: "Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere. It's known as the Red Planet because iron minerals in the dirt rust, or oxidize.",
      facts: ["It has the largest volcano in the solar system, Olympus Mons.", "Mars has two moons named Phobos and Deimos.", "A year on Mars is 687 days."],
      rareFacts: ["Pieces of Mars have actually fallen to Earth as meteorites.", "Sunsets on Mars appear blue instead of red and orange!"]
    },
    contentEs: {
      intro: "Marte es el cuarto planeta desde el Sol, un mundo árido, polvoriento y frío. Se le conoce como el Planeta Rojo debido a los minerales de hierro que se oxidan en la superficie.",
      facts: ["Tiene el volcán más grande del sistema solar, el Monte Olimpo.", "Tiene dos lunas llamadas Fobos y Deimos.", "Un año en Marte dura 687 días."],
      rareFacts: ["Pedazos de Marte han caído en la Tierra como meteoritos.", "¡Los atardeceres en Marte se ven azules!"]
    },
    quizEn: [
      { q: "What color are sunsets on Mars?", options: ["Red", "Orange", "Blue"], a: 2 },
      { q: "What is the name of the largest volcano in the Solar System?", options: ["Mount Everest", "Olympus Mons", "Mauna Kea"], a: 1 }
    ],
    quizEs: [
      { q: "¿De qué color son los atardeceres en Marte?", options: ["Rojo", "Naranja", "Azul"], a: 2 },
      { q: "¿Cómo se llama el volcán más grande del Sistema Solar?", options: ["Monte Everest", "Monte Olimpo", "Fobos"], a: 1 }
    ]
  },
  {
    id: 'jupiter', order: 5, 
    titleEn: 'Jupiter', titleEs: 'Júpiter',
    badge: 'Giant Guardian', badgeEs: 'Guardián Gigante',
    color: '#D29A6A',
    contentEn: {
      intro: "Jupiter is the fifth planet from the Sun and the largest in the solar system. It's a gas giant and doesn't have a true surface.",
      facts: ["It is more than twice as massive as all the other planets combined.", "The Great Red Spot is a giant storm that's raged for hundreds of years.", "Jupiter has rings, but they're too faint to see very well."],
      rareFacts: ["Jupiter has the shortest day of all planets, only 9 hours and 55 minutes.", "It rains diamonds on Jupiter and Saturn due to extreme pressure!"]
    },
    contentEs: {
      intro: "Júpiter es el quinto planeta desde el Sol y el más grande. Es un gigante gaseoso y no tiene una superficie real.",
      facts: ["Es más masivo que todos los demás planetas juntos.", "La Gran Mancha Roja es una tormenta gigante que dura cientos de años.", "Tiene anillos, pero son muy tenues."],
      rareFacts: ["Júpiter tiene el día más corto, solo 9 horas y 55 minutos.", "¡Llueven diamantes debido a la presión extrema!"]
    },
    quizEn: [
      { q: "Does Jupiter have rings?", options: ["Yes", "No"], a: 0 },
      { q: "What is the Great Red Spot?", options: ["A volcano", "A giant storm", "An island"], a: 1 }
    ],
    quizEs: [
      { q: "¿Tiene Júpiter anillos?", options: ["Sí", "No"], a: 0 },
      { q: "¿Qué es la Gran Mancha Roja?", options: ["Un volcán", "Una tormenta gigante", "Una isla"], a: 1 }
    ]
  },
  {
    id: 'saturn', order: 6, 
    titleEn: 'Saturn', titleEs: 'Saturno',
    badge: 'Ring Master', badgeEs: 'Maestro de los Anillos',
    color: '#E8D08D',
    contentEn: {
      intro: "Saturn is the sixth planet from the Sun and the second-largest planet in our solar system. It's known for its complex and beautiful ring system.",
      facts: ["Its rings are made mostly of chunks of ice and small amounts of rock.", "It has 146 moons in its orbit.", "It's the least dense of all planets."],
      rareFacts: ["Saturn is the only planet that could float in water because it is mostly made of gas.", "Sometimes, the rings disappear from Earth's view because of the angle."]
    },
    contentEs: {
      intro: "Saturno es el sexto planeta y el segundo más grande. Es famoso por su sistema de anillos complejos y hermosos.",
      facts: ["Sus anillos están hechos de trozos de hielo y roca.", "Tiene 146 lunas en su órbita.", "Es el planeta menos denso."],
      rareFacts: ["Saturno flotaría en una piscina gigante de agua porque está hecho de gas ligero.", "A veces, sus anillos 'desaparecen' de nuestra vista por el ángulo de inclinación."]
    },
    quizEn: [
      { q: "If you had a giant bathtub, what would Saturn do?", options: ["Sink", "Float", "Melt"], a: 1 },
      { q: "What are Saturn's rings mostly made of?", options: ["Fire and smoke", "Ice and rock", "Gold"], a: 1 }
    ],
    quizEs: [
      { q: "¿Qué le pasaría a Saturno en una bañera gigante?", options: ["Se hundiría", "Flotaría", "Se derretiría"], a: 1 },
      { q: "¿De qué están hechos los anillos de Saturno?", options: ["Hielo y roca", "Fuego y gas", "Oro"], a: 0 }
    ]
  },
  {
    id: 'uranus', order: 7, 
    titleEn: 'Uranus', titleEs: 'Urano',
    badge: 'Ice Rebel', badgeEs: 'Rebelde Helado',
    color: '#66C6DF',
    contentEn: {
      intro: "Uranus is the seventh planet from the Sun. It rotates at a nearly 90-degree angle from the plane of its orbit, making it appear to spin on its side.",
      facts: ["It is an ice giant, composed mostly of water, ammonia, and methane.", "It was the first planet discovered using a telescope.", "Uranus has 27 known moons."],
      rareFacts: ["Uranus has the coldest planetary atmosphere in the Solar System.", "A season on Uranus lasts 21 Earth years!"]
    },
    contentEs: {
      intro: "Urano es el séptimo planeta. Gira en un ángulo de casi 90 grados, por lo que parece que gira de lado.",
      facts: ["Es un gigante de hielo, compuesto de agua, amoníaco y metano.", "Fue el primer planeta descubierto con telescopio.", "Urano tiene 27 lunas conocidas."],
      rareFacts: ["Urano tiene la atmósfera más fría del Sistema Solar.", "¡Una estación en Urano dura 21 años terrestres!"]
    },
    quizEn: [
      { q: "How long does a season last on Uranus?", options: ["21 days", "21 years", "21 months"], a: 1 },
      { q: "How does Uranus rotate?", options: ["Normally", "On its side", "Upside down"], a: 1 }
    ],
    quizEs: [
      { q: "¿Cuánto dura una estación en Urano?", options: ["21 días", "21 años", "21 meses"], a: 1 },
      { q: "¿Cómo gira Urano?", options: ["Normalmente", "De lado", "Boca abajo"], a: 1 }
    ]
  },
  {
    id: 'neptune', order: 8, 
    titleEn: 'Neptune', titleEs: 'Neptuno',
    badge: 'Storm Chaser', badgeEs: 'Cazador de Tormentas',
    color: '#3258A6',
    contentEn: {
      intro: "Neptune is the eighth and most distant major planet orbiting our Sun. It is dark, cold, and whipped by supersonic winds.",
      facts: ["It takes 165 Earth years to orbit the sun.", "It was the first planet located through mathematical calculations rather than observation.", "It has 14 known moons."],
      rareFacts: ["Neptune's winds are the fastest in the solar system, reaching 1,200 miles per hour.", "It has a great dark spot storm similar to Jupiter's red spot."]
    },
    contentEs: {
      intro: "Neptuno es el octavo planeta y el más distante. Es oscuro, frío y azotado por vientos supersónicos.",
      facts: ["Tarda 165 años terrestres en dar la vuelta al sol.", "Fue descubierto con matemáticas.", "Tiene 14 lunas conocidas."],
      rareFacts: ["Sus vientos son los más rápidos del sistema solar, hasta 2000 km/h.", "Tiene una gran mancha oscura similar a la tormenta de Júpiter."]
    },
    quizEn: [
      { q: "How was Neptune discovered?", options: ["Telescope", "Math", "Satellites"], a: 1 },
      { q: "Does Neptune have the fastest winds in the Solar System?", options: ["Yes", "No"], a: 0 }
    ],
    quizEs: [
      { q: "¿Cómo se descubrió Neptuno?", options: ["Telescopio", "Matemáticas", "Satélite"], a: 1 },
      { q: "¿Tiene Neptuno los vientos más rápidos del sistema solar?", options: ["Sí", "No"], a: 0 }
    ]
  },
  {
    id: 'pluto', order: 9, 
    titleEn: 'Pluto', titleEs: 'Plutón',
    badge: 'Dwarf Star', badgeEs: 'Estrella Enana',
    color: '#D1A3B4',
    contentEn: {
      intro: "Pluto is a dwarf planet in the Kuiper Belt, a donut-shaped region of icy bodies beyond the orbit of Neptune. Though small, kids still love it!",
      facts: ["It is smaller than Earth's moon.", "In 2006, it was reclassified from a planet to a dwarf planet.", "It has five moons."],
      rareFacts: ["Pluto has a giant glacier shaped like a heart.", "Sometimes Pluto's orbit brings it closer to the Sun than Neptune."]
    },
    contentEs: {
      intro: "Plutón es un planeta enano en el Cinturón de Kuiper. ¡Aunque es pequeño, nos sigue encantando!",
      facts: ["Es más pequeño que la luna de la Tierra.", "En 2006, fue reclasificado a planeta enano.", "Tiene cinco lunas."],
      rareFacts: ["Plutón tiene un glaciar gigante con forma de corazón.", "A veces, la órbita de Plutón lo acerca más al Sol que Neptuno."]
    },
    quizEn: [
      { q: "What classification is Pluto now?", options: ["Star", "Dwarf Planet", "Asteroid"], a: 1 },
      { q: "What famous shape is seen on Pluto?", options: ["A star", "A heart", "A smiley face"], a: 1 }
    ],
    quizEs: [
      { q: "¿Cuál es la clasificación de Plutón ahora?", options: ["Estrella", "Planeta Enano", "Asteroide"], a: 1 },
      { q: "¿Qué forma famosa se ve en Plutón?", options: ["Estrella", "Corazón", "Cara sonriente"], a: 1 }
    ]
  }
];

export default function SeedDatabasePage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleSeed = async () => {
    setLoading(true);
    setLogs(["Starting database seed..."]);
    
    try {
      for (const module of COURSE_DATA) {
        setLogs(prev => [...prev, `Seeding ${module.titleEn}...`]);
        await setDoc(doc(db, "modules", module.id), module);
      }
      setLogs(prev => [...prev, "🎉 All modules seeded successfully!"]);
    } catch (e) {
      console.error(e);
      setLogs(prev => [...prev, "❌ Error seeding database: " + e.message]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Moodle Admin: Seed Space Course Data</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Notice: Use this strictly for initially populating Firestore. Doing this will overwrite the 9 planet modules.
      </p>
      
      <button 
        onClick={handleSeed}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? "Seeding Data..." : "Seed Firebase Database"}
      </button>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#000', borderRadius: '12px', minHeight: '150px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Terminal Logs:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {logs.map((log, i) => (
            <li key={i} style={{ fontFamily: 'monospace', color: '#00FF88', marginBottom: '0.2rem' }}>
              &gt; {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
