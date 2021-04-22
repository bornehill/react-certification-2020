export function parseFavVideo(origin) {
  return {
    etag: origin.etag,
    id: {
      videoId: origin.id.videoId,
    },
    snippet: {
      title: origin.snippet.title,
      description: origin.snippet.description,
      channelTitle: origin.snippet.channelTitle,
      liveBroadcastContent: origin.snippet.liveBroadcastContent,
    },
  };
}
