<template>
	<div id="vue3-vite-app"><router-view /></div>
</template>

<style lang="less">
#vue3-vite-app {
	width: 100%;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
	color: #2c3e50;
	height: 100%;
}
body {
	background-color: #e5e7eb !important;
}
/* 更改进度条颜色 */
// #nprogress .bar {
//   background: #67C23A !important;
//   height: 4px !important;
// }

//滚动条样式
::-webkit-scrollbar {
	width: 4px;
	height: 4px;
}
::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
	background: #78b4b4;
}
::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
	border-radius: 10px;
	background: #ededed;
}
</style>
