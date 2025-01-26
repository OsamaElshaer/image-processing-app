const request = require("supertest");
const app = require("../../src/loaders/app");
const fs = require("fs");
const path = require("path");

describe("Image Upload Route", () => {
    test("should upload an image successfully", async () => {
        const processOption = [
            { type: "resize", width: 500, height: 400 },
            { type: "compress", quality: 50 },
        ];

        const response = await request(app)
            .post("/api/images/upload")
            .attach("image", path.join(__dirname, "../fixtures/test-image.jpg"))
            .field("process_option", JSON.stringify(processOption))
            .expect(200);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            "message",
            "Image uploaded successfully!"
        );
        expect(response.body).toHaveProperty("imageUrl");

        const filePath = path.join(
            __dirname,
            "../../uploads/",
            path.basename(response.body.imageUrl)
        );
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });

    test("should return error for invalid file type", async () => {
        const response = await request(app)
            .post("/api/images/upload")
            .attach(
                "image",
                path.join(__dirname, "../fixtures/invalid-file.txt")
            );

        expect(response.status).toBe(500);
    });
});
