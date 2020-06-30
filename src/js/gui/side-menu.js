'use strict';

MainApplication.GUI.SideMenu = {};

/**
 * 
 */
MainApplication.GUI.SideMenu.init = function () {
    this.name = "GUI.SideMenu";
    this.menuItemSets = document.getElementById("menu-sets");
    this.menuItemWeapons = document.getElementById("menu-weapons");
    this.menuItemGuns = document.getElementById("menu-guns");
    this.menuItemShields = document.getElementById("menu-shields");
    this.menuItemSkills = document.getElementById("menu-skills");
    this.menuItemAbout = document.getElementById("menu-about");

    this.registerClickEvent(this.menuItemSets, this.setsMenuItemClickHandler);

    console.log(`Module ${this.name} has been initialized.`);
}

/**
 * 
 * @param {Element} domElement 
 * @param {Function} handlerFunction 
 */
MainApplication.GUI.SideMenu.registerClickEvent = function (domElement, handlerFunction) {
    domElement.addEventListener('click', handlerFunction);
}

/**
 * 
 * @param {MouseEvent} event 
 */
MainApplication.GUI.SideMenu.setsMenuItemClickHandler= function (event) {
    event.preventDefault();
    console.log(event);
}