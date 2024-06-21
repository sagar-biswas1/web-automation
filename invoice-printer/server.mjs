import express from "express"

import path from "path"
import generatePDFInvoice from "./generatePDF.mjs"


const app = express()

const port = 4000;


app.get('/', async(req,res)=>{
    await generatePDFInvoice()

    res.attachment('invoice.pdf')
    res.sendFile(path.resolve('data/invoice.pdf'))
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

