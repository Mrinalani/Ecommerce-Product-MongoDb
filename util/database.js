const mongodb  = require('mongodb')
const MongodbClient = mongodb.MongoClient;

let _db;

const MongoConnect = (callback)=>{

MongodbClient.connect('mongodb+srv://Mpandey:Mpandey123@cluster0.a7i81eg.mongodb.net/shop?retryWrites=true&w=majority')
.then((client)=>{
  console.log('connected')
  console.log('** ',client.db)
  _db = client.db()
  callback()
}).catch((err)=>{
  console.log(err)
  throw err;
})

}

const getDb = ()=>{
  if(_db){
    return _db
  }
  throw 'No DtatBase Found!'
}

exports.mongoConnect = MongoConnect;
exports.getDb = getDb;



