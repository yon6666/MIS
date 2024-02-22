<!-- 菜单页 -->
<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="200px">
				<el-menu class="el-menu-vertical-demo" router>
					<span class="menu-title">MIS</span>
					<el-menu-item index="home">
						<el-icon>
							<House />
						</el-icon>
						<span>首页</span>
					</el-menu-item>
					<el-menu-item index="overview">
						<el-icon>
							<Document />
						</el-icon>
						<span>系统概览</span>
					</el-menu-item>
					<el-sub-menu index="manage_list">
						<template #title>
							<el-icon>
								<User />
							</el-icon>
							<span>用户管理</span>
						</template>
						<el-menu-item-group title="管理员管理">
							<el-menu-item index="product_manage">产品管理员</el-menu-item>
							<el-menu-item index="users_manage">用户管理员</el-menu-item>
							<el-menu-item index="message_manage">消息管理员</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="员工管理">
							<el-menu-item index="user_list">用户列表</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="product_list">
						<template #title>
							<el-icon>
								<TakeawayBox />
							</el-icon>
							<span>产品管理</span>
						</template>
						<el-menu-item-group title="入库管理">
							<el-menu-item index="product_manage_list">产品列表</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="出库管理">
							<el-menu-item index="out_product_manage_list">出库列表</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="message_manage">
						<template #title>
							<el-icon>
								<ChatSquare />
							</el-icon>
							<span>消息管理</span>
						</template>
						<el-menu-item-group title="消息管理">
							<el-menu-item index="message_list">消息列表</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="回收站">
							<el-menu-item index="recycle">回收站</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-menu-item index="file">
						<el-icon>
							<icon-menu />
						</el-icon>
						<span>合同管理</span>
					</el-menu-item>
					<el-menu-item index="operation_log">
						<el-icon>
							<icon-menu />
						</el-icon>
						<span>操作日志</span>
					</el-menu-item>
					<el-menu-item index="login_log">
						<el-icon>
							<icon-menu />
						</el-icon>
						<span>登录日志</span>
					</el-menu-item>
					<el-menu-item index="set">
						<el-icon>
							<Tools />
						</el-icon>
						<span>系统设置</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<span class="header-left-content">
						尊敬的
						<span class="user-name">{{ userInfoStore.name}}</span>
						欢迎您登录本系统</span>
					<div class="header-right-content">
						<el-badge>
							<el-icon :size="20" class="message">
								<Message />
							</el-icon>
						</el-badge>
						<el-avatar :size="24" :src="userInfoStore.imageUrl" />
						<el-dropdown>
							<span class="el-dropdown-link">
								<el-icon>
									<Setting />
								</el-icon>
							</span>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>设置账号</el-dropdown-item>
									<el-dropdown-item>更改头像</el-dropdown-item>
									<el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
	import {
		useRouter
	} from 'vue-router';
	import {
		Menu as IconMenu,
	} from '@element-plus/icons-vue'
	import {
		ref,
		reactive,
		toRefs
	} from 'vue'
	import {
		useUserInfoStore
	} from '@/store/userInfo.js'

	const userInfoStore = useUserInfoStore()

	const router = useRouter()

	// 退出登录
	const outLogin = () => {
		router.push('/login')
	}
</script>

<style lang="scss" scoped>
	// 侧边栏
	.el-aside {
		height: 100vh;
		background: #2b303b;
		width: 210px;
		// 隐藏滚动条
		overflow-x: hidden;

		// 菜单
		.el-menu {
			background: #2b303b;
			width: 210px;
			height: 100vh;
			border-right: 0px;

			// 菜单标题
			.menu-title {
				display: flex;
				justify-content: center;
				color: #fff;
				background: #2b303b;
				font-size: 20px;
				font-weight: 700;
			}

			.el-menu-item {

				color: #fff;
			}

		}
	}

	// 头部
	.el-header {
		display: flex;
		height: 55px;
		background: #262f3e;
		color: #c1c6c8;
		align-items: center;
		justify-content: space-between;

		// 欢迎语
		.header-left-content {
			font-size: 14px;
			
			.user-name{
				font-size: 16px;
				color: firebrick;
				text-align: center;
			}
		}

		.header-right-content {
			width: 160px;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}

	.el-main {
		--el-main-padding: 0;
	}

	// 无子菜单的
	.el-menu-item:hover {
		background: #006eff;
	}

	// 有子菜单的
	:deep(.el-sub-menu__title:hover) {
		background: #006eff;
	}

	:deep(.el-sub-menu__title) {
		color: #fff;
	}

	:deep(.el-menu--inline) {
		background: #2b303b;
	}
</style>