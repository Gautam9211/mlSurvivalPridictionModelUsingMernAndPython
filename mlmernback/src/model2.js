const express  = require('express');
const app = express();
const port  = process.env.PORT || 9000;
var cors = require('cors')
var path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
 });

app.get('/',(req,res)=>{
     res.send("this is home")
})
app.post('/data',(req,res)=>{
    try{        
        const allEntry = req.body.data
        console.log( typeof allEntry)
        const ePassengerId =  parseFloat(allEntry[0]["ePassengerId"]) 
        const Pclass = parseFloat( allEntry[0]["Pclass"])
        const Sex = allEntry[0]["Sex"]
        const Age = parseFloat(allEntry[0]["Age"])
        const SibSp = parseFloat(allEntry[0]["SibSp"])
        const Parch = parseFloat(allEntry[0]["Parch"])
        const Fare = parseFloat(allEntry[0]["Fare"])
        const Embarked_S = parseFloat(allEntry[0]["Embarked_S"])
        const Embarked_C = parseFloat(allEntry[0]["Embarked_C"])
        const Embarked_Q = parseFloat(allEntry[0]["Embarked_Q"])
        let Sex_male;
        let Sex_female;
        if (Sex =='Male'){
            Sex_male=1
            Sex_female=0
        }
        else{
            Sex_male=0
            Sex_female=1
        }
        console.log(ePassengerId,Pclass,Sex_male,Sex_female,Age,SibSp,Parch,Fare,Embarked_S,Embarked_C,Embarked_Q)
        console.log('ML model connecting')
        const {spawn} = require("child_process")
        const childPython = spawn('python',["src/check.py",ePassengerId,Pclass,Sex_male,Sex_female,Age,SibSp,Parch,Fare,Embarked_S,Embarked_C,Embarked_Q])

        childPython.stdout.on('data',(data) =>{
            console.log(`stdData: ${data}`)
            res.send(data)
    
        })

        childPython.stderr.on('data',(data) =>{
            console.error(`stderr: ${data}`)
        })

        childPython.on('close',(code) =>{
            console.log(`code: ${code}`)
        })

        }

   catch(err){
          res.status(400).send({"message" : "Error 400"})
          
    }
})



app.listen(port,()=>{
    console.log(`this app is listening port ${port}`)

})



