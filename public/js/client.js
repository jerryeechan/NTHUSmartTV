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




