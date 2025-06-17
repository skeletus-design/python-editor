import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PythonEditor from '../components/PythonEditor';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';

function TestPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        // Имитация загрузки
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Моковые данные
        const mockTests = {
          1: {
            id: 1,
            title: 'Сумма двух чисел',
            description: 'Напишите функцию sum(a, b)',
            initialCode: 'def sum(a, b):\n    # Ваш код здесь\n    return',
            instructions: 'Функция должна возвращать сумму двух чисел'
          },
          2: {
            id: 2,
            title: 'Факториал',
            description: 'Реализуйте функцию factorial(n)',
            initialCode: 'def factorial(n):\n    # Ваш код здесь\n    return',
            instructions: 'Функция должна возвращать факториал числа n'
          }
        };
        
        setTest(mockTests[id] || mockTests[1]);
      } catch (error) {
        console.error('Ошибка загрузки теста:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        {test.title}
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          {test.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {test.instructions}
        </Typography>
      </Paper>
      
      <PythonEditor initialCode={test.initialCode} />
    </div>
  );
}

export default TestPage;