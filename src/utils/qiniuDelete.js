const qiniu = require("qiniu");
const config = require("../config/config");
// 删除指定文件
module.exports = function deleteQiNiuFile(key) {
  var mac = new qiniu.auth.digest.Mac(config.ACCESSKEY, config.SECRETKEY);
  var Config = new qiniu.conf.Config();
  Config.zone = qiniu.zone.Zone_z2; // 华南
  var bucketManager = new qiniu.rs.BucketManager(mac, Config);

  return new Promise((resolve, reject) => {
    bucketManager.delete(config.BUCKET, key, function (err, respBody, respInfo) {
      if (err) {
        reject(err);
      } else {
        resolve(respBody);
      }
    });
  });
};
