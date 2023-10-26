const bodyParser = require('body-parser');
const express = require('express');
const app = express();

require('dotenv').config()

const MongoClient = require("mongodb").MongoClient;

const uril = process.env.DB_STRING;
const dbname = 'tododb';
const client = new MongoClient(uril);
const db = client.db(dbname);

client.connect();
console.log(`connected to mongodb`);

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: true,
}))

app.use(express.json())

// app.get('/', (req, res)=>{
//     db.collection('todocollection').find().toArray()
//     .then(data=>{
//         res.render('index', {items: data})
//     })
//     .catch(console.error())
// })


app.get('/',async (request, response)=>{
    // const todoItems = await db.collection('todos').find().toArray()
    // const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    // response.render('index.ejs', { items: todoItems, left: itemsLeft })
    db.collection('todocollection').find().toArray()
    .then(data => {
        db.collection('todocollection').countDocuments({completed: false})
        .then(itemsLeft => {
            response.render('index.ejs', { items: data, left: itemsLeft })
        })
    })
    .catch(error => console.error(error))
})

app.post('/thingstodo', (req, res)=>{
    db.collection('todocollection').insertOne({
        todoss: req.body.todos,
        completed: false,
        date: req.body.setTime
    })
    .then(data =>{
        res.redirect('/');
    })
})

app.put('/completed_item_link', async (request, response)=>{
   await db.collection('todocollection').updateOne({
        todoss: request.body.jscompleteItem_body,
        //date: request.body.jscompletedate
    }, {
        $set:{
            completed: true
        }
    }, {
        sort: {_id: -1},
        upsert: false
    })
    .then(data=>{
       // console.log(`item marked completed`);
        response.json('marked completed')
    })
    .catch(error=>console.error(error))
});


app.put('/uncomplete_itemlink', async (request, response)=>{
    await db.collection('todocollection').updateOne({
        todoss: request.body.uncomplete_item_body,
        //date: request.body.redodate
    }, {
        $set:{
            completed: false
        }
    }, {
        sort: {_id: -1},
        upsert: false
    })
    .then(data=>{
        //console.log(`item unmarked`)
        response.json('mark uncompleted')//note you have to pass in the string inside to enable it reload automatically
    })
        .catch(error=>console.error(error))
})

app.listen(process.env.PORT, ()=>{
    console.log(`i am running on port ${process.env.PORT} please come inside`)
})


{/* <span><%= items[i].date %></span> */}