// pages/personal/personal.js
import request from '../../utils/request'
let startY = 0 //手指起始的坐标
let endY = 0 //手指移动的坐标
let moveDistance = 0 //手指移动的距离
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coverTransform: 'translateY(0)',
        coverTransition: '',
        userInfo: {},
        recentPlayList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 读取用户的基本信息
        let userInfo = wx.getStorageSync('userInfo')
        if (userInfo.account) {
            // 更新userInfo的状态
            this.setData({
                userInfo: JSON.parse(userInfo)
            })
            this.getRecentPlayList(userInfo.account.id)
        }
        // this.getRecentPlayList('2075939212')
    },
    // 跳转到登录页面
    toLogin() {
        wx.reLaunch({
            url: '../login/login'
        })
    },
    // 获取最近播放列表
    async getRecentPlayList(uid) {
        let result = await request('/user/record', { uid, type: 1 })
        if (result.code == 200) {
            let index = 0
            let weekData = result.weekData.slice(0, 10).map(item => {
                item.id = index++
                    return item;
            })
            this.setData({
                recentPlayList: weekData
            })
        } else {
            console.log(result);
        }
    },

    // 手指移动事件
    handlerTouchStart(event) {
        // 将transition置空
        this.setData({
                coverTransition: ''
            })
            // 获取手指起始坐标
        startY = event.touches[0].clientY
    },
    handlerTouchMove(event) {
        endY = event.touches[0].clientY
        moveDistance = endY - startY
        if (moveDistance < 0) {
            moveDistance = 0
        }
        if (moveDistance > 80) {
            moveDistance = 80
        }
        // 动态更新coverTransform的状态值
        this.setData({
            coverTransform: `translateY(${moveDistance}rpx)`
        })
    },
    handlerTouchEnd() {
        // 动态更新coverTransform的状态值
        this.setData({
            coverTransform: 'translateY(0)',
            coverTransition: 'transform 1s linear'
        })
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