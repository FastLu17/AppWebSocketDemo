<template>
	<view class="login">
		<view class="content">
			<view class="input-box">
				<text class="icon">账号:</text>
				<input class="uni-input" type="text" v-model="userName" maxlength="11" placeholder="请输入用户名" />
			</view>
			<view class="input-box">
				<text class="icon">密码:</text>
				<input class="uni-input code-input" type="number" password="true" v-model="password" maxlength="6" placeholder="请输入密码" />
			</view>
			<button class="btn" type="primary" size="mini" plain="true" @click.stop="login">登录</button>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			password: '',
			userName: ''
		};
	},
	methods: {
		login() {
			uni.request({
				url: 'http://192.168.1.4:8080/login',
				data: {
					userName: this.userName,
					password: this.password
				},
				success: function(res) {
					console.log(JSON.stringify(res));
					uni.setStorageSync('userId',res.data.id);
					// if (res.data) {
					// 	uni.switchTab({
					// 		url: '/pages/index/person'
					// 	});
					// }
					// uni.redirectTo({
					// 	url: '/pages/index/message',
					// 	success: function(res) {
					// 		console.log('success is:' + JSON.stringify(res));
					// 		uni.switchTab({
					// 			url:'/pages/index/index'
					// 		})
					// 	}
					// });
					
					uni.switchTab({
						url:'/pages/index/index'
					})
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
.login {
	overflow: hidden;

	.content {
		margin: 30% auto 0;
		width: 80%;

		.input-box {
			position: relative;
			padding: 8px 15px;
			margin-top: 20px;
			border-bottom: 1px solid #eee;

			&:first-child {
				margin-top: 0;
			}

			.icon {
				float: left;
				display: block;
				width: 54px;
				height: 24px;
				margin-top: 1px;
			}

			.uni-input {
				margin-left: 30px;
				display: block;
				padding: 0 10px;
			}

			.code-btn {
				position: absolute;
				bottom: 6px;
				right: 0;
				z-index: 10;
				width: 80px;
				padding: 0;
				float: right;
			}
		}

		.text-box {
			margin-top: 20px;
			color: #1296db;

			.right {
				float: right;
			}
		}

		.btn {
			display: flex;
			justify-content: center;
			padding: 4px;
			width: 100%;
			margin-top: 30px;
		}

		.three-login-box {
			display: flex;
			margin-top: 30px;
			text-align: center;
			justify-content: center;
			align-items: center;
			width: 100%;

			.wx {
				width: 40px;
				height: 40px;
			}
			.wx-text {
				color: #007aff;
				font-size: 13px;
			}
		}
	}
}
</style>
