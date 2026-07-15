# 旅帧 - 旅行相册小程序

> 让每一段旅程都有最美的帧数

## 项目简介

旅帧是一款面向旅行爱好者的相册小程序，用户可以创建旅行相册、添加照片、编辑游记、生成旅行路线图，并与好友分享。

## 技术栈

- **前端**：微信小程序原生框架
- **后端**：微信云开发（CloudBase）
- **存储**：云存储 + 云数据库
- **地图**：腾讯地图 API

## 核心功能

### V1.0 MVP
- [ ] 用户登录/注册
- [ ] 创建旅行相册
- [ ] 上传/管理照片
- [ ] 照片时间轴展示
- [ ] 基础分享功能

### V1.5 增长版
- [ ] AI 照片美化
- [ ] 旅行路线地图
- [ ] 游记编辑器
- [ ] 朋友圈分享卡片

### V2.0 商业化
- [ ] 照片打印服务
- [ ] 旅行周边商城
- [ ] 付费滤镜/模板
- [ ] 会员订阅

## 项目结构

```
Luframe/
├── miniprogram/          # 小程序前端代码
│   ├── pages/            # 页面
│   │   ├── index/        # 首页
│   │   ├── album/        # 相册
│   │   ├── share/        # 分享
│   │   └── mine/         # 我的
│   ├── components/       # 公共组件
│   ├── utils/            # 工具函数
│   ├── app.js            # 小程序入口
│   ├── app.json          # 全局配置
│   └── app.wxss          # 全局样式
├── cloudfunctions/       # 云函数
├── docs/                 # 项目文档
├── .github/              # GitHub 工作流
│   └── ISSUE_TEMPLATE/   # Issue 模板
└── README.md
```

## 快速开始

1. 克隆项目
```bash
git clone git@github.com:Lauren001Hug/Luframe.git
```

2. 使用微信开发者工具打开 `miniprogram` 目录

3. 配置云开发环境

4. 开始开发

## 开发规范

- 分支命名：`feature/功能名`、`bugfix/问题描述`
- 提交信息：`feat: 添加xxx功能`、`fix: 修复xxx问题`
- 代码审查：所有 PR 需要 review 后合并

## 许可证

MIT © Lauren001Hug
