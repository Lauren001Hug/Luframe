// 旅帧 - 小程序入口
App({
  globalData: {
    userInfo: null,
    isLogin: false,
    cloudEnvId: 'your-cloud-env-id', // 替换为你的云环境 ID
  },

  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: this.globalData.cloudEnvId,
        traceUser: true,
      });
    }

    // 检查登录状态
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isLogin = true;
    }
  },

  // 获取用户信息
  async getUserInfo() {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getUserInfo',
      });
      this.globalData.userInfo = result.data;
      this.globalData.isLogin = true;
      wx.setStorageSync('userInfo', result.data);
      return result.data;
    } catch (err) {
      console.error('获取用户信息失败:', err);
      return null;
    }
  },
});
