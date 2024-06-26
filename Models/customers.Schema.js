const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 


// define the Schema (the structure of the article)
const customerSchema = new Schema({
  hotelName: String,
  code: String,
  onsiteTel: String,
  address: String,
  webSite: String,
  mewsId: String,
  am: String,
  gm: String,
  vault: String,
  policy: String
  


}, { timestamps: true });
 
 
// Create a model based on that schema
const User = mongoose.model("Customer", customerSchema);
 
 
// export the model
module.exports = User



