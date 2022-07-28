# 小程序相关

## 1.  数据绑定

1. 小程序
   1. data中初始化数据
   2. 修改数据： this.setData()
      1. 修改数据的行为始终是同步的
   3. 数据流： 
      1. 单项： Model ---> View
2. Vue
   1. data中初始化数据
   2. 修改数据: this.key = value
   3. 数据流： 
      1. Vue是单项数据流： Model ---> View
      2. Vue中实现了双向数据绑定： v-model
3. React
   1. state中初始化状态数据
   2. 修改数据: this.setState()
      1. 自身钩子函数中(componentDidMount)异步的
      2. 非自身的钩子函数中(定时器的回调)同步的
   3. 数据流： 
      1. 单项： Model ---> View

## 2. 获取用户基本信息

1. 用户未授权(首次登陆)
   1. button open-type=‘getUserInfo’
2. 用户已经授权(再次登陆)
   1. wx.getUserInfo

## 3. 前后端交互

1. 语法: wx.request()
2. 注意点: 
   1. 协议必须是https协议
   2. 一个接口最多配置20个域名
   3. 并发限制上限是10个
   4. **开发过程中设置不校验合法域名**： 开发工具 ---> 右上角详情 ----> 本地设置 ---> 不校验

## 4. 本地存储

1. 语法: wx.setStorage() || wx.setStorageSync() || .....
2. 注意点： 
   1. 建议存储的数据为json数据
   2. 单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB
   3. 属于永久存储，同H5的localStorage一样

# 扩展内容

## 1. 事件流的三个阶段

1. 捕获: 从外向内
2. 执行目标阶段
3. 冒泡: 从内向外

## 2. 事件委托

1. 什么是事件委托
   1. 将子元素的事件委托(绑定)给父元素
2. 事件委托的好处
   1. 减少绑定的次数
   2. 后期新添加的元素也可以享用之前委托的事件
3. 事件委托的原理
   1. 冒泡
4. 触发事件的是谁
   1. 子元素
5. 如何找到触发事件的对象
   1. event.target
6. currentTarget VS target
   1. currentTarget要求绑定事件的元素一定是触发事件的元素
   2. target绑定事件的元素不一定是触发事件的元素

## 3. 定义事件相关

1. 分类
   1. 标准DOM事件
   2. 自定义事件
2. 标准DOM事件
   1. 举例： click，input。。。
   2. 事件名固定的，事件由浏览器触发
3. 自定义事件
   1. 绑定事件
      1. 事件名
      2. 事件的回调
      3. 订阅方: PubSub.subscribe(事件名，事件的回调)
      4. 订阅方式接受数据的一方
   2. 触发事件
      1. 事件名
      2. 提供事件参数对象， 等同于原生事件的event对象
      3. 发布方: PubSub.publish(事件名，提供的数据)
      4. 发布方是提供数据的一方


## utils
1. 封装功能函数
   1. 功能点明确
   2. 函数内部应该保留固定代码（静态的)
   3. 将动态的数据抽取成形参，由使用者根据自身的情况动态的传入实参
   4. 一个良好的功能函数应该设置形参的默认值（ES6的形参默认值）
2. 封装功能组件
   1. 功能点明确
   2. 组件内部保留静态的代码
   3. 将动态的数据抽取成props参数，由使用者根据自身的情况以标签属性的形式动态传入props数据
   4. 一个良好的组件应该设置组件的必要性以数据类型
      props:{
         msg:{
            require:true,
            defalut:默认值,
            type:String
         }
      }

## 登录流程
1. 收集表单项数据
2. 前端验证
   1) 验证用户信息（账号，密码）是否合法
   2) 前端验证不通过就提示用户，不需要发请求给后端
   3) 前端验证通过了，发请求（携带账号，密码）给服务器
3. 后端验证
   1) 验证用户是否存在
   2) 用户不存在直接返回，告诉前端用户不存在
   3) 用户存在需要验证密码是否正确
   4) 密码不正确返回给前端提示密码不正确
   5) 密码正确返回给前端数据，提示用户登录成功（会携带用户的相关信息）

