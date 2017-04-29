
'use strict';

var index = 0;
var userMessage = "";
var smallTalk = ['hellos','botName','leave','confirmation','whoIAm','introduction','thanks'];
var replies = {
  hellos: {
    trigger: ['hello','hey','greetings','good morning','hola','good afternoon', 'good evening', 'hei', 'hi ', 'hi!'],
    reply: ['Hello','Hey','Hi','Greetings'],
  },
  botName: {
    trigger: ['curiositybot', 'curiositybot?', 'bot', 'bot?'],
    reply: ['what', 'what?', 'yes?', 'hm?', 'que?', 'yes honey', 'that is me, yes.']
  },
  confirmation: {
    reply: ['yes', 'that\'s right', 'yep']
  },
  whoIAm: {
    trigger: ['who are you', 'what are you', 'who you are', 'what you are', 'who is curiositybot', 'what is curiositybot', 'who curiositybot is', 'what curiositybot is'],
    reply: ['I am CuriosityBot, <insert description here>']
  },
  leave: {
    trigger: ['goodbye', 'bye'],
    reply: ['Bye human!', 'See you later!', 'Bye!']
  },
  introduction: {
    trigger: ['i\'m', 'i am'],
    reply: ['Hi ____! Nice to meet you', 'Hi ____! Pleased to meet you', 'Hi ____! I\'m CuriosityBot']
  },
  thanks: {
    trigger: ['thank you', 'thanks'],
    reply: ['anytime', 'you\'re welcome!']
  }
};
var userName = false;
var empty_space = '____';
var chatHistory = [];

runDemo();

function addMessage() {
  updateChat(generateHTMLEntry(userMessage, 'user'));
  getReply(userMessage);
};

function updateChat(entry) {
  var element = document.getElementById("msg" + index);
  element.insertAdjacentHTML('afterend', entry);

  document.getElementById("usermsg").value = "";

  var chatBox = document.getElementById("chatbox");
  chatBox.scrollTop = chatBox.scrollHeight;
  index++;
};

function getReply(message) {
  var botReply = 'some answer';
  var replyType = 'text';
  message = message.toLowerCase();
  var small_talk = checkForSmalltalk(message);
  if (small_talk) {
    botReply = small_talk;
  }
  //Reply logic here

  var newElement = generateHTMLEntry(botReply, 'bot');
  updateChat(newElement);
};



function generateHTMLEntry(data, sender) {
  var entryHTML = '<div id="msg' + (index + 1) + '" class="message"><div class="' + sender + '">' + data + '</div><br></div>';
  updateChatHistory(data, sender);
  return entryHTML;
};


function updateChatHistory(message, sender) {
  var chatEntry = {
    context: '',
    message: message,
    index: index,
    sender: sender
  };
  //add getContext(message) function

  chatHistory.push(chatEntry);
};


//---------------------HELPER FUNCTIONS

function updateMessage() {
  userMessage = document.getElementById("usermsg").value;
};

$.fn.scrollBottom = function() { 
  return $(document).height() - this.scrollTop() - this.height(); 
};

function LMGTFY(question) {
  return 'http://lmgtfy.com/?q=' + encodeURI(question);
};


function hasReply(text, replyType, search_text) {
  text = text.toLowerCase(); 
  for (var val in replies[replyType].trigger) {
    //see if text contains trigger
    if (search_text && text.indexOf(replies[replyType].trigger[val]) != -1) {
      return true;
    }
    else if (!search_text && text == replies[replyType].trigger[val]) {
      return true;
    }
  }
  return false;
};

function randomReply(replyType) {
  var repliesToChoose = replies[replyType].reply;
  var reply = Math.floor((Math.random() * repliesToChoose.length));
  return repliesToChoose[reply];
};

function checkForSmalltalk(message) {
  var botReply = false;
  //Hellos
  if (hasReply(message, 'hellos', 'search') || message == 'hi') {
    console.log('someone saying hello');
    botReply = randomReply('hellos');
    if (userName) {
      botReply += ' ' + userName;
    }
  }
  //FORMAL INTRODUCTION
  else if ((message.indexOf('my name is') != -1 || message.indexOf('my name\'s') != -1)) {
    console.log('pleased to meet you, person');
    var namePosition = message.indexOf('my name ');
    var possibleName = message.substring(namePosition + 10, message.length).split(' ');
    var name = possibleName[0] || possibleName[1];
    name = capitalizeFirstLetter(name);

    if (name == 'Curiositybot') {
      botReply = 'No, that\'s me, don\'t steal my name..';
    }
    else if (userName && name != userName) {
      botReply = 'No, you are ' + userName;
    }
    else if (!userName) {
      userName = name;
      botReply = randomReply('introduction');
      botReply = botReply.replace(empty_space, name);
    }
    return botReply;
  }
  //INTRODUCTION
  else if (hasReply(message, 'hellos', 'search') && hasReply(message, 'introduction', 'search')) {
    console.log('hello, i am bot');
    var namePosition = message.indexOf('i\'m ');
    if (message.indexOf('i am ') != -1) {
      namePosition = message.indexOf('i am ');
    }
    var possibleName = message.substring(namePosition + 4, message.length).split(' ');
    var name = possibleName[0] || possibleName[1];
    name = capitalizeFirstLetter(name);

    if (name == 'Curiositybot') {
      botReply = 'No, that\'s me, don\'t steal my name..';
    }
    else if (userName && name != userName) {
      botReply = 'No, you are ' + userName;
    }
    else if (!userName) {
      userName = name;
      botReply = randomReply('introduction');
      botReply = botReply.replace(empty_space, name);
    }
    return botReply;
  }
  //THANKS
  else if (hasReply(message, 'thanks', 'search')) {
    botReply = randomReply('thanks');
  }
  //apology
  else if (message.indexOf('i\'m sorry') != -1) {
    botReply = 'Apology accepted.';
  }

  return botReply;
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


//------------------------------------------DEMO

function runDemo() {
  var dialogue = [
    "Hi, I'm Curiosity, NASA's assistant for showing you processed data about the Earth. Ask me anything.",
    "Hello Curiosity, I'm Diana. Do you have info about temperature?",
    "Yes. Is there anything specific you'd like to know?",
    "By how much did the global temperature rise last year?",
    "274.40 K ",
    "What is K?",
    "Kelvin (K) is a unit of measure for temperature based upon an absolute scale. Absolute zero is the point where no more heat can be removed from a system.",
    "That's great! Then show me the temperature in Celsius.",
    "0.99 &deg;C",
    "Thanks. Now can you plot the global temperature variation between 1980 and 2016?",
    "<span>Is this what you were looking for?</span><img class=\"reply-img\" src=\"assets/img/demo/1.png\">",
    "Do the same plot for ice level values.",
    "Cannot apply the same parameters. Do you want to see the differences?",
    "No. Do the same plot for sea level values.",
    "<img class=\"reply-img\" src=\"assets/img/demo/2.png\">",
    "Now combine those 2 graphs in a single one.",
    "<img class=\"reply-img\" src=\"assets/img/demo/3.png\">",
    "Save to Google Drive.",
    "Done."
  ];
  var timer = 0;
  var counter = 0;
  for (var i=0; i < dialogue.length; i++) {
    timer = timer + 3000;
    setTimeout(function(){
      var sender = 'bot';
      if (counter > 0 && counter%2) {
        sender = 'user';
      }
      updateChat(generateHTMLEntry(dialogue[counter], sender));
      counter++;
    }, timer);
  }
};
