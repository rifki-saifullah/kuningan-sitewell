import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("GET /api/websites/healthy-count", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();

        await UserTest.create();
        for (let i = 0; i < 5; i++) {
            await WebsiteTest.create("https://github.com/rifki-saifullah", i);
        }

        for (let i = 0; i < 5; i++) {
            await WebsiteTest.create("https://github.com/rifki-saifullah", i, false);
        }
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should retreive count healthy and down website", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .get(`/api/websites/healthy-count`)
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