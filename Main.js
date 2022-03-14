const puppeteer = require('puppeteer');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rech = rl.question("Quelle est votre recherche ?\n");
let bool = rl.question("Vous vous un affichage Y/N");

if (bool=="y"){
    getLien("https://www.google.com/search?q="+rech);
    bool = false;
}
else {
    getLien("https://www.google.com/search?q=" + rech);
    bool = true;
}

async function getLien(url) {
    const browser = await puppeteer.launch({headless: bool});
    const page = await browser.newPage();
    await page.setViewport({height: 800, width: 1200})
    await page.goto(url);
    const lien = await page.evaluate(getAllA);
    scraping(browser,lien)
}

async function scraping(browser,lien){
    const page = await browser.newPage();
    let Alldata = [];
    for (let i of lien) {
        await page.goto(i);
        const datas = await page.evaluate(getAllP);
        Alldata.push(datas);
    }
    console.log(Alldata);
}

function getP(){
    let slct = "p";
    let data = document.querySelector(slct);
    return data.innerText;
}

function getAllP(){
    let slct = "p";
    let data = document.querySelectorAll(slct);
    let datas = [];
    for (let element of data) {
        datas.push(element.innerText);
    }
    return datas;
}

function getAllA(){
    let slct = "div.yuRUbf>a";
    let a = document.querySelectorAll(slct);
    let lien = [];
    for (let element of a) {
        lien.push(element.href)
    }
    return lien
}