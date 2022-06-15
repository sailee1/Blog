const express = require('express')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const dotenv= require ('dotenv')
const colors = require ('colors')

const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB()




app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt:'desc' })
    res.render('articles/index', {articles: articles})
})

app.use('/articles', articleRouter)

app.listen(5000)