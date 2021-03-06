const { ObjectId,MongoClient } = require('mongodb');


var url = 'mongodb://tommy:123456abc@cluster0-shard-00-00.lkrga.mongodb.net:27017,cluster0-shard-00-01.lkrga.mongodb.net:27017,cluster0-shard-00-02.lkrga.mongodb.net:27017/NoSQLBoosterSamples?authSource=admin&replicaSet=Cluster0-shard-0&ssl=true';
const databaseName = 'GCH0904_DB'

async function insertObject(collectionName, newP) {
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    await dbo.collection(collectionName).insertOne(newP)
}

async function findUserByName(userName){
    let client = await MongoClient.connect(url)
    let dbo = client.db(databaseName) //GCH0904_DB: ten database
    const collectionName = "users"
    const result = await dbo.collection(collectionName).findOne({'name':userName})
    return result
}

module.exports = {insertObject,findUserByName}