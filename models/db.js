const mongoose = require('mongoose');
const bmiSchema = new mongoose.Schema(
    {
        gender:{type: 'string', required: true},
        height:{type: 'number', required: true},
        weight:{type: 'number', required: true},
        bmi:{type: 'number', required: true},
        bmi_category:{type: 'string', required: true},
        health_risk:{type: 'string', required: true}
    }
)



const bmis = mongoose.model("bmis",bmiSchema)
module.exports = bmis;
