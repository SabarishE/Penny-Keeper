import express from "express";
import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken";


import { transporter } from "../nodemailer.js";

import {addCustodian,addEmployee,employeeLogin,custodianLogin,replenishFund} from "../controllers/workerController.js"
import { Employee,Custodian } from "../models/workermodel.js";


export const wrouter =express.Router();


// -------signup of a new user (custodian or employee)------- 

wrouter.post("/signup",async(req,res)=>{

    const adduser=req.body ;
    console.log("signup alert!!!",adduser);
    
    const salt=await bcrypt.genSalt(10);
    const passwordHash =await bcrypt.hash(adduser.password,salt);

    if(adduser.role=="employee"){

         const newemployee = await addEmployee({...adduser,passwordHash});

         if(newemployee){
            return  res.status(200).send({msg:"new employee added",data:newemployee
        })
                } 
        else{
            return res.status(404).send({msg:"error in adding new employee"});
        }
    }
    else{
        const newcustodian =await addCustodian({...adduser,passwordHash});

        if(newcustodian){
            return  res.status(200).send({msg:"new custodian added",data:newcustodian})
            } 
        else{
         return res.status(404).send({msg:"error in adding new custodian"});
        }
    }
})


// -------- login of existing user ---------

wrouter.post("/login",async(req,res)=>{

console.log("login alert !!!")

if(req.body.role=="employee"){

    const employee= await  employeeLogin(req.body);

    if(employee){
        res.status(200).send({msg:"successfull login of employee",data:employee})
    }
    else{
        res.status(500).send({msg:"error in log in of employee"})
    }

}

else{

    const custodian= await  custodianLogin(req.body);

    if(custodian){
        res.status(200).send({msg:"successfull login of custodian",data:custodian})
    }
    else{
        res.status(500).send({msg:"error in log in of custodian"})
    }
}
      
})


// ----replenish fund in custodian's box and record the replenishment----
// data required >> (custodian name,remaining amount,replenish amount)

wrouter.patch("/replenish-fund",async (req,res)=>{

    const fundReplenished= replenishFund(req.body);
    
if(fundReplenished){
    return  res.status(200).send({msg:"fund replenished",data:fundReplenished})
        } 
else{
    return res.status(404).send({msg:"error in replenishing fund"});
}
})



// -----Password reset flow starts-------



// --------------Password Reset Flow Starts------------

// ------sending one time link to user's mail to change password -----

wrouter.post("/forgotpwd",async(req,res)=>{

    console.log("forgot pwd alert !!!");

if(req.body.role=="employee"){

// -----forgot password for employee-----

    const pwdrequester= await Employee.findOne({email:req.body.email});
   
    if(!pwdrequester){
 return res.status(400).send({msg:"invalid credentials"});
    }
     const secretKey= pwdrequester.passwordHash;
  
      const payload={email:pwdrequester.email}
  
      const token =jwt.sign(payload,secretKey);
  
        Employee.findOneAndUpdate({email:req.body.email},{tempString:secretKey},{new: true,useFindAndModify: false})
        .then((x)=>console.log("user details with string update>>>>>",x))
      
    //   ---creating and sending one time link---
  
       const base =req.body.link
       const link= base+"/"+"employee"+"/"+pwdrequester.email+"/"+token;


       var mailOptions = {
        from: 'one.trial.one.trial@gmail.com',
        to:"one.trial.one.trial@gmail.com" ,
        subject: 'Password reset link from Penny Keeper',
        html:`<h3>Verification Link from Penny Keeper</h3><p>${link}</p>
        <p>Regards,<br>Penny Keeper,Your petty cash manager</p>`

      };
  
      transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  });
  
  
      console.log("one time link >>>>",link);
     return  res.send({onetimelink:link,email:pwdrequester.email,msg:"verification link sent to your email"});
}
else{
// -----forgot password for custodian-----

const pwdrequester= await Custodian.findOne({email:req.body.email});
   
if(!pwdrequester){
return res.status(400).send({msg:"invalid credentials"});
}
 const secretKey= pwdrequester.passwordHash;

  const payload={email:pwdrequester.email}

  const token =jwt.sign(payload,secretKey);

    Custodian.findOneAndUpdate({email:req.body.email},{tempString:secretKey},{new: true,useFindAndModify: false})
    .then((x)=>console.log("user details with string update>>>>>",x))
  
//   ---creating and sending one time link---

   const base =req.body.link
   const link= base+"/"+pwdrequester.role+"/"+pwdrequester.email+"/"+token;


  console.log("one time link >>>>",link);

var mailOptions = {
    from: 'one.trial.one.trial@gmail.com',
    to:"one.trial.one.trial@gmail.com" ,
    subject: 'Password reset link from Penny Keeper',
    html:`<h3>Verification Link from Penny Keeper</h3><p>${link}</p>
    <p>Regards,<br>Team Penny Keeper,Your petty cash manager</p>`
};

  transporter.sendMail(mailOptions, function(error, info){
if (error) {
console.log(error);
} else {
console.log('Email sent: ' + info.response);
}
});



  return res.send({onetimelink:link,email:pwdrequester.email,msg:"verification link sent to your email"});
}

  
  //-----sending one time link through mail using "nodemailer"
  
  
