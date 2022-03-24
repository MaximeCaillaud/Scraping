const puppeteer = require('puppeteer');
const express = require('express')
const app = express()
const lda = require('lda');
const {request, response} = require("express");

app.get('/',(req,res) =>{
    res.sendFile('/Users/33699/WebstormProjects/Scraping/Site/index.html');
})
app.listen(5500,function(){console.log('Server Started: http://localhost:5500 ')})

app.get('/recherche',async (req, res) => {
    let a = req.query;
    res.send(await getLien('https://www.google.com/search?q=' + a.rech, a.rech));
})

async function getLien(url,rech) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({height: 800, width: 1200})
    await page.goto(url);
    const lien = await page.evaluate(getAllA);
    return await scraping(browser, lien, rech);
}

async function scraping(browser,lien,rech){
    const page = await browser.newPage();
    let Alldata = [];
    let body = ""
    for (let i of lien) {
        await page.goto(i);
        const datas = await page.evaluate(getAllP);
        Alldata.push(datas);
    }
    for(let i of Alldata){
        for(let j of i){
            if(j.match(rech)) {
                console.log(lda(j.match(/[^\.!\?]+[\.!\?$]+/),1,5,['fr']))
                body+=j+"£"
            }
        }
    }
    return body
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
        lien.push(element.href);
    }
    return lien;
}