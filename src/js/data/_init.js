'use strict';

import Skill from './../classes/Skill.js';

const fs = require('fs');
const path = require('path');

const CURRENT_DIR = process.cwd();
const databasesDir = path.join(CURRENT_DIR, 'src/resources/database');

MainApplication.Data = {};

/**
 * Initializes the GUI Controller module.
 */
MainApplication.Data.init = function () {
  this.name = 'Data';
  this.skillsDatabase = [];

  this.loadData();
  this.sortListOfObjects(this.skillsDatabase);
};

MainApplication.Data.loadData = function () {
  const skillDataFile = path.join(databasesDir, 'skills.txt');
  var data;
  data = fs.readFileSync(skillDataFile, 'utf-8', (err) => {
    if (err) throw err;
  });

  this.parseDataToObject(data);
};

MainApplication.Data.parseDataToObject = function (data) {
  var parseData = JSON.parse(data);

  parseData.forEach(elem => {
    this.skillsDatabase.push(new Skill(elem));
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

/**
 * DESCRIBE
 *
 * @param {Array} list
 */
MainApplication.Data.sortListOfObjects = function (list) {
  list.sort((a, b) => (a.name > b.name) ? 1 : -1);
};
