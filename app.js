const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
const MongoConnect = require('./util/database').mongoConnect


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
 const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65b76bb0ec7bc14fb3b43504')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Mpandey:Mpandey123@cluster0.a7i81eg.mongodb.net/shop?retryWrites=true&w=majority')
.then((result)=>{
  console.log('connected')
  User.findById().then((user)=>{
    if(!user){
      const user = new User({
        name:'max',
        email:'max@gmail.com',
        cart:{
          item:[]
        }
      })
      user.save()
    }
  })
  app.listen(3000)
}).catch((err)=>{
  console.log(err)
})


