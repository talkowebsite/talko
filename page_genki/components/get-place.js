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

/* global AFRAME */

AFRAME.registerComponent('get-place', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    el.addEventListener(data.on, function () {
      recognition.start();
      console.log('starting sound recognition');
    });
  },

});

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
  
  //var keyword = word + ",360degrees";
  var keyword = "antarctica,360degrees";
  console.log(keyword);

  getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: keyword,
            tagmode: "any",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);

            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
            pic.src = image_src;
            console.log(image_src);
        });
}
  // google.load('search', '1');
  // google.setOnLoadCallback(OnLoad);
  // var search;

  // function OnLoad()
  //   {
  //       search = new google.search.ImageSearch();
  //       search.setSearchCompleteCallback(this, searchComplete, null);
  //       search.execute(keyword);
  //   }
  //   function searchComplete()
  //   {
  //       if (search.results && search.results.length > 0)
  //       {
  //           var rnd = Math.floor(Math.random() * search.results.length);
  //           console.log(search.results[rnd]['url']);
  //       }
  //   }
/*
  //$(function(){

        getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
            tags: keyword,
            tagmode: "any",
            format: "json"
        },
        function(data) {
            var rnd = Math.floor(Math.random() * data.items.length);

            var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
            pic.src = image_src;
            console.log(image_src);
        });

    }

}
*/
recognition.onspeechend = function() {
  recognition.stop();
  console.log('ended sound recognition');
}
