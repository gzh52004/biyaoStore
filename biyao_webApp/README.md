### 项目名称：必要商城
* 官网：https://h5.biyao.com/

* 上线网址：http://47.112.170.225:60002

* git仓库地址：https://github.com/gzh52004/biyaoStore.git

* 接口文档：https://easydoc.xyz/doc/62519811/SRJblGBX/VxnrOU5e

* 团队与分工
	* 负责人：李展鹏
	* 成员：黎伟、何俊棠
	
* 负责模块说明：
	* 李展鹏：
		* 后端接口：MongoDB接口的实现，接口文档的编写；	
		* 首页：	搜索框(模糊查询功能)，轮播图，页面动态渲染
		* 分类页：	运用了react的路由传参和二级路由，路由监听等，动态渲染
		* 列表页：	商品动态渲染，可以根据评论和价格排序商品；
	* 黎伟
		* 路由权限：验证token,判断用户是否登录；利用高阶组件设置购物车、用户的路由权限
		* 登录页：	MD5密码加密，正则验证，登录功能，
		* 注册页：	MD5密码加密，正则验证，注册功能
		* 用户页：	发送数据获取用户信息并渲染，退出功能
	* 何峻棠
		* 详情页：	动态渲染商品信息，添加购物车，原生锚点
		* 购物车：	反选框，多选框，计算总价

* 项目视频分享：
	
	> 链接：https://pan.baidu.com/s/1TzpI8WAZOolJrVC1hKskAQ 
	> 提取码：p4nm 
	> 复制这段内容后打开百度网盘手机App，操作更方便哦
	
* 项目目录说明：
	* public				
		* font			字体
		* img			图片
	* src
		* api			接口api文件夹
		* assets		公共样式文件夹
		* components	普通react组件文件夹
		* utils				
			> auth		封装操作cookie文件
			> hoc		封装自定义高阶组件
			> request	封装axios请求
		* views			路由react组件文件夹

* 项目页面截图：
	* 首页
		
		> <img src='/public/img/readme/home.png'/>
	* 详情页
		
		> <img src='/public/img/readme/details.png'/>
	* 用户页
		
		> <img src='/public/img/readme/user.png' />