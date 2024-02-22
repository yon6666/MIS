<!-- 首页 -->
<template>
	<BreadCrumb ref="breadcrumb" :item='item' />
	<!-- 首页外壳 -->
	<div class="home-wrapped">
		<!-- 轮播图外壳 -->
		<div class="swiper-wrapped">
			<el-carousel :interval="4000" type="card" height="200px" indicator-position='outside'>
				<el-carousel-item v-for="(item,index) in swiperData" :key="index">
					<img class="swiper" :src="item.imgUrl" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>

		<!-- 栅格布局外壳 -->
		<div class="layout-wrapped">
			<el-row :gutter="20">
				<el-col :span="6" v-for="(item,index) in companyIntroduceData" :key="index">
					<div class="company-message-area" @click="openIntroduce(item.set_name)">
						<span class="area-name">{{item.set_name}}</span>
						<div v-html="item.set_text" class="company-introduce"></div>
					</div>
				</el-col>
			</el-row>
		</div>

		<!-- 表格外壳 -->
		<div class="two-table-wrapped">
			<!-- 公司公告 -->
			<div class="company-notice">
				<span class="title">公司公告</span>
				<el-table :data="tableData" style="width: 100%" :show-header='false'>
					<el-table-column prop="date" label="Date" width="180" />
					<el-table-column prop="name" label="Name" width="180" />
					<el-table-column prop="address" label="Address" />
				</el-table>
			</div>

			<!-- 系统消息 -->
			<div class="system-message">
				<span class="title">系统消息</span>
				<el-table :data="tableData" style="width: 100%" :show-header='false'>
					<el-table-column prop="date" label="Date" width="180" />
					<el-table-column prop="name" label="Name" width="180" />
					<el-table-column prop="address" label="Address" />
				</el-table>
			</div>
		</div>

	</div>

	<!-- 富文本编辑器弹窗 -->
	<introduce ref="introduceP" />
</template>

<script lang="ts" setup>
	import BreadCrumb from '@/components/BreadCrumb.vue'
	import { ref, onMounted } from 'vue';
	import { getAllSwiper, getAllCompanyIntroduce } from '@/api/setting'
	import { bus } from "@/utils/mitt.js"
	import introduce from './component/introduce.vue'

	// 面包屑
	const breadcrumb = ref()

	// 面包屑参数
	const item = ref({
		first: '首页',
	})

	// 轮播图
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

	// 公司信息
	const companyIntroduceData = ref([])

	const getAllCompanyIntroduceData = async () => {
		const res = await getAllCompanyIntroduce()
		companyIntroduceData.value = res.result
	}

	const tableData = [
		{
			date: '2016-05-03',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-02',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-04',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
		{
			date: '2016-05-01',
			name: 'Tom',
			address: 'No. 189, Grove St, Los Angeles',
		},
	]

	onMounted(async () => {
		// 获取所有轮播图
		await updateSwiperData()
		// 获取公司所有信息
		await getAllCompanyIntroduceData()
	})

	const introduceP = ref()
	const openIntroduce = (set_name : string) => {
		bus.emit("introduce", set_name)
		introduceP.value.open()
	}
</script>

<style lang="scss" scoped>
	@mixin table-class {
		height: 232px;
		width: 48%;
		display: flex;
		flex-direction: column;
	}


	// 首页外壳
	.home-wrapped {
		padding: 8px;
		height: calc(100vh - 101px);
		background: #f5f5f5;
		display: flex;
		flex-direction: column;


		// 轮播图外壳
		.swiper-wrapped {
			padding: 0 20px;
			background: #fff;
			margin-bottom: 8px;

			.swiper {
				width: 100%;
			}
		}

		// 栅格布局外壳
		.layout-wrapped {
			padding: 8px;
			margin-bottom: 8px;
			background: #fff;


			// 公司信息区域
			.company-message-area {
				background: #f5f5f5;
				height: 200px;
				padding: 8px;
				cursor: pointer;

				// 标题
				.area-name {
					border-bottom: 1px solid #409eff;
					font-size: 14px;
				}

				// 内容
				.company-introduce {
					text-indent: 24px;
					font-size: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 3;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}

			}

			// 鼠标悬停状态
			.company-message-area:hover {
				cursor: pointer;
				background-color: #eef5ff;
			}


		}

		// 表格外壳
		.two-table-wrapped {
			height: 232px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			background: #fff;

			// 公司公告
			.company-notice {
				@include table-class
			}

			// 系统消息
			.system-message {
				@include table-class
			}

			.title {
				font-size: 14px;
				margin-bottom: 5px;
				border-bottom: 1px solid #ea0709;
			}
		}
	}


	.message_title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	// 轮播图默认样式
	.el-carousel__item h3 {
		color: #475669;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
		text-align: center;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n + 1) {
		background-color: #d3dce6;
	}
</style>