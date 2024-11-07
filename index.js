const mongoose = require('mongoose')
const uri = 'mongodb+srv://divyasingh848:wkgU6cpaSf2pK5iD@cluster0.dfqbw.mongodb.net/'
const dbname = 'Ecommerce'
const express = require('express')

//initializing express app
const app = express()

//intilizaing the server
app.listen(3000, ()=>{console.log('server listening on port 3000')})

//importing the schema model
const ProductCategory = require('./models');
const SignUP = require('./SignUp')
const ShopProduct = require('./shopModel');
//paersing the data when being communicated from express server to mongoDB
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

//adding a user to ecommerce DB
app.post('/user',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    let newSignup = new SignUP({
       email: email,
       password: password 
    })
    newSignup.save()
    .then((user)=>{res.send(user) })
     .catch((err)=>{console.log(err)})   
   
})

//adding a product to ecommerce DB
//adding a product to ecommerce DB using GET
app.get('/models', (req, res) => {
   let id = req.query.id;
   let title = req.query.title;
   let imageURL = req.query.imageURL;

   let newProduct = new ProductCategory({
       id: id,
       title: title,
       imageURL: imageURL
   });
   newProduct.save()
       .then((product) => { res.send(product); })
       .catch((err) => { console.log(err); })
});

//adding a shop to ecommerce DB
app.get('/shop', (req, res) => {
   let id = req.query.id;
   let title = req.query.title;
   let routeName = req.query.routeName;
   let name = req.query.name;
   let imageURL = req.query.imageURL;
   let price = req.query.price;

   let newShop = new ShopProduct({
       id: id,
       routeName: routeName,
       title: title,
       imageURL: imageURL,
       name: name,
       price: price
   });
   newShop.save()
       .then((shop) => { res.send(shop); })
       .catch((err) => { console.log(err); })
});

//URI connection
mongoose
.connect(uri,{dbName:dbname})
.then(()=>{console.log('mongoDB connected')})
.catch(err=>{console.log(err.message)})

//mongoose connecting to db
mongoose.connection.on('connected',()=>{console.log("mongoose connected to db")})
mongoose.connection.on('error', (err=> {console.log(err.message)}))
mongoose.connection.on('disconnected', ()=> {console.log("mongoose disconnected")})

//node js process to get exit
process.on('SIGINT', async ()=>{
    await mongoose.connection.close()
    process.exit(0);
})

