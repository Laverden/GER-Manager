'use strict';

export default class Weapon {
  /**
   * DESCRIBE
   *
   * @param {*} name
   * @param {*} type Weapon type (short-blade, long-blade, buster-blade, boost-hammer, variant-scythe).
   */
  constructor (object = null, name, type) {
    if (object) {
      this.name = object.name;
      this.type = object.type;
      this.skills = object.skills;
    } else {
      this.name = name;
      this.type = type;
      this.skills = [];
    }
  }

  setName (name) {
    this.name = name;
  }

  /**
   *
   * @param {Array} memberList
   */
  addSkills (skillList) {
    if (skillList.length > 4) {
      throw Error('Weapons cannot have more than 4 skills.');
    }
    skillList.forEach(element => {
      this.skills.push(element);
    });
  }
}
