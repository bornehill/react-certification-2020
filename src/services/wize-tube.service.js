import axios from 'axios';

class WizeTubeService {
  constructor() {
    this.instance = axios.create({
      baseURL:
        'https://youtube.googleapis.com/youtube/v3/search?part=id&part=snippet&channelId=UCPGzT4wecuWM0BH9mPiulXg&maxResults=30&order=date&regionCode=MX&type=video',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getVideos(search) {
    if (search) {
      return this.instance.get(`&q=${search}&key=${process.env.REACT_APP_WIZETUBE_API}`);
    } else {
      return this.instance.get(`&key=${process.env.REACT_APP_WIZETUBE_API}`);
    }
  }
}

export default new WizeTubeService();
