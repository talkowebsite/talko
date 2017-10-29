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

document.body.onclick = function() {
  recognition.start();
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

  var queue = [];
  var stack = [];

  for(var i = 0; i < inputArray.length; i++) {
    var current = inputArray[i];
    console.log('current: ' + current);
  }

  // var newStack = [];

  // for(int i = 0; i < postfixArray.length; i++) {
  //   var next = postfixArray[i];
  //   if(next == )
  // }

  // console.log(last);
  // diagnostic.textContent = 'Answer: ' + line + '.';

  // if(line.indexOf("+") == -1 && line.indexOf("-") == -1 && line.indexOf("*") == -1 && line.indexOf("x") == -1 && line.indexOf("/") == -1) {
  //   diagnostic.textContent = 'No operators';
  // }

  // var arraySize = array.length;

  // var index1 = array.indexOf("x");
  // var index2 = array.indexOf("/");
  // if(index1 > index2) {
  //   var mdIndex = index2;
  // } else {
  //   var mdIndex = index1;
  // }

  // var firstNum = array[mdIndex-1];
  // stack.push(firstNum);

  // while(mdIndex < arraySize - 2) {
  //   var first = stack.pop();
  //   var op = array[mdIndex];
  //   var second = array[mdIndex+1];

  //   if(op == '+' || op == 'plus') {
  //     stack.push(parseInt(first, 10) + parseInt(second, 10));
  //   } else if(op == '-' || op == 'minus') {
  //     stack.push(parseInt(first, 10) - parseInt(second, 10));
  //   } else if(op == 'x' || op == '*' || op == 'times') {
  //     stack.push(parseInt(first, 10) * parseInt(second, 10));
  //   } else if(op == '/' || op == 'over') {
  //     stack.push(parseInt(first, 10) / parseInt(second, 10));
  //   }
  //   mdIndex = mdIndex + 2;
  // }

  // var index = 0;
  // var firstAS = array[index];
  // var opAS = array[index+1];
  // var secondAS = array[index+2];


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