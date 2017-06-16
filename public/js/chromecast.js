
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



  //var applicationID = 'chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID';
    
  var applicationID = '794B7BBF';
  //var applicationID = 'F83CEF8C';
  var applicationID = '3BB68922';
  var namespace = 'urn:x-cast:com.google.cast.sample.helloworld';
  var session = null;

  /**
   * Call initialization for Cast
   */
  if (!chrome.cast || !chrome.cast.isAvailable) {
    setTimeout(initializeCastApi, 1000);
  }

  /**
   * initialization
   */
  function initializeCastApi() {
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    console.log(sessionRequest);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
      sessionListener,
      receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
  }

  /**
   * initialization success callback
   */
  function onInitSuccess() {
    appendMessage('onInitSuccess');
  }

  /**
   * initialization error callback
   */
  function onError(message) {
    appendMessage('onError: ' + JSON.stringify(message));
  }

  /**
   * generic success callback
   */
  function onSuccess(message) {
    appendMessage('onSuccess: ' + message);
  }

  /**
   * callback on success for stopping app
   */
  function onStopAppSuccess() {
    appendMessage('onStopAppSuccess');
  }

  /**
   * session listener during initialization
   */
  function sessionListener(e) {
    appendMessage('New session ID:' + e.sessionId);
    session = e;
    session.addUpdateListener(sessionUpdateListener);
    session.addMessageListener(namespace, receiverMessage);
  }

  /**
   * listener for session updates
   */
  function sessionUpdateListener(isAlive) {
    var message = isAlive ? 'Session Updated' : 'Session Removed';
    message += ': ' + session.sessionId;
    appendMessage(message);
    if (!isAlive) {
      session = null;
    }
  }

  /**
   * utility function to log messages from the receiver
   * @param {string} namespace The namespace of the message
   * @param {string} message A message string
   */
  function receiverMessage(namespace, message) {
    appendMessage('receiverMessage: ' + namespace + ', ' + message);
  }

  /**
   * receiver listener during initialization
   */
  function receiverListener(e) {
      console.log(e);
    if(e === 'available') {
      appendMessage('receiver found');
    }
    else {
      appendMessage('receiver list empty');
    }
  }

  /**
   * stop app/session
   */
  function stopApp() {
    session.stop(onStopAppSuccess, onError);
  }

  /**
   * send a message to the receiver using the custom namespace
   * receiver CastMessageBus message handler will be invoked
   * @param {string} message A message string
   */
  function sendMessage(message) {
      console.log(message);
    if (session != null) {
      session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message),
        onError);
    }
    else {
      chrome.cast.requestSession(function(e) {
          session = e;
          session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' +
            message), onError);
        }, onError);
    }
  }

  /**
   * append message to debug message window
   * @param {string} message A message string
   */
  function appendMessage(message) {
    console.log(message);
    var dw = document.getElementById('debugmessage');
    dw.innerHTML += '\n' + JSON.stringify(message);
  }

  /**
   * utility function to handle text typed in by user in the input field
   */
  function update() {
    sendMessage(document.getElementById('input').value);
  }

  /**
   * handler for the transcribed text from the speech input
   * @param {string} words A transcibed speech string
   */
  function transcribe(words) {
    sendMessage(words);
  }
