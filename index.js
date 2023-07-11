const PORT = process.env.PORT || 5000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')


const app = express()

const numbers = ['one','two','three','four','five','six','seven']
article = []


app.use(
    cors({
        origin:'*',
    })
)
const cron = require('node-cron');

const link_to_site = `https://insort-api.onrender.com`

cron.schedule('0 */13 * * * *', () => {

axios.get(link_to_site, { 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
})
    .then((req,res) => {console.log(`ok`)})
    .catch((err)=>{
    // console.log(err)
    })

});
app.get('/',(req,res)=>{
    res.json("hello there this api route must be working now")
})

app.get('/Headlines',(req,res)=>{
    axios.get(`https://economictimes.indiatimes.com/news/india?from=mdr`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $(".eachStory").each((index,element)=>{
            const title = $(element).children('h3').first().text()
            const description = $(element).children('p').first().text()
            const url_body = $(element).children('span').first().attr('href')
            const newsUrl = "https://economictimes.indiatimes.com/"+url_body
            const imageUrl = $(element).find('img.lazy').attr('data-original')
            let count = numbers[index]
            article[index] = {title,description,newsUrl,imageUrl,count}
        })
        res.json({articles : article.slice(0,7)})


    }).catch((err)=> console.log(err))
})

app.get('/Business',(req,res)=>{
    axios.get(`https://economictimes.indiatimes.com/news/international/business`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $(".eachStory").each((index,element)=>{
            const title = $(element).children('h3').first().text()
            const description = $(element).children('p').first().text()
            const url_body = $(element).children('span').first().attr('href')
            const newsUrl = "https://economictimes.indiatimes.com/"+url_body
            const imageUrl = $(element).find('img.lazy').attr('data-original')
            let count = numbers[index]
            article[index] = {title,description,newsUrl,imageUrl,count}
        })
        res.json({articles : article.slice(0,7)})


    }).catch((err)=> console.log(err))
})
app.get('/Startup',(req,res)=>{
    axios.get(`https://economictimes.indiatimes.com/small-biz/entrepreneurship`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $(".eachStory").each((index,element)=>{
            const title = $(element).children('h3').first().text()
            const description = $(element).children('p').first().text()
            const url_body = $(element).children('span').first().attr('href')
            const newsUrl = "https://economictimes.indiatimes.com/"+url_body
            const imageUrl = $(element).find('img.lazy').attr('data-original')
            let count = numbers[index]
            article[index] = {title,description,newsUrl,imageUrl,count}
        })
        res.json({articles : article.slice(0,7)})


    }).catch((err)=> console.log(err))
})
app.get('/Finance',(req,res)=>{
    axios.get(`https://economictimes.indiatimes.com/industry/banking-/-finance/banking`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $(".eachStory").each((index,element)=>{
            const title = $(element).children('h3').first().text()
            const description = $(element).children('p').first().text()
            const url_body = $(element).children('span').first().attr('href')
            const newsUrl = "https://economictimes.indiatimes.com/"+url_body
            const imageUrl = $(element).find('img.lazy').attr('data-original')
            let count = numbers[index]
            article[index] = {title,description,newsUrl,imageUrl,count}
        })
        res.json({articles : article.slice(0,7)})


    }).catch((err)=> console.log(err))
})




app.listen(PORT,()=>{
    console.log(`port connected and listening on ${PORT}`)
})
