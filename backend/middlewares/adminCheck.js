const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {
    const token = await request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "fijdfiodjfoiejfoiewioajoijfoijfjidfj"
    );
    const user = decodedToken;
    request.user = user;
    // console.log("admin verified");
    next();
  } catch (error) {
    response.status(404).send({ error: "You are not Authorized Admin" });
  }
};
