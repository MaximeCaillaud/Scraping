const puppeteer = require('puppeteer');
var fs = require('fs');

getData()

async function getData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("URL.com");
    var a = await page.content();
    console.log(a);
    fs.appendFile('texte.txt',a,function (err) {
        if (err){}
        else{}
    })
    await page.close();
    await browser.close();
}
