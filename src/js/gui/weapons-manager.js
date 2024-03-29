'use strict';

const { ipcRenderer } = require('electron');

MainApplication.GUI.WeaponManager = {};

MainApplication.GUI.WeaponManager.name = 'GUI.WeaponManager';

MainApplication.GUI.WeaponManager.weaponUnorderedList = undefined;

MainApplication.GUI.WeaponManager.weaponInfoName = undefined;
MainApplication.GUI.WeaponManager.weaponInfoType = undefined;
MainApplication.GUI.WeaponManager.weaponSkillsUnorderedList = undefined;
MainApplication.GUI.WeaponManager.weaponSkillsSummaryList = undefined;
MainApplication.GUI.WeaponManager.weaponSkillsToggleButton = undefined;

MainApplication.GUI.WeaponManager.weaponLongBladeFilterButton = undefined;

/**
 * Initializes some of the GUI.WeaponsManager properties.
 */
MainApplication.GUI.WeaponManager.init = function () {
  this.weaponUnorderedList = document.getElementById('weapon-ul');

  this.weaponInfoName = document.getElementById('weapon-information-name');
  this.weaponInfoType = document.getElementById('weapon-information-type');
  this.weaponSkillsUnorderedList = document.getElementById('weapon-skills-ul');
  this.weaponSkillsSummaryList = document.getElementById('weapon-skills-summary-ul');

  this.weaoponAllFilterButton = document.getElementById('weapon-all-btn');
  this.weaponLongBladeFilterButton = document.getElementById('weapon-long-blade-btn');
  this.weaponSkillsToggleButton = document.getElementById('weapon-skills-toggle-btn');

  this.weaoponAllFilterButton.addEventListener('click', this.applyWeaponFilter.bind(this));
  this.weaponLongBladeFilterButton.addEventListener('click', this.applyWeaponFilter.bind(this));
  this.weaponSkillsToggleButton.addEventListener('click', this.toggleWeaponSkillView.bind(this));

  this.populateListFromFile();
  this.initWeaponSkillList();

  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

MainApplication.GUI.WeaponManager.initWeaponSkillList = function () {
  for (let i = 0; i < 4; i++) {
    console.log(`Item ${i}`);
    var listItem = document.createElement('li');
    var skillNameDiv = document.createElement('div');
    var skillLevelDiv = document.createElement('div');

    skillNameDiv.classList.add('weapon-skill-name');
    skillLevelDiv.classList.add('weapon-skill-level');

    listItem.appendChild(skillNameDiv);
    listItem.appendChild(skillLevelDiv);
    listItem.setAttribute('skill_', (i + 1).toString());

    this.weaponSkillsUnorderedList.appendChild(listItem);

    var listItemCopy = listItem.cloneNode(true);

    listItemCopy.removeAttribute('skill_');
    this.weaponSkillsSummaryList.appendChild(listItemCopy);
  }
};

/**
 * Creates and adds the Weapons list items from the internal database.
 */
MainApplication.GUI.WeaponManager.populateListFromFile = function () {
  const weaponsArray = MainApplication.Data.weaponsDatabase;

  this.createAddEntry();

  weaponsArray.forEach(weaponObject => {
    var weaponName = weaponObject.name;
    var weaponType = weaponObject.type;
    var listItem = this.createWeaponItem(weaponName, weaponType);
    this.weaponUnorderedList.appendChild(listItem);
  });
};

/**
 * Creates a button list item that allows to add a new Weapon entry.
 */
MainApplication.GUI.WeaponManager.createAddEntry = function () {
  var listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode('New Weapon'));
  listItem.id = 'weapon-add-btn';
  listItem.setAttribute('state_', 'show');
  listItem.addEventListener('click', this.addWeapon.bind(this));
  this.weaponUnorderedList.appendChild(listItem);
};

/**
 * Creates a Weapon list item.
 * @param {String} weaponName The name of the Weapon object.
 */
MainApplication.GUI.WeaponManager.createWeaponItem = function (weaponName, weaponType) {
  var listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode(weaponName));
  listItem.weaponName = weaponName;
  listItem.weaponType = weaponType;
  listItem.setAttribute('state_', 'show');
  listItem.addEventListener('click', this.showWeaponInformation.bind(this));

  return listItem;
};

/**
 * Handles the click over a Weapon by displaying its information.
 * @param {MouseEvent} event Event triggering this listener.
 */
MainApplication.GUI.WeaponManager.showWeaponInformation = function (event) {
  console.log(`[${this.name}] Click on ${event.currentTarget.weaponName}`);
  event.preventDefault();

  const targetWeaponName = event.currentTarget.weaponName;

  const targetWeaponObject = MainApplication.Data.getWeaponFromDatabase(targetWeaponName);

  this.weaponInfoName.innerText = targetWeaponObject.name;
  this.weaponInfoType.innerText = targetWeaponObject.type;

  this.populateWeaponSkills(targetWeaponObject);
  this.populateWeaponSkillsSummary(targetWeaponObject);
};

/**
 * Creates and adds Skills items to the Weapon Skill list.
 * @param {Weapon} weaponObject Weapon from which the Skill list is retrieved.
 */
MainApplication.GUI.WeaponManager.populateWeaponSkills = function (weaponObject) {
  const weaponSkillsList = weaponObject.skills;

  this.deleteAllListItems(this.weaponSkillsUnorderedList);

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
    this.weaponSkillsUnorderedList.appendChild(skillItem);
    skillCounter += 1;

    if (skillObject.type === 'Compound') {
      this.extendWeaponCompundSkill(skillObject, skillNumber);
    }
  });
};

