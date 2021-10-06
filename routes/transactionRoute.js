import express from "express";

import { getAllTransactions,requestFund,approveFund,submitBill} from "../controllers/transactionController.js";

export const trouter =express.Router();

trouter.get("/all",async (req,res)=>{

const data= await getAllTransactions();

if(data){
    return  res.status(200).send({msg:"transaction data fetched",data})
    } 
else{
 return res.status(404).send({msg:"data not found"});
}
})


// ---- creating fund request------
// ---- new transaction in created in this request----
//-----data required >> (amount,from,to,description)-----

trouter.post("/request-fund",async(req,res)=>{

      const newtransaction =await requestFund(req.body);

     if(newtransaction){
         return  res.status(200).send({msg:"fund request created",data:newtransaction})
    } 
     else{
         return res.status(404).send({msg:"error in creating fund request"});
    }

    })

// ---- approval of fund request------
// ----data required >> (_id of transaction,amount to be deducted, name of custodian)----


trouter.patch("/approve-fund",async(req,res)=>{

    const fundApproved =approveFund(req.body);

   if(fundApproved){
       return  res.status(200).send({msg:"fund approved",data:fundApproved})
  } 
   else{
       return res.status(404).send({msg:"error in approving fund"});
  }

  })

// ----submission of bill by employee------
// ----data required  >> (_id of transaction)----

trouter.patch("/submit-bill",async(req,res)=>{

    const billSubmitted = submitBill(req.body);

   if(billSubmitted){
       return  res.status(200).send({msg:"bill submitted",data:billSubmitted})
  } 
   else{
       return res.status(404).send({msg:"error in submitting bill"});
  }

  })