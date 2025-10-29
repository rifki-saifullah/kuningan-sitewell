import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("POST /api/websites/:websiteId/check", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();

        await UserTest.create();
        for (let i = 0; i < 10; i++) {
            await WebsiteTest.create();
        }
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should check website", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .post(`/api/websites/check`)
            .set("Authorization", `${type} ${token}`)

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
    });
});