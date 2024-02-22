/**
 * 用户信息相关接口
 */

import instance from "@/http/index.js";

// 获取用户信息 ID
export const getUserInfo = (id) => {
  return instance({
    url: "/user/getUserInfo",
    method: "POST",
    data: {
      id,
    },
  });
};

// 自动生成员工ID--USER_ID
export const createID = (id) => {
  return instance({
    url: "/user/createID",
    method: "POST",
    data: {
      id,
    },
  });
};

// 绑定图片地址跟账号
export const bindAccount = (account, onlyId, url) => {
  return instance({
    url: "/user/bindAccount",
    method: "POST",
    data: {
      account,
      onlyId,
      url,
    },
  });
};

// 修改密码(旧密码 -> 新密码)
export const changePassword = (id, newPassword, oldPassword) => {
  return instance({
    url: "/user/changePassword",
    method: "POST",
    data: {
      id,
      newPassword,
      oldPassword,
    },
  });
};

// 修改姓名 id name
export const changeName = (id, name) => {
  return instance({
    url: "/user/changeName",
    method: "POST",
    data: {
      id,
      name,
    },
  });
};

// 修改性别 id sex
export const changeSex = (id, sex) => {
  return instance({
    url: "/user/changeSex",
    method: "POST",
    data: {
      id,
      sex,
    },
  });
};

// 修改邮箱 id email
export const changeEmail = (id, email) => {
  return instance({
    url: "/user/changeEmail",
    method: "POST",
    data: {
      id,
      email,
    },
  });
};

/**
 * 修改用户信息
 *  id 用户ID (*)
 *  name 用户名
 *  identity 身份
 *  department 所属部门
 *  sex 性别
 *  email 邮箱
 */
export const updateUserInfo = (params) => {
  const {
    id = null,
    name = null,
    identity = null,
    department = null,
    sex = null,
    email = null,
  } = params;

  const data = {};
  if (id !== null) data.id = id;
  if (name !== null) data.name = name;
  if (identity !== null) data.identity = identity;
  if (department !== null) data.department = department;
  if (sex !== null) data.sex = sex;
  if (email !== null) data.email = email;

  return instance({
    url: "/user/updateUserInfo",
    method: "POST",
    data,
  });
};

// -----------------------用户管理-----------------------//

/**
 * 添加管理员
 * @param {*} account 账号
 * @param {*} identity 其他身份信息
 * @returns
 */
export const createAdmin = (data) => {
  const { account, ...identity } = data;
  return instance({
    url: "/user/createAdmin",
    method: "POST",
    data: {
      account,
      ...identity,
    },
  });
};

/**
 * 获取管理人员列表
 * @param {*} identity 人员身份
 * @returns
 */
export const getAdminList = (identity) => {
  return instance({
    url: "/user/getAdminList",
    method: "POST",
    data: {
      identity,
    },
  });
};

/**
 * 编辑管理人员信息
 * @param {*} id 员工id
 * @param {*} identity 其他身份信息
 * @returns
 */
export const editAdmin = (data) => {
  const { id, ...identity } = data;
  return instance({
    url: "/user/editAdmin",
    method: "POST",
    data: {
      id,
      ...identity,
    },
  });
};

/**
 * 对管理员取消赋权
 * @param {*} id 员工id
 * @returns
 */
export const changeAdminToUser = (id) => {
  return instance({
    url: "/user/changeAdminToUser",
    method: "POST",
    data: {
      id,
    },
  });
};

/**
 * 对普通用户进行赋权
 * @param {*} id 员工id
 * @returns
 */
export const changeUserToAdmin = (id) => {
  return instance({
    url: "/user/changeUserToAdmin",
    method: "POST",
    data: {
      id,
    },
  });
};

/**
 * 冻结用户
 * @param {*} id 员工id
 * @returns
 */
export const freezeUser = (id) => {
  return instance({
    url: "/user/freezeUser",
    method: "POST",
    data: {
      id,
    },
  });
};

/**
 * 解冻用户
 * @param {*} id 员工id
 * @returns
 */
export const unFreezeUser = (id) => {
  return instance({
    url: "/user/unFreezeUser",
    method: "POST",
    data: {
      id,
    },
  });
};

/**
 * 获取冻结用户列表
 * @returns
 */
export const getFreezeUserList = () => {
  return instance({
    url: "/user/getFreezeUserList",
    method: "POST",
  });
};

/**
 * 删除用户
 * @param {*} id 员工id
 * @param {*} account 员工账号
 * @returns
 */
export const deleteUser = (id, account) => {
  return instance({
    url: "/user/deleteUser",
    method: "POST",
    data: {
      id,
      account,
    },
  });
};

/**
 * 获取对应身份的一个总人数
 * @param {*} identity 员工类型
 * @returns
 */
export const getPeopleListLength = (identity) => {
  return instance({
    url: "/user/getPeopleListLength",
    method: "POST",
    data: {
      identity,
    },
  });
};
