
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title:{
    type:String,
    require:true
  },
  price:{
    type:Number,
    require:true
  },
  description:{
    type:String,
    require:true
  },
  imageUrl:{
    type:String,
    require:true
  },
  userId:{
    type:Schema.Types.Object,
    ref: 'User',
    require: true
  }
})

module.exports = mongoose.model('Product', productSchema)
















// const mongoDb = require('mongodb')
// const getDb = require('../util/database').getDb

// class Product {
//   constructor(title,price,description,imageUrl,id, userId){
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//    this._id = id ? new mongoDb.ObjectId(id) : null;
//    this.userId = userId
//   }
//   save(){
//     const db = getDb();
//     let dbOp;
//     if(this._id){
//       dbOp = db
//       .collection('products') 
//       .updateOne({ _id: this._id }, { $set: this });
//       //update
//     }else{
//      dbOp = db.collection('products').insertOne(this)
//     }
//     return dbOp
//     .then((result)=>{
//       console.log(result)
//     }).catch((err)=>{
//       console.log(err)
//     })
//   }

//   static fetchAll(){
//     const db = getDb();
//     return db.collection('products')
//     .find()
//     .toArray()
//     .then((products)=>{
//     console.log(products)
//     return products
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   static findById(prodId){
//     const db = getDb();
//     return db
//     .collection('products')
//     .find({_id: new mongoDb.ObjectId(prodId) })
//     .next()
//     .then((product)=>{
//       console.log(product)
//       return product
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   static deleteById(prodId){
//   const db = getDb();
//   return db
//   .collection('products')
//   .deleteMany({_id: new mongoDb.ObjectId(prodId) })
//   .then((result)=>{
//    console.log('deleted')
//   })
//   .catch((err) => {
//     console.log('Error deleting document:', err);
//   });
// }
// }


// module.exports = Product;
