/*
Developer: Muzzamil Khan
Course:    MAPD-713 Enterprise
Desc:      Milestone 3, MongoDb Server, Local Implementation
App:       Paitent Data Management - Backend system
COURSE PROFESSOR: MR . VICTOR ZAYTSEV
GITHUB REPO ADD: https://github.com/KhanMuzz/MAPD713_EnterpriseTech.git
*/

//Required global variables for operations of server
var MY_MAIN_PORT = 5000;
var MY_HOST_IP = '127.0.0.1';
var SERVER_NAME = 'PATIENTS DATA MANAGMENT';

//Libraries needed for use, http to use for req/resp and moongoose for DATABASE
var http = require('http');
var mongoose = require('mongoose');

//Fetch port number and local IP from environement variables if there is one and store locally
var port = process.env.MY_MAIN_PORT;
var ipAddress = process.env.MY_HOST_IP;

//Fetch URI from environment variable if any OR just use one provided
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
});

//Object of type patient
var patient = new Object();
patient.firstName;
patient.lastName;
patient.age;
patient.phoneNum;
patient.visitDate;
patient.familyDoctor;
patient.bloodPressure;
patient.heartBeatRate;
patient.respiratoryRate;
patient.CDCTemperature;
patient.bloodOxygenLevel;

//Create a new mongoose DB and pass in patient object
var patientDB = new mongoose.Schema(patient);

// Convert the mangoose Database into a model, if it doesn't exist it will make a new model
var PatientModel = mongoose.model('Patients', patientDB);

//Restify configuration for error and import restify library
var errors = require('restify-errors');
var restify = require('restify');
const { type } = require('os');

//Create the server and pass in name I gave
myServer = restify.createServer({ name : SERVER_NAME});

//Check if the envirnment variables returned type undefined values and re-assign default IP and port
if(typeof ipAddress === "undefined"){
  console.warn('No process.env.IP var, using default: ' + MY_HOST_IP);
		ipAddress = MY_HOST_IP;
};
if (typeof port === "undefined") {
  console.warn('No process.env.PORT var, using default port: ' + MY_MAIN_PORT);
  port = MY_MAIN_PORT;
};

//Start the restify server with port and ip now set 
myServer.listen(port, ipAddress, function(){
  console.log("This server is listening at: "+MY_HOST_IP+":"+MY_MAIN_PORT);
  // console.log("**************************************************************");
  // console.log("THIS SERVERS OFFERS ENDPOINTS/ACTIONS BELOW")
  // console.log("--------------------------------------------------------")
  // console.log("List all Patients: GET, DB must have values for this OR returns []")
  // console.log("http://127.0.0.1:5000/patients")
  // console.log("--------------------------------------------------------")
  // console.log(" Find a Patient by id: GET, must attach id number as a param")
  // console.log("http://127.0.0.1:5000/patients/:id")
  // console.log("--------------------------------------------------------")
  // console.log("Find a Patient by ANY Field-Name: POST, must include JSON-Param in body")
  // console.log("http://127.0.0.1:5000/patients/search")
  // console.log("--------------------------------------------------------")
  // console.log("Delete a patient by id: DEL, must insert values before user")
  // console.log("http://127.0.0.1:5000/patients/:id")
  // console.log("--------------------------------------------------------")
  // console.log("Update a patient by id: PUT, must provide id as a param")
  // console.log("http://127.0.0.1:5000/patients/:id")
  // console.log("--------------------------------------------------------")
  // console.log("Create new patient, type call = POST")
  // console.log("http://127.0.0.1:5000/patients/JSON_FORMAT_DATA_ATTACHED_WITH_BODY")
});

  //Enable POST REQ for this server
  myServer.use(restify.plugins.fullResponse());

  //Map req.params and req.body so we can fetch params from body of Post Request
  myServer.use(restify.plugins.bodyParser())


  //1. LIST ALL PATIENTS IN DB: REQ TYPE : GET
  //Get all patients in the system
  myServer.get('/patients', function (req, res, next) {
    console.log('GET request: Coming in for list of all paitents');
    // Find every entity within the given collection
    PatientModel.find({}).exec(function (error, result) {
      if (error) return next(new Error(JSON.stringify(error.errors)))
      res.send(result);
    });
  });//end of get all patients

  //2. INSERT A NEW PATIENT INTO DB: REQ TYPE : POST



