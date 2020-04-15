const { Storage } = require('@google-cloud/storage');
const ErrorResponse = require('../http/ErrorResponse');
const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_STORAGE_PROJECT_ID;
const GOOGLE_CLOUD_KEYFILE = './googleStorageKey.json';

const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});

function getPublicUrl(filename, folder) {
    return `https://storage.googleapis.com/${process.env.GOOGLE_STORAGE_BUCKET}/app/${folder}/${filename}`
};

const sendUploadToGCS = (req, res, next) => {
    const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET)
    if (!req.file || !req.query.folder) {
        console.log(req.query.folder)
        console.log(req.file)
        return next(new ErrorResponse(400, 'No file or no folder specified'));
    }
    console.log(req.file.originalname)
    const gcsname = Date.now() + req.file.originalname
    const file = bucket.file(`app/${req.query.folder}/${gcsname}`)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        },
        resumable: false
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        return next(new ErrorResponse(500, 'Error on file upload', err));
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname, req.query.folder)
            next()
        })
    })
    stream.end(req.file.buffer)
};

module.exports = {
    sendUploadToGCS
}