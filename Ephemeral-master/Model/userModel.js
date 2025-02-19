const mongoose = require('mongoose');

// below has been moved to server (app.js)
// require('dotenv');

// const MONGO_URI = process.env.MONGO_URI;

// mongoose.connect(MONGO_URI, {
//   // options for the connect method to parse the URI
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(()=>console.log('Connected to Mongo DB.'))
// .catch(err=>console.log(err));

const Schema = mongoose.Schema;

const ObjectIdSchema = Schema.ObjectId;
const ObjectId = mongoose.Types.ObjectId;

// user schema --> holds topics (categories) & saved articles for individual users

const userSchema = new Schema({
  //_id: { type: ObjectIdSchema, default: function () { return new ObjectId() } },
  uid: String,
  topics: [
    {
      type: String
    }
  ],
  savedArticles: [
    {
      type: String
    }
  ],
})

const User = mongoose.model('user', userSchema);

// resources schema --> holds all the api keys for multiple sources

const resourcesSchema = new Schema({

})

const Resources = mongoose.model('resource', resourcesSchema);

module.exports = {
  User,
  Resources,
}