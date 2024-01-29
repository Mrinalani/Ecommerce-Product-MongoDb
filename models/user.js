const mongoose = require('mongoose');

const Schema =mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require:true,
    },
    email:{
        type: String,
        require: true,
    },
    cart: {
        item: [
            {
            productId: {type: Schema.Types.ObjectId,ref:'Product', require:true},
            quantity: {type: Number, require: true}
            }
        ]
    }
})

userSchema.methods.addToCart = function(product){
    const cartProductIndex = this.cart.item.findIndex((cp)=>{
              return cp.productId.toString() === product._id.toString();
           })
           let newQuantity = 1;
           const updatedCartItem = [...this.cart.item]
        
           if(cartProductIndex>=0){
            newQuantity = this.cart.item[cartProductIndex].quantity+1;
            updatedCartItem[cartProductIndex].quantity = newQuantity
           }else{
            updatedCartItem.push({
              productId: product._id,
              quantity: newQuantity
            })
           }
           const updatedCart = {
            item: updatedCartItem
          }
           this.cart = updatedCart;
           return this.save();
}

userSchema.methods.removeFromCart = function(productId){
    const updatedCartItem = this.cart.item.filter((item)=>{
              return item.productId.toString() !== productId.toString();
            })
            this.cart.item = updatedCartItem;
            return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {item:[] }
    return this.save()
}


module.exports = mongoose.model('User', userSchema);



// const mongodb = require('mongodb')
// const getDb = require('../util/database').getDb

// class User {
//   constructor(username, email,cart,id){
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//    save(){
//     const db = getDb();
//     return db.collection('users').insertOne(this)
//    }

//    static findById(userId){
//    const db = getDb();
//    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
//    }

//    addToCart(product){
//     const db = getDb();
//     const cartProductIndex = this.cart.item.findIndex((cp)=>{
//       return cp.productId.toString() === product._id.toString();
//    })
//    let newQuantity = 1;
//    const updatedCartItem = [...this.cart.item]

//    if(cartProductIndex>=0){
//     newQuantity = this.cart.item[cartProductIndex].quantity+1;
//     updatedCartItem[cartProductIndex].quantity = newQuantity
//    }else{
//     updatedCartItem.push({
//       productId: new mongodb.ObjectId(product._id),
//       quantity: newQuantity
//     })
//    }
//    const updatedCart = {
//     item: updatedCartItem
//   }
//    return db.collection('users')
//    .updateOne(
//      {_id: new mongodb.ObjectId(this._id)},
//      {$set: {cart: updatedCart}})
//    }

//    deleteItemFromCart(productId){
//     const updatedCartItem = this.cart.item.filter((item)=>{
//       return item.productId.toString() !== productId.toString();
//     })
//     const db = getDb();
//     return db.collection('users')
//     .updateOne(
//       {_id: new mongodb.ObjectId(this._id)},
//       {$set: {cart: {item: updatedCartItem}}}
//     )

//    }

//    getCart(){
//     const db = getDb()
//     const productIds = this.cart.item.map((i)=>{
//       return i.productId;
//     })
//     return db.collection('products').find({_id: {$in: productIds}}).toArray().then((products)=>{
//       return products.map((p)=>{
//         return {...p, quantity:this.cart.item.find((i)=>{
//             return i.productId.toString() === p._id.toString();
//           }).quantity
//         }
//       })
//     })
//    }

//    addOrder(){
//     const db = getDb();
//     return this.getCart()
//     .then((products)=>{
//       const order = {
//         item : products,
//         user:{
//           _id: new mongodb.ObjectId(this._id),
//           name: this.name
//         }
//       }
//       return db.collection('order')
//       .insertOne(order)
//     })
//     .then((result)=>{
//       this.cart = {item: []}

//       return db.collection('users')
//       .updateOne(
//         {_id: new mongodb.ObjectId(this._id)},
//         {$set: {cart: {item: []}}}
//       )
//     })
//    }

//    getOrders(){
//     const db = getDb();
//     return db.collection('order').find({'user._id': new mongodb.ObjectId(this._id)})
//     .toArray();
//    }

// }

// module.exports = User