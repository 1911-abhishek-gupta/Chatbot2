const router = require("express").Router();
const Message = require("../models/Message");
const pool = require("../models/db");

// router.post("/",async(req,res)=>{
//     const newMessage = new Message(req.body);

//     try{
//         const savedMessage = await newMessage.save();
//         res.status(200).json(savedMessage);

//     }catch(err){
//         res.status(500).json(err);
//     }
// })

// router.get("/:option",async(req,res)=>{
//     try{
//         const message = await Message.findOne({option:req.params.option});
//         res.status(200).json(message);

//     }catch(err){
//         res.status(500).json(err)
//     }
// })

router.post("/query/submit",async(req,res)=>{

    const {name,department,email,query_,desc,file} = req.body;

    try{
        const savedQuery = await pool.query("INSERT INTO queries (name,department,email,query,desc_,file) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[name,department,email,query_,desc,file]);
        res.status(200).json(savedQuery.rows[0]);
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/",async(req,res)=>{
    const {message,option,options,link} = req.body;

    try{
        const savedMessage = await pool.query("INSERT INTO messages (message,option,options,link) VALUES ($1,$2,$3,$4) RETURNING *",[message,option,options,link]);
        res.status(200).json(savedMessage.rows[0]);

    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/:option",async(req,res)=>{
    try{
        const {option} = req.params;
        const message = await pool.query("SELECT * FROM messages WHERE option = $1",[option]);
        res.status(200).json(message.rows[0]);

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router