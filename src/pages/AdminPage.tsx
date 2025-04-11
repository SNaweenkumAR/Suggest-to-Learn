import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Plus, LogOut } from 'lucide-react';
import { Video, Playlist } from '../types/video';
import { videoService } from '../services/videoService';
import { VideoCard } from '../components/VideoCard';
import { PlaylistForm } from '../components/PlaylistForm';
import { useAuthStore } from '../store/authStore';
import { Navigate, useNavigate } from 'react-router-dom';

export const AdminPage = () => {
  const [videos, setVideos] = useState<Video[]>(videoService.getVideos());
  const [playlists, setPlaylists] = useState<Playlist[]>(videoService.getPlaylists());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    setVideos(videoService.getVideos());
    setPlaylists(videoService.getPlaylists());
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVideo = videoService.addVideo({
      title,
      description,
      youtubeUrl,
      playlistId: selectedPlaylist || undefined,
    });
    setVideos([...videos, newVideo]);
    setTitle('');
    setDescription('');
    setYoutubeUrl('');
    setSelectedPlaylist('');
  };

  const handleDelete = (id: string) => {
    videoService.deleteVideo(id);
    setVideos(videos.filter((v) => v.id !== id));
  };

  const handleDeletePlaylist = (id: string) => {
    videoService.deletePlaylist(id);
    setPlaylists(playlists.filter((p) => p.id !== id));
    setVideos(videoService.getVideos());
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          startIcon={<LogOut size={20} />}
        >
          Logout
        </Button>
      </Box>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="YouTube URL"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <FormControl fullWidth>
                <InputLabel>Playlist</InputLabel>
                <Select
                  value={selectedPlaylist}
                  label="Playlist"
                  onChange={(e) => setSelectedPlaylist(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {playlists.map((playlist) => (
                    <MenuItem key={playlist.id} value={playlist.id}>
                      {playlist.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Tooltip title="Create New Playlist">
                <IconButton
                  color="primary"
                  onClick={() => setPlaylistDialogOpen(true)}
                  sx={{ mt: 1 }}
                >
                  <Plus />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Video
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Playlists
        </Typography>
        <Grid container spacing={2}>
          {playlists.map((playlist) => (
            <Grid item key={playlist.id} xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">{playlist.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {playlist.description}
                </Typography>
                <Button
                  color="error"
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  sx={{ mt: 1 }}
                >
                  Delete Playlist
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography variant="h5" gutterBottom>
        All Videos
      </Typography>
      
      <Grid container spacing={4}>
        {videos.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Box sx={{ height: '100%', position: 'relative' }}>
              <VideoCard video={video} />
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleDelete(video.id)}
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <PlaylistForm
        open={playlistDialogOpen}
        onClose={() => setPlaylistDialogOpen(false)}
        onPlaylistCreated={() => setPlaylists(videoService.getPlaylists())}
      />
    </Container>
  );
};