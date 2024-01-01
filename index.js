const express = require("express");
const caw = require("cf-api-wrapper");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

caw.user.info({ handles: "coder_ravan" }).then(function (result) {
  console.log(result);
});

// SHA512 Hashing function

