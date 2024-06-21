import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from "url";

export default async function generateInvoiceHTML () {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  console.log(__filename, __dirname);

  const invoiceHTML = await fs.readFile(__dirname + "/invoice.html", "utf8");

  return invoiceHTML;
  // console.log(invoiceHTML)
}
