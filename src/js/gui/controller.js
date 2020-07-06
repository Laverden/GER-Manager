'use strict';

MainApplication.GUI.Controller = {};

MainApplication.GUI.Controller.init = function () {
  this.name = 'GUI.Controller';

  this.domElements = {
    setsManager: {
      menuID: 'menu-sets',
      contentID: 'content-sets',
      title: 'SETS MANAGER'
    },
    weaponsManager: {
      menuID: 'menu-weapons',
      contentID: 'weapon-manager',
      title: 'WEAPONS MANAGER'
    },
    gunsManager: {
      menuID: 'menu-guns',
      contentID: 'gun-manager',
      title: 'GUNS MANAGER'
    },
    shieldsManager: {
      menuID: 'menu-shields',
      contentID: 'shield-manager',
      title: 'SHIELDS MANAGER'
    },
    skillsManager: {
      menuID: 'menu-skills',
      contentID: 'skill-manager',
      title: 'SKILLS MANAGER'
    },
    aboutManager: {
      menuID: 'menu-about',
      contentID: 'about-manager',
      title: 'ABOUT'
    }
  };

  this.managerKeys = Object.keys(this.domElements);

  MainApplication.GUI.SideMenu.init(this.domElements);
  MainApplication.GUI.ContentPanel.init(this.getContentIDs());
  MainApplication.GUI.HeaderTitle.init(this.domElements);
};

MainApplication.GUI.Controller.switchContent = function (managerID) {
  const targetedManager = this.domElements[managerID];

  MainApplication.GUI.HeaderTitle.setTitle(targetedManager.title);
  MainApplication.GUI.ContentPanel.activateContentArea(targetedManager.contentID);
};

MainApplication.GUI.Controller.getContentIDs = function () {
  var contentIDsArray = [];

  this.managerKeys.forEach(key => {
    contentIDsArray.push(this.domElements[key].contentID);
  });

  return contentIDsArray;
};
