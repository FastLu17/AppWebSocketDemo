<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<button @click="setStorage">设置缓存的UserId</button>
			<button @click="login">进行登录操作</button>
			<button @click="update">进行改密操作</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showRegister: false,
			socketMessage: [],
			userId: uni.getStorageSync('userId')
		};
	},
	onLoad() {},
	methods: {
		update() {
			uni.request({
				url: 'http://192.168.1.4:8080/update',
				data: {
					userId: uni.getStorageSync('userId'),
					userName: 'Jack',
					password: '654321'
				},
				success: function(res) {
					console.log(JSON.stringify(res));
				}
			});
		},
		setStorage: function() {
			uni.setStorageSync('userId', 1561625355519);
		},
		// register: function() {
		// 	var _self = this;
		// 	uni.request({
		// 		url: 'http://192.168.1.4:8080/add', //仅为示例，并非真实接口地址。
		// 		data: {
		// 			userName: _self.userName,
		// 			password: _self.password
		// 		},
		// 		success: function(res) {
		// 			console.log(JSON.stringify(res));
		// 			uni.setStorageSync('userId', res.data);
		// 		}
		// 	});
		// },
		login: function() {
			uni.request({
				url: 'http://192.168.1.4:8080/login', //仅为示例，并非真实接口地址。
				data: {
					userId: uni.getStorageSync('userId'),
					userName: 'Jack',
					password: '654321'
				},
				success: function(res) {
					console.log(JSON.stringify(res));
				}
			});
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}

.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}

.title {
	font-size: 36upx;
	color: #8f8f94;
}
</style>
