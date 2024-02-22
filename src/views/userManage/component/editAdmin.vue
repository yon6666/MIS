<template>
	<el-dialog v-model="dialogFormVisible" title='编辑管理员信息' width="600px" align-center draggable>
		<div class="dialog-content">
			<el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="100px">
				<el-form-item label="账号" prop="account">
					<el-input v-model="formData.account" disabled />
				</el-form-item>
				<el-form-item label="员工ID" prop="user_id">
					<div class="inline-flex">
						<el-input v-model="formData.user_id" disabled
							style="width: 150px; margin-right: 10px;"></el-input>
						<el-button v-if="!formData.user_id" type="primary" @click="createUserID">自动生成ID号</el-button>
					</div>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="formData.name" />
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-select v-model="formData.sex" placeholder="请选择性别">
						<el-option label="男" value="男" />
						<el-option label="女" value="女" />
					</el-select>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="formData.email" />
				</el-form-item>
				<el-form-item label="部门" prop="department">
					<el-select v-model="formData.department" placeholder="请选择部门">
						<el-option v-for="item in departmentData" :key="item" :label="item" :value="item" />
					</el-select>
				</el-form-item>
			</el-form>
		</div>

		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="confirmEdit">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
	import { reactive, ref, onBeforeUnmount } from 'vue'
	import {
		bus
	} from "@/utils/mitt.js"
	import {
		getUserInfo, editAdmin, createID
	} from '@/api/userInfo.js'
	import { ElMessage } from 'element-plus'
	import { async } from 'fast-glob';

	// 弹窗开关
	const dialogFormVisible = ref(false)

	// 打开创建管理员的弹窗
	const open = () => {
		dialogFormVisible.value = true
	}

	defineExpose({
		open
	})

	// 表单接口
	interface formData {
		id ?: number,
		account : string,
		user_id : string,
		name : string,
		sex : string,
		email : string,
		department : string
	}

	// 表单数据
	const formData : formData = reactive({
		id: null,
		account: '',
		user_id: '',
		name: '',
		sex: '',
		email: '',
		department: '',
	})

	// 提示规则
	const rules = reactive({
		account: [
			{ required: true, message: '请输入管理员的注册账号', trigger: 'blur' },
		],
		user_id: [
			{ required: true, message: '请输入管理员的员工ID', trigger: 'blur' },
		],
		name: [
			{ required: true, message: '请输入管理员的名字', trigger: 'blur' },
		],
		sex: [
			{ required: true, message: '请输入管理员的性别', trigger: 'blur' },
		],
		email: [
			{ required: true, message: '请输入管理员的邮箱', trigger: 'blur' },
		],
		department: [
			{ required: true, message: '请输入管理员的部门', trigger: 'blur' },
		],
	})

	// 部门
	const departmentData = [
		'Option1', 'Option1', 'Option1'
	]

	bus.on('editId', async (user_id : string) => {
		console.log('editId', user_id);
		// 获取到当前行的用户基本信息
		const res = await getUserInfo(user_id)
		// console.log('getUserInfo', res);
		// 枚举
		Object.assign(formData, {
			...res.result
		})
	})

	onBeforeUnmount(() => {
		bus.all.clear()
	})

	const emit = defineEmits(['success'])

	// 确认修改信息
	const confirmEdit = async () => {
		const res = await editAdmin(formData)
		console.log(res);
		if (res.status == 0) {
			ElMessage({
				message: res.msg,
				type: 'success',
			})
			emit('success')
			dialogFormVisible.value = false
		} else {
			ElMessage.error(res.msg)
			dialogFormVisible.value = false
		}
	}

	// 自动生产员工ID
	const createUserID = async () => {
		const res = await getUserInfo(formData.account)
		if (res.status == 0) {
			// 自动生成员工ID
			await createID(res.result.id)
			// 重新获取员工信息
			// 只更新变化的部分
			const agintRes = await getUserInfo(formData.account)
			// 遍历新的用户信息对象，只更新发生变化的属性
			Object.entries(agintRes.result).forEach(([key, newValue]) => {
				if (formData[key] !== newValue) {
					console.log('key', key, 'newValue', newValue);
					formData[key] = newValue;
				}
			});
			emit('success')
			// dialogFormVisible.value = false
		}
	}
</script>

<style lang="scss" scoped>
	.dialog-content {
		display: flex;
		padding: 0 30px;
	}



	:deep(.el-form-item) {
		margin: 30px;
		display: flex;
		justify-content: space-between;

		.creatID {
			display: flex;
			justify-content: center;
		}
	}
</style>