import{ Custodian,Employee} from "../models/workermodel.js"

import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken";


// ----sign up of custodian----

export const addCustodian =async(body)=>{

    const userSigningUp=await Custodian.findOne({name:body.name});

    if(userSigningUp){
        console.log("custodian name taken");
        return false;
    }

const add={name:body.name,email:body.email,role:body.role,passwordHash:body.passwordHash,intitialfund:body.intitialfund,fundinbox:body.fundinbox}
    try{
        const newWorker = await new Custodian(add).save();
        return newWorker;
    }
    catch(err){
        console.log("Error in adding newcustodian,error: >>>",err);
    }
        
}

// ----sign up of employee----

export const addEmployee =async(body)=>{

    const userSigningUp=await Employee.findOne({name:body.name});

    if(userSigningUp){

        console.log("employee name taken",userSigningUp);
        return false;
    }

    const add={name:body.name,email:body.email,role:body.role,passwordHash:body.passwordHash}
    try{
        const newWorker = await new Employee(add).save();
        return newWorker;
    }
    catch(err){
        console.log("Error in adding new employee,error: >>>",err);
    }
        
}

// -----log in of employee-----

export const employeeLogin =async (body)=>{

    const userLoggingIn= await Employee.findOne({name:body.name});

    if(!userLoggingIn){
        console.log("---- employee not found----");
        return false;
    }
    const isMatch=await bcrypt.compare(body.password,userLoggingIn.passwordHash);

   
    if(!isMatch)
    {
     
        console.log("---- invalid credentials----");
       return false;
      
    }
    const token=jwt.sign({id:userLoggingIn._id},process.env.JWT_KEY);

    let data={name:userLoggingIn.name,email:userLoggingIn.email,token,role:userLoggingIn.role,message:"login success"};
    console.log("---- successful login of employee----");
    return data;
}

// -----log in of custodian-----

export const custodianLogin =async (body)=>{

    const userLoggingIn= await Custodian.findOne({name:body.name});

    if(!userLoggingIn){
        console.log("---- custodian not found----");
        return false;
    }
    const isMatch=await bcrypt.compare(body.password,userLoggingIn.passwordHash);

   
    if(!isMatch)
    {
     
        console.log("---- invalid credentials----");
       return false;
      
    }
    const token=jwt.sign({id:userLoggingIn._id},process.env.JWT_KEY);

    let data={name:userLoggingIn.name,email:userLoggingIn.email,token,role:userLoggingIn.role,message:"login success"};
    console.log("---- successful login of custodian----");
    return data;
}


// ---- replenish fund in custodian's account and also record the same----
// data required >> (custodian name,remaining amount,replenish amount)

export const replenishFund =async(body)=>{

let filter={name:body.name};
let options={new: true,useFindAndModify:false};

let recordData={remaining:body.remaining,replenishment:body.replenishment}
let update1={fundinbox:body.replenishment};
let update2={$push :{record:recordData}};

let promise1=Custodian.findOneAndUpdate(filter,update1,options)
let promise2=Custodian.findOneAndUpdate(filter,update2,options)

Promise.all([promise1,promise2])
.then((res)=>{
    console.log("fund replenished and recorded",res)
    return res;
})
.catch((err)=>{
    console.log("fund is not replenished and recorded",err)
    return false;
})

}

