// 我的
const app = getApp();

Page({
  data: {
    userInfo: {},
    isLogin: false,
    myMenus: [
      { id: 1, icon: '📷', name: '我的相册', url: '/pages/album/album' },
      { id: 2, icon: '❤️', name: '我的收藏', url: '/pages/mine/favorites/favorites' },
      { id: 3, icon: '📝', name: '我的游记', url: '/pages/mine/notes/notes' },
      { id: 4, icon: '🗺️', name: '旅行足迹', url: '/pages/mine/footprint/footprint' },
    ],
    settingMenus: [
      { id: 1, icon: '⚙️', name: '账号设置', url: '/pages/mine/settings/settings' },
      { id: 2, icon: '🔔', name: '消息通知', url: '/pages/mine/notify/notify' },
      { id: 3, icon: '📋', name: '隐私政策', url: '/pages/mine/privacy/privacy' },
      { id: 4, icon: 'ℹ️', name: '关于旅帧', url: '/pages/mine/about/about' },
    ],
  },

  onShow() {
    this.loadUserInfo();
  },

  async loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        isLogin: true,
      });
    }
  },

  // 获取用户信息
  async getUserProfile() {
    try {
      const { userInfo } = await wx.getUserProfile({
        desc: '用于完善个人资料',
      });
      
      // 保存到云数据库
      const db = wx.cloud.database();
      await db.collection('users').add({
        data: {
          ...userInfo,
          createTime: db.serverDate(),
        },
      });

      app.globalData.userInfo = userInfo;
      app.globalData.isLogin = true;
      wx.setStorageSync('userInfo', userInfo);

      this.setData({ userInfo, isLogin: true });
    } catch (err) {
      console.error('获取用户信息失败:', err);
    }
  },

  // 菜单点击
  onMenuTap(e) {
    const { url } = e.currentTarget.dataset;
    if (url) {
      wx.navigateTo({ url });
    }
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('userInfo');
          app.globalData.userInfo = null;
          app.globalData.isLogin = false;
          this.setData({ userInfo: {}, isLogin: false });
        }
      },
    });
  },

  onShareAppMessage() {
    return {
      title: '旅帧 - 记录每一段旅程',
      path: '/pages/index/index',
    };
  },
});
