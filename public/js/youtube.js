
var player;
var ytBindings;
    window.onload = function() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    cast.receiver.logger.setLevelValue(0);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting Receiver Manager');

    // handler for the 'ready' event
    castReceiverManager.onReady = function(event) {
    console.log('Received Ready event: ' + JSON.stringify(event.data));
    window.castReceiverManager.setApplicationState('Application status is ready...');
    };

    // handler for 'senderconnected' event
    castReceiverManager.onSenderConnected = function(event) {
    console.log('Received Sender Connected event: ' + event.data);
    console.log(window.castReceiverManager.getSender(event.data).userAgent);
    };

    // handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function(event) {
    console.log('Received Sender Disconnected event: ' + event.data);
    if (window.castReceiverManager.getSenders().length == 0) {
        window.close();
    }
    };

    // handler for 'systemvolumechanged' event
    castReceiverManager.onSystemVolumeChanged = function(event) {
    console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
        event.data['muted']);
    };

    // create a CastMessageBus to handle messages for a custom namespace
    window.messageBus =
    window.castReceiverManager.getCastMessageBus(
        'urn:x-cast:com.google.cast.sample.helloworld');

    // handler for the CastMessageBus message event
    window.messageBus.onMessage = function(event) {
    console.log('Message [' + event.senderId + ']: ' + event.data);
    // display the message from the sender
    displayText(event.data);
    commands(event.data);
    // inform all senders on the CastMessageBus of the incoming message event
    // sender message listener will be invoked
    window.messageBus.send(event.senderId, event.data);
    }

    // initialize the CastReceiverManager with an application status message
    window.castReceiverManager.start({statusText: 'Application is starting'});
    console.log('Receiver Manager started');
};

function commands(text)
{
    if(player!=null)
    {
        switch(text)
        {
            case 'playVideo':player.playVideo();break;
            case 'pauseVideo':player.pauseVideo();break;
            case 'stopVideo':player.stopVideo();break;
            case "getStatus":player.getPlayerState();break;
            case 'volumeUp':var currentVolume = player.getVolume();player.setVolume(currentVolume+5);break;
            case 'playnext':player.nextVideo();break;
            case 'playprev':player.previousVideo();break;
        }
    }
}
function displayText(text) {
    console.log(text);
    document.getElementById('message').innerText = text;
    window.castReceiverManager.setApplicationState(text);
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
            height: '600',
            width: '800',
            videoId: 'knUxY35zhEc',
            playerVars: { 'autoplay': 0, 'controls': 1 },
            events: {
                    'onReady': onPlayerReady,
                    'onPlayerStateChange': onStateChange
            }
    });
    
    
}
function playVideo(id)
{
    player.loadVideoById({videoId:id});
}

function onPlayerReady(event) {
    iframe = document.getElementById("player");
    iframe.className +='video';
    player.loadPlaylist(['WlZiT2uAijE','knUxY35zhEc','29nS-YODbvk'],0,0);
    //document.getElementById('annotation').innerHTML="We're ready to go";
}

function onStateChange(event) {
        switch (event.data) {
                case YT.PlayerState.ENDED:
                        // TODO let sender know we're done, then close casting 
                        break;
                case YT.PlayerState.PLAYING:
                        // TODO let sender know we're playing 
                        break;
                case YT.PlayerState.PAUSED:
                        // TODO let sender know we're paused 
                        break;
        }
}
