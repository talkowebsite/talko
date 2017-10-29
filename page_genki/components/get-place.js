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
    recognition.start();
      console.log('starting sound recognition');
  }

});

var keyword;

recognition.onresult = function(event) {
  console.log('got a word!');
  var last = event.results.length - 1;
  var word = event.results[last][0].transcript;
  console.log(word);
  
  keyword = word + " 360 image";
  //var keyword = "antarctica,360degrees";
  console.log(keyword);

//   getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
//         {
//             tags: keyword,
//             tagmode: "any",
//             format: "json"
//         },
//         function(data) {
//             var rnd = Math.floor(Math.random() * data.items.length);

//             var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
//             pic.src = image_src;
//             console.log(image_src);
//         });
}
  // var pic = document.getElementById('city');
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
  //           pic.src = search.results[rnd]['url'];
  //           //console.log(search.results[rnd]['url']);
  //       }
  //   }
  
 // $(function() {
        
    //});
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
function waitForElement(){
    if(typeof someVariable !== "undefined"){
        var params = {
            // Request parameters
            "q": keyword
        };
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v7.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","feed4b52267b4552953ae546dd729bd4");
            },
            type: "GET",
            // Request body
            data: "",
        })
        .done(function(data) {
            //alert("success");
            console.log('success');
            var rnd = Math.floor(Math.random() * (data.length/3)); 

            //var image_src = data.d.results[0].Image[rnd].MediaUrl;
            var result = JSON.stringify(data.value[0].contentUrl);
            console.log(result);
            var element = document.getElementById('city');
            elementsrc = result;
        })
        .fail(function() {
            //alert("error");
        });
    }
    else{
        setTimeout(waitForElement, 250);
    }
}

recognition.onspeechend = function() {
  recognition.stop();
  console.log('ended sound recognition');
  waitForElement();
}
