/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : codespace

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 26/03/2023 18:03:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `preview` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `liked` int NULL DEFAULT 0,
  `views` int NULL DEFAULT 0,
  `status` tinyint NULL DEFAULT 0,
  `isPwd` tinyint NULL DEFAULT 0,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `line` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `authorId`(`authorId`) USING BTREE,
  CONSTRAINT `code_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of code
-- ----------------------------
INSERT INTO `code` VALUES ('14b35b51-340b-4056-9a6b-7fc43b061fef', 'hello world', '#include<stdio', 'cpp', '#include<stdio.h>\nint main(){\n  printf(\"hello world\");\n  return 0;\n  \n}\n\n\n', 11, 94, 1, 1, '756f41c5f1e6de9eff397ccd0a6d3ca1', '269eb910-7364-4537-b0fe-6d89a364b12c', '2023-03-14 12:01:01', '2023-03-26 08:19:29', 9);
INSERT INTO `code` VALUES ('612558a2-c659-40e6-ad9a-998fab482789', 'JS实现快排模板', 'function quickSort(arr, l, r) {\n  if (l >= r) return;\n  let i = l - 1,\n    j', 'JavaScript', 'function quickSort(arr, l, r) {\n  if (l >= r) return;\n  let i = l - 1,\n    j = r + 1,\n    x = arr[Math.floor(Math.random() * (r - l) + l)];\n  while (i < j) {\n    do i++;\n    while (arr[i] < x);\n    do j--;\n    while (arr[j] > x);\n    if (i < j) {\n      const temp = arr[i];\n      arr[i] = arr[j];\n      arr[j] = temp;\n    }\n  }\n  quickSort(arr, l, j);\n  quickSort(arr, j + 1, r);\n}', 0, 3, 1, 0, '', '860229a7-cb88-405f-8174-bfee2697dde4', '2023-03-24 09:01:34', '2023-03-26 07:51:03', 19);
INSERT INTO `code` VALUES ('80348db7-1a44-4519-b715-72e927ed84ec', '我的私密代码', '21', 'JavaScript', '21312321321', 0, 1, 2, 0, '', '860229a7-cb88-405f-8174-bfee2697dde4', '2023-03-26 02:02:02', '2023-03-26 02:02:03', 1);
INSERT INTO `code` VALUES ('a205e304-ce0a-49c2-b61f-43098aed662d', 'JS手写归并排序模板', 'function merge_sort(arr, l, r) {\n  if (l >= r) return;\n  let mid = (l + r) >> 1;\n  merge_s', 'JavaScript', 'function merge_sort(arr, l, r) {\n  if (l >= r) return;\n  let mid = (l + r) >> 1;\n  merge_sort(arr, l, mid);\n  merge_sort(arr, mid + 1, r);\n  let i = l,\n    j = mid + 1,\n    k = 0;\n  const temp = [];\n  while (i <= mid && j <= r) {\n    if (arr[i] <= arr[j]) temp[k++] = arr[i++];\n    else temp[k++] = arr[j++];\n  }\n\n  while (i <= mid) temp[k++] = arr[i++];\n  while (j <= r) temp[k++] = arr[j++];\n  for (i = l, j = 0; i <= r; i++, j++) arr[i] = temp[j];\n}', 0, 29, 1, 0, '', '860229a7-cb88-405f-8174-bfee2697dde4', '2023-03-24 09:03:46', '2023-03-26 07:48:48', 18);
INSERT INTO `code` VALUES ('ccc86751-5394-42cd-9754-7bdd30129a86', 'no password', '#include<stdio', 'cpp', '#include<stdio.h>\nint main(){\n  printf(\"hello world\");\n  return 0; \n}\n\n\n', 4, 423, 1, 0, NULL, '269eb910-7364-4537-b0fe-6d89a364b12c', '2023-03-14 12:01:24', '2023-03-26 08:19:37', 8);
INSERT INTO `code` VALUES ('f8820655-3e78-4bfd-898c-cf96acd83427', '加密代码', 'import { ref, reactive, onMounted, computed } from \"vue\";\nimport Fs', 'JavaScript', 'import { ref, reactive, onMounted, computed } from \"vue\";\nimport FsCodeMirror from \"@/components/FsCodeMirror/FsCodeMirror.vue\";\nimport { LANGUAGE } from \"@/config/config\";\nimport type { ISquareCodePayload } from \"@/types/codeType\";\nimport { addCodeBySquare } from \"@/service/api/codeRequest\";\nimport { ElMessage } from \"element-plus\";', 2, 25, 1, 1, '756f41c5f1e6de9eff397ccd0a6d3ca1', '269eb910-7364-4537-b0fe-6d89a364b12c', '2023-03-14 12:00:14', '2023-03-26 08:19:53', 6);

-- ----------------------------
-- Table structure for codespace
-- ----------------------------
DROP TABLE IF EXISTS `codespace`;
CREATE TABLE `codespace`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `preview` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `liked` int NULL DEFAULT 0,
  `views` int NULL DEFAULT 0,
  `status` tinyint NULL DEFAULT 0,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `taskId` int NULL DEFAULT NULL,
  `spaceId` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `line` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `authorId`(`authorId`) USING BTREE,
  INDEX `taskId`(`taskId`) USING BTREE,
  INDEX `spaceId`(`spaceId`) USING BTREE,
  CONSTRAINT `codespace_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `codespace_ibfk_2` FOREIGN KEY (`taskId`) REFERENCES `task` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `codespace_ibfk_3` FOREIGN KEY (`spaceId`) REFERENCES `space` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of codespace
