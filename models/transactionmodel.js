import mongoose from "mongoose";

const transactionSchema= new mongoose.Schema({
        
            amount:{type:Number,required:true},
            description:{type:String,required:true},
            from:{type:String,required:true},
            to:{type:String,required:true},
            approved:{type:Boolean,default:false},
            bill:{type:Boolean,default:false},
            date:{type:Date,default:Date.now()},
})

export const Transaction = mongoose.model("transaction",transactionSchema);
