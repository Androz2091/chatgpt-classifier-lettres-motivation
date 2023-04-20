const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const filesName = fs.readdirSync('./queue');
const files = filesName.map((file) => ({
    name: file,
    content: fs.readFileSync(`./queue/${file}`, 'utf8')
}));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    // Lancer le navigateur et ouvrir un nouvel onglet
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Accéder à platform.openai.com
    await page.goto('https://platform.openai.com/login');

    // Attendre que l'utilisateur se connecte
    await page.waitForSelector('a[href="/docs/guides/chat"]', { timeout: 0 });

    // Naviguez vers platform.openai.com/ai-text-classifier
    await page.goto('https://platform.openai.com/ai-text-classifier');

    // Attendre que le form soit affiché
    await page.waitForSelector('.detector-input-textarea', { timeout: 0 });

    // Traiter les fichiers
    while (files.length) {
        const nextFile = files.pop();
        await page.type(".detector-input-textarea", nextFile.content)
        await page.evaluate(() => {
            document.querySelector(".detector-input-actions > .btn-primary").click();
        });
        await sleep(1000);
        await page.waitForSelector('.detector-input-actions > .btn-primary', { timeout: 0 });
        const result = await page.evaluate(() => {
            return document.querySelector('.detector-output').innerText;
        });
        fs.appendFileSync('./results.csv', `${nextFile.name}, ${result}\n`);
        fs.renameSync(`./queue/${nextFile.name}`, `./handled/${nextFile.name}`);
        await sleep(800);
        await page.evaluate(() => {
            document.querySelector(".detector-input-textarea").value = '';
        });
        await sleep(800);
    }

    await browser.close();
    
    console.log(`Done!`);

})();
