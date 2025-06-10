import ratelimiter from "../config/upstash.js";

// We are gonna create our own middleware and remember middleware also has a next()
const rateMiddleWare = async (req, res, next) => {
  try {
    // a indentifier like userId or ip-address should be passed!
    const { success } = await ratelimiter.limit("my-rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests. Try again later!" });
    }
    next();
  } catch (error) {
    console.log("Rate Limit Error!");
    next(error);
  }
};

export default rateMiddleWare;
