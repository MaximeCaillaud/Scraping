const puppeteer = require('puppeteer');
const readline = require('readline');
const lda = require('lda');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Quelle est votre recherche ?\n",rech =>{
    getLien("https://www.google.com/search?q="+rech,rech);
});

async function getLien(url,rech) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({height: 800, width: 1200})
    await page.goto(url);
    const lien = await page.evaluate(getAllA);
    scraping(browser,lien,rech)
}

async function scraping(browser,lien,rech){
    const page = await browser.newPage();
    let Alldata = [];
    for (let i of lien) {
        await page.goto(i);
        const datas = await page.evaluate(getAllP);
        Alldata.push(datas);
    }
    for(let i of Alldata){
        for(let j of i){
            if(j.match(rech)){
                console.log(j)
                console.log(lda(j.match(/[^\.!\?]+[\.!\?]+/g),1,3,['fr']));
            }
        }
    }
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