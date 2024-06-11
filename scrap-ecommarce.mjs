import puppeteer from "puppeteer";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    userDataDir: "temporary",
  });

  const page = await browser.newPage();

  // Capture browser console messages in Node.js console
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));

  await page.goto("https://websitedemos.net/flower-shop-04/shop/", {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector(".products");

  const allProducts = await page.evaluate(() => {
    const products = [
      ...document.querySelectorAll(".astra-shop-thumbnail-wrap"),
    ].map((elem) => ({
      link: elem.querySelector("a").href,
    }));

    return products;
  });

  console.log(allProducts);

  // Close the initial page
  await page.close();

  // Container to store product data
  const allProductsData = [];

  // Visit each product link
  for (const product of allProducts) {
    const page2 = await browser.newPage();

    try {
      await page2.goto(product.link, {
        waitUntil: "networkidle0",
      });

      const productData = await page2.evaluate(() => {
        const title = document.querySelector(".product_title").innerText;
        return { title };
      });

      allProductsData.push(productData);

      await delay(1000); // Ensure the page is fully loaded and data is fetched
      await page2.close();
      await delay(1000); // Ensure page is completely closed before next iteration
    } catch (error) {
      console.error(`Error navigating to product ${product.link}`, error);
    }
  }

  console.log(allProductsData);
  await browser.close();
})();
