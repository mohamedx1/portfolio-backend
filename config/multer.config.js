const multer = require("multer");
const path = require("path");

// فلترة الملفات المسموح بها (صور فقط)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = [".svg", ".jpg", ".png", ".jpeg"]; // ✅ كلها تبدأ بـ .
  if (!allowed.includes(ext)) {
    return cb(new Error("Only image files are allowed!"), false); // ✅ صح
  }
  cb(null, true);
};

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const MP = 1024 * 1024; // 1MB

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * MP },
});

function handleSingleImage(fieldName) {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
}

module.exports = { handleSingleImage };
