const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const { host, port } = require('./config/index');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Swagger Nodejs",
        version: "1.0.0",
        description: "Documentar con swagger",
        contact: {
            name: "Rene",
            url: "http://github.com/lskywolfll",
            email: "lskywolfll@gmail.com"
        }
    },
    basePath: "/",
    server: [
        {
            url: `http://${host}:${port}`
        },
        {
            url: `http://${host}`
        }
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    schemas: ["http", "https"],
};

const routesApis = ["routes/*.js"];

const options = {
    swaggerDefinition,
    apis: routesApis,
};

const specs = swaggerJSdoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api-docs", swaggerUI.serve);
app.get("/api-docs", swaggerUI.setup(specs, { swaggerOptions: options }));

app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Server running on: http://${host}:${port}`);
})