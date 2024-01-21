// TODO: Increase descriptions of endpoints https://davibaltar.medium.com/documenta%C3%A7%C3%A3o-autom%C3%A1tica-de-apis-em-node-js-com-swagger-parte-2-usando-openapi-v3-cbc371d8c5ee
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes/*.ts", "./src/routes/auth/*.ts"];

swaggerAutogen(outputFile, endpointsFiles);
