import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Video, MonitorPlay } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Video size={24} style={{ marginRight: '8px' }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Video Learning Platform
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={RouterLink}
                to="/"
                color="inherit"
                startIcon={<Video size={20} />}
              >
                Videos
              </Button>
              <Button
                component={RouterLink}
                to="/admin"
                color="inherit"
                startIcon={<MonitorPlay size={20} />}
              >
                Admin
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main">{children}</Box>
    </>
  );
};