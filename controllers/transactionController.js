import { Transaction } from "../models/transactionmodel.js";
import { Custodian } from "../models/workermodel.js";


export const getAllTransactions= async ()=>{

    try{
        const allworkers=await Transaction.find({}).exec();
        return allworkers;
    }
    catch(err){
         console.log("Error in getting all workers,error: >>>",err)
    }
} 

// -----request of new fund by employee------
//-----data required >> (amount,from,to,description)-----
export const requestFund =async(body)=>{
   
try{
    const newtransaction= await new Transaction(body).save()
    return newtransaction;
}
catch(err){
console.log("error in adding new transaction >>>",err);
}
}


// -----approval of fund by custodian and deducting the fund in box------
// ----data required >> (_id of transaction,amount to be deducted, name of custodian)----
export const approveFund =async(body)=>{

let filter1={name:body.custodian};
let update1={$inc:{fundinbox:-(body.amount)}}

let filter2={_id:body.id};
let update2={approved:true};

let options={new: true,useFindAndModify:false};

const custodianPromise=Custodian.findOneAndUpdate(filter1,update1,options);
const transactionPromise=Transaction.findOneAndUpdate(filter2,update2,options);

Promise.all([custodianPromise,transactionPromise])
.then((res)=>{
    console.log("fund approved",res)
    return res;
})
.catch((err)=>{
    return false;
})  
}


// -----bill submission by employee------
// ----data required  >> (_id of transaction)
export const submitBill =async (body)=>{

        let filter={_id:body.id};
        let update={bill:true};
    await Transaction.findOneAndUpdate(filter,update,{new: true,useFindAndModify:false}).then(

            (data) => {
                if (!data) {
                   console.log("error in bill submission");
                   console.log(data);
                    return false;
                }
                else{
                    console.log("bill submitted !!!",data);
                    return data
                }
                
            }).catch((err) => {
                console.log("error in bill submission >>>",err)
                return false;
                
            })
}