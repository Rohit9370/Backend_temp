const express = require('express');
const router = express.Router();
const Modal = require('../Modal/modal');


router.post('/', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!email || !password || !name || !phone) {
      return res
        .status(400)
        .json({ message: "Please fill all fields" });
    }

    const user = await Modal.findOne({ email });

    if (user) {
      return res.status(404).json({ message: "User already Exists!" });
    }

    const newUser = new Modal({
      name : name,
      email: email,
      password : password,
      phone: phone
    })
    const savedUser = await newUser.save();

    res.status(200).json({
      message: "Registration successful" + savedUser
    });
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;