import axios from 'axios';
import {expect, assert} from 'chai';
import dotenv from "dotenv";

dotenv.config();
const headers_with_apikey = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
}

const headers_without_apikey = {
    'Content-Type': 'application/json'
}

const testData1 = {type: 'Test', price: 23.00}

describe("Shell AWS API Gateway Testing",async()=>{
    // let  actualResponse;
    it("Verify that the Forbidden message appears without API Key",async()=>{
        const response = await getResponse(headers_without_apikey);
        const expectedErrorMessage = "Forbidden";
        let actualErrorMessage;
        if (response.data === undefined) {  
            actualErrorMessage = response.response.statusText;
        } 
        expect(actualErrorMessage, 'Error message is not matched').to.equal(expectedErrorMessage);         
     })   

     it("Verify response status is 200",async()=>{
        const response = await getResponse(headers_with_apikey);
        const expectedStatus = 200;
        let actualStatus;
        if (response.data != undefined) {
            actualStatus = response.status;  
        } else{
            actualStatus = response.response.status;
        }
        expect(actualStatus  , 'Status code is not matched').to.equal(expectedStatus);   
     })   

    it("Verify number of pets in the response is 3",async()=>{
        const response = await getResponse(headers_with_apikey);
        const expectedLength = 3;
        let actualLength;
        if (response.data != undefined) {
            actualLength = response.data.length;  
        } else{
            actualLength = Object.keys(response.response.data).length;
        }
        expect(actualLength  , 'Response data length is not matched').to.equal(expectedLength); 
     })

     it("Verify response json has expected  after POST request",async()=>{
        const response = await postResponse(headers_with_apikey, testData1);
        const expectedPostMessage = {message:"success"};
        let actualPostMessage;
        if (response.data != undefined) {
            actualPostMessage = response.data;  
        } else{
            actualPostMessage = response.response.data;
        }
        assert.include(actualPostMessage, expectedPostMessage,  'Response json not as expected');
     })  
    
})

/** GET REQUEST
 * Funcction to return the response of the given API Endpoint
 * @param {API Authorisation token} header 
 * @returns 
 */
async function getResponse(header) {
const responseBody =   await axios.get(process.env.API_BASE_URL+process.env.API_ENDPOINT, {headers: header})
    .then(function (output) {
      // handle success
      return output;
    })
    .catch(function (error) {
      // handle error
      return error;
    })
return responseBody;
}

/**
 * POST REQUEST
 * @param {API Authorisation Token} header 
 * @param {JSON Paylod} data 
 * @returns 
 */
async function postResponse(header, data){

const responseBody =   
    await axios.post(
                    process.env.API_BASE_URL+process.env.API_ENDPOINT,
                    data,
                    {headers: header}
                    )
    .then(function (output) {
      // handle success
      return output;
    })
    .catch(function (error) {
      // handle error
      return error;
    })
return responseBody;
}