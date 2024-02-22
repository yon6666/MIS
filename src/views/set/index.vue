<!-- 系统设置 -->
<template>
	<BreadCrumb ref="breadcrumb" :item='item' />
	<div class="common-wrapped">
		<div class="common-content">
			<el-tabs v-model="activeName" class="demo-tabs">
				<el-tab-pane label="账号详情" name="first">
					<div class="account-info-wrapped">
						<span>用户头像：</span>
						<div class="account-info-content">
							<el-upload class="avatar-uploader" action="http://127.0.0.1:3007/user/uploadAvatar" :data="uploadData"
								:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="userInfoStore.imageUrl" :src="userInfoStore.imageUrl" class="avatar" />
								<el-icon v-else class="avatar-uploader-icon">
									<Plus />
								</el-icon>
							</el-upload>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>员工账号：</span>
						<div class="account-info-content">
							<el-input v-model="userForm.user_id" disabled></el-input>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>用户账号：</span>
						<div class="account-info-content">
							<el-input v-model="userForm.account" disabled></el-input>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>用户密码：</span>
						<div class="account-info-content">
							<el-button type="primary" @click="openChangePassword">修改密码</el-button>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>用户姓名：</span>
						<div class="account-info-content">
							<el-input v-model="userForm.name"></el-input>
						</div>
						<el-button type="primary" @click="save('name')">保存</el-button>
					</div>

					<div class="account-info-wrapped">
						<span>用户性别：</span>
						<div class="account-info-content">
							<el-select v-model="userForm.sex">
								<el-option label="男" value="男" />
								<el-option label="女" value="女" />
							</el-select>
						</div>
						<el-button type="primary" @click="save('sex')">保存</el-button>
					</div>

					<div class="account-info-wrapped">
						<span>用户身份：</span>
						<div class="account-info-content">
							<el-input v-model="userForm.identity" disabled></el-input>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>用户部门：</span>
						<div class="account-info-content">
							<el-input v-model="userForm.department" disabled></el-input>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>用户邮箱：</span>
						<div class="account-info-content">
							<el-input v-model="userForm.email"></el-input>
						</div>
						<div class="account-save-button">
							<el-button type="primary" @click="save('email')">保存</el-button>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="公司信息" name="second">

					<div class="account-info-wrapped">
						<span>公司名称</span>
						<div class="account-info-content">
							<el-input v-model="companyName"></el-input>
						</div>
						<div class="account-save-button">
							<el-button type="primary" @click='changeCompanyName'>编辑公司名称</el-button>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>公司介绍</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(1)">编辑公司介绍</el-button>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>公司架构</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(2)">编辑公司架构</el-button>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>公司战略</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(3)">编辑公司战略</el-button>
						</div>
					</div>

					<div class="account-info-wrapped">
						<span>公司高层</span>
						<div class="account-info-content">
							<el-button type="success" @click="openEditor(4)">编辑公司高层</el-button>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="首页管理" name="third">
					<div class="home-wrapped">
						<!-- 提示 -->
						<div class="tips">
							<span>
								提示: 点击图片框进行切换首页轮播图
							</span>
						</div>

						<!-- 轮播图 -->
						<div class="swiper-wrapped" v-for="(item,index) in swiperData" :key="index">
							<div class="swiper-name">轮播图{{item.id}}:&nbsp;&nbsp;</div>
							<el-upload class="avatar-uploader" action="http://127.0.0.1:3007/setting/uploadSwiper"
								:show-file-list="false" :on-success="handleSwiperSuccess" :before-upload="beforeAvatarUpload"
								:data='item'>
								<template #trigger>
									<img v-if="item.imgUrl" :src="item.imgUrl" class="swiper" />
									<img src="@/assets/雪碧图.png" alt="" v-else>
								</template>
							</el-upload>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="部门设置" name="fourth">
					<div class="other-set">
						<div class="department-set">
							<span>部门设置</span>

						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
	<!-- 修改密码弹窗 -->
	<changePassword ref='changeV' />

	<!-- 富文本编辑器弹窗 -->
	<editor ref="editorP"></editor>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		reactive,
		ref,
		nextTick,
		toRaw
	} from 'vue'
	import BreadCrumb from '@/components/BreadCrumb.vue'
	import {
		ElMessage
	} from 'element-plus'
	import {
		Plus
	} from '@element-plus/icons-vue'
	import type {
		UploadProps
	} from 'element-plus'
	import {
		useUserInfoStore
	} from '@/store/userInfo.js'
	import {
		bindAccount,
		changeName,
		changeSex,
		changeEmail
	} from '@/api/userInfo.js'
	import {
		getAllSwiper,
		getAllCompanyIntroduce,
		uploadCompanyIntroduce,
		getCompanyName,
		updateCompanyName
	} from '@/api/setting.js'
	import { storeToRefs } from 'pinia';
	import { bus } from "@/utils/mitt.js"
	import changePassword from './component/changePassword.vue'
	import editor from './component/editor.vue'
	import { getTip } from '@/tips'
	import { async } from 'fast-glob'

	// 当前页面刷新状态
	const loading = ref(false)

	// 公司名称
	const companyName = ref()

	const patchCompanyName = async () => {
		const res = await getCompanyName()
		companyName.value = res.result[0].set_value
	}

	// 获取公司名称
	patchCompanyName()

	// 修改公司名称
	const changeCompanyName = async () => {
		const res = await updateCompanyName(companyName.value)
		if (res.status === 0) {
			ElMessage({
				message: res.msg,
				type: 'success',
			})
		} else if (res.status === 1) {
			ElMessage.error(res.msg)
		} else {
			ElMessage.error(getTip('other'))
		}
	}

	// userInfoStore
	const userInfoStore = useUserInfoStore()

	// 默认页
	const activeName = ref('first')

	// 面包屑
	const breadcrumb = ref()

	// 面包屑参数
	const item = ref({
		first: '系统设置',
	})

	// 上传文件携带的参数
	const uploadData = ref({
		id: localStorage.getItem('id'),
		account: userInfoStore.account
	})
	// 头像上传成功的函数 response回应
	const handleAvatarSuccess : UploadProps['onSuccess'] = (
		response
	) => {
		console.log(response);
		if (response.status === 0) {
			userInfoStore.$patch({
				imageUrl: response.url
			})
			ElMessage({
				message: response.msg,
				type: 'success',
			});
			// 图片 --> 绑定账号
			(async () => {
				const res = await bindAccount(userInfoStore.account, response.AvatarID, response.url)
				console.log(res)
			})()
		} else {
			ElMessage.error('头像更新失败失败,请重新上传!')
		}
		// imageUrl.value = URL.createObjectURL(uploadFile.raw!)
	}
	// 头像上传之前的函数
	const beforeAvatarUpload : UploadProps['beforeUpload'] = (rawFile) => {
		if (rawFile.type !== 'image/jpeg') {
			ElMessage.error('头像必须是jpg格式!')
			return false
		} else if (rawFile.size / 1024 / 1024 > 2) {
			ElMessage.error('头像必须小于2MB!')
			return false
		}
		return true
	}

	// 用户数据接口
	interface userData {
		account : string, // 账号
		name : string, // 姓名
		sex : string, // 性别
		identity : string, // 身份
		department : string, // 部门
		email : string, // 邮箱
		user_id : string, // ID
	}

	const userForm : userData = reactive({
		account: null,
		name: '',
		sex: '',
		identity: '',
		department: '',
		email: '',
		user_id: ''
	})

	onMounted(async () => {
		loading.value = true
		const id = localStorage.getItem('id')
		try {
			// 刷新页面后重新拉取数据
			await userInfoStore.fetchUserInfo(id)
			const {
				account, name, sex, department, identity, user_id, email
			} = storeToRefs(userInfoStore)

			userForm.account = account
			userForm.name = name
			userForm.sex = sex
			userForm.department = department
			userForm.identity = identity
			userForm.user_id = user_id
			userForm.email = email

			// 获取轮播图数据
			updateSwiperData()

		}
		catch (error) {
			console.error('请求失败', error)
		} finally {
			loading.value = false
		}
	})

	const changeV = ref()

	// 修改密码弹窗
	const openChangePassword = () => {
		changeV.value.open()
	}

	// 保存 --> sex,name,email
	const save = async (field : string) => {
		await saveField(field);
	}

	const saveField = async (field : string) => {
		const updateFunctions = {
			sex: changeSex,
			name: changeName,
			email: changeEmail,
		}
		const updateFunction = updateFunctions[field];
		const res = await updateFunction(localStorage.getItem('id'), userForm[field]);
		console.log(this);

		if (res.status == 0) {
			ElMessage({
				message: res.msg,
				type: 'success',
			})
		} else if (res.status == 1) {
			ElMessage.error(res.msg)
		} else {
			ElMessage.error(getTip('other'))
		}
	}

	const editorP = ref()
	// 打开富文本
	const openEditor = (id : number) => {
		// 第一个参数是 标记,第二个参数要传入的值
		bus.emit('editorTitle', id)
		editorP.value.open()
	}
	// 首页管理
	const swiperData = ref([])

	// 获取轮播图数据
	const updateSwiperData = async () => {
		const swiperRes = await getAllSwiper()
		if (swiperRes.status === 0 && Array.isArray(swiperRes.result)) {
			swiperData.value = swiperRes.result.map((item) => ({
				id: item.id,
				name: item.set_name,
				imgUrl: item.set_value,
			}))
		} else {
			console.error('获取轮播图数据失败：', swiperRes.msg);
		}
	}

	// 上传轮播图成功
	const handleSwiperSuccess : UploadProps['onSuccess'] = (
		response
	) => {
		console.log(response);
		if (response.status === 0) {
			console.log(response);
			ElMessage({
				message: response.msg,
				type: 'success',
			});
			// 更新轮播图数据
			updateSwiperData()
		} else if (response.status === 1) {
			ElMessage.error(response.msg)
		} else {
			ElMessage.error(getTip('other'))
		}
	}
