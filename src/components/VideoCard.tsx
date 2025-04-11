import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Video } from '../types/video';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Lock } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const getVideoId = (url: string) => {
    const urlParams = new URL(url).searchParams;
    return urlParams.get('v');
  };

  const showPrivateContent = !video.isPrivate || isAuthenticated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          background: 'rgba(0, 0, 0, 0.9)',
          color: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: isHovered ? '0 0 20px rgba(0, 0, 0, 0.5)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          {showPrivateContent ? (
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              src={`https://www.youtube.com/embed/${getVideoId(video.youtubeUrl)}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Lock size={48} style={{ marginBottom: '16px', opacity: 0.7 }} />
              <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
                This video is private
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                href="/login"
                sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
              >
                Sign in to watch
              </Button>
            </Box>
          )}
        </Box>
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            background: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.8))',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'translateY(0)' : 'translateY(60px)',
            height: isHovered ? 'auto' : '80px',
            overflow: 'hidden'
          }}
        >
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2"
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              marginBottom: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {video.title}
            {video.isPrivate && <Lock size={16} style={{ opacity: 0.7 }} />}
          </Typography>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Typography 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                marginBottom: 1
              }}
            >
              {showPrivateContent ? video.description : 'Sign in to view description'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255,255,255,0.5)',
                display: 'block',
                marginTop: 1
              }}
            >
              Added on {new Date(video.createdAt).toLocaleDateString()}
            </Typography>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};