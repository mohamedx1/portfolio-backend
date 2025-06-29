const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const newMseeage = await Message.create({
      name,
      email,
      subject,
      message,
    });
    res.status(201).json(newMseeage);
  } catch (error) {
    console.log(`error in send message ${error}`);
  }
};

exports.getAllMesages = async (req, res) => {
  try {
    const allMesages = await Message.find();
    res.status(200).json(allMesages);
  } catch (error) {
    console.log(`error in get messages ${error}`);
  }
};
