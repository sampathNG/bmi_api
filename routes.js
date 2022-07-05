const express = require('express');
const con = require('./models/config');
const router = express.Router()
const bmis = require('./models/db')
router.post("/",async(req,res) => {
    try {
        const bmi= req.body.weight/((req.body.height/100)*(req.body.height/100));
        const bmi_categ = ["Underweight"," Normal weight"," Overweight ","Moderately obese"," Severel obese"," Very severely obese "]
        const health_risk = ["Malnutrition risk","Low risk","Enhanced risk","Medium risk","High","Very high risk"]
        var bmic
        var health_r
        if(bmi<=18.4){
            bmic = bmi_categ[0];
            health_r = health_risk[0];
        }else if(bmi>18.4 & bmi<=24.9){
            bmic = bmi_categ[1];
            health_r = health_risk[1];
        }else if(bmi>24.9 & bmi<=29.9){
            bmic = bmi_categ[2];
            health_r = health_risk[2];
        }else if(bmi>29.9 & bmi<=34.9){
            bmic = bmi_categ[3];
            health_r = health_risk[3];
        }else if(bmi>34.9 & bmi<=39.9){
            bmic = bmi_categ[4];
            health_r = health_risk[4];
        }else{
            bmic = bmi_categ[5];
            health_r = health_risk[5];
        }
        const bmii = new bmis({
            gender:req.body.gender,
            height:req.body.height/100,
            weight:req.body.weight,
            bmi:req.body.weight/((req.body.height/100)*(req.body.height/100)),
            bmi_category:bmic,
            health_risk:health_r
        })
        await bmis.insertMany(bmii);
        console.log("data added");
        res.send("data added")
    } catch (error) {
        res.send({error: error.message})
        console.error(error)
    }
})

router.get("/",async (req, res) => {
    try {
        const data = await bmis.find()
        res.send(data)
        console.log(data)
    } catch (error) {
        res.send({error: error.message}),
        console.error(error)
    }
})

// COUNT OVER WEIGHT PEOPLE
router.get("/w",async (req, res) => {
    try {
        var count = 0
        const data = await bmis.find()
        for(var i = 0; i < data.length; i++) {
            var x = data[i].bmi
            if (x > 24.9){
                count ++
            }
        }
        res.send(count.toString())
        console.log(count)
    } catch (error) {
        res.send({error: error.message}),
        console.error(error)
    }
})

router.delete("/",async (req, res) => {
    try {
        const data = await bmis.deleteMany()
        res.send("deleted")
        console.log("deleted")
    } catch (error) {
        res.send({error: error.message}),
        console.error(error)
    }
})



module.exports =router
