'use strict';

MainApplication.GUI.ContentPanel = {};

MainApplication.GUI.ContentPanel.init = function (contentIDsArray) {
  this.name = 'GUI.ContentPanel';
  this.contentPanelIDs = contentIDsArray;

  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

/**
 * DESCRIBE
 *
 * @param {String} targetedContentID
 */
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
