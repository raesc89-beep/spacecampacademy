const fs = require('fs');

const f2 = 'app/quiz/[moduleId]/page.js';
let c2 = fs.readFileSync(f2, 'utf8');
if(!c2.includes('COURSE_DATA')) {
  c2 = c2.replace('export default function', "import { COURSE_DATA } from '@/lib/courseData';\n\nexport default function");
}
// Use a robust regex ignoring whitespace/newlines dynamically OR just replace the specific async fetch entirely
c2 = c2.replace(/const d = await getDoc\([\s\S]*?else \{[\s\S]*?router\.push\('\/dashboard'\);\s*\}/, 
  "const mod = COURSE_DATA.find(c => c.id === params.moduleId);\n      if (mod) {\n        setModuleData(mod);\n        setTotalQuestions(mod.quizEs ? mod.quizEs.length : 0);\n      } else {\n        router.push('/dashboard');\n      }");
fs.writeFileSync(f2, c2);

console.log('Quiz fixed!');
