//use strict';
const axios = require("axios");

module.exports.fetchData = async (req, res, next) => {
  console.log("Fetch data");
  const path = req.originalUrl.split("=")[0];
  const { search } = req.query;

  const url = `https://www.wildberries.ru${path}=${search}`;
  await axios
    .get(url)
    .then((resp) => {
      res.status(200).json(resp.data);
    })
    .catch((err) => {
      err = new Error(err.statusText || "Fail to fetch data");
      next(err);
    });
  console.log("Fetching data");
  // console.log(`www.wildberries.com${path}=${search}`);
};
