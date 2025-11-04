import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("POST /api/websites/:websiteId/check", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
        await WebsiteTest.reset();
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should check website", async () => {
        const { token, type } = await AuthTest.login();
        const website = await WebsiteTest.create();

        const response = await supertest(web)
            .post(`/api/websites/${website.id}/check`)
            .set("Authorization", `${type} ${token}`)

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
    });
});