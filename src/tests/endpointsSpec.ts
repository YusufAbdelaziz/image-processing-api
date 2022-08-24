import app from "../index";
import * as files from "../utils/files";
import { resizeImage } from "../utils/imageResize";
import supertest from "supertest";

const request = supertest(app);
describe("Tests the app endpoints", () => {
  it('tests the "/" endpoint', async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("You're in main route, Kindly go to api/editImage");
  });
  it('tests the "/api" endpoint', async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
    expect(response.text).toBe("kindly navigate to /api/editImage");
  });
  it('tests the "/api/editImage" endpoint with a file that doest\'t', async () => {
    const response = await request.get("/api/editImage?width=10&height=20&fileName=test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Kindly add the image you want to resize into /images folder and try again");
  });
  it('tests the "/api/editImage" endpoint with no parameters', async () => {
    const response = await request.get("/api/editImage");
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toEqual({
      errors: [
        "Provide a non-negative integer (> 0) for the width",
        "Provide a non-negative integer (> 0) for the height",
        "Please provide a file name"
      ]
    });
  });
  it('tests the "/api/editImage" endpoint with negative/absent width', async () => {
    const response = await request.get("/api/editImage?width=-10&height=20&fileName=test");
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toEqual({
      errors: ["Provide a non-negative integer (> 0) for the width"]
    });
  });
  it('tests the "/api/editImage" endpoint with null width', async () => {
    const response = await request.get("/api/editImage?width=null&height=20&fileName=test");
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toEqual({
      errors: ["Provide a non-negative integer (> 0) for the width"]
    });
  });
  it('tests the "/api/editImage" endpoint with negative/absent height', async () => {
    const response = await request.get("/api/editImage?width=10&height=-20&fileName=test");
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toEqual({
      errors: ["Provide a non-negative integer (> 0) for the height"]
    });
  });
  it('tests the "/api/editImage" endpoint with null height', async () => {
    const response = await request.get("/api/editImage?width=10&height=null&fileName=test");
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toEqual({
      errors: ["Provide a non-negative integer (> 0) for the height"]
    });
  });
  it('tests the "/api/editImage" endpoint with absent file name', async () => {
    const response = await request.get("/api/editImage?width=10&height=20");
    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toEqual({
      errors: ["Please provide a file name"]
    });
  });
});

describe("tests /api/editImage and test the results", () => {
  it("tests /editImage endpoint when the raw image exists and the modified version is found", async () => {
    /// Mocks rawImageExistenceCheck method..
    spyOn(files, "rawImageExistenceCheck").and.returnValue(
      Promise.resolve({ rawImageExist: true, rawImage: Buffer.from([]) })
    );
    /// Mocks getExitingModifiedImageByPath method.
    spyOn(files, "getExitingModifiedImageByPath").and.returnValue(Promise.resolve(Buffer.from([1, 2, 3, 4])));
    const response = await request.get("/api/editImage?width=10&height=20&fileName=test");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual("image/jpg");
    expect(response.body).toEqual(Buffer.from([1, 2, 3, 4]));
  });
  it("tests /editImage endpoint when the raw image doesn't exist", async () => {
    /// Mocks rawImageExistenceCheck method..
    spyOn(files, "rawImageExistenceCheck").and.returnValue(Promise.resolve({ rawImageExist: false, rawImage: null }));
    const response = await request.get("/api/editImage?width=10&height=20&fileName=test");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual("text/html; charset=utf-8");
    expect(response.text).toEqual("Kindly add the image you want to resize into /images folder and try again");
  });
  it("tests /editImage endpoint when the raw image exists and but the modified version is not found", async () => {
    /// Mocks rawImageExistenceCheck method..
    spyOn(files, "rawImageExistenceCheck").and.returnValue(
      Promise.resolve({ rawImageExist: true, rawImage: Buffer.from([]) })
    );
    /// Mocks getExitingModifiedImageByPath method and makes it fail at the first call so
    /// to enter the catch branch.
    const spy = spyOn(files, "getExitingModifiedImageByPath");
    spy.and.throwError("Modified image does not exist");
    /// Mocks resizeImage method.
    spyOn({ resizeImage }, "resizeImage").and.returnValue(Promise.resolve());
    /// Mocks getExitingModifiedImageByPath method and makes it succeed in the second call at catch branch
    spy.and.returnValue(Promise.resolve(Buffer.from([1, 2, 3, 4])));

    const response = await request.get("/api/editImage?width=10&height=20&fileName=test");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toEqual("image/jpg");
    expect(response.body).toEqual(Buffer.from([1, 2, 3, 4]));
  });
});
