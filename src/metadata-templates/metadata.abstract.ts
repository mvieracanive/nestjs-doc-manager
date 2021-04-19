export class MetadataAbstract {
  constructor() {
    if (this.constructor == MetadataAbstract) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }
}
