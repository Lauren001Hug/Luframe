// 登录页
const app = getApp();

Page({
  data: {},

  async login() {
    wx.showLoading({ title: '登录中...' });

    try {
      // 获取微信登录凭证
      const { code } = await wx.login();

      // 调用云函数登录
      const res = await wx.cloud.callFunction({
        name: 'login',
        data: { code },
      });

      if (res.result.success) {
        const userInfo = res.result.data;
        app.globalData.userInfo = userInfo;
        app.globalData.isLogin = true;
        wx.setStorageSync('userInfo', userInfo);

        wx.hideLoading();
        wx.showToast({ title: '登录成功', icon: 'success' });

        // 返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      } else {
        throw new Error(res.result.message);
      }
    } catch (err) {
      wx.hideLoading();
      wx.showToast({ title: '登录失败', icon: 'error' });
      console.error('登录失败:', err);
    }
  },
});
