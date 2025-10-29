import supertest from "supertest";
import { web } from "../../src/application/web";
import { DEFAULTS, UserTest } from "../test-utils";

describe("POST /api/auths", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
    });

    it("should login with correct credentials", async () => {
        const response = await supertest(web)
            .post("/api/auths/login")
            .send({
                email: DEFAULTS.USER.EMAIL,
                password: DEFAULTS.USER.PASSWORD,
            });

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.token).toBeDefined();
        expect(response.body.data.expires_in).toBe(3600);
        expect(response.body.data.type).toBe("Bearer");
    });

    it("should reject login if request is invalid", async () => {
        const response = await supertest(web)
            .post("/api/auths/login")
            .send({
                email: "",
                password: "",
            });

        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject login if wrong email", async () => {
        const response = await supertest(web)
            .post("/api/auths/login")
            .send({
                email: "wrong@mail.me",
                password: "securepass",
            });

            console.log(response.body.data);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject login if wrong password", async () => {
        const response = await supertest(web)
            .post("/api/auths/login")
            .send({
                email: "test@mail.me",
                password: "wrong-password",
            });

            console.log(response.body.data);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});