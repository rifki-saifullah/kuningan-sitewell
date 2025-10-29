import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("DELETE /api/websites/:websiteId", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should delete website data", async () => {
        const { token, type } = await AuthTest.login();
        const website = await WebsiteTest.create();

        const response = await supertest(web)
            .delete(`/api/websites/${website.id}`)
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data).toBe("OK");
    });

    it("should reject delete website data if not login", async () => {
        const website = await WebsiteTest.create();

        const response = await supertest(web)
            .delete(`/api/websites/${website.id}`);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});