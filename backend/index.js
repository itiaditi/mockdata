const express = require("express");
const { connection } = require("./dbConfig/connectToDb");
const { userRouter } = require("./route/user.route");
const { taskRouter } = require("./route/task.route");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
require('dotenv').config();
const PORT =process.env.PORT;
app.use(express.json());
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task Management',
        version: '1.0.0',
      },
    },
    server: [
        {
        url:"http://localhost:4000"
        },
        {
        url:"http://localhost:4000"
        }
    ],
    apis:['./route/*.js'] // files containing annotations as above
  };
  const openapiDocument = swaggerJsdoc(options);
app.use('/task', swaggerUi.serve, swaggerUi.setup(openapiDocument));
app.use("/users",userRouter);
app.use("/tasks",taskRouter);
app.listen(PORT,async()=>{
    await connection
    console.log("connected to db");
    console.log(`Server is running at ${PORT}`)
})