-- ----------------------------
INSERT INTO `codespace` VALUES ('2e765488-4611-4d75-9b3c-6e248dccc908', '快排模板——c++', 'void quick_sort(int q[],int l,int r)\n{\n    if(l>=r)return;', 'cpp', 'void quick_sort(int q[],int l,int r)\n{\n    if(l>=r)return;\n    int i=l-1,j=r+1,x=q[i+j>>1];\n    while(i<j)\n    {\n        do i++;\n        while(q[i]<x);\n        do j--;\n        while(q[j]>x);\n        if(i<j)swap(q[i],q[j]);\n    }\n    if(j+1>=k)quick_sort(q,l,j);\n    else quick_sort(q,j+1,r);\n}', 0, 1, 1, '860229a7-cb88-405f-8174-bfee2697dde4', 6, 11, '2023-03-26 08:15:49', '2023-03-26 08:15:50', 15);
INSERT INTO `codespace` VALUES ('5944761f-f34b-428d-b58a-615759d251c8', '快速排序模板——JS', 'function quickSort(arr, l, r) {\n  if (l >= r) return;\n  let i = l - 1,\n    j', 'JavaScript', 'function quickSort(arr, l, r) {\n  if (l >= r) return;\n  let i = l - 1,\n    j = r + 1,\n    x = arr[Math.floor(Math.random() * (r - l) + l)];\n  while (i < j) {\n    do i++;\n    while (arr[i] < x);\n    do j--;\n    while (arr[j] > x);\n    if (i < j) {\n      const temp = arr[i];\n      arr[i] = arr[j];\n      arr[j] = temp;\n    }\n  }\n  quickSort(arr, l, j);\n  quickSort(arr, j + 1, r);\n}', 0, 2, 2, '860229a7-cb88-405f-8174-bfee2697dde4', 6, 11, '2023-03-26 08:16:31', '2023-03-26 08:31:54', 19);
INSERT INTO `codespace` VALUES ('d0a6736f-33cd-4ce5-b0b3-15b728756220', '快速排序模板——Java', 'public static void quickSort(int[] arr,int left,int right) {\n  //边界判断 跳出\n  if(left>=', 'Java', 'public static void quickSort(int[] arr,int left,int right) {\n  //边界判断 跳出\n  if(left>=right) {\n    return;\n  }\n  //选取数组最左边的元素q[left]作为pivot\n  int x=arr[left],i=left-1,j=right+1;\n  while(i<j) {\n    do {i++;}while(arr[i]<x);\n    do {j--;}while(arr[j]>x);\n    if(i<j) {\n      //交换值\n      int temp=arr[i];\n      arr[i]=arr[j];\n      arr[j]=temp;\n    }\n  }\n  //第二步：递归处理子问题\n  quickSort(arr,left,j);\n  quickSort(arr,j+1,right);\n  \n}', 0, 4, 1, '860229a7-cb88-405f-8174-bfee2697dde4', 6, 11, '2023-03-26 08:17:40', '2023-03-26 08:38:55', 22);

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `codeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `codeId`(`codeId`) USING BTREE,
  CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`codeId`) REFERENCES `code` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES (9, '860229a7-cb88-405f-8174-bfee2697dde4', 'f8820655-3e78-4bfd-898c-cf96acd83427', '2023-03-16 11:10:11', '2023-03-16 11:10:11');
INSERT INTO `collection` VALUES (10, '860229a7-cb88-405f-8174-bfee2697dde4', 'ccc86751-5394-42cd-9754-7bdd30129a86', '2023-03-16 11:10:25', '2023-03-16 11:10:25');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `commentId` int NULL DEFAULT NULL,
  `codeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `like` int NULL DEFAULT 0,
  `status` tinyint NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `rootId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `codeId`(`codeId`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`codeId`) REFERENCES `code` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '<p>我来发表个评论哈</p>\n<h1 id=\"123\"><a href=\"#123\">123</a></h1><p>测试一波可以不</p>\n', NULL, 'ccc86751-5394-42cd-9754-7bdd30129a86', 8, 1, '2023-03-16 12:53:49', '2023-03-17 10:28:55', '860229a7-cb88-405f-8174-bfee2697dde4', NULL);
INSERT INTO `comment` VALUES (2, '<p>再来一条评论鸭</p>\n', NULL, 'ccc86751-5394-42cd-9754-7bdd30129a86', 1, 1, '2023-03-16 13:00:10', '2023-03-16 13:21:17', '860229a7-cb88-405f-8174-bfee2697dde4', NULL);
INSERT INTO `comment` VALUES (5, '我是子评论哦耶', 1, 'ccc86751-5394-42cd-9754-7bdd30129a86', 13, 1, '2023-03-16 14:12:20', '2023-03-17 09:49:04', '860229a7-cb88-405f-8174-bfee2697dde4', 1);
INSERT INTO `comment` VALUES (6, '我是新的子评论哦', 1, 'ccc86751-5394-42cd-9754-7bdd30129a86', 1, 1, '2023-03-17 01:47:24', '2023-03-17 01:48:21', '860229a7-cb88-405f-8174-bfee2697dde4', 1);
INSERT INTO `comment` VALUES (8, '我也想来评论', 5, 'ccc86751-5394-42cd-9754-7bdd30129a86', 0, 1, '2023-03-17 02:29:07', '2023-03-17 02:29:07', '00c0e086-c701-476c-bb9b-d5589a49c9d2', 1);
INSERT INTO `comment` VALUES (9, '还可以吧感觉', 1, 'ccc86751-5394-42cd-9754-7bdd30129a86', 0, 1, '2023-03-17 02:30:46', '2023-03-17 02:30:46', '00c0e086-c701-476c-bb9b-d5589a49c9d2', 1);
INSERT INTO `comment` VALUES (10, '<p>再来个再来个至少凑个分页吧</p>\n', NULL, 'ccc86751-5394-42cd-9754-7bdd30129a86', 0, 1, '2023-03-17 03:30:48', '2023-03-17 03:30:48', '00c0e086-c701-476c-bb9b-d5589a49c9d2', NULL);
INSERT INTO `comment` VALUES (11, '<p>单走一个6</p>\n', NULL, 'ccc86751-5394-42cd-9754-7bdd30129a86', 0, 1, '2023-03-17 03:30:58', '2023-03-17 03:30:58', '00c0e086-c701-476c-bb9b-d5589a49c9d2', NULL);
INSERT INTO `comment` VALUES (13, '给你个回复嗷', 7, 'ccc86751-5394-42cd-9754-7bdd30129a86', 0, 1, '2023-03-17 08:55:59', '2023-03-17 08:55:59', '00c0e086-c701-476c-bb9b-d5589a49c9d2', 1);
INSERT INTO `comment` VALUES (15, '<p>想再来几条评论凑个分页</p>\n', NULL, 'ccc86751-5394-42cd-9754-7bdd30129a86', 0, 1, '2023-03-21 07:20:10', '2023-03-21 07:20:10', '860229a7-cb88-405f-8174-bfee2697dde4', NULL);
INSERT INTO `comment` VALUES (16, '<p>再来再来</p>\n', NULL, 'ccc86751-5394-42cd-9754-7bdd30129a86', 0, 1, '2023-03-21 07:20:15', '2023-03-21 07:20:15', '860229a7-cb88-405f-8174-bfee2697dde4', NULL);
INSERT INTO `comment` VALUES (17, '<p>写的不错</p>\n', NULL, 'a205e304-ce0a-49c2-b61f-43098aed662d', 1, 1, '2023-03-25 13:56:35', '2023-03-25 13:56:38', '860229a7-cb88-405f-8174-bfee2697dde4', NULL);

-- ----------------------------
-- Table structure for emailcode
-- ----------------------------
DROP TABLE IF EXISTS `emailcode`;
CREATE TABLE `emailcode`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint NULL DEFAULT 0,
  `lastTime` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of emailcode
-- ----------------------------

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parentId` int NULL DEFAULT NULL,
  `menuIcon` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `orderNum` int NOT NULL,
  `routePath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `comPath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `menuType` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `perms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` tinyint NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '个人中心', NULL, 'fa fa-user-circle', 1, '/admin/personal', 'myInfo/index.vue', 'D', NULL, 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (2, '我的代码', NULL, 'fa fa-code', 2, '/admin/code', 'myCode/index.vue', 'D', NULL, 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (3, '内容管理', NULL, 'fa fa-edit', 3, NULL, NULL, 'M', NULL, 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (4, '权限管理', NULL, 'fa fa-power-off', 4, NULL, NULL, 'M', NULL, 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (5, '空间管理', NULL, 'fa fa-building-o', 5, NULL, NULL, 'M', NULL, 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (6, '用户管理', 3, NULL, 1, '/admin/content/user', 'contentUser/index.vue', 'D', 'content:user:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (7, '代码管理', 3, NULL, 2, '/admin/content/code', 'contentCode/index.vue', 'D', 'content:code:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (8, '评论管理', 3, NULL, 3, '/admin/content/comment', 'contentComment/index.vue', 'D', 'content:comment:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (9, '空间管理', 3, NULL, 4, '/admin/content/space', 'contentSpace/index.vue', 'D', 'content:space:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (10, '角色管理', 4, NULL, 1, '/admin/power/role', 'powerRole/index.vue', 'D', 'power:role:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (11, '菜单管理', 4, NULL, 2, '/admin/power/menu', 'powerMenu/index.vue', 'D', 'power:menu:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (12, '空间总览', 5, NULL, 1, '/admin/space/overview', 'spaceOverview/index.vue', 'D', 'space:overview:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (13, '人员管理', 5, NULL, 2, '/admin/space/user', 'spaceUser/index.vue', 'D', 'space:user:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (14, '代码管理', 5, NULL, 3, '/admin/space/code', 'spaceCode/index.vue', 'D', 'space:code:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (15, '任务管理', 5, NULL, 4, '/admin/space/task', 'spaceTask/index.vue', 'D', 'space:task:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (16, '角色管理', 5, NULL, 5, '/admin/space/role', 'spaceRole/index.vue', 'D', 'space:role:list', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (17, '添加用户', 6, NULL, 1, NULL, NULL, 'B', 'content:user:add', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (18, '编辑用户', 6, NULL, 2, NULL, NULL, 'B', 'content:user:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (19, '删除用户', 6, NULL, 3, NULL, NULL, 'B', 'content:user:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (20, '编辑代码', 7, NULL, 1, NULL, NULL, 'B', 'content:code:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (21, '删除代码', 7, NULL, 2, NULL, NULL, 'B', 'content:code:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (23, '删除评论', 8, NULL, 2, NULL, NULL, 'B', 'content:comment:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (26, '删除空间', 9, NULL, 3, NULL, NULL, 'B', 'content:space:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (27, '添加角色', 10, NULL, 1, NULL, NULL, 'B', 'power:role:add', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (28, '编辑角色', 10, NULL, 2, NULL, NULL, 'B', 'power:role:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (29, '删除角色', 10, NULL, 3, NULL, NULL, 'B', 'power:role:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (30, '添加菜单', 11, NULL, 1, NULL, NULL, 'B', 'power:menu:add', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (31, '编辑菜单', 11, NULL, 2, NULL, NULL, 'B', 'power:menu:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (32, '删除菜单', 11, NULL, 3, NULL, NULL, 'B', 'power:menu:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (33, '邀请用户', 13, NULL, 1, NULL, NULL, 'B', 'space:user:add', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (34, '编辑用户', 13, NULL, 2, NULL, NULL, 'B', 'space:user:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (35, '踢出用户', 13, NULL, 3, NULL, NULL, 'B', 'space:user:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (36, '编辑代码', 14, NULL, 1, NULL, NULL, 'B', 'space:code:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (37, '删除代码', 14, NULL, 3, NULL, NULL, 'B', 'space:code:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (38, '添加任务', 15, NULL, 1, NULL, NULL, 'B', 'space:task:add', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (39, '编辑任务', 15, NULL, 2, NULL, NULL, 'B', 'space:task:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (40, '删除任务', 15, NULL, 3, NULL, NULL, 'B', 'space:task:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (41, '添加角色', 16, NULL, 1, NULL, NULL, 'B', 'space:role:add', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (42, '编辑角色', 16, NULL, 2, NULL, NULL, 'B', 'space:role:edit', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (43, '删除角色', 16, NULL, 3, NULL, NULL, 'B', 'space:role:delete', 1, '2023-03-09 11:53:19', '2023-03-09 11:53:19');
INSERT INTO `menu` VALUES (45, '添加空间', 12, NULL, 1, NULL, NULL, 'B', 'space:space:add', 1, '2023-03-13 09:05:42', '2023-03-13 09:05:42');
INSERT INTO `menu` VALUES (46, '编辑空间', 12, NULL, 2, NULL, NULL, 'B', 'space:space:edit', 1, '2023-03-13 09:06:18', '2023-03-13 09:06:18');

-- ----------------------------
-- Table structure for menurole
-- ----------------------------
DROP TABLE IF EXISTS `menurole`;
CREATE TABLE `menurole`  (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `menuId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`menuId`, `roleId`) USING BTREE,
  INDEX `roleId`(`roleId`) USING BTREE,
  CONSTRAINT `menurole_ibfk_1` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menurole_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of menurole
-- ----------------------------
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 1, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:19', '2023-03-09 11:18:19', 1, 3);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 1, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 2, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:19', '2023-03-09 11:18:19', 2, 3);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 2, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 3, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 4, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 5, 2);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 5, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 6, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 7, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 8, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 9, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 10, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 11, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 12, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 13, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 14, 2);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 14, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 15, 2);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 15, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 16, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 17, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 18, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 19, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 20, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 21, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 23, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 26, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 27, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 28, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 29, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 30, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 31, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:16:40', '2023-03-09 11:16:40', 32, 1);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 33, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 34, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 35, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 36, 2);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 36, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 37, 2);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 37, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 38, 2);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 38, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 39, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 40, 2);
INSERT INTO `menurole` VALUES ('2023-03-26 03:17:54', '2023-03-26 03:17:54', 40, 12);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 41, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 42, 2);
INSERT INTO `menurole` VALUES ('2023-03-09 11:18:12', '2023-03-09 11:18:12', 43, 2);
INSERT INTO `menurole` VALUES ('2023-03-24 12:17:23', '2023-03-24 12:17:23', 45, 2);
INSERT INTO `menurole` VALUES ('2023-03-24 12:17:23', '2023-03-24 12:17:23', 46, 2);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `introduce` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `roleChar` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` tinyint NULL DEFAULT 1,
  `isDelete` tinyint NULL DEFAULT 0,
  `spaceId` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员', '拥有管理该系统的权限', 'Admin', 1, 0, NULL, '2023-03-09 11:53:24', '2023-03-09 11:53:24');
INSERT INTO `role` VALUES (2, '空间主', '拥有管理自己空间的权限', 'Space Master', 1, 0, NULL, '2023-03-09 11:53:24', '2023-03-09 11:53:24');
INSERT INTO `role` VALUES (3, '普通用户', '拥有管理该系统的权限', 'Ordinary User', 1, 0, NULL, '2023-03-09 11:53:24', '2023-03-09 11:53:24');
INSERT INTO `role` VALUES (12, '班级助理', '12312312312', 'helper', 1, 0, 11, '2023-03-26 03:17:54', '2023-03-26 03:17:54');

-- ----------------------------
-- Table structure for space
-- ----------------------------
DROP TABLE IF EXISTS `space`;
CREATE TABLE `space`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `introduce` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'http://pic.fasyncsy.com.cn/avatar/defaultSpace.jpg',
  `inviteCode` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `authorId`(`authorId`) USING BTREE,
  CONSTRAINT `space_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of space
-- ----------------------------
INSERT INTO `space` VALUES (11, 'MySpace', '班级内部统计代码，发布任务，方便教师查阅代码。', 'http://pic.fasyncsy.com.cn/avatar/defaultSpace.jpg', 'ggdRuI', '269eb910-7364-4537-b0fe-6d89a364b12c', '2023-03-25 02:11:08', '2023-03-25 02:11:08');
INSERT INTO `space` VALUES (12, 'F-Space', '属于我的个人空间，存放代码用', 'https://pic.fasyncsy.com.cn/avatar/defaultSpace.jpg', '3ab5Qz', '00c0e086-c701-476c-bb9b-d5589a49c9d2', '2023-03-26 08:21:44', '2023-03-26 08:21:44');

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `introduce` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `spaceId` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `spaceId`(`spaceId`) USING BTREE,
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`spaceId`) REFERENCES `space` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (5, '任务测试', '测试任务，任意提交', 11, '2023-03-25 02:11:20', '2023-03-25 02:11:20');
INSERT INTO `task` VALUES (6, '这次最新的任务', '提交关于快速排序的代码', 11, '2023-03-26 02:57:51', '2023-03-26 02:57:51');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'http://pic.fasyncsy.com.cn/avatar/default.jpg',
  `status` tinyint NULL DEFAULT 1,
  `roleId` int NULL DEFAULT NULL,
  `spaceId` int NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nickName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `roleId`(`roleId`) USING BTREE,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('00c0e086-c701-476c-bb9b-d5589a49c9d2', '测试用户', '756f41c5f1e6de9eff397ccd0a6d3ca1', '13937117595@163.com', 'https://pic.fasyncsy.com.cn/avatar/19c81058679e45fc9a7a590771b1b4c5', 1, 2, 12, '2023-03-16 06:35:03', '2023-03-26 08:22:00', '测试用户2');
INSERT INTO `user` VALUES ('269eb910-7364-4537-b0fe-6d89a364b12c', 'SpaceMaster', '756f41c5f1e6de9eff397ccd0a6d3ca1', '13140179351@163.com', 'http://pic.fasyncsy.com.cn/avatar/default.jpg', 1, 2, 11, '2023-03-09 11:55:47', '2023-03-25 02:11:08', '我是空间主');
INSERT INTO `user` VALUES ('860229a7-cb88-405f-8174-bfee2697dde4', '_Async__', '756f41c5f1e6de9eff397ccd0a6d3ca1', '1827951482@qq.com', 'https://pic.fasyncsy.com.cn/avatar/f556c9c731184b09b929ce158d7226b7', 1, 3, 11, '2023-03-16 06:34:51', '2023-03-26 08:13:15', '空间昵称123');
INSERT INTO `user` VALUES ('f9fa06e4-5e7d-4419-9ca5-3830c264ad64', 'admin', '756f41c5f1e6de9eff397ccd0a6d3ca1', '1421304007@qq.com', 'http://pic.fasyncsy.com.cn/avatar/default.jpg', 1, 1, NULL, '2023-03-09 11:55:10', '2023-03-10 03:57:08', 'admin');

SET FOREIGN_KEY_CHECKS = 1;
