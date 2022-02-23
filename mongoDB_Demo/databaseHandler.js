const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://tommy:123456abc@cluster0-shard-00-00.lkrga.mongodb.net:27017,cluster0-shard-00-01.lkrga.mongodb.net:27017,cluster0-shard-00-02.lkrga.mongodb.net:27017/NoSQLBoosterSamples?authSource=admin&replicaSet=Cluster0-shard-0&ssl=true';
const databaseName = 'GCH0904_DB'

async function deleteDocumentById(collectionName,id){
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).deleteOne({_id: ObjectId(id)})
}

//myquery: dieu kien update(id=...); newvalues: gia tri moi can update
async function updateCollection(collectionName, myquery, newvalues) {
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).updateOne(myquery, newvalues)
}

async function getDocumentById(collectionName, id){
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    return await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
}

async function insertObject(collectionName, newP) {
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).insertOne(newP)
}

async function findCommentById(id){
    const  collectionName = 'comments'
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    return  await dbo.collection(collectionName).find({productId:id}).toArray()
}

async function getAllFromCollection(collectionName){
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    return await dbo.collection(collectionName).find({}).toArray()
}

module.exports = {findCommentById,insertObject,getAllFromCollection,getDocumentById,updateCollection,deleteDocumentById}