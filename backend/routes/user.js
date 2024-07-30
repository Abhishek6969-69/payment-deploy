const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db/schema");

const router = express.Router();
const emailschema = zod.string().email();
const passwordschema = zod.string().min(6);

router.post("/signup", async function (req, res) {
  
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const emailresponse = emailschema.safeParse(email);
  const passwordresponse = passwordschema.safeParse(password);
  console.log(emailresponse)
  if (!emailresponse.success || !passwordresponse.success) {
  return  res.status(411).send("incorrect input/email already taken");
  }
  
  
  const dbuser = await User.create({
   
    password: password,
    email: email,
    firstname: firstname,
    lastname: lastname,
  });
  const userid = dbuser._id;
  await Account.create({
    userid,
    balance:1+Math.random()*10000
  })
  const token = jwt.sign({ userid }, JWT_SECRET);
  return res.send({ msg: "user is saved succesfully", token });
});
router.put("/", async function (req, res) {
  await User.updateOne(req.body, {
    id: req.userid,
  });
 return  res.json({
    msg: "updated successfully",
  });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log(email,"uuuuu")
  try {
    const user = await User.findOne({ email,password });
    if (!user) {
      return res.status(404).send("User not found");
    }

   

    const userid = user._id;
    
    const token = jwt.sign({ userid }, JWT_SECRET);
    
    return res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


   router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || " ";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
 return  res.json({
  user: users.map(user => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id
  }))
})
})
module.exports = router;
