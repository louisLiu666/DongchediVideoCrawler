import requests
import re
import json
import execjs


class DongchediVideoCrawler(object):

    def __init__(self):
        self.main_url = 'https://i.snssdk.com%s&logo_type=motor&callback=tt_playerjngvu'
        self.home_page = 'https://zjbyte.cn/i6615388842591518733/'
        self.js_path = 'params.js'
        self.ctx = None
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        }

    def get_video_id(self):
        for i in range(3):
            video_id = ''
            res = requests.get(self.home_page, headers=self.headers)
            if res.status_code == 200:
                video_id = re.search(r'video_id = "(.*?)";', res.text)
                video_id = video_id.group(1) if video_id else ''
            if not video_id:
                self.get_video_id()
            return video_id

    def get_params(self):
        video_id = self.get_video_id()
        with open(self.js_path, "r") as f:
            data = f.read()
        self.ctx = execjs.compile(data)
        try:
            params = self.ctx.call("crc32", "//i.snssdk.com/video/urls/v/1/toutiao/mp4/" + video_id, "/video/urls/v/1/toutiao/mp4/" + video_id)
            return params
        except Exception as e:
            print(e)

    def get_main_url(self):
        params = self.get_params()
        url  = self.main_url % params
        for i in range(3):
            main_url = ''
            res = requests.get(url, headers=self.headers)
            if res.status_code == 200:
                data = re.search(r'tt_playerjngvu\((.*?)\)', res.text)
                data = data.group(1) if data else '{}'
                data = json.loads(data)
                main_url = data.get('data', {}).get('video_list', {}).get('video_2', {}).get('main_url', '')
            if not main_url:
                self.get_main_url()
            return main_url

    def get_video_url(self):
        main_url = self.get_main_url()
        if self.ctx is None:
            self.get_params()
        try:
            video_url = self.ctx.call("base64decode", main_url)
            return video_url
        except Exception as e:
            print(e)

    def download(self):
        video_url = self.get_video_url()
        res = requests.get(video_url, headers=self.headers)
        if res.status_code == 200:
            with open('video.mp4', 'wb') as f:
                f.write(res.content)
        return video_url


if __name__ == "__main__":
    dv = DongchediVideoCrawler()
    print(dv.download())