'use strict';

/**
 * Class to represent Skill information.
 */
export default class Skill {
  /**
   * Skill Class constructor.
   * @param {Object} fromObj Use to construct the Skill Object from a generic one.
   * @param {String} name Skill name or ID.
   * @param {String} type Whether the skill is Single, Compound or Incremental
   */
  constructor (fromObj = null, name, type) {
    if (fromObj) {
      this.name = fromObj.name;
      this.type = fromObj.type;
      this.info = fromObj.info;
    } else {
      this.name = name;
      this.type = type;
      (type === 'Compound') ? this.info = [] : this.info = 'Skill description';
    }
  }
}
