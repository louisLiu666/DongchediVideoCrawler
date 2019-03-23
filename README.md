## DongchediVideoCrawler
这个项目主要是为了破解懂车帝的视频链接js加密

### 项目环境
python  3.6

nodejs 10.15.3

### 代码思路
1. 首先请求该视频首页，正则匹配得到video_id，然后运行相应的js函数，得出r, s两个加密参数。
2. url拼接去请求服务器，返回的数据解析出main_url。
3. 运行相应的js函数，便可计算出该视频的源链接。

