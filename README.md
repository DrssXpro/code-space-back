# Code Space 后端部分
注意config文件夹下的config.js文件已被忽略，具体格式如下，按照格式配置即可：
```javascript
// 数据库配置
const APP_PORT = "xxx";
const MYSQL_HOST = "xxx";
const MYSQL_PORT = "xxx";
const MYSQL_DATABASE = "codespace";
const MYSQL_USER = "xxx";
const MYSQL_PASSWORD = "xxx";

// 七牛云图床配置
const ACCESSKEY = "xxx";
const SECRETKEY = "xxx";
const BUCKET = "xxx";
const ORIGIN = "xxx";
// 邮件发送验证码配置
const EMIAL = "xxx";
const EMIAL_CODE = "xxx";
const MD5_KEY = "code_space_fsy";
const LOGIN_KEY = "code_space_login";
const LANGUAGE = ["JavaScript", "Java", "Python", "PHP", "CSS", "cpp", "Vue"];

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  ACCESSKEY,
  SECRETKEY,
  BUCKET,
  ORIGIN,
  EMIAL,
  EMIAL_CODE,
  MD5_KEY,
  LOGIN_KEY,
  LANGUAGE,
};