import multer from "multer";

import path from "path";

// STORAGE CONFIG

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
      path.extname(file.originalname)
    );
  },
});

// FILE FILTER

const fileFilter = (req, file, cb) => {

  const allowedTypes = [

    "application/pdf",

    "image/png",

    "image/jpeg",

    "image/jpg",
  ];

  if (
    allowedTypes.includes(file.mimetype)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF, PNG, JPG, JPEG files allowed"
      ),
      false
    );
  }
};

// MULTER CONFIG

const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export default upload;