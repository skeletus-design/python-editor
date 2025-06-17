import { Card, CardContent, Typography } from '@mui/material';

function TestCard({ test }) {
  return (
    <Card sx={{ 
      height: '100%',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)'
      }
    }}>
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom>
          {test.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {test.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TestCard;