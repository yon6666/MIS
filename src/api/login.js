/**
 * 注册登录相关接口
 */

import instance from "@/http/index.js"

// 注册
export const register = data => {
	const {
		account,
		password
	} = data
	return instance({
		url: '/api/register',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}

// 登录
export const login = data => {
	const {
		account,
		password
	} = data
	return instance({
		url: '/api/login',
		method: 'POST',
		data: {
			account,
			password
		}
	})
}

// 忘记密码验证
export const verify = data => {
	const {
		account,
		email
	} = data
	return instance({
		url: '/user/verifyAccountAndEmail',
		method: 'POST',
		data: {
			account,
			email
		}
	})
}

// 重置密码 ()
export const resetNewPassword = (id, newPassword) => {
	return instance({
		url: '/user/changePasswordInLogin',
		method: 'POST',
		data: {
			id,
			newPassword
		}
	})
}