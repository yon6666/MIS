<template>
	<el-dialog v-model="dialogFormVisible" title='删除管理员' width="600px" align-center draggable>
		<span v-if="adminId">是否去掉此用户的管理员职位？删除后此用户将重新展现在用户列表中</span>
		<span v-else>请慎重操作，删除后此用户将永久失去登录资格</span>

		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="confirmDelete">确定</el-button>
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

	const adminId = ref('1')
	// 弹窗开关
	const dialogFormVisible = ref(false)

	// 打开创建管理员的弹窗
	const open = () => {
		dialogFormVisible.value = true
	}

	defineExpose({
		open
	})

	bus.on('deleteId', async (user_id : string) => {
		console.log('deleteId', user_id);
	})

	onBeforeUnmount(() => {
		bus.all.clear()
	})

	const emit = defineEmits(['success'])

	// 确认删除
	const confirmDelete = async () => {
		console.log('confirmDelete');
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