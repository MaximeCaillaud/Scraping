const puppeteer = require('puppeteer');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Quelle est votre recherche internet\n", rech => {
    getData("https://www.google.com/search?q="+rech);
});

async function getData(url) {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url);
    const lien = await page.evaluate(()=> {
        let lien = [];
        let a = document.querySelectorAll("a h3");
        for (let element of a){
            lien.push(element.innerText)
        }
        return lien
    });
    console.log(lien);
}
