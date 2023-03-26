module.exports = {
  ROLE: {
    SUCCESS_CREATE: {
      code: 1000,
      message: "创建成功",
    },
    SUCCESS_GET: {
      code: 1000,
      message: "获取成功",
    },
    SUCCESS_UPDATE: {
      code: 1000,
      message: "修改成功",
    },
    SUCCESS_DELETE: {
      code: 1000,
      message: "删除成功",
    },

    ERROR_NAME: {
      code: 1001,
      message: "名称不符合规范",
    },
    ERROR_INTRODUCE: {
      code: 1001,
      message: "简介不符合规范",
    },
    ERROR_PARAM: {
      code: 1002,
      message: "参数不符合规范",
    },
    ERROR_LENGTH: {
      code: 1002,
      message: "参数长度不符合规范",
    },
    ERROR_MENU: {
      code: 1002,
      message: "参数权限列表不符合规范",
    },
    ERROR_ROLE: {
      code: 1003,
      message: "当前登录的角色无权限访问",
    },
    CANT_DELETE: {
      code: 1004,
      message: "内置角色不能编辑或删除",
    },
  },
  USER: {
    SUCCESS_CREATE: {
      code: 1000,
      message: "创建成功",
    },
    SUCCESS_GET: {
      code: 1000,
      message: "获取成功",
    },
    SUCCESS_UPDATE: {
      code: 1000,
      message: "修改成功",
    },
    SUCCESS_DELETE: {
      code: 1000,
      message: "删除成功",
    },
    SUCCESS_LOGIN: {
      code: 1000,
      message: "登录成功",
    },
    SUCCESS_REGISTER: {
      code: 1000,
      message: "注册成功",
    },
    SUCCESS_UPLOAD: {
      code: 1000,
      message: "上传成功",
    },
    ERROR_UPLOAD: {
      code: 1001,
      message: "上传失败",
    },
    ERROR_PARAM: {
      code: 1001,
      message: "参数不符合规范",
    },
    ERROR_PASSWORD: {
      code: 1002,
      message: "用户密码错误",
    },
    ERROR_ROLE: {
      code: 1003,
      message: "当前登录的角色无该权限",
    },
    USER_NOTFOUND: {
      code: 1004,
      message: "该用户信息未注册",
    },
    INFO_REPEAT: {
      code: 1004,
      message: "该用户名或昵称已被注册",
    },
    NAME_REPEAT: {
      code: 1004,
      message: "该用户名已被注册",
    },
    EMAIL_REPEAT: {
      code: 1004,
      message: "该邮箱已被注册",
    },
    EMAIL_ERROR: {
      code: 1004,
      message: "邮箱格式不正确",
    },
    NAME_LENGTH: {
      code: 1005,
      message: "昵称过长或过短",
    },
    UPADTE_AUTH: {
      code: 1006,
      message: "不能修改他人的个人信息",
    },
    INFO_NOTFOND: {
      code: 1007,
      message: "未查询到该用户信息",
    },
    VERIFY_SPACE: {
      code: 1008,
      message: "您暂未加入空间，不能访问。",
    },
    NO_TOKEN: {
      code: 1100,
      message: "没有身份凭证，无法操作",
    },
    VERIFY_TOKEN: {
      code: 1100,
      message: "身份凭证已失效，请重新登录",
    },
    IS_ADMIN: {
      code: 1111,
      message: "管理身份无法进行该操作",
    },
    ERROR_SIZE: {
      code: 1009,
      message: "头像上传文件过大",
    },
  },
  MENU: {
    SUCCESS_CREATE: {
      code: 1000,
      message: "创建成功",
    },
    SUCCESS_UPDATE: {
      code: 1000,
      message: "修改成功",
    },
    SUCCESS_DELETE: {
      code: 1000,
      message: "删除成功",
    },
    SUCCESS_GET: {
      code: 1000,
      message: "获取成功",
    },
    ERROR_PARAM: {
      code: 1002,
      message: "参数不符合规范",
    },
  },
  SPACE: {
    SUCCESS_CREATE: {
      code: 1000,
      message: "创建成功",
    },
    SUCCESS_UPDATE: {
      code: 1000,
      message: "修改成功",
    },
    SUCCESS_DELETE: {
      code: 1000,
      message: "删除成功",
    },
    SUCCESS_GET: {
      code: 1000,
      message: "获取成功",
    },
    SUCCESS_JOIN: {
      code: 1000,
      message: "加入成功",
    },
    SUCCESS_EXIT: {
      code: 1000,
      message: "退出成功",
    },
    SUCCESS_IN: {
      code: 1000,
      message: "成功进入",
    },
    SUCCESS_KICK: {
      code: 1000,
      message: "踢出成功",
    },
    SUCCESS_INVITE: {
      code: 1000,
      message: "邀请成功",
    },
    SUCCESS_UPLOAD: {
      code: 1000,
      message: "上传成功",
    },
    ERROR_PARAM: {
      code: 1002,
      message: "参数不符合规范",
    },
    USER_NOTFOUND: {
      code: 1003,
      message: "不存在该用户，无法进行该操作",
    },
    ROLE_NOTALLOW: {
      code: 1004,
      message: "该用户无操作权限",
    },
    SPACE_EXIST: {
      code: 1005,
      message: "该用户已有空间，无法进行该操作",
    },

    SPACE_NOT_FOUND: {
      code: 1006,
      message: "该空间不存在",
    },
    INVITE_ERROR: {
      code: 1006,
      message: "邀请码错误",
    },
    SPACE_ALREADY_EXIST: {
      code: 1006,
      message: "您已经加入该空间，不能重复加入。",
    },
    ERROR_KICK: {
      code: 1007,
      message: "不能踢出自己",
    },

    NAME_LENGTH: {
      code: 1007,
      message: "用户名过长或过短",
    },
    ERROR_EMAIL: {
      code: 1007,
      message: "邮箱不符合规范",
    },
    ERROR_ROLE: {
      code: 1008,
      message: "不存在该角色",
    },
    ERROR_UPLOAD: {
      code: 1008,
      message: "上传失败",
    },
    ERROR_SIZE: {
      code: 1008,
      message: "头像上传文件过大",
    },
    NO_SPACE: {
      code: 1009,
      message: "未加入空间，无访问权限",
    },
  },
  EMAIL: {
    SUCCESS_SEND: {
      code: 1000,
      message: "发送成功,请查看自己的邮箱",
    },
    SUCCESS_VERIFY: {
      code: 1000,
      message: "重置密码成功",
    },
    ERROR_PARAM: {
      code: 1001,
      message: "参数不符合规范",
    },
    ERROR_CODE: {
      code: 1002,
      message: "验证码错误，请重新获取",
    },
    ERROR_TIME: {
      code: 1002,
      message: "发送验证码过于频繁",
    },
    ERROR_FORMAT: {
      code: 1002,
      message: "邮箱格式错误",
    },
    ERROR_EMAIL: {
      code: 1002,
      message: "该用户未使用该邮箱注册",
    },
    CODE_PARAM: {
      code: 1003,
      message: "邮箱验证码不符合规范",
    },
  },
  TASK: {
    SUCCESS_GET: {
      code: 1000,
      message: "获取成功",
    },
    SUCCESS_CREATE: {
      code: 1000,
      message: "创建成功",
    },
    SUCCESS_UPDATE: {
      code: 1000,
      message: "修改成功",
    },
    SUCCESS_DELETE: {
      code: 1000,
      message: "删除成功",
    },

    ERROR_PARAM: {
      code: 1001,
      message: "参数不符合规范",
    },
    ERROR_SPACE: {
      code: 1002,
      message: "该用户不在该空间中，无法创建",
    },
    ERROR_ROLE: {
      code: 1002,
      message: "该用户无操作权限",
    },
    ERROR_TIME: {
      code: 1002,
      message: "发送验证码过于频繁",
    },
    ERROR_FORMAT: {
      code: 1002,
      message: "邮箱格式错误",
    },
    ERROR_EMAIL: {
      code: 1002,
      message: "该用户未使用该邮箱注册",
    },
    CODE_PARAM: {
      code: 1003,
      message: "邮箱验证码不符合规范",
    },
  },
  CODE: {
    SUCCESS_CREATE: {
      code: 1000,
      message: "创建成功",
    },
    SUCCESS_GET: {
      code: 1000,
      message: "获取成功",
    },
    SUCCESS_UPDATE: {
      code: 1000,
      message: "修改成功",
    },
    SUCCESS_DELETE: {
      code: 1000,
      message: "删除成功",
    },
    SUCCESS_OPERATOR: {
      code: 1000,
      message: "操作成功",
    },
    SUCCESS_LIKE: {
      code: 1000,
      message: "点赞成功",
    },
    SUCCESS_COLLECT: {
      code: 1000,
      message: "收藏成功",
    },
    SUCCESS_COLLECT_CANCEL: {
      code: 1000,
      message: "取消收藏",
    },
    ERROR_PARAM: {
      code: 1001,
      message: "参数不符合规范",
    },
    ERROR_PWD: {
      code: 1001,
      message: "输入的密码不符合规范",
    },
    ERROR_LAN: {
      code: 1001,
      message: "语言选择不符合规范",
    },
    ERROR_TASK: {
      code: 1001,
      message: "该任务不存在",
    },
    TITLE_LENGTH: {
      code: 1001,
      message: "标题过长",
    },
    PWD_LENGTH: {
      code: 1001,
      message: "设置的密码过长或过短",
    },
    CODE_LENGTH: {
      code: 1001,
      message: "代码过长或过短",
    },
    CODE_NO_POWER: {
      code: 1003,
      message: "没有权限进行该操作",
    },

    CODE_NOT_EXIST: {
      code: 1002,
      message: "代码不存在",
    },
    CODE_NOT_PWD: {
      code: 1102,
      message: "代码未加密",
    },
    CODE_ALLOW_PWD: {
      code: 1102,
      message: "本人访问，无需密码",
    },
    CODE_HAS_PWD: {
      code: 1101,
      message: "代码加密",
    },
    CODE_PWD_EEROR: {
      code: 1101,
      message: "输入密码错误",
    },
    CODE_NO_ALLOW: {
      code: 1103,
      message: "该用户没有访问权限",
    },
  },
  COMMENT: {
    SUCCESS_CREATE: {
      code: 1000,
      message: "评论成功",
    },
    SUCCESS_GET: {
      code: 1000,
      message: "获取成功",
    },
    SUCCESS_UPDATE: {
      code: 1000,
      message: "修改成功",
    },
    SUCCESS_DELETE: {
      code: 1000,
      message: "删除成功",
    },
    SUCCESS_LIKE: {
      code: 1000,
      message: "点赞成功",
    },
    ERROR_PARAM: {
      code: 1001,
      message: "参数不符合规范",
    },
    COMMENT_LONG: {
      code: 1001,
      message: "评论内容过长或过短",
    },
  },
};
