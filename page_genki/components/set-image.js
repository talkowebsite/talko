/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    this.getImageURL();
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  },

  getImageURL: function(){
    var params = {
            // Request parameters
            "q": keyword
        };
        $.ajaxSetup({async:false});
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
      },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});