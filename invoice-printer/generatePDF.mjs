import puppeteer from "puppeteer";
import generateInvoiceHTML from "./generateInvoice.mjs";
let browser 

export default async function generatePDFInvoice(){
   if(!browser) browser = await puppeteer.launch({headless:false})
const page = await browser.newPage()
const invoice = await generateInvoiceHTML()
await page.setContent(invoice,{waitUntil:"networkidle0"})
// await page.goto("https://devconfbd.com/")

await page.evaluateHandle("document.fonts.ready")
await page.pdf({path:"data/invoice.pdf",printBackground:true,format:"LEGAL"})

await page.close()
// await browser.close()
}