import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent, Grid, Alert } from '@mui/material';

function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/tests/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка загрузки тестов: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Доступные тесты
      </Typography>
      
      <Grid container spacing={3}>
        {tests.map(test => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card 
              component={Link} 
              to={`/test/${test.id}`}
              sx={{ 
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {test.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {test.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TestList;