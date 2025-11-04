import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("GET /api/websites/desc", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();

        await UserTest.create();
        for (let i = 0; i < 20; i++) {
            await WebsiteTest.create("https://github.com/rifki-saifullah", i);
        }
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should retreive website datas by order by descending response time", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .get(`/api/websites/desc`)
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.length).toBe(3);
    });
});