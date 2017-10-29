var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var grammar = '#JSGF V1.0; grammar numbers; public <number> = one | two | three | four | five ;';

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');

taco.onclick = function() {
  recognition.start();
  console.log("HI");
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var line = event.results[last][0].transcript;
  console.log('What you said: ' + line);
  var inputArray = line.split(" ");
  console.log('Input array: ' + inputArray);

  var currentPriority = 1;
  var topStackPriority = 1;
  var queue = [];
  var stack = [];

  for(var i = 0; i < inputArray.length; i++) {
    var current = inputArray[i];

    if(isNumeric(current)) {
      queue.push(current);
    } else if(current == '+' || current == 'plus' || current == '-' || current == 'minus' || current == 'x' || current == '*' || current == 'times' || current == '/' || current == 'over') {
      if(current == '+' || current == 'plus' || current == '-' || current == 'minus') {
        currentPriority = 0;
      } else {
        currentPriority = 1;
      }

      if(stack.length > 0) {
        var topStack = stack[stack.length-1];
        if(topStack == '+' || topStack == 'plus' || topStack == '-' || topStack == 'minus') {
          topStackPriority = 0;
        } else {
          topStackPriority = 1;
        }
      }
      while((stack.length > 0) && (topStackPriority >= currentPriority)) {
        queue.push(stack.pop());
      }
      stack.push(current);
    }
  }
  while(stack.length > 0) {
    queue.push(stack.pop());
  }

  console.log('final: ' + queue);

  var resultStack = [];

  for(var j = 0; j < queue.length; j++) {
    var token = queue[j];

    switch(token) {
      case '+':
      case 'plus':
        resultStack.push(resultStack.pop() + resultStack.pop());
        break;
      case '-':
      case 'minus':
        var sub = resultStack.pop();
        resultStack.push(resultStack.pop() - sub);
        break;
      case 'x':
      case '*':
      case 'times':
        resultStack.push(resultStack.pop() * resultStack.pop());
        break;
      case '/':
      case 'over':
        var divisor = resultStack.pop();
        resultStack.push(resultStack.pop() / divisor);
        break;
      default:
        resultStack.push(parseInt(token));
        break;
    }
  }

  console.log('ANSWER: ' + resultStack);

  diagnostic.textContent = 'ANSWER: ' + resultStack;
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognize that line.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}