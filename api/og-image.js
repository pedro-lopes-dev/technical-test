import chromium from 'chrome-aws-lambda';
import playwright from 'playwright-core';

function MapTemplate(lat, lng) {
  return `
  <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Open Graph Image</title>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossorigin=""
              />
            <script
              src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
              integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
              crossorigin=""
            ></script>
            <style>
              body {
                margin: 0;
                padding: 0;
              }
            </style>            
        </head>
        <body>
            <div id="map" style="width: 100vw; height: 100vh;"></div>
            <script>
              var map = L.map('map', { zoomControl: false }).setView([${lat}, ${lng}], 18);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              }).addTo(map);
              var marker = L.marker([${lat}, ${lng}]).addTo(map);
            </script>
        </body>
      </html>
  `;
}

export default async (req, res) => {
  const { lat, lng } = req.query;
  const browser = await playwright.chromium.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630,
    },
  });
  await page.goto('about:blank', {
    timeout: 15 * 1000,
  });
  const html = MapTemplate(lat, lng);
  await page.setContent(html);
  await page.waitForTimeout(3000);
  const data = await page.screenshot({
    type: 'png',
  });
  await browser.close();
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/png');
  res.end(data);
};
