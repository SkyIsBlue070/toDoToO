const router = require("express").Router();
const user = require("../models/User");

const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");

// Sign In API
router.post("/sign-in", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await user.findOne({ username });
        const existingEmail = await user.findOne({ email });

        // Check Valid Conditions For Username
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists!" });
        } else if (username.length < 5) {
            return res.status(400).json({ message: "Username should be at least 5 characters long!" });
        }

        // Check Valid Conditions For Email
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        //Encrypting Password:
        const hashPassword = await bcrypt.hash(req.body.password,10);

        const newUser = new user({ username: req.body.username, email: req.body.email, password: hashPassword });
        await newUser.save();
        return res.status(200).json("Signed In Successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Login 
router.post("/log-in", async (req, res) =>{
    const { username,password } = req.body;
    const existingUser = await user.findOne({ username: username });
    if (!existingUser) {
        return res.status(400).json({ message: "Incorrect username or password!" });
    } 
    bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
            const authClaims=[{name: username},{jti: jwt.sign({},"tcmTM")}];
            const token= jwt.sign({authClaims},"tcmTM",{expiresIn: "2d"});
            res.status(200).json({id: existingUser._id, token: token});
        }
        else{
            return res.status(400).json({ message: "Incorrect username or password!" });
        }
    });

});


module.exports = router;





// {
//     "username": "yourUsername1234",
//     "email": "yourEmail@example.com",
//     "password": "yourPassword"
// }

// {
//     "username" :"yourUsername1234",
//     "password": "yourPassword"
// }