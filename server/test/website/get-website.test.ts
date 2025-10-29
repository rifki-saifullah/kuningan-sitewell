import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("GET /api/websites", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should retreive websites with with paging", async () => {
        const { token, type } = await AuthTest.login();
        await WebsiteTest.create();
        await WebsiteTest.create();

        const response = await supertest(web)
            .get(`/api/websites?page=1&limit=10`)
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data).toBeDefined();
        expect(response.body.data.length).toBe(2);
        expect(response.body.meta.total).toBe(2);
        expect(response.body.meta.page).toBe(1);
        expect(response.body.meta.size).toBe(10);
        expect(response.body.meta.total_pages).toBe(1);
    });

    it("should reject retreive websites if not login", async () => {
        await WebsiteTest.create();
        await WebsiteTest.create();

        const response = await supertest(web)
            .get(`/api/websites?page=1&limit=10`);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});