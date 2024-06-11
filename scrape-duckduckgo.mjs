
import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // your code here
  // Navigating to DuckDuckGo homepage
  await page.goto("https://duckduckgo.com", {
    waitUntil: "networkidle2",
  });

  // Waiting for the search input field to be ready
  await page.waitForSelector("#searchbox_input");

  // Typing the search query into the input field
  await page.type("#searchbox_input", "sagar-biswas1 github");

  // Clicking the search button
  await page.click(
    ".searchbox_iconWrapper__suWUe > .searchbox_searchButton__F5Bwq"
  );

  // Waiting for search results to load
  await page.waitForSelector('[data-testid="result-title-a"]');

  // Taking a screenshot of the page
  await page.screenshot({ path: "searchResult.png" });

  await browser.close();
})();