</script>

<style lang="scss" scoped>
	// 外壳
	.common-wrapped {
		padding: 8px;
		background: #f5f5f5;
		// 计算 减去了头部还有面包屑 + 2X8=16边距
		height: calc(100vh - 101px);

		// 内容
		.common-content {
			padding: 0 10px;
			height: 100%;
			background: #fff;

			// 账号信息外壳
			.account-info-wrapped {
				display: flex;
				align-items: center;
				padding-left: 50px;
				margin-bottom: 24px;
				font-size: 14px;

				// 账号信息内容
				.account-info-content {
					margin-left: 24px;
					margin-right: 16px;
				}

				// 按钮
				.account-save-button {
					margin-left: 16px;
				}
			}

			// 首页管理外壳
			.home-wrapped {
				padding-left: 50px;
				display: flex;
				flex-direction: column;

				// 提示
				.tips {
					display: flex;
					align-items: center;
					margin-bottom: 8px;

					span {
						font-size: 14px;
						color: silver;
					}
				}

				// 轮播图
				.swiper-wrapped {
					display: flex;
					margin-bottom: 16px;

					// 轮播图名字
					.swiper-name {
						font-size: 14px;
						margin-bottom: 24px;
					}

					.swiper {
						width: 336px;
						height: 96px;
					}
				}
			}
		}
	}

	// 上传头像
	.avatar-uploader .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	// 输入框的长度
	:deep(.el-input) {
		width: 240px;
	}
</style>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		text-align: center;
	}
</style>