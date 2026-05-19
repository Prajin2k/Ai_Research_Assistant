import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const protect = async (
  req,
  res,
  next
) => {

  let token;

  if (

    req.headers.authorization &&

    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {

    try {

      token =
        req.headers.authorization.split(
          " "
        )[1];

      console.log(
        "TOKEN:",
        token
      );

      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET
        );

      console.log(
        "DECODED:",
        decoded
      );

      req.user =
        await User.findById(
          decoded.id
        ).select("-password");

      console.log(
        "REQ USER:",
        req.user
      );

      if (!req.user) {

        return res.status(401).json({
          message:
            "User not found",
        });
      }

      next();

    } catch (error) {

      console.log(error);

      return res.status(401).json({
        message:
          "Not authorized",
      });
    }

  } else {

    return res.status(401).json({
      message:
        "No token",
    });
  }
};