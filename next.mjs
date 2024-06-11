import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1920, height: 1080 },
  // slowMo:100,
  userDataDir: "temporary",
});

const page = await browser.newPage();

const navigate = async () => {
  //can set proxy here
  await page.goto(
    "https://drou-electronics-store.myshopify.com/collections/all"
  );
};
const collectLinks = async () => {
  await page.waitForSelector("h2 a");
  const doc = await page.evaluate(() => {
    return [...document.querySelectorAll("h2 a")].map((e) => ({
      link: e.href,
      title: e.textContent,
    }));
  });

  return doc;
};
const paginate = async () => {
  const nextBtn = await page.$("li.next:not(.disabled) a");
  if (!nextBtn) return false;
  nextBtn.evaluate((btn) => btn.click());
  return true;
};

const products={}


await navigate()

for( var i=0;;i++){
    products[`page_${i+1}`] = await collectLinks()
    if(!(await paginate())) break
}

console.log(products)
await page.close();
await browser.close();
