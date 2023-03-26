const qiniu = require("qiniu");
const config = require("../config/config");
// 将图片文件上传至七牛云
module.exports = function uploadToQiNiu(filePath, key) {
  const mac = new qiniu.auth.digest.Mac(config.ACCESSKEY, config.SECRETKEY);
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: config.BUCKET,
  });
  console.log(filePath);
  // 生成上传token
  const uploadToken = putPolicy.uploadToken(mac);
  const PersonConfig = new qiniu.conf.Config();
  PersonConfig.zone = qiniu.zone.Zone_z2;
  const formUploader = new qiniu.form_up.FormUploader(PersonConfig);
  const putExtra = new qiniu.form_up.PutExtra();
  // 文件上传
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, filePath, putExtra, function (resErr, resBody, resInfo) {
      if (resErr) reject(resErr);
      else {
        resolve(resBody);
      }
    });
  });
};
