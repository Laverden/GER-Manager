'use strict';

MainApplication.GUI = {};

/**
 * Initializes the GUI modules.
 */
MainApplication.GUI.init = function () {
  this.DOMElements = {
    setsManager: {
      menuID: 'menu-sets',
      contentID: 'content-sets'
    },
    weaponsManager: {
      menuID: 'menu-weapons',
      contentID: 'content-weapons'
    },
    gunsManager: {
      menuID: 'menu-guns',
      contentID: 'content-guns'
    },
    shieldsManager: {
      menuID: 'menu-shields',
      contentID: 'content-shields'
    },
    skillsManager: {
      menuID: 'menu-skills',
      contentID: 'content-skills'
    },
    aboutManager: {
      menuID: 'menu-about',
      contentID: 'content-about'
    }
  };
  this.managerKeys = Object.keys(this.DOMElements);

  MainApplication.GUI.SideMenu.init();
  MainApplication.GUI.ContentPanel.init(this.getContentIDs());
};

MainApplication.GUI.getContentIDs = function () {
  var contentIDsArray = [];

  this.managerKeys.forEach(key => {
    contentIDsArray.push(this.DOMElements[key].contentID);
  });

  return contentIDsArray;
};
