const mongoose = require('mongoose')
const uri = 'mongodb+srv://divyasingh848:wkgU6cpaSf2pK5iD@cluster0.dfqbw.mongodb.net/'
const dbname = 'Ecommerce'
const express = require('express')
const cors =require('cors')



//initializing express app
const app = express()
app.use(cors())
//intilizaing the server
app.listen(3000, ()=>{console.log('server listening on port 3000')})

//importing the schema model
const productCat = require('./models');
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

app.get('/product-categories', async (req, res) => {
    try {
       const products = await productCat.find();
   
    res.status(200).send({
        status:"success",
        results:products.length,
        data:{
            products
        }
    })
    } catch (err) {
       console.log('Error fetching products:', err);
       res.status(500).send('Server error');
    }
 });


//adding a shop to ecommerce DB
app.get('/shopModel', async (req, res) => {
    try {
       const shopItems = await ShopProduct.find();
   
    res.status(200).send({
        status:"success",
        results:shopItems.length,
        data:{
            shopItems
        }
    })
    } catch (err) {
       console.log('Error fetching products:', err);
       res.status(500).send('Server error');
    }
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
