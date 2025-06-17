import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Box, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Header from "../Header"; // Импортируйте хедер


function PythonEditor({ initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    let script;

    const loadPyodide = async () => {
      try {
        script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js';
        
        script.onload = async () => {
          const pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/'
          });
          await pyodideInstance.loadPackage(['numpy']);
          if (mounted) setPyodide(pyodideInstance);
        };

        document.body.appendChild(script);
      } catch (err) {
        if (mounted) setError(`Ошибка загрузки Pyodide: ${err.message}`);
      }
    };

    if (!pyodide) loadPyodide();

    return () => {
      mounted = false;
      if (script) document.body.removeChild(script);
    };
  }, [pyodide]);

  const runCode = async () => {
    if (!pyodide) return;
    
    setIsRunning(true);
    setOutput(null);
    setError(null);
    
    try {
      let consoleOutput = '';
      pyodide.setStdout({ batched: (text) => (consoleOutput += text + '\n') });
      pyodide.setStderr({ batched: (text) => (consoleOutput += `ERROR: ${text}\n`) });

      const result = await pyodide.runPythonAsync(code);
      
      // Форматируем вывод
      let fullOutput = consoleOutput.trim();
      if (result !== undefined) {
        fullOutput += (fullOutput ? '\n\n' : '') + `Return: ${JSON.stringify(result, null, 2)}`;
      }
      
      setOutput(fullOutput || "Код выполнен успешно, но не произвел видимого вывода");
    } catch (err) {
      setError(`Ошибка выполнения: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <CodeMirror
        value={code}
        extensions={[python()]}
        onChange={setCode}
        height="300px"
        theme="dark"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          indentOnInput: true
        }}
      />
      
      <Button
        variant="contained"
        onClick={runCode}
        disabled={!pyodide || isRunning}
        startIcon={isRunning ? <CircularProgress size={24} /> : <PlayArrowIcon />}
        sx={{ mt: 2 }}
      >
        {isRunning ? 'Выполнение...' : 'Выполнить код'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {output !== null && (
        <Paper elevation={3} sx={{ p: 2, mt: 2, bgcolor: 'background.paper' }}>
          <Typography variant="h6" gutterBottom>
            Результат выполнения:
          </Typography>
          <Box 
            component="pre" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              p: 1,
              borderRadius: 1,
              bgcolor: '#282c34',
              color: '#abb2bf'
            }}
          >
            {output || "Нет вывода"}
          </Box>
        </Paper>
      )}
    </Box>
  );
}

export default PythonEditor;