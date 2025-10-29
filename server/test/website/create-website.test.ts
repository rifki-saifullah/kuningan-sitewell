import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, DEFAULTS, UserTest, WebsiteTest } from "../test-utils";

describe("POST /api/websites", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should create new website data", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .post("/api/websites")
            .set("Authorization", `${type} ${token}`)
            .send({
                name: DEFAULTS.WEBSITE.NAME,
                url: DEFAULTS.WEBSITE.URL,
                description: DEFAULTS.WEBSITE.DESCRIPTION,
            });

        console.log(response.body)

        expect(response.status).toBe(201);
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

    it("should reject create new website data if request is invalid", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .post("/api/websites")
            .set("Authorization", `${type} ${token}`)
            .send({
                name: "",
                url: "",
                description: "",
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject create new website data if not login", async () => {
        const response = await supertest(web)
            .post("/api/websites")
            .send({
                name: DEFAULTS.WEBSITE.NAME,
                url: DEFAULTS.WEBSITE.URL,
                description: DEFAULTS.WEBSITE.DESCRIPTION,
            });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});