// 相册列表页
Page({
  data: {
    keyword: '',
    currentCategory: 'all',
    categories: [
      { id: 'all', name: '全部' },
      { id: 'scenery', name: '风景' },
      { id: 'food', name: '美食' },
      { id: 'culture', name: '人文' },
      { id: 'city', name: '城市' },
      { id: 'nature', name: '自然' },
    ],
    albums: [],
    page: 1,
    pageSize: 20,
    hasMore: true,
    loading: false,
  },

  onLoad() {
    this.loadAlbums();
  },

  // 加载相册列表
  async loadAlbums() {
    if (this.data.loading || !this.data.hasMore) return;
    this.setData({ loading: true });

    try {
      const db = wx.cloud.database();
      const { keyword, currentCategory, page, pageSize } = this.data;

      let query = db.collection('albums');

      if (currentCategory !== 'all') {
        query = query.where({ category: currentCategory });
      }

      if (keyword) {
        query = query.where({
          name: db.RegExp({
            regexp: keyword,
            options: 'i',
          }),
        });
      }

      const res = await query
        .orderBy('createTime', 'desc')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .get();

      this.setData({
        albums: page === 1 ? res.data : [...this.data.albums, ...res.data],
        hasMore: res.data.length >= pageSize,
        loading: false,
      });
    } catch (err) {
      console.error('加载相册失败:', err);
      this.setData({ loading: false });
    }
  },

  // 搜索
  onSearch(e) {
    this.setData({ keyword: e.detail.value, page: 1, albums: [] });
    this.loadAlbums();
  },

  // 切换分类
  switchCategory(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({ currentCategory: id, page: 1, albums: [] });
    this.loadAlbums();
  },

  // 查看相册详情
  viewAlbum(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/album-detail/album-detail?id=${id}` });
  },

  // 创建相册
  createAlbum() {
    wx.navigateTo({ url: '/pages/album/create/create' });
  },

  // 上拉加载更多
  onReachBottom() {
    this.setData({ page: this.data.page + 1 });
    this.loadAlbums();
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ page: 1, albums: [] });
    this.loadAlbums();
    wx.stopPullDownRefresh();
  },
});
