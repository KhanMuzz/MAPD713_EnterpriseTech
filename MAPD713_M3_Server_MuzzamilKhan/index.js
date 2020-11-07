/*
Developer: Muzzamil Khan
Course:    MAPD-713 Enterprise
Desc:      Milestone 3, MongoDb Server, Local Implementation
App:       Paitent Data Management - Backend system
COURSE PROFESSOR: MR . VICTOR ZAYTSEV
GITHUB REPO ADD: https://github.com/KhanMuzz/MAPD713_EnterpriseTech.git
*/

//Required global variables for operations of this server
var MY_MAIN_PORT = 5000;
var MY_HOST_IP = '127.0.0.1';
var SERVER_NAME = 'PATIENTS DATA MANAGMENT';

//Libraries needed for use, http for req/resp calls and moongoose for DATABASE
var http = require('http');
var mongoose = require('mongoose');

//Fetch port number and IP from environement variables if there is one and store in variables
var port = process.env.MY_MAIN_PORT;
var ipAddress = process.env.MY_HOST_IP;

//Fetch URI from environment variable if there is one OR just use one provided
//Connect to localhost if no other database is found to connect to
var uriString = 
  process.env.MONGODB_URI || 
  'mongodb://127.0.0.1:27017/data';

//Use Async Connection to connect to MongoDB 
mongoose.connect(uriString, {useNewUrlParser: true});  

//Store a connection made to Mongo in a variable for further use
const dbConnectionReady = mongoose.connection;

//If error occured while making a connection to mongoose above, print error on console
dbConnectionReady.on('error', console.error.bind(console, 'Unable to connect'));

//If DB connection opened successfully, print a confirmation message 
dbConnectionReady.once('open', function(){
    console.log("**************************************************************");
    console.log("Welcome to: " + SERVER_NAME);
    console.log("You are now connected to MongoDB at: " + uriString);
    console.log("**************************************************************");
});


//Define the model for my database to store in Mongoose or MongoDB cloud form
var patientDBModel = new mongoose.Schema({
  //Set all my data fields to have string values
        firstName       : String,
        lastName        : String,
        age             : String,
        phoneNum        : String,
        visitDate       : String,
        familyDoctor    : String,
        bloodPressure   : String,
        heartBeatRate   : String,
        respiratoryRate : String,
        CDCTemperature  : String,
        bloodOxygenLevel: String
});

//Create the DB-Model in mongoose defined above and store it with table name Patients
var PatientModel = mongoose.model('Patients', patientDBModel);

//Import restify, os and restify-errors libraries
var errors = require('restify-errors');
var restify = require('restify');
const { type } = require('os');

//Create my restify server and pass in name I gave
myServer = restify.createServer({ name : SERVER_NAME});

//Check if ip and port number was not found in environment vairables and assign default values
if(typeof ipAddress === "undefined"){
  console.warn('No process.env.IP var, using default: ' + MY_HOST_IP);
		ipAddress = MY_HOST_IP;
};
if (typeof port === "undefined") {
  console.warn('No process.env.PORT var, using default port: ' + MY_MAIN_PORT);
  port = MY_MAIN_PORT;
};

//Start the restify server with port and ip set
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

//---------------------  SERVER RESOURCES   ----------------------------------
  
  //1. LIST ALL PATIENTS IN DB: REQ METHOD TYPE : GET
  //Get all patients
  myServer.get('/patients', function (req, resp, next) {
    console.log('GET request: Coming in for list of all paitents');
    // Find all patients in our database
    PatientModel.find({}).exec(function (error, result) {
      if (error) return next(new Error(JSON.stringify(error.errors)))
      resp.send(result);
    });
  });//end of get all patients

  //2. INSERT NEW PATIENT INTO DB: REQ METHOD TYPE : POST
  myServer.post('/patients', function (req, resp, next){
    console.log("POST request: Coming in to insert a new patient");

    //Check all params attached in body to make sure they are type String not undefined
    if (req.body.firstName        === undefined  ||
        req.body.lastName         === undefined  ||
        req.body.age              === undefined  ||
        req.body.phoneNum         === undefined  ||
        req.body.visitDate        === undefined  ||
        req.body.familyDoctor     === undefined  ||
        req.body.bloodPressure    === undefined  ||
        req.body.heartBeatRate    === undefined  ||
        req.body.respiratoryRate  === undefined  ||
        req.body.CDCTemperature   === undefined  ||
        req.body.bloodOxygenLevel === undefined  
      ) {
      // If undefined data found, send back an Error message
      return next(new errors.BadRequestError('Error with sent data, Please check JSON parameters'))
    }else{

      //Make a new Obj of Patient Model and Assign values from POST params to all fields
      var patientObj = new PatientModel({
        firstName       : req.body.firstName,
        lastName        : req.body.lastName,
        age             : req.body.age,
        phoneNum        : req.body.phoneNum,
        visitDate       : req.body.visitDate,
        familyDoctor    : req.body.familyDoctor,
        bloodPressure   : req.body.bloodPressure,
        heartBeatRate   : req.body.heartBeatRate,
        respiratoryRate : req.body.respiratoryRate,
        CDCTemperature  : req.body.CDCTemperature,
        bloodOxygenLevel: req.body.bloodOxygenLevel
      });
      
      // Create the patient and saving to db
      patientObj.save(function (error, result) {
      // If there are any errors, pass them to next in the correct format
      if (error) return next(new Error(JSON.stringify(error.errors)))
      // Send the patient if no issues
      resp.send(201, result)
    })
    }//Else ends
  });//Create new patient method ends

   //3. SEARCH A PATIENT BY ID: REQ METHOD TYPE : GET/:ID
   myServer.get('/patients/:id', function(req, resp, next){
     console.log("Get request: coming in to search by id: " + req.params.id);

     //Find the patient by id match in the database
     PatientModel.find({ _id : req.params.id}).exec(function (error, resultFound){

      //If patient found, send back resp
      if(resultFound){
        resp.send(resultFound);
      }else{
        //Send back error 404 code
        resp.send(404);
        console.log(error);
      }
     });
   });//Find by id ends


