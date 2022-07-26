import request from '../../utils/request'
// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 表单内容发生改变的回调
    handlerInput(event) {
        // let type = event.currentTarget.id;  //id传值
        let type = event.currentTarget.dataset.type //data-key=value
        this.setData({
            [type]: event.detail.value
        })
    },
    // 登录的回调
    async handlerLogin() {
        // 收集手机号、密码数据
        let { phone, password } = this.data
            // 前端验证
            /**
             * 手机号验证：
             * 1.内容为空
             * 2.手机号格式不正确
             * 3.手机号格式正确，验证通过
             */
        if (!phone) {
            // 提示用户
            wx.showToast({
                title: '手机号不能为空',
                icon: 'error'
            })
            return
        }
        // 定义正则表达式
        let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
        if (!phoneReg.test(phone)) {
            wx.showToast({
                title: "手机号格式错误",
                icon: "error"
            })
            return
        }
        if (!password) {
            wx.showToast({
                title: '密码不能为空',
                icon: 'error'
            })
            return
        }
        // 后端验证
        let result = await request('/login/cellphone', { phone, password, isLogin: true })
        if (result.code == 200) {
            wx.showToast({
                    title: '登录成功'
                })
                // 将用户信息存在本地存储中
            wx.setStorageSync('userInfo', JSON.stringify(result.profile))
                // 跳转到个人中心
            wx.switchTab({
                url: '/pages/personal/personal'
            })
        } else if (result.code == 400) {
            wx.showToast({
                title: '手机号错误',
                icon: 'error'
            })
        } else if (result.code == 502) {
            wx.showToast({
                title: '密码错误',
                icon: 'error'
            })
        } else {
            wx.showToast({
                title: '登录失败，请重新登录',
                icon: 'none'
            })
        }
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