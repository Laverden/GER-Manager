'use strict';

MainApplication.GUI.SkillsManager = {};

MainApplication.GUI.SkillsManager.init = function () {
  this.name = 'GUI.SkillsManager';
  this.skillsListElement = document.getElementById('ul-skills');
  this.skillsInfoTitle = document.getElementById('skills-information-title');
  this.skillsInfoType = document.getElementById('skills-information-type');
  this.skillsInfoDescription = document.getElementById('skills-information-description');
  this.skillsInfoComposition = document.getElementById('skills-information-composed');

  this.populateListFromFile();

  console.log(`[${this.name}] Module ${this.name} has been initialized.`);
};

MainApplication.GUI.SkillsManager.populateListFromFile = function () {
  const debugSkillArray = ['HP', 'ATTACK', 'GUN ATTACK', 'MELEE ATTACK', 'DEFENSE'];

  debugSkillArray.forEach(skillName => {
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

  const debugCompoundSkill = false;

  this.skillsInfoTitle.innerText = event.currentTarget.skillId;
  this.skillsInfoType.innerText = 'Composed';

  if (debugCompoundSkill) {
    this.skillsInfoComposition.setAttribute('display_', 'true');
  } else {
    this.skillsInfoDescription.innerText = 'Bla bla bla bla bla %% bla bla bla';
  }
};

MainApplication.GUI.SkillsManager.addSkill = function (skillName) {
  var newSkillItem = this.createSkillItem(skillName);
  this.skillsListElement.appendChild(newSkillItem);
};
