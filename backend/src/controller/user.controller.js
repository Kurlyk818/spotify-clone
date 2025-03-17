import { Message } from '../models/message.model.js';
import {User} from '../models/user.model.js'

;

export const getAllUsers = async (req, res,next) => {
    
    
    try {
        const currentUserId = req.auth.userId
        const users = await User.find({clerkId: {$ne: currentUserId}})
        res.status(200).json(users)
    } catch (err) {
        console.log(err);
        
        next(err)
    }
}


export const getMessages = async (req, res, next) => {
    try {
        const myId = req.auth.userId;
        const {userId} = req.params

        const messages = await Message.find({
            $or:[
                {senderId: userId, receiverId: myId }, 
                {senderId: myId , receiverId: userId}
            ]
        }).sort({createdAt: 1})


        res.status(200).json(messages)


    } catch (err) {
        console.log("Error in getMessages", err);
        next(err)
    }
}