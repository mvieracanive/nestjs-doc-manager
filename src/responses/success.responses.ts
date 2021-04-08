export class SuccessResponses {
  static successDBEntityModification(id: string | number) {
    return {
      itemID: id,
      msg: "SUCCESS",
    };
  }
}
