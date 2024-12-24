const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to Product model
    },
  ],
});

// Encrypt the password before storing
userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// Validate the password
userSchema.methods.validPassword = function (candidatePassword) {
  if (this.password != null) {
    return bcrypt.compareSync(candidatePassword, this.password);
  } else {
    return false;
  }
};

// Export the user model
module.exports = mongoose.model("User", userSchema);
