'use strict';

import Skill from './../classes/Skill.js';
import Weapon from './../classes/Weapon.js';

const fs = require('fs');
const path = require('path');

const CURRENT_DIR = process.cwd();
const databasesDir = path.join(CURRENT_DIR, 'src/resources/database');
const SKILLS_FILE = path.join(databasesDir, 'skills-compound.txt');
const WEAPONS_FILE = path.join(databasesDir, 'weapons.txt');

MainApplication.Data = {};
MainApplication.Data.name = '';
MainApplication.Data.skillsDatabase = [];
MainApplication.Data.weaponsDatabase = [];

/**
 * Initializes the GUI Controller module.
 */
MainApplication.Data.init = function () {
  this.name = 'Data';
  this.skillsDatabase = [];
  this.weaponsDatabase = [];

  this.loadData('skills');
  this.loadData('weapons');
  this.sortListOfObjects(this.skillsDatabase);
  this.sortListOfObjects(this.weaponsDatabase);
};

MainApplication.Data.readFromFile = function (filePath) {
  var data = fs.readFileSync(filePath, 'utf-8', (err) => {
    if (err) throw err;
  });

  return data;
};

MainApplication.Data.loadData = function (target) {
  var rawData;

  switch (target) {
    case 'skills':
      rawData = this.readFromFile(SKILLS_FILE);
      this.parseSkillDataToObject(rawData);
      break;
    case 'weapons':
      rawData = this.readFromFile(WEAPONS_FILE);
      this.parseWeaponDataToObject(rawData);
      break;
    default:
      throw Error('Target not defined.');
  }
};

MainApplication.Data.parseSkillDataToObject = function (data) {
  var parseData = JSON.parse(data);

  parseData.forEach(elem => {
    this.skillsDatabase.push(new Skill(elem));
  });
};

MainApplication.Data.parseWeaponDataToObject = function (data) {
  var parseData = JSON.parse(data);

  parseData.forEach(elem => {
    this.weaponsDatabase.push(new Weapon(elem));
  });
};

MainApplication.Data.getSkillFromDatabase = function (skillName) {
  console.log(`[${this.name}] Fetching skill ${skillName}`);

  var fetchedSkill = null;

  for (const element of this.skillsDatabase) {
    if (element.name === skillName) {
      fetchedSkill = element;
      break;
    }
  }

  return fetchedSkill;
};

MainApplication.Data.getWeaponFromDatabase = function (weaponName) {
  console.log(`[${this.name}] Fetching skill ${weaponName}`);

  var fetchedWeapon = null;

  for (const element of this.weaponsDatabase) {
    if (element.name === weaponName) {
      fetchedWeapon = element;
      break;
    }
  }

  return fetchedWeapon;
};

/**
 * DESCRIBE
 *
 * @param {Array} list
 */
MainApplication.Data.sortListOfObjects = function (list) {
  list.sort((a, b) => (a.name > b.name) ? 1 : -1);
};
