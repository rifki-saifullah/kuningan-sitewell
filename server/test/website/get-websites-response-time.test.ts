import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("GET /api/websites/response-time", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();

        await UserTest.create();
        await WebsiteTest.create("https://github.com/rifki-saifullah", 1000);
        await WebsiteTest.create("https://github.com/rifki-saifullah", 2000);
        await WebsiteTest.create("https://github.com/rifki-saifullah", 5000);
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should retreive response time websites", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .get(`/api/websites/response-time`)
            .set("Authorization", `${type} ${token}`);

        console.log("#######");
        console.log("#######");
        console.log(response.body);
        console.log("#######");
        console.log("#######");

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
    });
});