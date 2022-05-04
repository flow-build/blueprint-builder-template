const { PersistorSingleton } = require("../persist/persist");

class BaseEntity {}

class PersistedEntity extends BaseEntity {
  static getEntityClass() {
    throw Error("Subclass not implemented");
  }

  static getPersist() {
    return new PersistorSingleton().getPersistInstance(
      this.getEntityClass().name
    );
  }

  constructor() {
    super();
  }

  getPersist() {
    return this.constructor.getPersist();
  }

  async getById(id) {
    let dbData = await this.constructor.getPersist().get(id);
    return this.deserialized(dbData);
  }
}

module.exports = {
  BaseEntity,
  PersistedEntity,
};
