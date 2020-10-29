/*
NAME: MUZZAMIL KHAN
COURSE: MAPD713 - ENTERPRISE TECH
DESC: MILESTONE 2 : PATIENT DATA MANAGMENT RESTIFY
COURSE PROFESSOR: MR . VICTOR ZAYTSEV
GITHUB REPO ADD: https://github.com/KhanMuzz/MAPD713_EnterpriseTech.git
*/

//Variables required for the database 
var patientFirstName;
var patientLastName;
var patientAge;
var patientPhoneNum;
var testingDate;
var familyDoctor;
var boodPressure;
var heartBeatRate;
var respiratoryRate;
var CDCTemperature;
var BloodOxygenLevel;

//Variables required for server's operations
var MY_SERVER_NAME = "PATIENTS DATA MANAGEMENT"
var PORT_NUM = 3009
var IP_ADD = '127.0.0.1'

//Bring in the restify library using require
var restify = require('restify')

//Use the save framework to store data locally under name Patients
var patients_data = require('save')('patients')

//Create instance of my server
var myServer = restify.createServer({name : MY_SERVER_NAME})

//Start my server and print messages on console to see servers current state and 
//all the req/resp options available on this server
myServer.listen(PORT_NUM, IP_ADD, function(){
        console.log("Welcome to Patient Data Managment by M.Khan")
        console.log("This server is listening on: "+ myServer.url)
});//server listen ends






