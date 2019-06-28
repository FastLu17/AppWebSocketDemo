<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{ title }}</text>
		</view>
		<!-- 数据库可以设置message已读和未读，显示数据库的数据。 -->
		<view v-for="(message, index) in socketMessage" :key="index">
			<text>{{ message }}---{{ index }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '我的消息',
			socketTask: null,
			is_open_socket: false, //暂时不需要使用判断socket的状态.
			socketMessage: this.$GlobalData.messagesData,
			userId: uni.getStorageSync('userId')
		};
	},
	//离开页面时，清空数据.
	beforeDestroy() {
		this.$GlobalData.messagesData=[];
	},
	onLoad() {
		uni.request({
			url: 'http://192.168.1.4:8080/messages',
			data: {
				userId: uni.getStorageSync('userId'),
			},
			success: function(res) {
				console.log('Messages is:'+JSON.stringify(res));
			}
		});
	},
	// 	onShow() {
	// 		console.log('进入Message页面:' + JSON.stringify(this.socketTask));
	// 		this.connectSocketInit();
	// 	},
	// 	//离开页面时，关闭socket、
	// 	beforeDestroy() {
	// 		this.closeSocket();
	// 		console.log('离开Message页面.');
	// 	},
	// 	methods: {
	// 		toIndex: function() {
	// 			uni.switchTab({
	// 				url: '/pages/index/index'
	// 			});
	// 		},
	// 		connectSocketInit() {
	// 			var _self = this;
	// 			// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
	// 			this.socketTask = uni.connectSocket({
	// 				url: 'ws://192.168.1.4:8080/websocket/' + _self.userId, //需要写成@ServerEndpoint("/websocket")指定的值
	// 				success: function(res) {
	// 					console.log('success is:' + JSON.stringify(res));
	// 					console.log('url is:' + 'ws://192.168.1.4:8080/websocket/' + _self.userId);
	// 				},
	// 				fail: function(res) {
	// 					console.log('fail is:' + JSON.stringify(res));
	// 				},
	// 				method: 'GET'
	// 			});
	//
	// 			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则无法接收或发送消息】
	// 			this.socketTask.onOpen(res => {
	// 				console.log('WebSocket连接正常打开中...！');
	// 				this.is_open_socket = true;
	//
	// 				// 暂时不需要发送消息功能
	// 				// this.socketTask.send({
	// 				// 	data: 'uni-app发送一条消息',
	// 				// 	async success() {
	// 				// 		console.log('消息发送成功');
	// 				// 	}
	// 				// });
	//
	// 				this.socketTask.onMessage(res => {
	// 					_self.socketMessage.push(res.data);
	// 					console.log('socketMessage is：' + JSON.stringify(_self.socketMessage));
	// 				});
	// 			});
	// 			this.socketTask.onError(function(res) {
	// 				console.log('WebSocket连接打开失败，errMsg:' + JSON.stringify(res));
	// 			});
	// 			// 如果socket关闭了会执行、
	// 			this.socketTask.onClose(() => {
	// 				console.log('已经被关闭了');
	// 			});
	// 		},
	// 		// 关闭websocket【离开当前页面的时候执行关闭】
	// 		closeSocket() {
	// 			this.socketTask.close({
	// 				success(res) {
	// 					this.is_open_socket = false;
	// 					console.log('关闭成功', res);
	// 				},
	// 				fail(err) {
	// 					console.log('关闭失败', err);
	// 				}
	// 			});
	// 		}
	// 	}
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
