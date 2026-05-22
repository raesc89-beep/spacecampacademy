const https = require('https');
const fs = require('fs');

const downloads = [
  { url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80', path: 'public/assets/interstellar/m1.png' },
  { url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80', path: 'public/assets/interstellar/m2.png' },
  { url: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=600&q=80', path: 'public/assets/interstellar/m3.png' },
  { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', path: 'public/assets/interstellar/m4.png' },
  { url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&q=80', path: 'public/assets/interstellar/m5.png' },
];

downloads.forEach(d => {
  https.get(d.url, res => {
    const file = fs.createWriteStream(d.path);
    res.pipe(file);
    file.on('finish', () => file.close());
  });
});
