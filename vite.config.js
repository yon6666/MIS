import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
	ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
import {
	createSvgIconsPlugin
} from 'vite-plugin-svg-icons'

// 设置@指向./src路径
import {
	resolve
} from 'path'
const pathResolve = dir => resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		createSvgIconsPlugin({
			iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
			symbolId: 'icon-[dir]-[name]',
		}),
	],
	pluginOptions: {
		'style-resource-loader': {
			preProcessor: 'scss',
			patterns: []
		}
	},
	server: {
		port: 8088, // 端口
		open: true, //默认打开浏览器
		cors: true, // 允许跨域
	},
	resolve: {
		alias: {
			'@': pathResolve('./src')
		}
	}
})
