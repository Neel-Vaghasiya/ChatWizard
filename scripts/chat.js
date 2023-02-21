import { db } from "./connection.js";
import { changeCallback, clearChat } from './app.js'

let room = "General";
const now = new Date();

let chatObj = {
    created_at: firebase.firestore.Timestamp.fromDate(now)
};

const chats = db.collection('chat');

const addChat = async (username, msg) => {
    chatObj["room"] = room;
    chatObj["message"] = msg;
    chatObj["username"] = username;
    console.log(chatObj);
    const res = await chats.add(chatObj);
    return res;

}

let unsub;

const getChat = (callback)=>{
    unsub = chats
    .where("room", "==", room)
    .orderBy("created_at")
    .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            callback(change);
        });
    });
}

const updateRoom = (newRoom)=> {
    room = newRoom;
    if(unsub) {
        unsub();
    }
    clearChat();
    getChat(change => changeCallback(change));
}

export { addChat, getChat, updateRoom };