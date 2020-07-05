'use strict';

MainApplication.GUI.SkillsManager = {};

MainApplication.GUI.SkillsManager.init = function () {
  this.name = 'GUI.SkillsManager';
  this.skillsListElement = document.getElementById('ul-skills');
  this.skillsInfoTitle = document.getElementById('skills-information-title-text');
  this.skillsInfoType = document.getElementById('skills-information-type');
  this.skillsInfoDescription = document.getElementById('skills-information-text');
  this.skillsInfoComposition = document.getElementById('skills-information-compound');
  this.skillsInfoCompoundListElement = document.getElementById('ul-skills-children');

  this.populateListFromFile();

  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

MainApplication.GUI.SkillsManager.populateListFromFile = function () {
  const debugSkillArray = MainApplication.Data.skillsDatabase;

  debugSkillArray.forEach(skillObject => {
    var skillName = skillObject.name;
    var listItem = this.createSkillItem(skillName);
    this.skillsListElement.appendChild(listItem);
  });
};

MainApplication.GUI.SkillsManager.createSkillItem = function (skillName) {
  var listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode(skillName));
  listItem.skillId = skillName;
  listItem.addEventListener('click', this.showSkillInformation.bind(this));

  return listItem;
};

/**
 * DESCRIBE
 *
 * @param {MouseEvent} event
 */
MainApplication.GUI.SkillsManager.showSkillInformation = function (event) {
  console.log(`[${this.name}] Click on ${event.currentTarget.skillId}`);
  event.preventDefault();

  const targetSkillName = event.currentTarget.skillId;

  const targetSkillObject = MainApplication.Data.getSkillFromDatabase(targetSkillName);

  const isCompound = (targetSkillObject.type === 'Compound');

  this.skillsInfoTitle.innerText = targetSkillObject.name;
  this.skillsInfoType.innerText = targetSkillObject.type;

  if (isCompound) {
    this.populateChildSkills(targetSkillObject);
    this.skillsInfoDescription.innerText = '';
  } else {
    this.deleteAllListItems(this.skillsInfoCompoundListElement);
    this.skillsInfoDescription.innerText = 'Here is a description of the skill that increase your skill by 5% per level.';
  }

  this.skillsInfoComposition.setAttribute('display_', isCompound.toString());
  this.skillsInfoDescription.setAttribute('display_', (!isCompound).toString());
};

MainApplication.GUI.SkillsManager.populateChildSkills = function (skillObject) {
  const childSkillsList = skillObject.skillMembers;
  this.deleteAllListItems(this.skillsInfoCompoundListElement);

  childSkillsList.forEach(childId => {
    var childItem = document.createElement('li');
    childItem.appendChild(document.createTextNode(childId));
    this.skillsInfoCompoundListElement.appendChild(childItem);
  });
};

/**
 * DESCRIBE
 *
 * @param {Element} ulElement
 */
MainApplication.GUI.SkillsManager.deleteAllListItems = function (ulElement) {
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
};

MainApplication.GUI.SkillsManager.addSkill = function (skillName) {
  var newSkillItem = this.createSkillItem(skillName);
  this.skillsListElement.appendChild(newSkillItem);
};
