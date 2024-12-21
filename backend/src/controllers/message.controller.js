import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/messages.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in message controller :", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const getMessages=async (req,res)=>{
    try {
        const {id:userToChat}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChat},
                {senderId:userToChat,receiverId:myId},
            ]
        });
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessage controller :", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}



export const sendMessages=async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }



       const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl
       });

       await newMessage.save();

    //    realtime functionality goes here
    const receiverSocketId=getReceiverSocketId(receiverId);
    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessage controller :", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}