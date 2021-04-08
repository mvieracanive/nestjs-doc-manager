import {
  classToPlain,
  plainToClass,
  plainToClassFromExist,
} from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export class MetadataAbstract {
  constructor() {
    if (this.constructor == MetadataAbstract) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /*stringifyWithoutDates() {
        const plain = classToPlain(this);
        const json = JSON.stringify(plain);
        return json;
    }

    strignifyWithDates() {
        throw new Error("Method 'strignifyWithDates()' must be implemented.");
    }*/

  static parse(json: string | unknown, cls: ClassType<unknown>) {
    if (typeof json == "object") return json;
    const obj = JSON.parse(json as string);
    const exist = new cls();
    const plain = classToPlain(obj);
    const r = plainToClassFromExist(new cls(), plain);
    return r;
  }

  static createSQLSelect(cls: ClassType<any>): string {
    const instance = new cls();
    const fields = Object.getOwnPropertyNames(instance);
    let res = "";
    fields.forEach((element) => {
      res += `metadata->'${element}' as "${element}", `;
    });
    return res;
  }
}
