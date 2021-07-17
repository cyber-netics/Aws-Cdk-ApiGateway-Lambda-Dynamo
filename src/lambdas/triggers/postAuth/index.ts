const redis = require("redis");

const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_ENDPOINT,
});

exports.handler = (event: any, _: any, callback: any) => {
  client.on("error", function (err: any) {
    console.log("----Client on error----");
    client.quit();
    callback(err, {
      statusCode: 502,
    });
  });

  client.set("card", "apple", function (err: any) {
    if (err) throw err;
  });

  client.get("card", function (err: any, res: any) {
    if (err) throw err;
    console.log("res", res);
  });

  client.quit();

  callback(null, {
    statusCode: 200,
    body: "Redis success",
  });
};
