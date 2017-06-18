var database = firebase.database();

function init()
{
    expressionListener();
}

function expressionListener(){
    firebase.database().ref('tv/expression').on('value',function(snapshot){
        showExpression(snapshot.val());
    });
}

function gestureListener()
{
    firebase.database().ref('tv/gesture').on('value',function(snapshot){
        processExpression(snapshot.val());
    });
}

function sendExpression(userID, expr, gaze){
    database.ref('User/'+userID+'/ID').set({userID});
    database.ref('User/'+userID+'/Expression').set({expr});
    database.ref('User/'+userID+'/Gaze').set({gaze});
}

//chatWork
function sendChat(userID, chat){
    if(event.keyCode == 13){
        database.ref('ChatLog/'+userID).push({chat});
        document.getElementById(userID).value ='';
    }
}

function catchExpression(userID){
    database.ref('User/'+userID).set({Expression:expr});
}

function HelloWorld(message, id){
    firebase.database().ref('Hello/'+id).set({Name:message});
}


function processGesture(gesture)
{
    //adjust volume by the gesture
    var newVolume
    switch(gesture)
    {
        case 'up':
            newVolume = player.getVolume()+1;
            if(newVolume>100)
                newVolume = 100;
            player.setVolume(newVolume);
        break;
        case 'down':
            newVolume = player.getVolume()-1;
            if(newVolume<0)
                newVolume = 0;
            player.setVolume(newVolume);
        break;
    }
}


function processExpression(expression)
{
    //console.log(expression);
    //show icon of expression
}



$('#controller-checkbox').checkbox().first().checkbox({
onChange: function() {
isController = !isController;
console.log(isController);
}
});
var exprRef = firebase.database().ref('User/103087087/Expression');
var idRef = firebase.database().ref('User/103087087/ID');
var gazeRef = firebase.database().ref('User/103087087/userGaze');

var exprValue="777";

// Input string 'ID', get the reference, then get its value, change its class to green or red 
function gazeOn(gazeID){
    document.getElementById(gazeID).classList.remove('red');
    document.getElementById(gazeID).classList.add('green');
}

function gazeOff(gazeID){
    document.getElementById(gazeID).classList.remove('green');
    document.getElementById(gazeID).classList.add('red');
}
// GET Expression
exprRef.on('value', function(snapshot) { 
    snapshot.forEach(function(child) {
    console.log(child.key, child.val());
    exprValue = child.val();
    
    if(exprValue=='Smile'){
        document.getElementById('UserID').innerHTML = '<i class="thumbs up icon"></i> Smile';
        document.getElementById('UserID2').innerHTML = '<i class="thumbs up icon"></i> Smile';
        gazeOn('gaze1');
        gazeOn('gaze2');

    }
    if(exprValue=='Angry'){
        document.getElementById('UserID').innerHTML = '<i class="thumbs down icon"></i> Angry';
        document.getElementById('UserID2').innerHTML = '<i class="thumbs down icon"></i> Angry';
        gazeOff('gaze1');
        gazeOff('gaze2');
    }

    });
}); 

var messages = $(".messages");

//chatWork
var startListening = function() {
    
    firebase.database().ref('ChatLog/103087087').on('child_added', function(snapshot) {
    var msg = snapshot.val();
    console.log("msg:"+msg.chat);

    var msgUsernameElement = document.createElement("b");
    msgUsernameElement.textContent = '103087087';
    
    var msgTextElement = document.createElement("p");
    msgTextElement.textContent = msg.chat;
    
    var msgElement = document.createElement("div");
    msgElement.appendChild(msgUsernameElement);
    msgElement.appendChild(msgTextElement);

    msgElement.className = "msg";
    document.getElementById("chatResults").appendChild(msgElement);
    messages.scrollTop(messages.prop('scrollHeight'));
});

    firebase.database().ref('ChatLog/103123123').on('child_added', function(snapshot) {
    var msg = snapshot.val();
    console.log("msg:"+msg.chat);
    var msgUsernameElement = document.createElement("b");
    msgUsernameElement.textContent = '103123123';
    
    var msgTextElement = document.createElement("p");
    msgTextElement.textContent = msg.chat;

    var msgElement = document.createElement("div");
    msgElement.appendChild(msgUsernameElement);
    msgElement.appendChild(msgTextElement);

    msgElement.className = "msg";
    document.getElementById("chatResults").appendChild(msgElement);
    messages.scrollTop(messages.prop('scrollHeight'));
});


}

//chatWork, Begin listening for data
startListening();

/*
gazeRef.on('value', function(snapshot) { 
    snapshot.forEach(function(child) {
    console.log(child.key, child.val());
    gazeValue = child.val();
    if(gazeValue=='true'){
        document.getElementById('gaze').classList.remove('red');
        document.getElementById('gaze').classList.add('green');
    }
    if(gazeValue=='false'){
        document.getElementById('gaze').classList.remove('green');
        document.getElementById('gaze').classList.add('red');
    }

    });
}); 
*/

