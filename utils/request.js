// 发送Ajax请求
import config from "./config"
export default (url, data = {}, methods = 'GET') => {
    // new Promise初始化promise实例的状态为pending
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.baseUrl + url,
            data,
            methods,
            success(res) {
                // console.log('请求成功', res);
                resolve(res.data) //修改promise的状态为成功状态resolved
            },
            fail(err) {
                // console.log('请求失败', err);
                reject(err) //修改promise的状态为失败状态rejected
            }
        })
    })
}