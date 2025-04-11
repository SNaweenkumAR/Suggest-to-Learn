export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  createdAt: string;
  playlistId?: string;
  isPrivate?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  isPrivate?: boolean;
}