import mongoose from 'mongoose'

export const connectDatabase = (req, res)=>{
    mongoose
        .connect(process.env.MONGO_URI)
        .then((req, res) => {
            console.log("MongoDb connected Successfully");
        })
        .catch((req, res) => {
            "Error in mongodb";
        });
}
