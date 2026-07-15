// 首页
Page({
  data: {
    hotAlbums: [],
    travelNotes: [],
  },

  onLoad() {
    this.loadHotAlbums();
    this.loadTravelNotes();
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.loadHotAlbums();
  },

  // 加载热门相册
  async loadHotAlbums() {
    try {
      const db = wx.cloud.database();
      const res = await db
        .collection('albums')
        .orderBy('likeCount', 'desc')
        .limit(10)
        .get();
      this.setData({ hotAlbums: res.data });
    } catch (err) {
      console.error('加载热门相册失败:', err);
      // 使用模拟数据
      this.setData({
        hotAlbums: [
          { id: 1, name: '云南之旅', cover: '', photoCount: 36, likeCount: 128 },
          { id: 2, name: '日本樱花季', cover: '', photoCount: 52, likeCount: 256 },
          { id: 3, name: '西藏朝圣之路', cover: '', photoCount: 89, likeCount: 432 },
        ],
      });
    }
  },

  // 加载推荐游记
  loadTravelNotes() {
    // TODO: 从云数据库加载
    this.setData({
      travelNotes: [
        {
          id: 1,
          author: '旅行者小张',
          avatar: '',
          title: '在冰岛追逐极光的72小时',
          time: '3天前',
          images: [],
        },
        {
          id: 2,
          author: '背包客小李',
          avatar: '',
          title: '一个人的西藏自驾游攻略',
          time: '1周前',
          images: [],
        },
      ],
    });
  },

  // 创建相册
  createAlbum() {
    wx.navigateTo({ url: '/pages/album/create/create' });
  },

  // 快速分享
  quickShare() {
    wx.navigateTo({ url: '/pages/share/share' });
  },

  // AI 美化
  aiBeautify() {
    wx.navigateTo({ url: '/pages/beautify/beautify' });
  },

  // 附近景点
  nearby() {
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 15,
        });
      },
    });
  },

  // 查看相册
  viewAlbum(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/album-detail/album-detail?id=${id}` });
  },

  // 查看全部
  viewAll() {
    wx.switchTab({ url: '/pages/album/album' });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadHotAlbums();
    this.loadTravelNotes();
    wx.stopPullDownRefresh();
  },
});
