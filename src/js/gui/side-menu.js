'use strict';

MainApplication.GUI.SideMenu = {};

/**
 * Initializes the GUI.SideMenu module.
 */
MainApplication.GUI.SideMenu.init = function (domElementsDict) {
  this.name = 'GUI.SideMenu';
  this.DOMElementsData = domElementsDict;

  const managerKeys = Object.keys(this.DOMElementsData);

  managerKeys.forEach(managerID => {
    const menuID = this.DOMElementsData[managerID].menuID;
    const menuItem = document.getElementById(menuID);
    menuItem.targetManagerID = managerID;
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
  MainApplication.GUI.Controller.switchContent(event.currentTarget.targetManagerID);

  console.log(`[${MainApplication.GUI.SideMenu.name}] Click over element ${event.currentTarget.id}`);
};
