import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("GET /api/websites/down", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();

        await UserTest.create();
        for (let i = 0; i < 5; i++) {
            await WebsiteTest.create("https://github.com/rifki-saifullah", i, false);
        }
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should retreive down website datas", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .get(`/api/websites/down`)
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.length).toBe(5);
    });
});