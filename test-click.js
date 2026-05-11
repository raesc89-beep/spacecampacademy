const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log("Iniciando navegador...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Capturar errores de consola
    page.on('pageerror', err => {
      console.log('--- ERROR DE PAGINA ---');
      console.log(err.toString());
    });
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('--- ERROR DE CONSOLA ---', msg.text());
      }
    });

    console.log("Navegando a dashboard...");
    await page.goto('http://localhost:3000/dashboard');
    
    console.log("Esperando boton...");
    await page.waitForSelector('button');
    
    // El boton flotante es el unico boton fuera del auth form, o podemos buscar por imagen
    const buttons = await page.$$('button');
    let astroDBtn;
    for (let btn of buttons) {
      const html = await page.evaluate(el => el.innerHTML, btn);
      if (html.includes('astrod.png')) {
        astroDBtn = btn;
        break;
      }
    }
    
    if (astroDBtn) {
      console.log("Haciendo click en AstroD...");
      await astroDBtn.click();
      console.log("Click realizado. Esperando 2 segundos para ver si hay errores...");
      await new Promise(r => setTimeout(r, 2000));
    } else {
      console.log("No se encontro boton de AstroD");
    }
    
    await browser.close();
  } catch (err) {
    console.error("Script error:", err);
  }
})();
