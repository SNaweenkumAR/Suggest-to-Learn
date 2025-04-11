import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Playlist } from '../types/video';
import { videoService } from '../services/videoService';
import { VideoCard } from '../components/VideoCard';

export const UserPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  useEffect(() => {
    setVideos(videoService.getVideos());
    setPlaylists(videoService.getPlaylists());
  }, []);

  const displayedVideos = selectedPlaylist
    ? videos.filter(video => video.playlistId === selectedPlaylist)
    : videos.filter(video => !video.playlistId);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string | null) => {
    setSelectedPlaylist(newValue);
  };

  const currentPlaylist = playlists.find(p => p.id === selectedPlaylist);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        color: 'white',
        pt: 2,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 4
            }}
          >
          Naveen Suggestion Videos
          </Typography>
        </motion.div>

        <Paper 
          sx={{ 
            mb: 4, 
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px'
          }}
        >
          <Tabs
            value={selectedPlaylist}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                '&.Mui-selected': {
                  color: 'white',
                }
              }
            }}
          >
            <Tab 
              label="All Videos" 
              value={null}
              sx={{ 
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            />
            {playlists.map((playlist) => (
              <Tab 
                key={playlist.id} 
                label={playlist.title} 
                value={playlist.id}
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              />
            ))}
          </Tabs>
        </Paper>

        {selectedPlaylist && currentPlaylist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {currentPlaylist.title}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '1.1rem'
                }}
              >
                {currentPlaylist.description}
              </Typography>
            </Box>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          <Grid container spacing={4}>
            {displayedVideos.map((video, index) => (
              <Grid item key={video.id} xs={12} sm={6} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <VideoCard video={video} />
                </motion.div>
              </Grid>
            ))}
            {displayedVideos.length === 0 && (
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textAlign: 'center',
                      mt: 4
                    }}
                  >
                    No videos available in this playlist.
                  </Typography>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </AnimatePresence>
      </Container>
    </Box>
  );
};