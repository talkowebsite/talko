var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

// var colorHTML= '';
// colors.forEach(function(v, i, a){
//   console.log(v, i);
//   colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });
//hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try '+ colorHTML + '.';
//hints.innerHTML = 'Click to listen...';

// document.body.onclick = function() {
//   recognition.start();
//   console.log('Listening...');
// }

recognition.start();

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
  var word = event.results[last][0].transcript;

  //diagnostic.textContent = 'Result received: ' + word + '.';
  //bg.style.backgroundColor = color;
  //console.log('Confidence: ' + event.results[0][0].confidence);
  console.log(word);
  var keyword = word + ",360degrees";
$(document).ready(function(){

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: word,
            tagmode: "any",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);

            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
            pic.src = image_src;

        });

    });

}

// recognition.onspeechend = function() {
//   recognition.stop();
// }

recognition.onnomatch = function(event) {
  //diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  //diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}