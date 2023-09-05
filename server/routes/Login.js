const router = require("express").Router();
const User = require("../models/Users");
const pool = require("../models/db");


// router.post("/",async(req,res)=>{
//    const newUser = new User(req.body);

//    try{
//     const savedUser = await newUser.save();
//     res.status(200).json(savedUser);
// }catch(err){
//     res.status(500).json(err);
// }
// })

// router.get("/:phone",async(req,res)=>{
//     try{
//         const user = await User.findOne({phone:req.params.phone});
//         res.status(200).json(user);

//     }catch(err){
//         res.status(500).json(err);
//     }
// })

router.post("/",async(req,res)=>{
    
    try{
     const {name,phone,email,department} = req.body;
     const savedUser = await pool.query("INSERT INTO users (name,phone,email,departement) VALUES ($1,$2,$3,$4) RETURNING *",[name,phone,email,department]);
     res.status(200).json(savedUser.rows[0]);
 }catch(err){
     res.status(500).json(err);
 }
 })

 router.get("/:email",async(req,res)=>{
    try{
        const {email} = req.params;
        const user = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
        res.status(200).json(user.rows[0]);

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;