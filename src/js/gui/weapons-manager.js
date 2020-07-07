'use strict';

MainApplication.GUI.WeaponManager = {};

MainApplication.GUI.WeaponManager.init = function () {
  this.name = 'GUI.WeaponManager';
  this.weaponsListElement = document.getElementById('weapon-ul');
  this.weaponsInfoTitle = document.getElementById('weapon-information-name');
  this.weaponsInfoType = document.getElementById('weapon-information-type');
  this.weaponsSkillsListElement = document.getElementById('weapon-skills-ul');

  this.populateListFromFile();
  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

MainApplication.GUI.WeaponManager.populateListFromFile = function () {
  const weaponsArray = MainApplication.Data.weaponsDatabase;

  this.createAddEntry();

  weaponsArray.forEach(weaponObject => {
    var weaponName = weaponObject.name;
    var listItem = this.createWeaponItem(weaponName);
    this.weaponsListElement.appendChild(listItem);
  });
};

MainApplication.GUI.WeaponManager.createAddEntry = function () {
  var listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode('New Weapon'));
  listItem.id = 'weapon-add-btn';
  listItem.addEventListener('click', this.addWeapon.bind(this));
  this.weaponsListElement.appendChild(listItem);
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
  this.weaponsInfoType.innerText = targetWeaponObject.type;

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
  var skillCounter = 1;

  weaponSkillsList.forEach(skillObject => {
    var skillItem = document.createElement('li');
    var skillNameDiv = document.createElement('div');
    var skillLevelDiv = document.createElement('div');
    var skillNumber = `${skillCounter}`;

    skillNameDiv.classList.add('weapon-skill-name');
    skillNameDiv.innerHTML = skillObject.name;
    skillLevelDiv.classList.add('weapon-skill-level');
    skillLevelDiv.innerHTML = skillObject.level;

    skillItem.appendChild(skillNameDiv);
    skillItem.appendChild(skillLevelDiv);
    skillItem.setAttribute('skill_', skillNumber);
    // skillItem.classList.add(skillClass);

    // skillItem.appendChild(document.createTextNode(skillName));
    this.weaponsSkillsListElement.appendChild(skillItem);
    skillCounter += 1;

    if (skillObject.type === 'Compound') {
      this.extendWeaponCompundSkill(skillObject, skillNumber);
    }
  });
};

/**
 * 
 * @param {Skill} skillObject 
 * @param {string} skillItemID 
 */
MainApplication.GUI.WeaponManager.extendWeaponCompundSkill = function (skillObject, skillNumber) {
  const compoundSkillChildren = skillObject.skills;

  compoundSkillChildren.forEach(childSkillObject => {
    var skillItem = document.createElement('li');
    var skillNameDiv = document.createElement('div');
    var skillLevelDiv = document.createElement('div');

    skillNameDiv.classList.add('weapon-skill-name');
    skillNameDiv.innerHTML = childSkillObject.name;
    skillLevelDiv.classList.add('weapon-skill-level');
    skillLevelDiv.innerHTML = childSkillObject.level;

    skillItem.appendChild(skillNameDiv);
    skillItem.appendChild(skillLevelDiv);
    skillItem.setAttribute('skill_', skillNumber);

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

MainApplication.GUI.WeaponManager.addWeapon = function () {
  console.log('Adding weapon');
};
