import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore =create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUser: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },


    getMessage: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
            // console.log(messages);
            
        } catch (error) {
            toast.error(error.message);
            console.log("error in getMessage Controller",error.message);
            
        } finally {
        } set({ isMessagesLoading: false });

    },


    sendMessages:async(messageData)=>{
        const {selectedUser,messages}=get()
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    // todo :optimize this
    subscribeToMessages:()=>{
        const {selectedUser}=get()
        if(!selectedUser)return;
        const socket=useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId !== selectedUser._id) return;
            set({
                messages:[...get().messages,newMessage]
            })
        })
    },


    unSubscribeToMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser)=>{
        set({selectedUser})
    }

}))