//       var mailOptions = {
//         from: 'one.trial.one.trial@gmail.com',
//         to:pwdrequester.email ,
//         subject: 'Password reset link from Bill Box',
//         html:`<h3>Verification Link from Bill Box</h3><p>${link}</p>
//         <p>Regards,<br>Team BillBox</p>`

//       };
  
//       transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
//   });
  
  
//       res.send({onetimelink:link,email:pwdrequester.email});

  
  });
  
//   --------verifying the token received-------
  
  wrouter.get("/resetpwd/:role/:email/:token",async(req,res)=>{

    console.log("reset pwd alert GET !!!");
  
  const {role,email,token}=req.params;

  if(role=="employee")
  {
    const pwdrequester= await Employee.findOne({email});
  
    //----- Verification of received JWT token ------

  jwt.verify(token,pwdrequester.tempString,async(err,data)=>{

      if(err){
          res.status(403).send({msg:"Request Forbidden"})
          console.log("access forbidden")
      }
      else{
          console.log("password change allowed!!!",data);
          res.send({msg:"Request Accepted",data:pwdrequester})
      }
  });

  }
  else{

    const pwdrequester= await Custodian.findOne({email});
  
    //----- Verification of received JWT token ------

  jwt.verify(token,pwdrequester.tempString,async(err,data)=>{

      if(err){
          res.status(403).send({msg:"Request Forbidden"})
          console.log("access forbidden")
      }
      else{
          console.log("password change allowed for custodian!!!",data);
          res.send({msg:"Request Accepted",data:pwdrequester})
      }
  });

  }
});
  
  //---------- new password post and update -----------
  
   wrouter.post("/resetpwd/:role/:email/:token",async(req,res)=>{
  
 console.log("reset pwd alert POST !!!");

    const salt=await bcrypt.genSalt(10);
    const passwordHash =await bcrypt.hash(req.body.pwd,salt);

    if(req.params.role=="employee")
     {
                Employee.findOneAndUpdate({email:req.params.email},{passwordHash,tempString:""},{new: true,useFindAndModify: false})
              
              .then((m) => {
                  if (!m) {
                      console.log("error in password change");
                      return res.status(404);
                  }
                  else{
                      res.send({msg:"Password Changed Successfully"});
                      console.log("password changed",m)
                  }
                })
     }
    else{
                Custodian.findOneAndUpdate({email:req.params.email},{passwordHash,tempString:""},{new: true,useFindAndModify: false})
              
              .then((m) => {
                  if (!m) {
                      console.log("error in password change");
                      return res.status(404);
                  }
                  else{
                      res.send({msg:"Password Changed Successfully"});
                      console.log("password changed",m)
                  }
                })
}
});
