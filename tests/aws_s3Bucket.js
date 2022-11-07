// Import required AWS SDK clients and commands for Node.js.
import { ListBucketsCommand, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { expect, assert } from "chai";
import { s3Client } from "../libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.

const BUCKET_NAME = "seau-test-schevuru-ws68rtu2gryj"
const CONTENT_KEY = "samplefile_9d0ccca0-ac99-44b2-aae6-edfa0d18c1b5.json"

describe("Shell AWS S3 Bucket testing",async()=>{
    it("Verify s3 bucket (seau-test-schevuru-ws68rtu2gryj) exists and has atleast one item in it",async()=>{
        let s3Bucket =await getBucket(BUCKET_NAME);
        expect(s3Bucket.Name, 'Bucket not found in the Sydney region').equal("seau-test-schevuru-ws68rtu2gryj");

     })   

     it("Verify given bucket has atleast one item in it",async()=>{
      let s3Bucket =await getBucket(BUCKET_NAME);
      expect(s3Bucket.Contents.length, 'Should be atleast one item in the given bucket').equals(1);

   }) 
     it('Verify s3 bucket content has items with ("userid" =1)',async()=>{
        let data =await getContent(BUCKET_NAME, CONTENT_KEY);
      expect(JSON.stringify(data)).contains('"userId":1')

     })  

})

//Get S3Bucket Object
async function getBucket(bucketName) {
    try {
        const data = await s3Client.send(new ListObjectsCommand({ Bucket: bucketName }));
        return data;
      } catch (error) {
        return error;
      }
}
// Get Content of the given S3 Bucket
async function getContent(bucketName,key) {
    try {
      const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      });

        const data = await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));

        const bodyContents = await streamToString(data.Body);
        let jsonData = JSON.parse(bodyContents)
      // console.log(jsonData)
        return jsonData; 
      } catch (error) {
        return error;
      }
}



    

