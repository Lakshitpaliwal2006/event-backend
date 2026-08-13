import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { User } from "./Models/User.models.js"
import Finance from "./Models/Finance.model.js"
import dotenv, { configDotenv } from "dotenv"
import SendMail from "./Mail/SendMail.Mail.js";
import { toast } from "sonner";
const app = express();
dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

const connectDB = async () => {
        try {
            if (mongoose.connection.readyState === 1) {
            return;
        }
                await mongoose.connect(`${MONGODB_URL}/register`);
                console.log("MongoDB connected successfully");
            } catch (error) {
                    console.error("MongoDB Connection Error:", error.message);
                    throw error;
                }
            };
            connectDB();

app.get('/', (req, res) => {
    res.send("This is Home Page");
})

app.post("/register", async (req, res) => {
    console.log("Registered API called");
    console.log(req.body);

    try {
        const newUser = await User.create(req.body);
        const { name, email, password } = await newUser.toObject()
        const ExistUser = await User.findOne({ email: email })
        console.log(newUser);
        if (ExistUser) {
            toast.warning("User already Logged In")
        }
        else {
            res.status(201).json({
                message: "Success",
                user: newUser
            });
            toast.success('Account created successfully!')
        }
    } catch (error) {
        console.log("Error:", error);

        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

app.get('/finance', async (req, res) => {
    try {
        
        const response = await Finance.find({})
        res.json(response)
    } catch (error) {
        console.log("Error:", error);

        res.status(500).json({
            message: "Some Error in Fetching Data",
            error: error.message
        });
    }
})
app.get('/connect', async (req,res) =>{
    const connectDatabase = await connectDB;
    return res.json({
        message:connectDatabase
    })
})
app.get('/test', (req,res) => {
    res.send("Test Route is Working")
})
function GenerateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}
const OTP = GenerateOTP();
app.post('/sendotp', async (req, res) => {
    const email = req.body;
    await SendMail(email, OTP)
    // console.log(email)
    res.json({
        status: 200,
        message: "Email has been Successfully received"
    })
})
app.post('/verifyotp', async (req, res) => {
    try {
        const getOTP = req.body;
        const storedotp = OTP;
        console.log(getOTP.otp)
        console.log(storedotp)
        // console.log(getOTP);

        if (getOTP.otp == storedotp) {
            res.json({ success: true })
        }
        else {
            res.json({ success: false })
        }
    } catch (error) {
        console.log("error on sending OTP", error)
    }
})

            

            
            export default app;

            // const StartServer = async () => {
            //     try {
            //         await mongoose.connect(`${MONGODB_URL}/register`);
            //         console.log("Mongoose Connected Successfully");
            
            //         app.listen(process.env.PORT_NO, () => {
            //             console.log(`Server is listening on port ${process.env.PORT_NO}`);
            //         });
            
            //     } catch (error) {
            //         console.log("MongoDB Connection Error:", error.message);
            //         process.exit(1);
            //     }
            // };
            // export default StartServer()