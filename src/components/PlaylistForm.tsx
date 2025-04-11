import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { videoService } from '../services/videoService';

interface PlaylistFormProps {
  open: boolean;
  onClose: () => void;
  onPlaylistCreated: () => void;
}

export const PlaylistForm = ({ open, onClose, onPlaylistCreated }: PlaylistFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    videoService.addPlaylist({ title, description });
    onPlaylistCreated();
    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Playlist</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Playlist Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create Playlist
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};