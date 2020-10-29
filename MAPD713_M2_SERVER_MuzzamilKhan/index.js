/*
NAME: MUZZAMIL KHAN
COURSE: MAPD713 - ENTERPRISE TECH
DESC: MILESTONE 2 : PATIENT DATA MANAGMENT RESTIFY
COURSE PROFESSOR: MR . VICTOR ZAYTSEV
GITHUB REPO ADD: https://github.com/KhanMuzz/MAPD713_EnterpriseTech.git
*/

//Variables required for the database 
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


//Variables required for server's operations
var MY_SERVER_NAME = "PATIENTS DATA MANAGEMENT"
var PORT_NUM = 3009
var IP_ADD = '127.0.0.1'

//Bring in the restify library using require
var restify = require('restify')

//Use the save framework to store data locally under name Patients
var patient_database = require('save')('patients')

//Create instance of my server
var myServer = restify.createServer({name : MY_SERVER_NAME})

//Start my server and print messages on console to see servers current state and 
//all the req/resp options available on this server
myServer.listen(PORT_NUM, IP_ADD, function(){
        console.log("Welcome to Patient Data Managment by M.Khan")
        console.log("This server is listening on: "+ myServer.url)
        console.log("THIS SERVERS OFFERS ENDPOINTS/ACTIONS BELOW")
        console.log("--------------------------------------------------------")
        console.log(" List all Patients: GET, must insert values before used")
        console.log("http://127.0.0.1:3009/patients")
        console.log("--------------------------------------------------------")
        console.log(" Find a Patient by id: GET, must insert values before used")
        console.log("http://127.0.0.1:3009/patients/:id")
        console.log("--------------------------------------------------------")
        console.log(" Delete patient by id: DEL, must insert values before user")
        console.log("http://127.0.0.1:3009/patients/:id")
        console.log("--------------------------------------------------------")
        console.log(" Create new patient, type call = POST")
        console.log("http://127.0.0.1:3009/patients/JSON_FORMAT_DATA_ATTACHED_WITH_BODY")
});//server listen ends

//Allow Post requests to come in
myServer.use(restify.fullResponse())

//Enable body parser to keep param and body of REQ/RESP Together
myServer.use(restify.bodyParser())

//Use for string parameters
myServer.use(restify.queryParser());

//-------SERVER WORKING, NOW I WILL IMPLEMENT DIFF REQ AND RESP CALLS-------

//------------------------- OPERATION 1 - INSERT -----------------------
//Insert a patient into database - POST CALL 
myServer.post('/patients', function(req, res, next){

        //Fetch data from req-params and store in patient object
        patient.firstName       = req.params.firstName
        patient.lastName        = req.params.lastName
        patient.age             = req.params.age
        patient.phoneNum        = req.params.phoneNum
        patient.visitDate       = req.params.visitDate
        patient.familyDoctor    = req.params.familyDoctor
        patient.bloodPressure   = req.params.bloodPressure
        patient.heartBeatRate   = req.params.heartBeatRate
        patient.respiratoryRate = req.params.respiratoryRate
        patient.CDCTemperature  = req.params.CDCTemperature
        patient.bloodOxygenLevel= req.params.bloodOxygenLevel

        //Save the patient object in local data using save framwork
        patient_database.create(patient, function(error, patientAdded){
            
            //first lets catch any errors
            if(error){
                // this error is if a parameter/argument passed has errors
                return next(new restify.invalidArgumentError(JSON.stringify(error.errors)))
            }
            //send back the patient object
            res.send(201, patientAdded)
        })//database create method ends
})//add patients method ends

//------------------- OPERATION 2 - LIST ALL PATIENTS --------------
//List all patients in the database - GET CALL
myServer.get('/patients', function(req, res, next){

    //Lets fetch patient data using .find() that returns everything
    patient_database.find({}, function(error, patients){

        //lets catch any errors
        if(error){
            res(error)
        }
        //send back fetched data
        res.send(patients)
    })
})//get all patients ends

//-------------------OPERATION 3 - SEARCH BY ID
//Search for a patient by id - GET CALL
myServer.get('patients/:id', function(req, res, next){

    //Lets find patient in database using .findOne()
    //passing key : value pair in search _id : value parameter
    patient_database.findOne({ _id: req.params.id}, function(error, patientFoundById){

        //lets first catch any argument incoming errors
        if(error){
            return next(new restify.invalidArgumentError(JSON.stringify(error.errors)))
        }
        //if a patient was found with that id then return it
        if(patientFoundById){
            res.send(patientFoundById)
        }else{
            //send http not found error 404
            res.send(404)
        }
    })
})//search by id ends

//-----------------OPERATION 3 - DELETE BY ID 
//Delete a patient from memory
myServer.del('/patients/:id', function(req, resp, next){

    //find and delete data stored in our memory
    patient_database.delete(req.params.id, function(error, productToDelete){

        //catch error
        if (error) { return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))}

        //return a code
        resp.send(200)
    })

});



