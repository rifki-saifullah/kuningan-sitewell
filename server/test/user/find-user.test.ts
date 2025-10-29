import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest } from "../test-utils";

describe("GET /api/users", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
    });

    it("should retreive current data authenticated user", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .get("/api/users/current")
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.username).toBeDefined();
        expect(response.body.data.email).toBeDefined();
    });

    it("should reject retreive current data authenticated user if not login", async () => {
        const response = await supertest(web)
            .get("/api/users/current");

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});