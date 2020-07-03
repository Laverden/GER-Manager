'use strict';

export default class Skill {
  /**
   * DESCRIBE
   *
   * @param {*} name
   * @param {*} type Whether the skill is Single, Compound or Incremental
   */
  constructor (object = null, name, type) {
    if (object) {
      this.name = object.name;
      this.type = object.type;
      this.skillMembers = object.skillMembers;
    } else {
      this.name = name;
      this.type = type;
      this.skillMembers = [];
    }
    this.level = 1;
  }

  setLevel (level) {
    if (level >= 1 && level <= 10) {
      this.level = level;
    } else {
      throw Error('Level must be a number between 1 and 10');
    }
  }

  setSkillMembers (memberList) {
    memberList.forEach(element => {
      this.skillMembers.push(element);
    });
  }
}
