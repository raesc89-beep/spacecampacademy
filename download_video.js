const https = require('https');
const fs = require('fs');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Check for redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log('Redirected to:', response.headers.location);
        return resolve(downloadFile(response.headers.location, dest));
      }

      // Check for Google Drive virus scan warning
      const contentDisposition = response.headers['content-disposition'];
      if (response.statusCode === 200 && (!contentDisposition && response.headers['content-type'].includes('text/html'))) {
          console.log("Got HTML instead of file. Looking for confirmation link...");
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => {
             const confirmMatch = data.match(/confirm=([a-zA-Z0-9_-]+)/);
             if (confirmMatch) {
                const confirmToken = confirmMatch[1];
                const newUrl = url + `&confirm=${confirmToken}`;
                console.log("Confirming download...");
                resolve(downloadFile(newUrl, dest));
             } else {
                console.log("Could not find confirm token. Data start:", data.slice(0, 200));
                reject(new Error("Drive virus scan block"));
             }
          });
          return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const id = '11IeUL-IU3FUtnab7TqgHz88BtlD_aLzP';
const url = `https://drive.google.com/uc?export=download&id=${id}`;
const dest = 'public/assets/dashboard/wormhole_video.mp4';

downloadFile(url, dest)
  .then(() => console.log('Download complete'))
  .catch(err => console.error('Download failed:', err));
