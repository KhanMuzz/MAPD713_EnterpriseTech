/*
NAME: MUZZAMIL KHAN
COURSE: MAPD713 - ENTERPRISE TECH
DESC: ASSIGNMENT 1 - WRITING ENDPOINT SERVER THAT WILL RESPONDE TO MY APP'S FRONTEND
GITHUB REPO ADD: https://github.com/KhanMuzz/MAPD713_EnterpriseTech.git
*/

//1. Creating all the required variables to store objects/values/libraries etc
var SERVER_NAME = 'Products : Rest-API'
var PORT = 3009
var HOST_IP = '127.0.0.1'
var counterGet = 0
var counterPost = 0

//Bring in needed libraries and frameworks 
var restify = require('restify')

//Set up framework 'save'to store data in collections called products
var products_Save = require('save')('products')

//Create restify server
var myServer = restify.createServer({ name: SERVER_NAME});

//Start my server and print a message on console to show server info
myServer.listen(PORT, HOST_IP, function(){
        console.log("----- WELCOME TO "+myServer.name + "  @  " + myServer.url)
        console.log("----- The server is ready for your requests at: http://"+HOST_IP +":"+PORT)
});

//Allow use of Post requests
myServer.use(restify.fullResponse())

//Map both body of Request and Params coming in with it -Unable switching between
myServer.use(restify.bodyParser())

//Post method to create new product and store it in memory in collections 'products'
myServer.post('/products', function(req, resp, next){
        //increment post counter
        counterPost ++
        console.log("The current post counter is: " + counterPost)
        //fetch param data and make a new 
        var newProduct = {
            product : req.params.product,
            price : req.params.price,
            category: req.params.category
        }

        //save this user in memory using 'save' FW to save it under products 
        products_Save.create(newProduct, function(error, currProductAdded){

            if(error)
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            
 
            //send back current addition if no errors
            resp.send(201, currProductAdded)
        })//persistence ends
});//add a user post ends

// Print all products
myServer.get('/products', function(req, resp, next){

        //using .find() to get all data stored in products collections
        products_Save.find({}, function(error, productsDataObject){
            if(error){
                console.log(error)
            }
            resp.send(productsDataObject)
        })
     /// resp.send("heyyyy")


})//get all user ends