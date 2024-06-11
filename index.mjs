import puppeteer from "puppeteer"
import {setTimeout} from "timers/promises"
const browser = await  puppeteer.launch({
    headless:false,
    defaultViewport:{width:1920 , height:1080},
    // slowMo:100,
    userDataDir:"temporary"
})

const page = await browser.newPage();
// await page.goto("https://devconfbd.com/",
// // {
// //     waitUntil:"networkidle2",
// //     timeout:60000
// // }
// )

// await page.screenshot({path:"example.com.png"})
// await page.waitForSelector("img[alt='guest']")
// await page.click("img[alt='guest']");
// await setTimeout(1000);
// await page.screenshot({path:"guest-user.png"})
// await browser.close()


await page.goto('https://duckduckgo.com',{
    waitUntil:"networkidle2",
})

await page.waitForSelector("#searchbox_input");
await page.type("#searchbox_input","devconfbd")
await page.click(".searchbox_iconWrapper__suWUe > .searchbox_searchButton__F5Bwq");

const fResult= await page.waitForSelector('[data-testid="result-title-a"]')

// const fResult=await page.screenshot({path:"duckduckgo.png"})
await fResult.click();
 await page.waitForSelector(".sponsors a,.supporter a");
 const sponsorLinks= await page.evaluate(()=>{
    return [...document.querySelectorAll(".sponsors a")].map(e=>e.href)
 })

 console.log({sponsorLinks})
 await page.waitForSelector(".sponsors a");
 const supporterLinks= await page.evaluate(()=>{
    return [...document.querySelectorAll(".supporter a")].map(e=>e.href)
 })

 console.log({supporterLinks})
await browser.close();