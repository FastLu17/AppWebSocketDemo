<script>
export default {
	//在App.vue页面开启webSocket，只有在退出App的时候，才会关闭webSocket的长连接。
	onLaunch: function() {
		console.log('App Launch');
		var _self = this;
		uni.onSocketMessage(function(res) {
			// 开启Socket时已显示红点
			uni.showTabBarRedDot({
				index: 0
			});
			_self.$GlobalData.messagesData.push(res.data);
			uni.setTabBarBadge({
				index: 0,
				text: _self.$GlobalData.messagesData.length.toString()
			});
			console.log('socketMessage in App.vue is：' + JSON.stringify(_self.$GlobalData.messagesData));
		});
		console.log('userId is:' + JSON.stringify(uni.getStorageSync('userId')));
		uni.connectSocket({
			url: 'ws://192.168.1.4:8080/websocket/' + uni.getStorageSync('userId'), //需要写成@ServerEndpoint("/websocket")指定的值
			success: function(res) {
				console.log('url is:' + 'ws://192.168.1.4:8080/websocket/' + uni.getStorageSync('userId'));
				
				//开启socket成功后获取未读消息、
				uni.request({
					url: 'http://192.168.1.4:8080/messages',
					data: {
						userId: uni.getStorageSync('userId'),
					},
					success: function(res) {
						console.log('messages in App.vue is:'+JSON.stringify(res));
						if (res.data.length>0) {
							uni.showTabBarRedDot({
								index: 0
							});
						}
						//需要将未读的消息push到messageData中.
						for (var i = 0; i < res.data.length; i++) {
							_self.$GlobalData.messagesData.push(res.data[i].content);
						}
						uni.setTabBarBadge({
							index: 0,
							text: _self.$GlobalData.messagesData.length.toString()
						});
					}
				});
			},
			fail: function(res) {
				console.log('fail is:' + JSON.stringify(res));
			},
			method: 'GET'
		});
		uni.onSocketOpen(function(res) {
			console.log('WebSocket连接已打开！');
		});

		uni.onSocketError(function(res) {
			console.log('WebSocket连接打开失败，请检查！');
		});

		uni.onSocketClose(function(res) {
			console.log('socket in App.vue is closed.' + JSON.stringify(res));
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
</style>
