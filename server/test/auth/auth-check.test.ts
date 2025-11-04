import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest } from "../test-utils";

describe("POST /api/auths/check", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
    });

    it("should check token with authenticated user", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .post("/api/auths/check")
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data).toBe("OK");
    });
});