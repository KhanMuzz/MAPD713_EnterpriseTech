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

//Set up framework save to provide data persistence in memory for products
var products_Save = require('save')('products')

//Create restify server
var myServer = restify.createServer({ name: SERVER_NAME});

//Start my server and print a message on console to show server info
myServer.listen(PORT, HOST_IP, function(){
        console.log("----- WELCOME TO "+myServer.name + "  @  " + myServer.url)
        console.log("----- The server is ready for your requests at: http://"+HOST_IP +":"+PORT)
        console.log("----- Resources: /products , /products.id")
});
