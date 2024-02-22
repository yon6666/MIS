import {
	createRouter,
	createWebHashHistory
} from "vue-router";

// 路由配置
const routes = [{
		path: '/',
		redirect: '/menu'
	},
	{
		name: 'login',
		path: '/login',
		component: () => import('@/views/login/index.vue')
	},
	{
		// 菜单
		name: 'menu',
		path: '/menu',
		component: () => import('@/views/menu/index.vue'),
		children: [{
				// 菜单 --> 首页
				name: 'home',
				path: '/home',
				component: () => import('@/views/home/index.vue')
			},
			{
				// 菜单 --> 系统概述
				name: 'overview',
				path: '/overview',
				component: () => import('@/views/overview/index.vue')
			},
			{
				// 菜单 --> 合同管理
				name: 'file',
				path: '/file',
				component: () => import('@/views/file/index.vue')
			},
			{
				// 菜单 --> 操作日志
				name: 'operation_log',
				path: '/operation_log',
				component: () => import('@/views/operationLog/index.vue')
			},
			{
				// 菜单 --> 登录日志
				name: 'login_log',
				path: '/login_log',
				component: () => import('@/views/loginLog/index.vue')
			},
			{
				// 菜单 --> 系统设置
				name: 'set',
				path: '/set',
				component: () => import('@/views/set/index.vue')
			},
			{
				// 菜单 --> 用户管理 --> 产品管理员
				name: 'product_manage',
				path: '/product_manage',
				component: () => import('@/views/userManage/productManage/index.vue')
			},
			{
				// 菜单 --> 用户管理 --> 用户管理员
				name: 'users_manage',
				path: '/users_manage',
				component: () => import('@/views/userManage/usersManage/index.vue')
			},
			{
				// 菜单 --> 用户管理 --> 消息管理员
				name: 'message_manage',
				path: '/message_manage',
				component: () => import('@/views/userManage/messageManage/index.vue')
			},
			{
				// 菜单 --> 用户管理 --> 用户列表
				name: 'user_list',
				path: '/user_list',
				component: () => import('@/views/userManage/userList/index.vue')
			},
			{
				// 菜单 --> 产品管理 --> 产品列表
				name: 'product_manage_list',
				path: '/product_manage_list',
				component: () => import('@/views/product/productManageList/index.vue')
			},
			{
				// 菜单 --> 产品管理 --> 出库列表
				name: 'out_product_manage_list',
				path: '/out_product_manage_list',
				component: () => import('@/views/product/outProductManageList/index.vue') 
			},
			{
				// 菜单 --> 消息管理 --> 消息列表
				name: 'message_list',
				path: '/message_list',
				component: () => import('@/views/message/messageList/index.vue')
			},
			{
				// 菜单 --> 消息管理 --> 回收站
				name: 'recycle',
				path: '/recycle',
				component: () => import('@/views/message/recycle/index.vue')
			}
		]
	},
]

// 创建路由
const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

export default router
