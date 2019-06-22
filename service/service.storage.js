const { Storage } = require("@google-cloud/storage");
const path = require("path");

const projectId = require("../config/keys").projectId;
//const keyFilename = path.resolve();
const storage = new Storage({ projectId, keyFilename });
const bucketName = "unihub-assignments";

class GoogleCloudStorageService {

    // Makes an authenticated API request.
    static async uploadFileToGoogleCloudStorage(uploaded) {

        const bucket = await storage.bucket(bucketName);

        const gcsname = uploaded.name;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: uploaded.mimetype
            }
        });

        stream.on('error', (err) => {
            uploaded.cloudStorageError = err;
            console.log(err)
        });

        stream.on('finish', () => {
            uploaded.cloudStorageObject = gcsname;
            file.makePublic().then(() => {
                uploaded.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
            });
        });

        stream.end(uploaded.file.buffer);

    }

}

module.exports = GoogleCloudStorageService;