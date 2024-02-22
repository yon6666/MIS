<template>
	<el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px" align-center center>
		<el-form :rules="rules" class="forget-form" :label-position="labelposition">
			<el-form-item label="原始密码" prop="oldPassword">
				<el-input v-model="forgetFrom.oldPassword" show-password placeholder="请输入您原来的密码" />
			</el-form-item>
			<el-form-item label="新设密码" prop="newPassword">
				<el-input v-model="forgetFrom.newPassword" show-password placeholder="请确认您新设的密码" />
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
		changePassword
	} from '@/api/userInfo'
	import { useRouter } from 'vue-router';
	import { ElMessage } from 'element-plus'
	import { getTip } from '@/tips'

	const router = useRouter()

	// 表单对齐方式
	const labelposition = ref('top')

	// forget表单接口
	interface forgetData {
		oldPassword : string; // 原始密码
		newPassword : string; // 新设密码
	}

	// forget表单对象
	const forgetFrom : forgetData = reactive({
		oldPassword: '',
		newPassword: '',
	})

	// 表单规则
	const rules = reactive({
		oldPassword: [
			{ required: true, message: '请输入您原来的密码', trigger: 'blur' },
		],
		newPassword: [
			{ required: true, message: '请输入您新设的密码', trigger: 'blur' },
		],
	})

	// 修改密码
	const resetPassword = async () => {
		if (!forgetFrom.newPassword || !forgetFrom.oldPassword) {
			return ElMessage.error(getTip('CompleteInfoForm'))
		}
		if (forgetFrom.newPassword) {
			const id = localStorage.getItem('id')
			const res = await changePassword(id, forgetFrom.newPassword, forgetFrom.oldPassword)
			console.log(res);
			if (res.status === 0) {
				ElMessage({
					message: res.msg,
					type: 'success',
				})
				state.changePasswordDialog = false
				// 修改成功后重新登录
				router.push('/login')
			} else if (res.status === 1) {
				ElMessage.error(res.msg)
			}
			else {
				ElMessage.error(getTip('other'))
			}
		}
	}

	// 控制弹窗 默认关闭
	const state = reactive({
		changePasswordDialog: false,
	})

	// 打开弹窗
	const open = () => {
		state.changePasswordDialog = true
	}

	// 对外暴露子组件方法
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
</style>