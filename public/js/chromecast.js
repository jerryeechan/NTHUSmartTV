
var castSession;
initializeCastApi = function() {
    console.log('init');
    cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId:
        chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    });
    castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    console.log(castSession);
    /*
  cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: 'DFA6B742',
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });*/
  /*
    var currentMediaURL = 'https://www.youtube.com/watch?v=dwaFPjM2tmo';
    var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    var mediaInfo = new chrome.cast.media.MediaInfo(currentMediaURL, contentType);
    var request = new chrome.cast.media.LoadRequest(mediaInfo);
    castSession.loadMedia(request).then(
        function() { console.log('Load succeed'); },
        function(errorCode) { console.log('Error code: ' + errorCode); }
    );*/
};

window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    initializeCastApi();
  }
};