/**
 * Extends the Weapon Skill list by adding the components of a Compound Skill.
 * @param {Skill} skillObject Compound Skill from which the Weapon Skill list is expanded.
 * @param {string} skillNumber Compound Skill identifier grouping all the child Skills.
 */
MainApplication.GUI.WeaponManager.extendWeaponCompundSkill = function (skillObject, skillNumber) {
  const compoundSkillChildren = skillObject.info;

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

    this.weaponSkillsUnorderedList.appendChild(skillItem);
  });
};

MainApplication.GUI.WeaponManager.populateWeaponSkillsSummary = function (weaponObject) {
  const weaponSkillSummaryDict = this.buildWeaponSkillSummary(weaponObject.skills);

  this.deleteAllListItems(this.weaponSkillsSummaryList);

  for (const skillName of Object.keys(weaponSkillSummaryDict)) {
    var skillItem = document.createElement('li');
    var skillNameDiv = document.createElement('div');
    var skillLevelDiv = document.createElement('div');

    var skillLevel = weaponSkillSummaryDict[skillName];
    var skillType = MainApplication.Data.getSkillType(skillName);
    var skillLevelDecorator = '';

    skillNameDiv.classList.add('weapon-skill-name');
    skillNameDiv.innerHTML = skillName;
    skillLevelDiv.classList.add('weapon-skill-level');
    skillLevelDiv.innerHTML = skillLevel;

    if (skillType === 'Single') {
      if (skillLevel < 10) skillLevelDecorator = 'inactive';
    }

    if (skillLevel > 10) skillLevelDecorator = 'overflow';

    skillLevelDiv.setAttribute('status_', skillLevelDecorator);

    skillItem.appendChild(skillNameDiv);
    skillItem.appendChild(skillLevelDiv);

    this.weaponSkillsSummaryList.appendChild(skillItem);
  }
};

MainApplication.GUI.WeaponManager.buildWeaponSkillSummary = function (weaponSkillsObject) {
  var skillSummaryDict = {};

  weaponSkillsObject.forEach(skillObject => {
    var sName = skillObject.name;
    var sLevel = skillObject.level;
    var sType = skillObject.type;

    if (sType === 'Compound') {
      var sChildren = skillObject.info;
      sChildren.forEach(s => {
        var cName = s.name;
        var cLevel = s.level;
        // var cType = s.level;

        if (cName in skillSummaryDict) {
          cLevel = parseInt(cLevel) + parseInt(skillSummaryDict[cName]);
        }

        skillSummaryDict[cName] = cLevel.toString();
      });
    } else {
      if (sName in skillSummaryDict) {
        sLevel = parseInt(sLevel) + parseInt(skillSummaryDict[sName]);
      }
      skillSummaryDict[sName] = sLevel.toString();
    }
  });

  return skillSummaryDict;
};

MainApplication.GUI.WeaponManager.toggleWeaponSkillView = function () {
  const currentView = this.weaponSkillsToggleButton.getAttribute('mode_');
  var summaryModeVisibilty = 'hide';
  var skillModeVisibility = 'hide';

  if (currentView === 'skill') {
    this.weaponSkillsToggleButton.setAttribute('mode_', 'summary');
    summaryModeVisibilty = 'show';
  } else {
    this.weaponSkillsToggleButton.setAttribute('mode_', 'skill');
    skillModeVisibility = 'show';
  }

  this.weaponSkillsSummaryList.setAttribute('state_', summaryModeVisibilty);
  this.weaponSkillsUnorderedList.setAttribute('state_', skillModeVisibility);
};

MainApplication.GUI.WeaponManager.applyWeaponFilter = function (event) {
  this.removeAllWeaponFilters();

  const filterBtnID = event.currentTarget.id;
  const filterGroup = event.currentTarget.getAttribute('group_');

  this.setFilterActive(filterBtnID);

  switch (filterGroup) {
    case 'long-blade':
      this.filterWeaponsByType('Long Blade');
      break;
    default:
      break;
  }
};

MainApplication.GUI.WeaponManager.setFilterActive = function (activeFilterID) {
  const filterButtons = document.getElementsByClassName('btn-filter');

  for (const fb of filterButtons) {
    if (fb.id === activeFilterID) {
      fb.classList.add('active');
    } else {
      fb.classList.remove('active');
    }
  }
};

MainApplication.GUI.WeaponManager.filterWeaponsByType = function (weaponType) {
  const weaponItems = this.weaponUnorderedList.getElementsByTagName('li');

  for (const w of weaponItems) {
    if (w.weaponType) {
      if (w.weaponType !== weaponType) { w.setAttribute('state_', 'hide'); }
    }
  }
};

MainApplication.GUI.WeaponManager.removeAllWeaponFilters = function () {
  const weaponItems = this.weaponUnorderedList.getElementsByTagName('li');

  for (const w of weaponItems) {
    w.setAttribute('state_', 'show');
  }
};

/**
 * Clears the given HTMLElement list.
 * @param {Element} ulElement The list to clear.
 */
MainApplication.GUI.WeaponManager.deleteAllListItems = function (ulElement) {
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
};

MainApplication.GUI.WeaponManager.addWeapon = function () {
  console.log('Adding weapon');
  window.open('', 'add-weapon');
  ipcRenderer.send('update-skill-list', MainApplication.Data.skillsDatabase);
};

ipcRenderer.on('add-weapon', (event, data) => {
  console.log('SHOWING INFO');
  console.log(data);
  MainApplication.Data.addNewWeapon(data);
});
