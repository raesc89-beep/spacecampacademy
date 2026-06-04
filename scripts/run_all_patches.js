const { execSync } = require('child_process');
const path = require('path');

const scripts = [
  'patch_starwars_sec1.js',
  'patch_starwars_sec4.js',
  'patch_starwars_sec7.js',
  'patch_bttf_m1.js',
  'patch_bttf_m4.js',
  'patch_bttf_m6.js',
];

for (const script of scripts) {
  const scriptPath = path.join(__dirname, script);
  console.log(`\n=== Running ${script} ===`);
  try {
    const output = execSync(`node "${scriptPath}"`, { encoding: 'utf8' });
    console.log(output);
  } catch (err) {
    console.error(`ERROR in ${script}:`, err.message);
    process.exit(1);
  }
}

console.log('\n✅ All patch scripts completed successfully!');
