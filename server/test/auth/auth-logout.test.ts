import supertest from "supertest";
import { web } from "../../src/application/web";
import { initRedis } from "../../src/application/redis";
import { AuthTest, UserTest } from "../test-utils";

describe("POST /api/auths/logout", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
        await initRedis();
    });

    afterEach(async () => {
        await UserTest.reset();
    });

    it("should logout with authenticated user", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .post("/api/auths/logout")
            .set("Authorization", `${type} ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data).toBe("OK");
    });
});