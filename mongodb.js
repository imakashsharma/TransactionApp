const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const CONNECTION_URL = "mongodb+srv://Amigo:123@democluster.4unbc.mongodb.net/demoDataBase?retryWrites=true&w=majority";
const DATABASE_NAME = "demoDataBase";


var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var database, collection1, collection2;

//CONNECTION START FOR BOTH SIGNIN SIGN UP AND RESUME
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection1 = database.collection("demoResume");
        console.log("Connected to `" + DATABASE_NAME + "`!");

        collection2 = database.collection("demoSignINSignUP");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

// DATA IMPORT TO LIST THE USERS
app.get("/getL", (request, response) => {
    console.log("getL")
collection2.find({}).toArray((error, result) => {
if(error) {
return response.status(500).send(error);
}
response.send(result);
});
});
app.listen(1000);