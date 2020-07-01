'use strict';

MainApplication.GUI.ContentPanel = {};


MainApplication.GUI.ContentPanel.init = function () {
  this.name = 'GUI.ContentPanel';
  this.contentPanelIDs = [
      "content-sets",
      "content-weapons",
      "content-guns",
      "content-shields",
      "content-skills",
      "content-about",
  ];

  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

MainApplication.GUI.ContentPanel.switchContentArea = function (targetedContentID) {
  console.log(`[${this.name}] Targeting ${targetedContentID}.`);
  this.contentPanelIDs.forEach(elementID => {
    const contentElement = document.getElementById(elementID);
    let contentStatus = 'inactive';

    if (elementID === targetedContentID) {
      contentStatus = 'active';
    }

    contentElement.setAttribute('status_', contentStatus);
  });
};
