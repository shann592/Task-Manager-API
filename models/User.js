const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      validate: {
        validator: function (email) {
          return isEmail(email);
        },
        message: "Email is invalid",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
    },
  },
  { timestamps: true }
);

// mongoose middleware
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// instance method
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

userSchema.methods.validatePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
