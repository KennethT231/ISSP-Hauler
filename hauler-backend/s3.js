require('dotenv').config()

const { PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})


async function uploadImage(imageBuffer, imageName, mimetype) {
    // Create params that the S3 client will use to upload the image
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: imageBuffer,
        ContentType: mimetype
    }

    // Upload the image to S3
    const command = new PutObjectCommand(params)
    const data = await s3Client.send(command)

    return data
}



async function getSignedUrls(fileName) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName
    })

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 })

    return signedUrl
}

async function deleteFile(fileName) {
    const params = {
        Bucket: bucketName,
        Key: fileName
    }

    const command = new DeleteObjectCommand(params)
    const data = await s3Client.send(command)

    return data
}

module.exports = {
    uploadImage,
    getSignedUrls,
    deleteFile
}
