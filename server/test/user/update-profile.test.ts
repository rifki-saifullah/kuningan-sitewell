import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest } from "../test-utils";

describe("PUT /api/users/profile", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
    });

    it("should update user profile", async () => {
        const { token, type } = await AuthTest.login();
        const NEW_USERNAME = "NewUsername";
        const NEW_EMAIL = "newemail@mail.me";

        const response = await supertest(web)
            .put("/api/users/profile")
            .set("Authorization", `${type} ${token}`)
            .send({
                username: NEW_USERNAME,
                email: NEW_EMAIL,
            });

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.username).toBe(NEW_USERNAME);
        expect(response.body.data.email).toBe(NEW_EMAIL);
    });

    it("should reject update user profile if request is invalid", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .put("/api/users/profile")
            .set("Authorization", `${type} ${token}`)
            .send({
                username: "",
                email: "",
            });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject update user profile if not login", async () => {
        const { token, type } = await AuthTest.login();

        const response = await supertest(web)
            .put("/api/users/profile")
            .send({
                username: "Username Updated",
                email: "emailupdated@mail.me",
            });

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});