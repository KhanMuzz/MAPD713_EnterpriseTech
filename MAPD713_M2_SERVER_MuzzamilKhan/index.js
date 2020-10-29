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
// var patientFirstName;
// var patientLastName;
// var patientAge;
// var patientPhoneNum;
// var testingDate;
// var familyDoctor;
// var boodPressure;
// var heartBeatRate;
// var respiratoryRate;
// var CDCTemperature;
// var BloodOxygenLevel;

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
});//server listen ends

//Allow Post requests to come in
myServer.use(restify.fullResponse())

//Enable body parser to keep param and body of REQ/RESP Together
myServer.use(restify.bodyParser())

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







