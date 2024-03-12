import express from "express";

const router = new express.Router();


router.get("/code", (req,res,next) =>{
    res.send("12345")
})


export default router;
