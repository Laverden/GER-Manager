'use strict';

MainApplication.GUI.SideMenu = {};

/**
 * Initializes the GUI.SideMenu module.
 */
MainApplication.GUI.SideMenu.init = function () {
  this.name = 'GUI.SideMenu';

  const managerKeys = Object.keys(MainApplication.GUI.DOMElements);
  managerKeys.forEach(managerID => {
    const menuID = MainApplication.GUI.DOMElements[managerID].menuID;
    const menuItem = document.getElementById(menuID);
    menuItem.targetContentPanel = MainApplication.GUI.DOMElements[managerID].contentID;
    this.registerClickEvent(menuItem, this.menuItemClickHandler);
  });

  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

/**
 * DESCRIBE
 *
 * @param {Element} domElement
 * @param {Function} handlerFunction
 */
MainApplication.GUI.SideMenu.registerClickEvent = function (domElement, handlerFunction) {
  domElement.addEventListener('click', handlerFunction);
};

/**
 * DESCRIBE
 *
 * @param {MouseEvent} event
 */
MainApplication.GUI.SideMenu.menuItemClickHandler = function (event) {
  event.preventDefault();
  MainApplication.GUI.ContentPanel.switchContentArea(event.currentTarget.targetContentPanel);
  console.log(`[${MainApplication.GUI.SideMenu.name}] Click over element ${event.currentTarget.id}`);
};
