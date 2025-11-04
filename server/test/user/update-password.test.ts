import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, DEFAULTS, UserTest } from "../test-utils";

describe("PUT /api/users/password", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
    });

    it("should update user password", async () => {
        const { token, type } = await AuthTest.login();
        const CURRENT_PASSWORD = DEFAULTS.USER.PASSWORD;

        const response = await supertest(web)
            .put("/api/users/password")
            .set("Authorization", `${type} ${token}`)
            .send({
                current_password: CURRENT_PASSWORD,
                new_password: "newSecurePassword123",
            });

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data).toBe("OK");
    });

    it("should reject update user password if invalid request", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .put("/api/users/password")
            .set("Authorization", `${type} ${token}`)
            .send({
                current_password: "",
                new_password: "",
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject update user password if current password is wrong", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .put("/api/users/password")
            .set("Authorization", `${type} ${token}`)
            .send({
                current_password: "wrong-current-password",
                new_password: "newpassword",
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject update user password if user not login", async () => {
        const { token, type } = await AuthTest.login();
        const CURRENT_PASSWORD = DEFAULTS.USER.PASSWORD;

        const response = await supertest(web)
            .put("/api/users/password")
            .send({
                current_password: CURRENT_PASSWORD,
                new_password: "newpassword",
            });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});