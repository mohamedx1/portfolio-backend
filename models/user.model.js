const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 📌 عند تسجيل مستخدم جديد:
// new User({ password: '123456' })

// save() بينادي pre("save") hook

// password بيتشفر باستخدام bcrypt

// المستخدم بيتسجل في قاعدة البيانات بكلمة سر مشفرة

userSchema.methods.correctPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// 📌 عند تسجيل الدخول:

// المستخدم يكتب كلمة سر

// الكود ينفذ: user.correctPassword("input")

// بتتحقق الباسورد باستخدام bcrypt.compare

// بتقارن بين كلمة السر اللي دخلها المستخدم (inputPassword) وكلمة السر اللي مخزنة مشفرة (this.password).

// bcrypt.compare() بيرجع true لو الكلمتين متطابقين، و false لو مش متطابقين.

module.exports = mongoose.model("user", userSchema);
