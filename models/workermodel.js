import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  passwordHash: { type: String },
  tempString: { type: String },
});

const custodianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  passwordHash: { type: String },
  initialfund: { type: Number, default: 100 },
  fundinbox: { type: Number, default: 100 },
  tempString: { type: String },

  record: [
    {
      remaining: { type: Number, default: 0 },
      replenishment: { type: Number, default: 0 },
      date: { type: Date, default: Date.now() },
    },
  ],
});

export const Custodian = mongoose.model("custodian", custodianSchema);

export const Employee = mongoose.model("employee", employeeSchema);
