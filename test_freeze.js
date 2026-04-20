const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    console.log('Clicking envelope...');
    try {
        await page.click('.envelope-wrapper');
        console.log('Clicked! Waiting 2 seconds...');
        await new Promise(r => setTimeout(r, 2000));
        console.log('Page did not freeze.');
    } catch(e) {
        console.log('Error during click:', e);
    }
    await browser.close();
})();
