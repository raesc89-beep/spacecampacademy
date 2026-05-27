const https = require('https');

function fetchWiki(title) {
  const url = `https://es.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=${encodeURIComponent(title)}&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === "-1") resolve(null);
          else resolve(pages[pageId].extract);
        } catch(e) { reject(e); }
      });
    }).on('error', reject);
  });
}

fetchWiki('Tardigrada').then(text => {
  console.log(text.substring(0, 500));
});
