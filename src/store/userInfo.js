import {
	defineStore
} from 'pinia'
import {
	getUserInfo
} from '@/api/userInfo.js'
import {
	getCompanyName
} from '@/api/setting.js'


export const useUserInfoStore = defineStore('userInfo', {
	state: () => ({
		imageUrl: '', // 头像
		name: '', // 姓名
		sex: '', // 性别
		department: '', // 部门
		identity: '', // 身份
		account: '', // 账号
		email: '', // 邮箱
		user_id: '', // ID
		company: '', //公司名称
	}),
	actions: {
		// 获取用户相关信息 ID
		async fetchUserInfo(id) {
			const res = await getUserInfo(id)
			this.imageUrl = res.result.image_url
			this.name = res.result.name
			this.sex = res.result.sex
			this.department = res.result.department
			this.identity = res.result.identity
			this.account = res.result.account
			this.email = res.result.email
			this.user_id = res.result.user_id
		},
		
		// 获取公司名称
		async fetchCompanyName() {
			const res = await getCompanyName()
			this.company = res.result[0].set_text
		}
	},
	persist: {
		// 在这里进行自定义配置
		key: 'userInfo',
	},
})