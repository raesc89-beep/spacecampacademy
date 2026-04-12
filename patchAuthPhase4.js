const fs = require('fs');
let f = fs.readFileSync('app/auth/page.js', 'utf8');

// The target string from our previous patch was:
// isApproved: false, // Bloqueo Administrativo
//
// We will replace it with:
// isApproved: false,
// shipData: { color: 'gray', hull: 'standard', wings: 'basic', engine: 'ion' },
// inventory: ['gray', 'standard', 'basic', 'ion'],

if (f.includes('isApproved: false, // Bloqueo Administrativo')) {
    f = f.replace(
        "isApproved: false, // Bloqueo Administrativo",
        "isApproved: false, // Bloqueo Administrativo\n            shipData: { color: 'gray', hull: 'standard', wings: 'basic', engine: 'ion' },\n            inventory: ['gray', 'standard', 'basic', 'ion'],"
    );
    fs.writeFileSync('app/auth/page.js', f);
    console.log('Successfully patched Auth with Hangar Inventory!');
} else {
    console.log('String not found in auth page!');
}
