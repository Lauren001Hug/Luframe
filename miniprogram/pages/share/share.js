// 分享页
Page({
  data: {
    qrcodeUrl: '',
    shareOptions: [
      { id: 1, type: 'album', icon: '📷', name: '分享相册', desc: '把旅行相册分享给好友' },
      { id: 2, type: 'moment', icon: '🎞️', name: '生成旅行卡片', desc: '制作精美的旅行分享卡片' },
      { id: 3, type: 'timeline', icon: '🗺️', name: '生成旅行路线', desc: '生成旅行路线长图' },
      { id: 4, type: 'group', icon: '👥', name: '邀请好友', desc: '邀请好友一起编辑相册' },
    ],
  },

  onLoad() {
    // 获取小程序二维码
    this.getQRCode();
  },

  // 获取小程序码
  async getQRCode() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getQRCode',
      });
      this.setData({ qrcodeUrl: res.result.qrcodeUrl });
    } catch (err) {
      console.error('获取二维码失败:', err);
    }
  },

  // 分享操作
  onShare(e) {
    const { type } = e.currentTarget.dataset;
    switch (type) {
      case 'album':
        wx.navigateTo({ url: '/pages/album/album' });
        break;
      case 'moment':
        wx.navigateTo({ url: '/pages/share/card/card' });
        break;
      case 'timeline':
        wx.navigateTo({ url: '/pages/share/timeline/timeline' });
        break;
      case 'group':
        wx.navigateTo({ url: '/pages/share/invite/invite' });
        break;
    }
  },

  // 分享给好友
  onShareAppMessage() {
    return {
      title: '旅帧 - 记录每一段旅程',
      path: '/pages/index/index',
      imageUrl: '/assets/share-cover.png',
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '旅帧 - 让旅行有故事，让回忆有温度',
    };
  },
});