## 位移运算符 <<< >>>
let num = 3;                                // 0000 0011
//将目标先转换成二进制，然后移动指定的位数
console.log(num >>> 2); // 0                // 0000 0000
console.log(num >>> 1); // 1                // 0000 0001
//右移零位会将非number数据强制转换成number

## flex
1. flex:1 会导致父元素宽度自动为100%
2. flex-grow: 可拉伸, flex-shrink: 可压缩, flex-basis: 当前元素的宽度
   1. flex默认值：flex-grow: 0, flex-shrink: 1, flex-basis: auto
   2. flex:1 ：flex-grow: 1, flex-shrink: 1, flex-basis: 0%
   3. flex:auto ：flex-grow: 1, flex-shrink: 1, flex-basis: auto

# 注意：
由于某些原因，用户无法登录，无法获取到userInfo以及cookies等数据，部分页面功能无法实现，在这里仅阐述一下思路
   1. 登录页
      1. 登录成功后，将用户信息存储在本地 wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      2. 登录成功后，跳转到个人中心 wx.switchTab({ url: '/pages/personal/personal'})

   2. 视频页
      1. 在request.js文件中存储cookies
         1. 如果是登录请求，就将用户cookies存入本地 if(data.isLogin) { wx.setStorage({ key:'cookies', data:res.cookies }) }
         2. 在 header 中携带cookie  header:{ cookie:wx.getStorageSync('cookies') ?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) :'' }
      2. 点击切换视频功能
         1. 在 获取到导航列表 和 点击切换导航标签 时发请求获取视频列表
         2. 为防止数据回显，在点击切换导航标签时，先置空视频列表，再发请求获取数据
         3. 添加loading提高用户体验
            1. 在点击切换导航标签时，打开loading效果，wx.showLoading({ title:'加载中' })
            2. 在获取到视频列表数据后，关闭loading效果，wx.hideLoading()
      3. 导航过渡效果
         在scroll-view标签中添加 scroll-into-view="{{'scroll' + navId}}" ，并给子元素添加 id="{{'scroll' + item.id}}"
      4. 阻止多个视频同时播放
         1. 需求
            1. 在点击播放的事件中需要找到上一个播放的视频
            2. 在播放新的视频之前关闭上一个正在播放的视频
         2. 关键
            1. 如何找到上一个视频的实例对象
            2. 如何确认点击播放的视频和正在播放的视频不是同一个视频
         3. 单例模式
            1. 需要创建多个对象的场景下，通过一个变量接收，始终保持只有一个对象
            2. 节省内存空间
         4. 功能实现：
            通过bindplay，当开始/继续播放时触发 play 事件
            let vid = event.currentTarget.id
            // 如果这次视频ID与上一次的不同，则关闭上一个播放的视频
            this.vid !== vid && this.videoContext && this.videoContext.stop()
            // 创建控制video标签的实例对象
            this.videoContext = wx.createVideoContext(vid)
            this.vid = vid
      5. 用image代替video优化性能
         1. 在video中设置视频封面的图片网络资源地址，poster="图片的url"。在image中设置src="图片的url"
         1. 设置videoId字段，用以标识当前需要播放的video
         2. 给image也绑定事件（与video绑定的是同一个事件），并打上id标识（与相应video的id相同）
         3. 点击image触发事件，更新data中videoId，this.setData({ videoId:vid })，并让video开始播放 this.videoContext.play()
         4. image与video之间用wx:if和wx:else切换，wx:if="{{videoId === item.data.vid}}"
      6. 解决视频大小与 video 容器大小不一致的问题
         object-fit="cover"
      7. 保证搜索区域、导航区域和tabBar区域固定不动，而视频列表可滚动
         1. 使用竖向滚动scroll-y时，需要给scroll-view一个固定高度，通过 WXSS 设置 height
         2. calc：可以动态计算css的宽高，运算符左右两侧必须加空格，否则计算会失效
         3. 视口单位：1vh = 1%的视口高度     1vw = 1%的视口宽度
         4. height: calc(100vh - 152rpx)
      8. 再次播放跳转至上一次播放的位置，实现继续播放
         1. 思路：
            1. 判断记录播放时长的videoUpdateTime数组中是否有当前视频(用vid标识)的播放记录(用currentTime标识)
               1. 如果有，在原有的播放记录中修改播放时间为当前的播放时间
               2. 如果没有，需要在数组中添加当前视频的播放对象
            2. 一个视频播放完了，删除有关视频的videoUpdateTime记录
         2. 功能实现：
            1. 通过bindtimeupdate，播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次
               let videoTimeObj = { vid:event.currentTarget.id, currentTime:event.currentTarget.currentTime }
               let {videoUpdateTime} = this.data
               let videoItem = videoUpdateTime.find(item => item.id === event.currentTarget.id)
               if(videoItem) {
                  videoItem.currentTime = event.detail.currentTime
               } else {
                  videoUpdateTime.push(videoTimeObj)
               }
               this.setData({
                  videoUpdateTime
               })
            2. 在bindplay，当开始/继续播放时触发 play 事件中
               let {videoUpdateTime} = this.data
               let videoItem = videoUpdateTime.find(item => item.id === event.currentTarget.id)
               if(videoItem) { this.VideoContext.seek(videoItem.currentTime) }
            3. 通过bindended，当播放到末尾时触发 ended 事件
               let {videoUpdateTime} = this.data
               let index = videoUpdateTime.findIndex(item => item.id === event.currentTarget.id)
               videoUpdateTime.splice(index,1)
               this.setData({
                  videoUpdateTime
               })
      9. scroll-view下拉刷新与上拉触底
         1. 下拉刷新
            1. 在scroll-view中开启自定义下拉刷新refresher-enabled ，设置当前下拉刷新状态refresher-triggered="{{isTriggered}}"（注：isTriggered初识值为false，通过下拉刷新这个动作，isTriggered自动变为true）
            2. 通过bindrefresherrefresh，自定义下拉刷新被触发
               this.getVideoList(this.data.navId)
            3. 在获取视频列表的回调getVideoList中，获取到数据之后，关闭下拉刷新 this.setData({ isTriggered = false })
         2. 上拉触底加载
            1. 数据分页：1.后端分页发送请求 2.前端分页截取最新的数据
            2. 将数据追加到视频列表的后方
            3. 注：网易云音乐暂时没有提供分页的api
            4. 通过bindscrolltolower，滚动到底部/右边时触发               
               let newVideoList = [...]  //模拟数据
               let {videoList} = this.data
               videoList.push(...newVideoList)
               this.setData({
                  videoList
               })

   3. 视频页(续)
      1. 页面下拉刷新与上拉触底
         1. 下拉刷新
            1. onPullDownRefresh()监听用户下拉刷新事件
            2. 需要先在app.json的window选项中或页面配置中开启enablePullDownRefresh
            3. 刷新动画自动关闭
         2. 上拉触底
            1. 首先页面需要有滚动条
            2. onReachBottom()监听用户上拉触底事件
      2. 转发分享功能
         1. 通过onShareAppMessage，监听用户点击页面内转发按钮（button 组件 open-type="share"）或右上角菜单“转发”按钮的行为，并自定义转发内容
            onShareAppMessage: function ({from}) {
               if(from === 'button') {
                  return {
                     title:'来自button的转发',
                     page:'/pages/video/video',
                     imageUrl:'/static/images/huawei.web.jpg'
                  }
               } else {
                  return {
                     title:'来自menu的转发',
                     page:'/pages/video/video',
                     imageUrl:'/static/images/huawei.web.jpg'
                  }
               }
            }

   4. 每日推荐页
      1. 如果用户没有登录，提示用户登录并直接跳转至登录页；如果用户已登录，则发请求获取音乐列表
         let userInfo = wx.getStorageSync('userInfo')
         if(!userInfo) {
            wx.showToast({
               title:'请先登录',
               icon:'none',
               success:() => {
                  wx.reLaunch({
                     url:'/pages/login/login'
                  })
               }
            })
         } else {
            this.getRecommendList()
         }
      2. 点击某一音乐，进入音乐详情页，并通过query参数传参(注：不能直接将song对象作为参数传递，长度过长，会被自动截取掉部分数据)
         let song = event.currentTarget.dataset.song
         wx.navigateTo({ url:'/pages/songDetail/songDetail?songId=' + song.id })

   5. 音乐详情页
      1. 动态显示歌曲详情页信息
         1. 生命周期函数--监听页面加载onLoad(options) {}中的options里含有路由传递过来的参数，如songId
         2. 通过songId发请求获取相应的音乐详情数据，并展示数据
            async getSongInfo(songId) {
               let songInfoResult = request('/song/detail',{ids:songId})
               this.setData({
                  songInfo:songInfoResult.songs[0]
               })
            }
         3. 动态设置当前页面的标题wx.setNavigationBarTitle({title:'...'}))

      2. 音乐播放暂停功能实现
         1. // 点击播放和暂停的回调，以控制页面的动画
         handlerMusicPlay() {
            // let isPlay = !this.data.isPlay
            // this.setData({
            //    isPlay
            // })
            this.musicControl(isPlay,this.data.songId)
         },
         2. // 控制音乐播放和暂停的功能函数（控制真正音频的播放暂停）
         musicControl(isPlay,songId) {
            if(isPlay) { //音乐播放
               let musicLinkResult = request('/song/url',{id:songId})
               let musicLink = musicLinkResult.data[0].url
               this.BackgroundAudioManager.src = musicLink
               this.BackgroundAudioManager.title = this.data.song.name
            } else { //音乐暂停
               this.BackgroundAudioManager.pause()
            }
         }

      3. 解决系统任务栏控制音乐播放状态显示不一致的问题
         1. 配置需要在后台使用的能力
         // 在app.json中配置需要在后台使用的能力，如「音乐播放」
         requiredBackgroundModes:["audio"]
         2. 如果用户操作系统的控制音乐播放/暂停的按钮，页面不知道，导致页面显示是否播放的状态和真实的音乐播放状态不一致
         （解决方案：通过控制音频的实例BackgroundAudioManager去监视音乐播放/暂停/停止）
         // 在songDetail中
         onLoad(options) {
            let songId = options.songId
            this.setData({
               songId
            })
            this.BackgroundAudioManager = wx.getBackgroundAudioManager()
            this.BackgroundAudioManager.onPlay(() => {
               this.setData({
                  isPlay:true
               })
            })
            this.BackgroundAudioManager.onPause(() => {
               this.setData({
                  isPlay:false
               })
            })
            this.BackgroundAudioManager.onStop(() => {
               this.setData({
                  isPlay:false
               })
            })
         }

      4. 解决页面销毁音乐播放状态的问题
         1. 在app.json中初始化全局数据
            globalData:{
               isMusicPlay:false,
               musicId:''
            }
         2. 在songDetail.js中
            var appInstance = getApp()
            page({
               // 生命周期函数--监听页面加载
               onLoad(options) {
                  let songId = options.songId
                  this.setData({
                     songId
                  })
                  this.BackgroundAudioManager = wx.getBackgroundAudioManager()
                  this.BackgroundAudioManager.onPlay(() => {
                     this.setData({
                        isPlay:true
                     })
                     appInstance.globalData.isMusicPlay = true
                     appInstance.globalData.musicId = songId
                  })
                  this.BackgroundAudioManager.onPause(() => {
                     this.setData({
                        isPlay:false
                     })
                     appInstance.globalData.isMusicPlay = false
                  })
                  this.BackgroundAudioManager.onStop(() => {
                     this.setData({
                        isPlay:false
                     })
                     appInstance.globalData.isMusicPlay = false
                  })
                  // 判断当前页面的音乐是否在播放
                  if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === songId) {
                     this.setData({
                        isPlay:true
                     })
                  }
               },
            })

      5. 实现切换歌曲功能，页面通信之消息订阅与发布
         1. 小程序使用npm包（流程执行不完整会带来错误）
            1. 初始化package.json
               npm init
            2. 允许使用npm
               详情-->本地设置-->将JS编译成ES5
            3. 下载npm包，如npm install pubsub-js
            4. 构建npm
               工具-->构建npm
         2. recommendSong与songDetail之间通信，实现切换歌曲功能
            1. 在recommendSong中
               import PubSub from 'pubsub-js'
               page({
                  onLoad(options) {
                     // 订阅消息获取songDetail中type
                     PubSub.subscribe('musicType', (msg,type) => {
                        let index = this.data.index  //这里的index是点击某一音乐进入音乐详情页的回调中，将index存储在data中的
                        let { recommendList } = this.data
                        if(type === 'pre') {
                           (index === 0) && (index = recommendList.length)  //如果到了第一首歌，则它前面一首歌为歌单中的最后一首
                           index -= 1
                        } else {
                           (index === recommendList.length - 1) && (index = -1) //如果到了最后一首歌，则它后面一首歌为歌单中的第一首
                           index += 1
                        }
                        // 更新data中的index
                        this.setData({
                           index
                        })
                        // 发布消息，将相应的ID传递给songDetail
                        let musicId = recommendList[index].id
                        PubSub.publish('musicId', musicId)
                     })
                  }
               })

            2. 在songDetail中
            import PubSub from 'pubsub-js'
            page({
               // 点击切歌的回调
               handleSwitch(event) {
                  // 先停止音乐的播放
                  this.BackgroundAudioManager.onStop(() => {
                     this.setData({
                        isPlay:false
                     })
                  })
                  // 订阅消息获取recommendSong中的musicId
                  PubSub.subscribe('musicId',(msg,musicId) => {
                     this.getSongInfo(musicId) //获取音乐详情信息
                     this.musicControl(true,musicId) //自动播放当前音乐
                     PubSub.unsubscribe('musicId') //取消订阅
                  })
                  let type = event.currentTarget.dataset.type
                  // 发布消息，将type(pre|next)传给recommendSong
                  PubSub.publish('musicType', type)
               }
            })

      6. 播放歌曲性能优化，减少不必要的请求
         musicControl(isPlay,songId,musicLink) {
            if(isPlay) { //音乐播放
               if(!musicLink) {
                  let musicLinkResult = request('/song/url',{id:songId})
                  musicLink = musicLinkResult.data[0].url
                  this.setData({
                     musicLink
                  })
               }
               this.BackgroundAudioManager.src = musicLink
               this.BackgroundAudioManager.title = this.data.song.name
            } else { //音乐暂停
               this.BackgroundAudioManager.pause()
            }
         }

      7. 音乐总时长
         1. npm下载并引入dayjs包
         2. 音乐总时长
            async getSongInfo(songId) {
               let songInfoResult = request('/song/detail',{ids:songId})
               let songTotalTime = songInfoResult.songs[0].dt
               this.setData({
                  songInfo:songInfoResult.songs[0],
                  songTotalTime:dayjs(songTotalTime).format('mm:ss')
               })
            }

      8. 实时播放时间格式化显示，进度条动态展示
         onLoad(options) {
            this.BackgroundAudioManager.onTimeUpdate(() => {
               let totalTime = this.BackgroundAudioManager.duration
               let currentTime = this.BackgroundAudioManager.currentTime
               this.setData({
                  currentTime: dayjs.unix(currentTime).format('mm:ss')
                  currentProgressWidth: currentTime / totalTime * 450
               })
            })
         }

      9. 播放结束自动切换至下一首
         onLoad(options) {
            this.BackgroundAudioManager.onEnded(() => {
               // 发布消息，将type(pre|next)传给recommendSong，自动到下一首，并且自动播放
               PubSub.publish('musicType', 'next')
            })
            // 将实时进度条的长度还原为0，实时时间还原为0
            this.setData({
               currentProgessWidth:0,
               currentTime:'00:00'
            })
         }
         
   6. 