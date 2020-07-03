'use strict';

var MainApplication = {};

/**
 * Initializes the other main components of the app.
 */
MainApplication.init = function () {
  MainApplication.Data.init();
  MainApplication.GUI.init();
};

/**
 * Once the content is loaded, trigger the initialization of the main
 * module.
 */
window.addEventListener('load', function () {
  console.log('[_INIT.JS] Window event: load triggered.');
  var initIntervalID = setInterval(function () {
    if (MainApplication.GUI) {
      clearInterval(initIntervalID);
      initIntervalID = -1;
      MainApplication.init();
    }
  }, 100);
});
