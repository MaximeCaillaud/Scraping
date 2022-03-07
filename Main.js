const puppeteer = require('puppeteer');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Quelle est votre recherche ?\n", rech => {
    getData("https://www.google.com/search?q="+rech);
});

async function getData(url) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({height: 800, width: 1200})
    await page.goto(url);
    const lien = await page.evaluate(() => {
        let slct = "div.yuRUbf>a";
        let a = document.querySelectorAll(slct);
        let lien = [];
        for (let element of a) {
            lien.push(element.href)
        }
        return lien
    });
    console.log(lien);
}