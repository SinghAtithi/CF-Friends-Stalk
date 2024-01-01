const express = require("express");
const caw = require("cf-api-wrapper");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const axios = require("axios");
const SHA512 = require("crypto-js/sha512");
const codeforces = require("codeforces-api");

const KEY = process.env.KEY;
const SECRET = process.env.SECRET;

dotenv.config();
codeforces.setApis(KEY, SECRET);

const hash = (string) => {
  return SHA512(string).toString();
};

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const getAllFriends = () => {
  return new Promise((resolve, reject) => {
    codeforces.user.friends({}, function (err, data) {
      if (err) {
        reject(err); // Reject the Promise if there's an error
      } else {
        resolve(data); // Resolve the Promise with the fetched data
      }
    });
  });
};

const getLatestSubmission = (handle) => {
  return new Promise((resolve, reject) => {
    codeforces.user.status(
      { handle: handle[0], count: 5 },
      function (err, data) {
        if (err) {
          reject(err); // Reject the Promise if there's an error
        } else {
          resolve(data); // Resolve the Promise with the fetched data
        }
      }
    );
  });
};

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const mainFunc = async () => {
  try {
    const friends = await getAllFriends();
    setTimeout(() => {}, 2000);
    friends.map(async (friend) => {
    //   console.log(friend);
      const latestSubmission = await getLatestSubmission(friends);
      console.log(latestSubmission);
      setTimeout(() => {}, 2000);
    });
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
};

mainFunc();

// setTimeout(mainFunc, 10000);
