const port = process.env.port || 5000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')


const app = express()

article = []




app.get('/',(req,res)=>{
    res.json("hello there this api route must be working now")
})

app.get('/headlines',(req,res)=>{
    axios.get(`https://economictimes.indiatimes.com/news/india?from=mdr`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $(".eachStory").each((index,element)=>{
            const title = $(element).children('h3').first().text()
            const content = $(element).children('p').first().text()
            const url_body = $(element).children('span').first().attr('href')
            const url = "https://economictimes.indiatimes.com/"+url_body
            const img_url = $(element).find('img.lazy').attr('data-original')
            article[index] = {title,content,url,img_url}
        })
        res.json(article.slice(0,7))


    }).catch((err)=> console.log(err))
})

app.get('/business',(req,res)=>{
    axios.get(`https://www.businessinsider.in/business`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $("section.list-bottom-story").each((index,element)=>{
            const title = $(element).find('h2').text()
            const content = $(element).find('.list-bottom-text').text()
            const url_body = $(element).find('a').attr('href')
            const url = "https://www.businessinsider.in/business"+url_body
            const img_url = $(element).find('img.lazy').attr('data-original')
            article[index] = {title,content,url,img_url}
        })
        res.json(article.slice(0,7))


    }).catch((err)=> console.log(err))
})
app.get('/startup',(req,res)=>{
    axios.get(`https://www.businessinsider.in/business/startups`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $("section.list-bottom-story").each((index,element)=>{
            const title = $(element).find('h2').text()
            const content = $(element).find('.list-bottom-text').text()
            const url_body = $(element).find('a').attr('href')
            const url = "https://www.businessinsider.in/business"+url_body
            const img_url = $(element).find('img.lazy').attr('data-original')
            article[index] = {title,content,url,img_url}
        })
        res.json(article.slice(0,7))


    }).catch((err)=> console.log(err))
})
app.get('/bookSuggestion',(req,res)=>{
    axios.get(`https://bookfortoday.com/`)
    .then((response)=>{
        const html = response.data
        const $ = cheerio.load(html)//$(".itemListElement")
        
        $("article.blog-entry").each((index,element)=>{
            const title = $(element).find('img').attr('alt')
            // const content = null
            const url_body = $(element).find('a').attr('href')
            const url = url_body
            const img_url = $(element).find('img').attr('src')
            article[index] = {title,url ,img_url}
        })
        res.json(article.slice(0,7))


    }).catch((err)=> console.log(err))
})




app.listen(port,()=>{
    console.log(`port connected and listening on ${port}`)
})