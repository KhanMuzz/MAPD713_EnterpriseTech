/*
Developer: Muzzamil Khan
Course:    MAPD-713 Enterprise
Desc:      Milestone 3 USED FOR END 2 END TESTING SERVER, MongoDb - Local Implementation
App:       Paitent Data Management - Backend system
COURSE PROFESSOR: MR . VICTOR ZAYTSEV
GITHUB REPO ADD: https://github.com/KhanMuzz/MAPD713_EnterpriseTech.git
* THIS IS THE TEST FILE, SEE TEST RUN INSTRUCTIONS ON TOP OF index.js
*/

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

//End-2-END TEST 1: testing GET /patients request
describe("TEST 1: When we issue a 'GET' to /patients", function(){
    it("Success at endpoint should return HTTP 200 OK", function(done) {
        chai.request('http://127.0.0.1:5000')
            .get('/patients')
            //.query()
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

describe("TEST 2: When we issue a 'GET' by id /patients/:id ", function(){
    it("Correct id should return first name Remmy for id used below", function(done) {
        chai.request('http://127.0.0.1:5000')
            .get('/patients/5fba2a3ddcf01a0a73372a1b')
            .end(function(req, res){
                var JSONObject = JSON.parse(res.text);
                console.log("The first name being tested is: "+JSONObject[0].firstName)
            expect(JSONObject[0].firstName).to.equal('Remmy');
                done();
            });
    });
});

describe("TEST 3: When we issue a wrong ID with 'GET' /patients/:id ", function(){
    it("Status code 404 Error should be returned", function(done) {
        chai.request('http://127.0.0.1:5000')
            .get('/patients/wrongId')
            .end(function(req, res){
                console.log("The status code being tested is: "+ res.status)
                expect(res.status).to.equal(404);
                done();
            });
    });
});


describe("TEST 4: When we issue a wrong ID with DEL /patients/:id ", function(){
    it("Status code 500 Error should be returned", function(done) {
        chai.request('http://127.0.0.1:5000')
            .del('/patients/wrongId')
            .end(function(req, res){
                console.log("The status code being tested is: "+ res.status)
                expect(res.status).to.equal(500);
                done();
            });
    });
});

describe("TEST 5: when we issue a 'POST' with /patients/search and firstName='Amelia'", function(){
    it("should return code 200 meaning patient found", function(done) {
        chai.request('http://127.0.0.1:5000')
        .post('/patients/search')
        .field('firstName', 'Amelia')
        .end(function(req, res){
        console.log("The status code being tested is: "+ res.status)
        expect(res.status).to.equal(200);
        done();
        });
     });
 });

 describe("TEST 6: When we issue a wrong ID with DEL /patients/:id ", function(){
    it("Status code 500 Error should be returned", function(done) {
        chai.request('http://127.0.0.1:5000')
            .put('/patients/wrongId')
            .end(function(req, res){
                console.log("The ERROR MESSEGE coming back to compare to is: "+ res.text+ res.status)
                expect(res.status).to.equal(500);
                expect(res.text).to.equal('"ID PROVIDED IS WRONG"')
                done();
            });
    });
});

describe("TEST 7: When we issue a 'GET' to find critical patients /patients/critical", function(){
    it("If any patients found with critical reading, we should get HTTP 200 OK and 'application/json' Object", function(done) {
        chai.request('http://127.0.0.1:5000')
            .get('/patients/critical')
            .end(function(req, res){
                console.log("Return object type coming in response: " + res.type + " and response status code coming back" + res.status)
                expect(res.type).to.equal('application/json')
                expect(res.status).to.equal(200)
                done();
            });
    });
});

