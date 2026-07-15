// 相册详情页
Page({
  data: {
    albumId: '',
    album: {},
    photos: [],
    liked: false,
    likeCount: 0,
  },

  onLoad(options) {
    const { id } = options;
    this.setData({ albumId: id });
    this.loadAlbumDetail(id);
    this.loadPhotos(id);
  },

  // 加载相册详情
  async loadAlbumDetail(albumId) {
    try {
      const db = wx.cloud.database();
      const res = await db.collection('albums').doc(albumId).get();
      this.setData({
        album: res.data,
        likeCount: res.data.likeCount || 0,
      });
    } catch (err) {
      console.error('加载相册详情失败:', err);
    }
  },

  // 加载照片列表
  async loadPhotos(albumId) {
    try {
      const db = wx.cloud.database();
      const res = await db
        .collection('photos')
        .where({ albumId })
        .orderBy('createTime', 'asc')
        .get();
      this.setData({ photos: res.data });
    } catch (err) {
      console.error('加载照片失败:', err);
    }
  },

  // 切换点赞
  async toggleLike() {
    const { liked, likeCount, albumId } = this.data;
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;

    this.setData({ liked: newLiked, likeCount: newCount });

    // 更新数据库
    try {
      const db = wx.cloud.database();
      await db.collection('albums').doc(albumId).update({
        data: {
          likeCount: db.command.inc(newLiked ? 1 : -1),
        },
      });
    } catch (err) {
      console.error('更新点赞失败:', err);
    }
  },

  // 添加照片
  addPhoto() {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.uploadPhotos(res.tempFiles);
      },
    });
  },

  // 上传照片到云存储
  async uploadPhotos(files) {
    const { albumId } = this.data;
    wx.showLoading({ title: '上传中...' });

    try {
      for (const file of files) {
        const cloudPath = `albums/${albumId}/${Date.now()}_${Math.random().toString(36).substr(2, 6)}.jpg`;
        const uploadRes = await wx.cloud.uploadFile({
          cloudPath,
          filePath: file.tempFilePath,
        });

        // 保存到数据库
        const db = wx.cloud.database();
        await db.collection('photos').add({
          data: {
            albumId,
            url: uploadRes.fileID,
            createTime: db.serverDate(),
          },
        });
      }

      wx.hideLoading();
      wx.showToast({ title: '上传成功', icon: 'success' });
      this.loadPhotos(albumId);
    } catch (err) {
      wx.hideLoading();
      wx.showToast({ title: '上传失败', icon: 'error' });
      console.error('上传照片失败:', err);
    }
  },

  // 查看照片
  viewPhoto(e) {
    const { index } = e.currentTarget.dataset;
    const urls = this.data.photos.map(p => p.url);
    wx.previewImage({
      current: urls[index],
      urls,
    });
  },

  // 添加评论
  addComment() {
    wx.showToast({ title: '评论功能开发中', icon: 'none' });
  },

  onShareAppMessage() {
    const { album } = this.data;
    return {
      title: `旅帧 | ${album.name}`,
      path: `/pages/album-detail/album-detail?id=${this.data.albumId}`,
      imageUrl: album.cover,
    };
  },
});
