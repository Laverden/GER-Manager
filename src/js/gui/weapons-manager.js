'use strict';

MainApplication.GUI.WeaponManager = {};

MainApplication.GUI.WeaponManager.init = function () {
  this.name = 'GUI.WeaponManager';
  this.weaponsListElement = document.getElementById('weapon-ul');
  this.weaponsInfoTitle = document.getElementById('weapon-information-name');
  // this.weaponsInfoType = document.getElementById('weapons-information-type');
  this.weaponsSkillsListElement = document.getElementById('weapon-skills-ul');

  this.populateListFromFile();
  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

MainApplication.GUI.WeaponManager.populateListFromFile = function () {
  const weaponsArray = MainApplication.Data.weaponsDatabase;

  weaponsArray.forEach(weaponObject => {
    var weaponName = weaponObject.name;
    var listItem = this.createWeaponItem(weaponName);
    this.weaponsListElement.appendChild(listItem);
  });
};

MainApplication.GUI.WeaponManager.createWeaponItem = function (weaponName) {
  var listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode(weaponName));
  listItem.weaponName = weaponName;
  listItem.addEventListener('click', this.showWeaponInformation.bind(this));

  return listItem;
};

/**
 * DESCRIBE
 *
 * @param {MouseEvent} event
 */
MainApplication.GUI.WeaponManager.showWeaponInformation = function (event) {
  console.log(`[${this.name}] Click on ${event.currentTarget.weaponName}`);
  event.preventDefault();

  const targetWeaponName = event.currentTarget.weaponName;

  const targetWeaponObject = MainApplication.Data.getWeaponFromDatabase(targetWeaponName);

  this.weaponsInfoTitle.innerText = targetWeaponObject.name;
  // this.weaponsInfoType.innerText = targetWeaponObject.type;

  this.populateWeaponSkills(targetWeaponObject);
};

/**
 * DESCRIBE
 *
 * @param {Weapon} weaponObject
 */
MainApplication.GUI.WeaponManager.populateWeaponSkills = function (weaponObject) {
  const weaponSkillsList = weaponObject.skills;

  this.deleteAllListItems(this.weaponsSkillsListElement);

  weaponSkillsList.forEach(skillName => {
    var skillItem = document.createElement('li');
    skillItem.appendChild(document.createTextNode(skillName));
    this.weaponsSkillsListElement.appendChild(skillItem);
  });
};

/**
 * DESCRIBE
 *
 * @param {Element} ulElement
 */
MainApplication.GUI.WeaponManager.deleteAllListItems = function (ulElement) {
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
};

MainApplication.GUI.WeaponManager.addSkill = function (skillName) {
  var newSkillItem = this.createSkillItem(skillName);
  this.skillsListElement.appendChild(newSkillItem);
};
