
import { addChat, getChat, updateRoom } from "./chat.js";
const content = document.getElementById("content");
const form = document.getElementById("form");
const list = document.querySelector("#list");
const username_form = document.getElementById("username-form");
const username_input = document.getElementById("username-input");
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

let username;

if(localStorage.getItem("username")) {
    username = localStorage.getItem("username");
}
else {
    username = prompt("Enter the unique username");
    localStorage.setItem("username", username);
}

form.message.focus();

const clearChat = () => {
    content.innerHTML = "";
}

const changeCallback = (change) => {
    const data = change.doc.data();
    console.log(data);
    if(data.username === username) {
        content.innerHTML += `
            <div class="d-flex flex-row-reverse">
                <div style="max-width: 75%;">
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-info my-2">
                            <span style="font-weight: bold">You</span>: ${data.message}
                        </li>
        
                    </ul>
                </div>
            </div>
        `
    }
    else  {
        content.innerHTML += `
        <div class="d-flex">
            <div style="max-width: 75%;">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-info my-2">
                        <span style="font-weight: bold">${data.username}</span>: ${data.message}
                    </li>

                </ul>
            </div>
        </div>
        `
    }
    content.scrollTop = content.scrollHeight;
}

getChat((change)=>changeCallback(change));

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    addChat(username, form.message.value)
    .then((res)=> {
        console.log("message added successfully");
        form.reset();
    })
    .catch(err => console.log(err));
    content.scrollTop = content.scrollHeight;
});

list.addEventListener("click", (e)=>{
    let childs = list.children;
    for(let element of childs) {
        element.classList.remove("selected");
    }
    console.log(childs);
    if(e.target.tagName === "LI") {
        updateRoom(e.target.getAttribute("id"));
        console.log("in li");
        e.target.classList.add("selected");
    }
    console.log(e);
});

username_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    username = username_input.value;
    username_input.value = '';
    localStorage.setItem("username", username);
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show();
    setTimeout(() => {
        toast.hide();
    }, 2000);
});

export { changeCallback, clearChat };