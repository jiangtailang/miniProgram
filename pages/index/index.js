import request from '../../utils/request'

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [], //轮播图数据
        recommendList: [], //推荐歌单
        topList: [], //排行榜
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getInitData()
    },
    // 获取初始化数据，包括轮播图、推荐歌单、排行榜数据
    async getInitData() {
        // 获取轮播图数据
        let bannerListResult = await request('/banner', { type: 2 })
        if (bannerListResult.code == 200) {
            this.setData({
                bannerList: bannerListResult.banners
            })
        }
        // 获取推荐歌单数据
        let recommendListResult = await request('/personalized', { limit: 10 })
        if (recommendListResult.code == 200) {
            this.setData({
                recommendList: recommendListResult.result
            })
        }
        // 排行榜
        /* 
        需求分析：
        1.需要根据idx的值获取对应的数据
        2.idx的取值范围是0-20，我们需要0-4
        3.需要发送5次请求
        前++ 和 后++ 的区别
        1.先看到的是运算符还是值
        2.如果先看到的是运算符就先运算再赋值
        3.如果先看到的是值那么就先赋值再运算
        */
        let index = 0
        let finalArr = []
        while (index < 5) {
            let topListAllResult = await request('/top/list', { idx: index++ })
            let topItem = {
                mucicName: topListAllResult.playlist.name,
                // splice(会修改原数组，可以对指定的数组进行增删改) slice(不会修改数组)
                tracks: topListAllResult.playlist.tracks.slice(0, 3)
            }
            finalArr.push(topItem)
                // 不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
            this.setData({ topList: finalArr })
        }
    },
    // 点击每日推荐的导航，跳转至每日推荐页
    toRecommendSong() {
        wx.navigateTo({ url: '/songPackage/pages/recommendSong/recommendSong' })
    },
    // 点击other的导航
    toOther() {
        wx.navigateTo({ url: '/otherPackage/pages/other/other' })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})