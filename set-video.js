AFRAME.registerComponent('set-video', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var here = this;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out video.
      data.target.emit('set-video-fade');
      // Wait for fade to complete.
      here.switchToNextVideo();
      setTimeout(function () {
        // Set video.
        data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setVideoFadeSetup) { return; }
    targetEl.dataset.setVideoFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-video-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  },

  switchToNextVideo: function () {
      var data = this.data;
      var video_selector = data.target;
      var video_el = document.querySelector(this.video_selector);
      console.log("video_el", video_el);
      console.log("All Videos: ", document.querySelectorAll("video"));
      console.log("Change to:", data.src);
      console.log("Change from:" , data.target.getAttribute('src'));

  }
});