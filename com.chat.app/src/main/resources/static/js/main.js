'use strict';

var usernamePage = document.querySelector("#username-page");
var cahtPage = document.querySelector("#chat-page");
var usernameForm = document.querySelector("#usernameform");
var messageForm = document.querySelector("#messageForm");
var messageInput = document.querySelector("#message");
var messageInput = document.querySelector("#messageArea");
var connectingElement = document.querySelector(".connecting");


var stompClient = null;
var username = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];


function connect(event){
    username = document.querySelector("#name").value.trim();
    if(username){
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket = new SocketJS("/ws");

        stompClient = Stopm.over(socket);

        stompClient.connect({}, onConnect, onerror);
    }
    event.preventDefault();
}

function onConnected(){
    // subscribe to the public topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // tell username to the server
    stompClient.send('/app/chat.addUser', {},
       JSON.stringify({sender: username, type: "JOIN"})
    );
    connectingElement.classList.add('hidden');
}

function onError(){
    connectingElement.textContext = 'Could not connect to WebSocket server. Please refresh this page and try again';

    connectingElement.style.color = 'red';
}

function onMessageRecieved(){
    
}

usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', sendMessage, true);