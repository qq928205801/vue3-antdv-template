import {
	fileURLToPath,
	URL
} from 'node:url'
import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import {
	visualizer
} from 'rollup-plugin-visualizer';
import {
	autoComplete,
	Plugin as importToCDN
} from "vite-plugin-cdn-import";
const {
	name
} = require('./package.json')
const Timestamp = new Date().getTime()
const modules = [{
		name: "mockjs",
		var: "Mock",
		path: "https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock.js"
	},
	{
		name: "nprogress",
		var: "NProgress",
		path: "https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js",
		css: "https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css"
	},
	{
		name: "moment",
		var: "moment",
		path: "https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.4/moment.min.js"
	},
	// {
	// 	name:"ant-design-vue",
	// 	var:"Antd",
	// 	path:"https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.2.17/antd.min.js",
	// 	css: "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.2.17/antd.min.css"
	// },
	{
		name: "three",
		var: "THREE",
		path: "https://cdn.bootcdn.net/ajax/libs/three.js/0.151.3/three.min.js",
		css: ""
	},
]
// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src',
				import.meta.url))

		}
	},
	server: {
		hmr: true, //开启热更新
		port: 8088,
		headers: {
			'Access-Control-Allow-Origin': '*',
		}
		// proxy: {
		//   '/api': {
		//     target: 'https://mobileapi-test.farthertop.com',
		//     changeOrigin: true,
		//     ws: true,
		//     rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
		//   },
		// },
	},
	plugins: [
		vue(),
		// visualizer(), //打包体积可视化面板
		// importToCDN({
		// 	modules: modules
		// }) //cdn
		// viteCompression() //gzip
	],
	build: {
		outDir: 'dist2',
		// minify: 'terser',// 混淆器，terser 构建后文件体积更小，'terser' | 'esbuild' ,默认为esbuild速度更快
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		},
		rollupOptions: {
			output: {
				chunkFileNames: `js/[name]-${Timestamp}.js`,
				entryFileNames: `js/[name]-${Timestamp}.js`,
				assetFileNames: `[ext]/[name]-${Timestamp}.[ext]` //不同类型文件单独存放，[ext]表示文件扩展名
				// assetFileNames: `css/[name]-${Timestamp}.css`
			},
			//   external: [] //不打包模块
		}
	}
})
