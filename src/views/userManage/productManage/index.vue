<!-- 产品管理员 -->
<template>
	<BreadCrumb ref="breadcrumb" :item='item' />
	<div class="table-wrapped">
		<!-- 顶部 -->
		<div class="table-top">
			<!-- 表格顶部 -->
			<div class="table-header">
				<!-- 搜索框 -->
				<div class="search-wrapped">
					<el-input v-model="input1" class="w-50 m-2" size="large" placeholder="输入账号进行搜索"
						:suffix-icon="Search" />
				</div>
				<!-- 搜索按钮 -->
				<div class="button-wrapped">
					<el-button type="primary" @click="openCreateAdmin(1)">添加产品管理员</el-button>
				</div>
			</div>


			<!-- 表格内容 -->
			<div class="table-content">
				<el-table :data="tableData" style="width: 100%" border highlight-current-row fit>
					<el-table-column type="index" width="50" />
					<el-table-column prop="account" label="账号" />
					<el-table-column prop="user_id" label="员工ID" />
					<el-table-column prop="name" label="姓名" />
					<el-table-column prop="sex" label="性别" />
					<el-table-column prop="department" label="部门" />
					<el-table-column prop="email" label="邮箱" />
					<el-table-column prop="update_time" label="更新时间"></el-table-column>
					<el-table-column label="操作" width="200">
						<template #default="{ row }">
							<el-button size="small" type="success"
								@click="openEditAdmin(row.user_id?row.user_id:row.account)">编辑</el-button>
							<el-button size="small" type="danger" @click="openDeleteAdmin(row.user_id?row.user_id:row.account)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<!-- 底部 -->
		<div class="table-footer"></div>
	</div>

	<!-- 添加产品管理员 -->
	<createAdmin ref="CreateP" @success="getAdminListData" />
	<!-- 编辑产品管理员 -->
	<editAdmin ref="EditP" @success="getAdminListData" />
	<!-- 删除管理员 -->
	<deleteAdmin ref="deleteP" @success="getAdminListData" />
</template>

<script lang="ts" setup>
	import BreadCrumb from '@/components/BreadCrumb.vue'
	import {
		bus
	} from "@/utils/mitt.js"
	import { ref } from 'vue';
	import { Search } from '@element-plus/icons-vue'
	import createAdmin from '../component/createAdmin.vue';
	import editAdmin from '../component/editAdmin.vue';
	import deleteAdmin from '../component/deleteAdmin.vue';
	import { getAdminList } from '@/api/userInfo.js'
	import { async } from 'fast-glob';

	const input1 = ref('')

	// 员工ID
	const id = localStorage.getItem('id')

	// 面包屑
	const breadcrumb = ref()

	// 面包屑参数
	const item = ref({
		first: '用户管理',
		second: '产品管理员'
	})

	// 表单内容
	const tableData = ref([])

	// 创建管理员
	const CreateP = ref()

	const openCreateAdmin = (id : number) => {
		bus.emit('createId', id)
		CreateP.value.open()
	}

	// 编辑管理员
	const EditP = ref()

	const openEditAdmin = (user_id : string) => {
		bus.emit('editId', user_id)
		EditP.value.open()
	}
	
	// 删除管理员
	const deleteP = ref()
	
	const openDeleteAdmin = (user_id : string) => {
		bus.emit('deleteId', user_id)
		deleteP.value.open()
	}

	// 获取产品管理员列表
	const getAdminListData = async () => {
		const res = await getAdminList(item.value.second)
		console.log('getAdminList', res);

		tableData.value = res.result
	}
	getAdminListData()
</script>