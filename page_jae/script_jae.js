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

  console.log(last);
  diagnostic.textContent = 'Answer: ' + line + '.';

  if(line.indexOf("+") == -1 && line.indexOf("-") == -1 && line.indexOf("*") == -1 && line.indexOf("/") == -1) {
    diagnostic.textContent = 'No operators';
  }

  var array = line.split(" ");

  var i = 0;

  //while(array) {
    var first = array[i];
    var op = array[i+1];
    var second = array[i+2];
  //  i++;
  //}

  if(op == '+') {
    console.log('plus');
      diagnostic.textContent = 'Answer: ' + (parseInt(first, 10) + parseInt(second, 10));
  } else if(op == '-') {
        console.log('minus');
      diagnostic.textContent = 'Answer: ' + (parseInt(first, 10) - parseInt(second, 10));
  } else if(op == '*') {
        console.log('times');
      diagnostic.textContent = 'Answer: ' + (parseInt(first, 10) * parseInt(second, 10));
  } else if(op == '/') {
        console.log('divide');
      diagnostic.textContent = 'Answer: ' + (parseInt(first, 10) / parseInt(second, 10));
  }

  console.log(line.indexOf("+"));
  console.log(line);
  console.log('Confidence: ' + event.results[0][0].confidence);
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