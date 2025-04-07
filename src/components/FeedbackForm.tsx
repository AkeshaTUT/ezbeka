import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Rating,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { addFeedback } from '../store/slices/analyticsSlice';
import { Feedback } from '../types/gamification';

interface FeedbackFormProps {
  courseId: string;
  teacherId: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ courseId, teacherId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [feedbackType, setFeedbackType] = useState<'course' | 'teacher'>('course');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      courseId,
      teacherId,
      rating: rating || 0,
      comment,
      isAnonymous,
      createdAt: new Date(),
    };

    dispatch(addFeedback(newFeedback));
    
    // Reset form
    setRating(null);
    setComment('');
    setIsAnonymous(true);
    setFeedbackType('course');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Submit Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Feedback Type</InputLabel>
            <Select
              value={feedbackType}
              label="Feedback Type"
              onChange={(e) => setFeedbackType(e.target.value as 'course' | 'teacher')}
            >
              <MenuItem value="course">Course Feedback</MenuItem>
              <MenuItem value="teacher">Teacher Feedback</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
            }
            label="Submit anonymously"
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!rating || !comment}
          >
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm; 