const request = require("supertest");
const path = require("path");
const app = require("../../src/loaders/app");

describe("POST /api/images/upload", () => {
    let token;

    beforeAll(async () => {
        token = "";
    });

    const processOption = JSON.stringify([
        { type: "resize", width: 500, height: 400 },
        { type: "compress", quality: 50 },
    ]);

    it("should upload an image successfully", async () => {
        const res = await request(app)
            .post("/api/images/upload")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "multipart/form-data")
            .field("process_option", processOption)
            .attach(
                "image",
                path.resolve(__dirname, "..", "fixtures", "test-image.jpg")
            );

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty(
            "message",
            "Image uploaded successfully!"
        );
        expect(res.body).toHaveProperty("imageId");
    });
    it("should return the status and image URL for a valid image ID", async () => {
        const imageId = 10;

        const res = await request(app)
            .get(`/api/images/status?imageId=${imageId}`)
            .expect(200);

        expect(res.body).toHaveProperty("status", "completed");
        expect(res.body).toHaveProperty("imageUrl");
    });
});
