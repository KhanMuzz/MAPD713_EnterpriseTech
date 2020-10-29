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
        console.log("THIS SERVERS OFFERS ENDPOINTS/ACTIONS BELOW")
        console.log("--------------------------------------------------------")
        console.log(" List all products: GET, must insert values before user")
        console.log("http://127.0.0.1:3009/products")
        console.log("--------------------------------------------------------")
        console.log(" Find product by id: GET, must insert values before user")
        console.log("http://127.0.0.1:3009/products/:id")
        console.log("--------------------------------------------------------")
        console.log(" Update product by id: PUT, must insert values before user")
        console.log("http://127.0.0.1:3009/products/1/product-type/product-price/product-category")
        console.log("---------------------------------------------------------")
        console.log(" Delete product by id: DEL, must insert values before user")
        console.log("http://127.0.0.1:3009/products/:id")
        console.log(" Create new product list, must use POST")
        console.log("http://127.0.0.1:3009/products/product=type/product-price/product-category")
});

//Allow use of Post requests
myServer.use(restify.fullResponse())

//Map both body of Request and Params coming in with it -Unable switching between
myServer.use(restify.bodyParser())

var emp = {
    "product": "yes1",
    "price": "yes2",
    "category":"yes3"
  }
//2.Post method to create new product and store it in memory in collections 'products'
myServer.post('/products', function(req, resp, next){
        //increment post counter
        counterPost ++
        console.log("The current POST counter is: " + counterPost)
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

//3. Get-Print all products in memory
myServer.get('/products', function(req, resp, next){
        counterGet ++
        console.log("The current GET counter is: " + counterGet)

        //using .find() to get all data stored in products collections
      //---  products_Save.find({}, function(error, productsDataObject){
      //----      if(error){
      //----          console.log(error)
      //----      }
      //----      resp.send(productsDataObject)
            resp.send(emp)
     //----   })
})//get all user ends


//4.Find a product by product_id
myServer.get('/products/:id', function(req, resp, next){
        counterGet++
        console.log("The current GET counter is: " + counterGet)
    //find user in memory stored in collection products
    products_Save.findOne({ _id: req.params.id }, function(error, foundProduct){

        if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        
        if(foundProduct){
            resp.send(foundProduct)
        }else{
            //send http error code
            resp.send(404)
        }   
    })
});//find by id ends

//5.Update a products info by id #, 
myServer.put('products/:id', function(req, resp, next){

    //create a new product with params coming in
    var newProduct = {
        _id   : req.params.id,
        product: req.params.product,
        price : req.params.price,
        category: req.params.category
    }
    //update the user in memory/DB
    products_Save.update(newProduct, function(error, updatedProduct){
        if (error) {return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))}

        //send a 200 ok stat code if no errors
        resp.send(200)
    })
});//update by id ends

//Delete a product from memory
myServer.del('/products/:id', function(req, resp, next){

        //find and delete data stored in our memory
        products_Save.delete(req.params.id, function(error, productToDelete){

            //catch error
            if (error) { return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))}

            //return a code
            resp.send(200)
        })

});