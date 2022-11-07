# Getting Started

This is a standard NodeJS project, with the `package.json`.

To get started, run the follwoing `bash` command.

```bash
npm install
```

## Environment Configuration

[WEB]
Manually register a new account in nopcommerce (https://demo.nopcommerce.com/) to replace <correct password> in the below `.env` variables

[AWS]
An AWS account witha pre-configured VPC, IAM Account 

[API]
Pre-requisite to get REST API Base URL snd its API Key from Amazon API Gateway Service

[S3-Bucket]
Requires an AWS ClientId/Secret to setup AWS profile for AWS SDK to connect to AWS

Environment configuration is hnadled through [dotenv](https://www.npmjs.com/package/dotenv)

- Created `.env` file in the root directory
- Set the environment variables manually

Here `.env` file contains below variables to login to the applicaiton. 



API_BASE_URL=<https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/>
API_ENDPOINT=/pets
API_KEY=<API key to pass for authentication>
UI_USERNAME=<username>
UI_PASSWORD=<correct password>
INVALID_PASSWORD=<invalid password>

# Running Tests

Tests are run by using the following `bash` command.

```bash
npm run ui_test
```

```bash
npm run api_test
```

```bash
npm run s3_test
```

# Test Reports

 ### Generated in Junit Format and saved in the test-results folder
