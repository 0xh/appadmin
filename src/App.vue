<template>
	<div id="app">
		<p>
			<!-- 使用 router-link 组件来导航. -->
			<!-- 通过传入 `to` 属性指定链接. -->
			<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
			<!--router-link默认渲染成a标签，也有方法让它渲染成其他标签，tag属性就用来设置router-link渲染成什么标签的。-->
			<router-link to="/foo">Go to Foo</router-link>
			<router-link to="/bar">Go to Bar</router-link>
		</p>
		<!-- 路由出口 -->
		<!-- 路由匹配到的组件将渲染在这里 -->
		<!--可以给router-view组件设置transition过渡-->
		<!--还可以配合<keep-alive>使用，keep-alive可以缓存数据-->
		<!--如果你的应用里有一个购物车组件，就需要用到keep-alive。-->
		<!--你也可以在其他地方使用<router-view></router-view>来创建嵌套路由，详见vue-router文档-->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {
		}
	}

</script>

<!--<style lang="sass" src="../style/app.scss"></style>-->

<style lang="scss">
	body {
		margin: 0px;
		padding: 0px;
		/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
		background: #1F2D3D;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-size: 14px;
		-webkit-font-smoothing: antialiased;
	}
	
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
	
	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	
	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
	
	.toolbar {
		background: #fff;
		padding: 10px;
		.el-form-item {
			margin-bottom: 10px;
		}
	}
</style>