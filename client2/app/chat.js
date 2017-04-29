
'use strict';

var index = 0;
var message = "";
var sender = 'user';
var context = ['hellos','botName','leave','confirmation','whoIAm','introduction','thanks'];
function addMessage() {
  var element = document.getElementById("msg" + index);
  index++;
  var newElement = '<div id="msg' + index + '" class="message"><div class="' + sender + '">' + message + '</div><br></div>';
  
  //For test purposes
  if (sender == 'user') {
    sender = 'bot';
  }
  else {
    sender = 'user';
  }
  
  element.insertAdjacentHTML( 'afterend', newElement );
  document.getElementById("usermsg").value = "";

  var chatBox = document.getElementById("chatbox");
  chatBox.scrollTop = chatBox.scrollHeight;

  getReply(message);
};

function updateMessage() {
  message = document.getElementById("usermsg").value;
};

$.fn.scrollBottom = function() { 
  return $(document).height() - this.scrollTop() - this.height(); 
};

function LMGTFY(question) {
  return 'http://lmgtfy.com/?q=' + encodeURI(question);
};

// function replyGenerator(data) {
//   var message = '<div id="msg' + index + '" class="message"><div class="' + sender + '">' + message + '</div><br></div>';
//   if (data.link) {


//   }
// };