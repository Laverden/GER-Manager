'use strict';

import Skill from './../classes/Skill.js';

export default class WeaponSkill extends Skill {
  /**
   * WeaponSkill Class constructor.
   * @param {*} fromObj
   * @param {*} name
   * @param {*} type
   * @param {*} level
   * @param {*} parent
   */
  constructor (fromObj, name, type, level, parent) {
    super(null, name, type);
    this.level = level;
    this.parent = parent;
  }
}