import fs from "fs-extra";

import { getExitingModifiedImageByPath, rawImageExistenceCheck } from "../../utils/files";

describe("tests getExitingModifiedImageByPath function", () => {
  it("tests when an existing modified image is found", async () => {
    const testObj = { getExitingModifiedImageByPath };
    spyOn(testObj, "getExitingModifiedImageByPath")
      .withArgs({
        height: 100,
        width: 100,
        name: "test"
      })
      .and.returnValue(Promise.resolve(Buffer.from([25, 25, 25])));
    const image = await testObj.getExitingModifiedImageByPath({
      height: 100,
      width: 100,
      name: "test"
    });
    expect(image).not.toBeNull();
    expect(image).toEqual(Buffer.from([25, 25, 25]));
  });
  it("tests when an existing modified image is not found", async () => {
    const testObj = { getExitingModifiedImageByPath };
    spyOn(testObj, "getExitingModifiedImageByPath")
      .withArgs({
        height: 100,
        width: 100,
        name: "test"
      })
      .and.returnValue(Promise.reject("Modified Img don't exist"));
    try {
      const image: Buffer = await testObj.getExitingModifiedImageByPath({
        height: 100,
        width: 100,
        name: "test"
      });
      expect(image).not.toBeNull();
    } catch (e: unknown) {
      expect(e as string).toEqual("Modified Img don't exist");
    }
  });
});

describe("tests rawImageExistenceCheck function", () => {
  it("tests when a raw image exist in /images directory", async () => {
    spyOn(fs, "readFile").and.returnValue(Promise.resolve(Buffer.from([])));
    const image = await rawImageExistenceCheck("test");
    expect(image).not.toBeNull();
    expect(image).toEqual({ rawImageExist: true, rawImage: Buffer.from([]) });
  });
  it("tests when a raw image does not exist in /images directory", async () => {
    spyOn(fs, "readFile").and.returnValue(Promise.reject());
    const image = await rawImageExistenceCheck("test");
    expect(image).not.toBeNull();
    expect(image).toEqual({ rawImageExist: false, rawImage: null });
  });
});
