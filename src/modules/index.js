const express = require('express');
const app = express();

app.listen(5000,  () => { //callback function
    console.log("server started on port 5000")
});