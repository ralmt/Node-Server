import express from "express";
import { MongoClient } from "mongodb";
import Debug from 'debug';
import sessions from '../data/sessions.json' assert {type: 'json'};

const url = 'mongodb://atlas-sql-6480bf8c43415803582c195f-8keet.a.query.mongodb.net/sample_airbnb?ssl=true&authSource=admin';
const adminRouter = express.Router();
adminRouter.route('/').get(async (req, res) => {
    const dbname = 'sample_airbnb';
    const doc = {
        id: 1,
        Atitle: "Record of a Shriveled Datum",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    let db;
    async function connectDB() {
        let client = await MongoClient.connect(url, { useNewUrlParser: true });
        db = client.db();
        console.log("Got DB");
    }
    async function newCollection() {
        let collection = db.collection('test');
        await db.collection('test').insertOne(doc);
        console.log("Created a new collection");
    }
    await connectDB();
    await newCollection();
    // console.log(db.collection(dbname));
    res.send("Connected to " + db.databaseName);
    // (async function mongo(){
    //     let client = new MongoClient(url)
    //     try{
    //         const dbname = 'sample_airbnb';
    //         const db = await client.db(dbname); 
    //         console.log('Connected to the mongo DB');
    //         const col = db.collection("listingsAndReviews");
    //         // create a document to insert
    //         const doc = {
    //             id: 1,
    //             Atitle: "Record of a Shriveled Datum",
    //             content: "No bytes, no problem. Just insert a document, in MongoDB",
    //         }
    //         col.insertOne(doc);
    //const response = await colNew.insertOne(doc);
    // const result = await haiku.insertOne(doc);
    //console.log(`A document was inserted with the _id: ${result.insertedId}`);
    //         res.send({
    //             database: db.databaseName, collections: db.collections.length, collectionName: col.collectionName});
    //         // const response = await db.collection("sessions").insertMany(sessions);
    //         // res.json(response);

    //     }
    //     catch(error){
    //         Debug(error.stack);
    //         console.log(error);
    //         res.send("Error connecting to db");
    //     }
    // }())
})

// adminRouter.route('/admin').get((req, res)=>{
//     const url ='mongodb://atlas-sql-6480bf8c43415803582c195f-8keet.a.query.mongodb.net?ssl=true&authSource=admin';
//     const dbname = 'globomantics';

//     (async function mongo(){
//         let client;
//         try{
//             client = MongoClient.connect(url);
//             Debug('Connected to the mongo DB');
//             const db = client.db(dbname);
//             const response = await db.collection("sessions").insertMany(sessions);
//             res.json(response);

//         }
//         catch(error){
//             Debug(error.stack);
//         }
//     }())

// });

export default adminRouter;