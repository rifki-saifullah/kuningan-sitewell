import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("PUT /api/websites/:websiteId/details", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should update all website details", async () => {
        const { token, type } = await AuthTest.login();
        const website = await WebsiteTest.create();

        const response = await supertest(web)
            .put(`/api/websites/${website.id}/details`)
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
    });
});