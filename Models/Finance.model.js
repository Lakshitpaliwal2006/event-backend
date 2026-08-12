import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
  {
    Date: {
      type: Date,
      required: true,
    },
    TransactionDescription: {
      type: String,
      required: true,
      trim: true,
    },
    Category: {
      type: String,
      required: true,
      trim: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Type: {
      type: String,
      enum: ["Income", "Expense"],
      required: true,
    },
    ExpenditureAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Finance = mongoose.model("Finance", financeSchema);
export default Finance;
