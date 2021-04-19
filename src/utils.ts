import { classToPlain, plainToClassFromExist } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";

export class Utils {
  static stringify(obj: Record<string, any>) {
    const json = JSON.stringify(obj);
    return json;
  }

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

  static createSQLWhere(finder: Record<string, any>): string {
    const r = this.stringify(finder);
    let res = "";
    res = `metadata @> '${r}'`;
    return res;
  }
}
