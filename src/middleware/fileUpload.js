const Multer = require("koa-multer");

const UploadAvatar = Multer({
  dest: "./publicPic",
});

const UploadSpace = Multer({
  dest: "./publicPic",
});

// 个人头像
const avatarHandler = UploadAvatar.single("avatar");
// 空间头像
const spaceHandler = UploadSpace.single("space");

module.exports = { avatarHandler, spaceHandler };
