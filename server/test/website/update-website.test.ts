import supertest from "supertest";
import { web } from "../../src/application/web";
import { AuthTest, UserTest, WebsiteTest } from "../test-utils";

describe("PUT /api/websites/:websiteId", () => {
    beforeEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.reset();
        await WebsiteTest.reset();
    });

    it("should update website data", async () => {
        const { token, type } = await AuthTest.login();
        const website = await WebsiteTest.create();

        const updatePayload = {
            name: "Updated Website",
            url: "https://updated-example.com",
            description: "An updated example website",
        };

        const response = await supertest(web)
            .put(`/api/websites/${website.id}`)
            .set("Authorization", `${type} ${token}`)
            .send({
                name: updatePayload.name,
                url: updatePayload.url,
                description: updatePayload.description,
            });

        expect(response.status).toBe(200);
        expect(response.body.errors).toBeUndefined();
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.name).toBe(updatePayload.name);
        expect(response.body.data.url).toBe(updatePayload.url);
        expect(response.body.data.description).toBe(updatePayload.description);
    });
});