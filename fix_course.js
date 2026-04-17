const fs = require('fs');

const f1 = 'app/course/[moduleId]/page.js';
let c1 = fs.readFileSync(f1, 'utf8');
if(!c1.includes('COURSE_DATA')) {
  c1 = c1.replace('export default function', "import { COURSE_DATA } from '@/lib/courseData';\n\nexport default function");
}
c1 = c1.replace(/const d = await getDoc\(doc\(db, \"modules\", params\.moduleId\)\);\s*if \(d\.exists\(\)\) setModuleData\(d\.data\(\)\);\s*else router\.push\('\/dashboard'\);/, 
  "const mod = COURSE_DATA.find(c => c.id === params.moduleId);\n        if (mod) setModuleData(mod);\n        else router.push('/dashboard');");
fs.writeFileSync(f1, c1);

const f2 = 'app/quiz/[moduleId]/page.js';
let c2 = fs.readFileSync(f2, 'utf8');
if(!c2.includes('COURSE_DATA')) {
  c2 = c2.replace('export default function', "import { COURSE_DATA } from '@/lib/courseData';\n\nexport default function");
}
c2 = c2.replace(/const d = await getDoc\(doc\(db, \"modules\", params\.moduleId\)\);\s*if \(d\.exists\(\)\) \{[^\}]*\}\s*else \{[^}]*\}/, 
  "const mod = COURSE_DATA.find(c => c.id === params.moduleId);\n      if (mod) {\n        setModuleData(mod);\n        setTotalQuestions(mod.quizEs ? mod.quizEs.length : 0);\n      } else {\n        router.push('/dashboard');\n      }");
fs.writeFileSync(f2, c2);

console.log('Course and Quiz updated!');
