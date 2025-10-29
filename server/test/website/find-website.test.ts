import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("GET /api/websites/:websiteId", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should retreive website data by id", async () => {
        const { token, type } = await AuthTest.login();
        const website = await WebsiteTest.create();

        const response = await supertest(web)
            .get(`/api/websites/${website.id}`)
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBeDefined();
        expect(response.body.data.url).toBeDefined();
        expect(response.body.data.description).toBeDefined();
        expect(response.body.data.is_healthy).toBeDefined();
        expect(response.body.data.response_time).toBeDefined();
        expect(response.body.data.status_code).toBeDefined();
        expect(response.body.data.message).toBeDefined();
    });

    it("should reject retreive website data by id if not login", async () => {
        const website = await WebsiteTest.create();

        const response = await supertest(web)
            .get(`/api/websites/${website.id}`);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject retreive website data by id if website not found", async () => {
        const { token, type } = await AuthTest.login();
        const websiteIdNotFound = 0;

        const response = await supertest(web)
            .get(`/api/websites/${websiteIdNotFound}`)
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});