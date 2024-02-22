<template>
	<!-- 忘记密码 -->
	<el-dialog v-model="state.forgetPasswordDialog" title="忘记密码" width="400px" align-center center>
		<el-form :rules="rules" class="forget-form" :label-position="labelposition">
			<el-form-item label="账号" prop="account">
				<el-input v-model="forgetFrom.account" placeholder="请输入您的注册账号" />
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="forgetFrom.email" placeholder="请输入您的个人邮箱" />
			</el-form-item>
		</el-form>

		<!-- 底部内容 -->
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="state.forgetPasswordDialog = false">取消</el-button>
				<el-button type="primary" @click="verifyAccount">
					下一步
				</el-button>
			</span>
		</template>
	</el-dialog>

	<!-- 修改密码 -->
	<el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px" align-center center>
		<el-form :rules="rules" class="forget-form" :label-position="labelposition">
			<el-form-item label="新密码" prop="password">
				<el-input v-model="forgetFrom.password" show-password placeholder="请输入您的新密码" />
			</el-form-item>
			<el-form-item label="确认新密码" prop="nextPassword">
				<el-input v-model="forgetFrom.nextPassword" show-password placeholder="请确认您的新密码" />
			</el-form-item>
		</el-form>

		<!-- 底部内容 -->
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="state.changePasswordDialog = false">取消</el-button>
				<el-button type="primary" @click="resetPassword">
					确定
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { ref, reactive } from 'vue'
	import {
		verify, resetNewPassword
	} from '@/api/login'
	import { ElMessage } from 'element-plus'
	import { getTip } from '@/tips'

	// 表单对齐方式
	const labelposition = ref('top')

	// forget表单接口
	interface forgetData {
		account : number; // 账号
		email : string;	// 邮箱
		password : string; // 密码
		nextPassword : string; // 确认密码
	}

	// forget表单对象
	const forgetFrom : forgetData = reactive({
		account: null,
		email: '',
		password: '',
		nextPassword: ''
	})

	// 表单规则
	const rules = reactive({
		account: [
			{ required: true, message: '请输入您的注册账号', trigger: 'blur' },
		],
		email: [
			{ required: true, message: '请输入您的注册邮箱', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '请输入您的新密码', trigger: 'blur' },
		],
		nextPassword: [
			{ required: true, message: '请确认您的新密码', trigger: 'blur' },
		],
	})

	// 下一步 --> 修改密码弹窗
	const verifyAccount = async () => {
		if (!forgetFrom.email || !forgetFrom.account)
			return ElMessage.error(getTip('CompleteInfoForm'))
		const res = await verify(forgetFrom)
		if (res.status == 0) {
			ElMessage({
				message: res.msg,
				type: 'success',
			})
			// localStorage.setItem 存放到浏览器的本地存储空间
			// sessionStorage.setItem 存放到浏览器的会话存储空间
			localStorage.setItem('id', res.id)
			state.forgetPasswordDialog = false
			state.changePasswordDialog = true
		}
		else {
			ElMessage.error(res.msg)
		}
	}

	// 修改密码
	const resetPassword = async () => {
		if (!forgetFrom.password || !forgetFrom.nextPassword) {
			return ElMessage.error(getTip('CompleteInfoForm'))
		}
		if (forgetFrom.password == forgetFrom.nextPassword) {
			const newPassword = forgetFrom.nextPassword
			const id = localStorage.getItem('id')
			const res = await resetNewPassword(id, newPassword)
			if (res.status === 0) {
				ElMessage({
					message: res.msg,
					type: 'success',
				})
				state.changePasswordDialog = false
			}
			else {
				ElMessage.error(res.msg)
			}
		}
	}

	// 控制弹窗 默认关闭
	const state = reactive({
		forgetPasswordDialog: false,
		changePasswordDialog: false,
	})

	// 打开弹窗
	const open = () => {
		state.forgetPasswordDialog = true
	}

	// 对外暴露子组件方法
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
</style>