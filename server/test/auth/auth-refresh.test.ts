import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest } from "../test-utils";

describe("POST /api/refresh", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
    });

    it("should refresh token with authenticated user", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .post("/api/auths/refresh")
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.expires_in).toBe(3600);
        expect(response.body.data.type).toBe("Bearer");
    });
});