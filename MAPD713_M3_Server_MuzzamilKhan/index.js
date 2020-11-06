/*
Developer: Muzzamil Khan
Course:    MAPD-713 Enterprise
Desc:      Milestone 3, MongoDb Server, Local Implementation
App:       Paitent Data Management - Backend system
COURSE PROFESSOR: MR . VICTOR ZAYTSEV
GITHUB REPO ADD: https://github.com/KhanMuzz/MAPD713_EnterpriseTech.git
*/

//Required global variables for operations of server
var PORT = 5000;
var HOST_IP = '127.0.0.1';
var SERVER_NAME = 'PATIENTS DATA MANAGMENT';

//Libraries enabled for use, http to use for req/resp and moongoose for DATABASE
var http = require('http');
var mongoose = require('mongoose');

//Implementing Port and IP 
var port = process.env.PORT;
var ipAddress = process.env.HOST_IP;

//Connect to localhost if no other database is found to connect to
//For MileStone 3 I will use local host to test all use cases extensively before moving to cloud
var uriString = 
  process.env.MONGODB_URI || 
  'mongodb://127.0.0.1:27017/data';

//Use Async Connection to MongoDB 
mongoose.connect(uriString, {useNewUrlParser: true});  

//Store connection made to Mongo in a variable for further use
const dbConnectionReady = mongoose.connection;

//Check if connection had an error
dbConnectionReady.on('error', console.error.bind(console, 'Unable to connect'));

//If connection opens successfully, print a confirmation msg
dbConnectionReady.once('open', function(){
    console.log("**************************************************************");
    console.log("Welcome to: " + SERVER_NAME);
    console.log("You are now connected to MongoDB at: " + uriString);
    console.log("**************************************************************");
    console.log("This server is listening at: "+HOST_IP+":"+PORT);
    console.log("**************************************************************");
    console.log("THIS SERVERS OFFERS ENDPOINTS/ACTIONS BELOW")
    console.log("--------------------------------------------------------")
    console.log(" List all Patients: GET, DB must have values for this or returns []")
    console.log("http://127.0.0.1:5000/patients")
    console.log("--------------------------------------------------------")
    console.log(" Find a Patient by id: GET, must attach id number as a param")
    console.log("http://127.0.0.1:5000/patients/:id")
    console.log("--------------------------------------------------------")
    console.log(" Find a Patient by any dataFieldName: POST, must include params in body")
    console.log("http://127.0.0.1:5000/patients/search")
    console.log("--------------------------------------------------------")
    console.log(" Delete patient by id: DEL, must insert values before user")
    console.log("http://127.0.0.1:5000/patients/:id")
    console.log("--------------------------------------------------------")
    console.log(" Update a patient by id: PUT, must provide id as a param")
    console.log("http://127.0.0.1:5000/patients/:id")
    console.log("--------------------------------------------------------")
    console.log(" Create new patient, type call = POST")
    console.log("http://127.0.0.1:5000/patients/JSON_FORMAT_DATA_ATTACHED_WITH_BODY")
});



