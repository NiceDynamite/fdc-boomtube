require('dotenv').config()
const aws = require('aws-sdk')
const crypto = require('crypto')
const { promisify } = require('util')

const randomBytes = promisify(crypto.randomBytes)

const region = process.env.BUCKET_REGION
const bucketName = 's3-tutorial-temporary'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')  
  console.log(`imageName: ${imageName}`)
  console.log(`bucketName: ${bucketName}`)
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  console.log(uploadURL)
  return uploadURL
}
