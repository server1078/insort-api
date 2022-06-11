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

app.get('/Business-News',(req,res)=>{
    axios.get(`https://www.businessinsider.in/business`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $("section.list-bottom-story").each((index,element)=>{
            const title = $(element).find('h2').text()
            const description = $(element).find('.list-bottom-text').text()
            const url_body = $(element).find('a').attr('href')
            const newsUrl = "https://www.businessinsider.in/business"+url_body
            const imageUrl = $(element).find('img.lazy').attr('data-original')
            let count = numbers[index]
            article[index] = {title,description,newsUrl,imageUrl,count}
        })
        res.json({articles :article.slice(0,7)})


    }).catch((err)=> console.log(err))
})
app.get('/Startup-News',(req,res)=>{
    axios.get(`https://www.businessinsider.in/business/startups`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $("section.list-bottom-story").each((index,element)=>{
            const title = $(element).find('h2').text()
            const   description = $(element).find('.list-bottom-text').text()
            const url_body = $(element).find('a').attr('href')
            const newsUrl = "https://www.businessinsider.in/business"+url_body
            const imageUrl = $(element).find('img.lazy').attr('data-original')
            let count = numbers[index]
            article[index] = {title,description,newsUrl,imageUrl,count}
        })
        res.json({articles :article.slice(0,7)})


    }).catch((err)=> console.log(err))
})
app.get('/Book-Suggestions-Daily',(req,res)=>{
    axios.get(`https://bookfortoday.com/`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $("article.blog-entry").each((index,element)=>{
            const title = $(element).find('img').attr('alt')
            // const description = null
            const description = null
            const url_body = $(element).find('a').attr('href')
            const newsUrl = url_body
            const imageUrl = $(element).find('img').attr('src')
            let count = numbers[index]+"book"
            article[index] = {title,description,newsUrl,imageUrl,count}
        })
        res.json({articles :article.slice(0,8)})


    }).catch((err)=> console.log(err))
})




app.listen(PORT,()=>{
    console.log(`port connected and listening on ${PORT}`)
})