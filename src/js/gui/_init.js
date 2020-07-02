'use strict';

MainApplication.GUI = {};

/**
 * Initializes the GUI Controller module.
 */
MainApplication.GUI.init = function () {
  MainApplication.GUI.Controller.init();
  MainApplication.GUI.SkillsManager.init();
};
