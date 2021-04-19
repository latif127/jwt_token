//URL: Node.js API Authentication With JSON Web Tokens

const express = require("express");  
const jwt = require("jsonwebtoken");  



const app = express(); 
app.get('/api',(req, res) => {  
    res.json({   
        message: 'Welcome to the API!',  
    });  
}); 

app.post('/api/Login',(req, res) => {  
    //Mock user  
    const user ={  
        username: 'Latif',  
        email: 'Latif@gmail.com'  
    }  
    jwt.sign({user:user},'secretkey',{expiresIn: '30s'},(err,token)=>{  
        res.json({token})  
    })  
}) 

function verifyToken(req, res,next) {  
    //Get Auth header value  
    const bearerHearder = req.headers['authorization'];  
    //check if bearer is undefined  
    if(typeof bearerHearder != 'undefined'){  
        //split at the space  
        const bearer = bearerHearder.split(' ');  
        //Get the token from array  
        const bearerToken = bearer[1];  
        // set the token  
        req.token = bearerToken;  
        //Next middleware  
        next();  
  
    }else{  
        //Forbidden  
        res.sendStatus(403);  
    }  
}  

// Post to Validate the API with jwt token  
app.post('/api/validate',verifyToken,(req, res)=>{  
    jwt.verify(req.token,'secretkey',(err,authData)=>{  
        if(err){  
            res.sendStatus(403);  
        }else{  
            res.json({  
                message: 'Validated',  
                authData  
            });  
        }  
    });  
});  

app.listen(5000,()=>console.log('listening on port 5000')); 
