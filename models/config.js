const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const mongoose = require("mongoose")

mongoose.connect(process.env.DB, { useNewUrlParser: true ,
useUnifiedTopology: true})
const con = mongoose.connection

con.on('open', (err) => {
    if (err) {
        console.log(err)
    }else{
    console.log('connected....DB');
    }
})

if(con){
    console.log("connected successfully")
}
else{
    console.log("not connected")
}
module.exports = con;