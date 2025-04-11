import { Video, Playlist } from '../types/video';

const VIDEO_STORAGE_KEY = 'youtube_videos';
const PLAYLIST_STORAGE_KEY = 'playlists';

export const videoService = {
  getVideos: (): Video[] => {
    const videos = localStorage.getItem(VIDEO_STORAGE_KEY);
    return videos ? JSON.parse(videos) : [];
  },

  addVideo: (video: Omit<Video, 'id' | 'createdAt'>): Video => {
    const videos = videoService.getVideos();
    const newVideo: Video = {
      ...video,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isPrivate: video.isPrivate || false,
    };
    
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify([...videos, newVideo]));
    return newVideo;
  },

  deleteVideo: (id: string): void => {
    const videos = videoService.getVideos();
    localStorage.setItem(
      VIDEO_STORAGE_KEY,
      JSON.stringify(videos.filter((v) => v.id !== id))
    );
  },

  updateVideo: (video: Video): void => {
    const videos = videoService.getVideos();
    const index = videos.findIndex((v) => v.id === video.id);
    if (index !== -1) {
      videos[index] = video;
      localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(videos));
    }
  },

  getPlaylists: (): Playlist[] => {
    const playlists = localStorage.getItem(PLAYLIST_STORAGE_KEY);
    return playlists ? JSON.parse(playlists) : [];
  },

  addPlaylist: (playlist: Omit<Playlist, 'id' | 'createdAt'>): Playlist => {
    const playlists = videoService.getPlaylists();
    const newPlaylist: Playlist = {
      ...playlist,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isPrivate: playlist.isPrivate || false,
    };
    
    localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify([...playlists, newPlaylist]));
    return newPlaylist;
  },

  deletePlaylist: (id: string): void => {
    const playlists = videoService.getPlaylists();
    localStorage.setItem(
      PLAYLIST_STORAGE_KEY,
      JSON.stringify(playlists.filter((p) => p.id !== id))
    );

    // Remove playlist reference from videos
    const videos = videoService.getVideos();
    const updatedVideos = videos.map(video => 
      video.playlistId === id ? { ...video, playlistId: undefined } : video
    );
    localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(updatedVideos));
  },

  getVideosByPlaylist: (playlistId: string): Video[] => {
    const videos = videoService.getVideos();
    return videos.filter(video => video.playlistId === playlistId);
  },
};