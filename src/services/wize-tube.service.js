import axios from 'axios';

class WizeTubeService {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getVideos(search) {
    const repParam =
      'search?part=id&part=snippet&maxResults=30&order=date&regionCode=MX&type=video';
    if (search) {
      return this.instance.get(
        `${repParam}&q=${search}&key=${process.env.REACT_APP_WIZETUBE_API}`
      );
    } else {
      return this.instance.get(`${repParam}&key=${process.env.REACT_APP_WIZETUBE_API}`);
    }
  }

  getFavVideos() {
    const videos = localStorage.getItem('fav-wize');
    return videos ? JSON.parse(videos) : videos;
  }

  setFavVideos(videos) {
    const stored = JSON.stringify(videos);
    localStorage.setItem('fav-wize', stored);
  }
}

export default new WizeTubeService();
