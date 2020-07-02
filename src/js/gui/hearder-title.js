'use strict';

MainApplication.GUI.HeaderTitle = {};

MainApplication.GUI.HeaderTitle.init = function () {
  this.name = 'GUI.HeaderTitle';
  this.headerTitleElement = document.getElementById('header-title');

  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

MainApplication.GUI.HeaderTitle.setTitle = function (newTitle) {
  this.headerTitleElement.innerHTML = newTitle;
};
