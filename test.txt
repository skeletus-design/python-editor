import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

function App() {
  const [code, setCode] = useState('print("Hello, Python!")');
  const [output, setOutput] = useState("");
  const [isPyodideLoaded, setIsPyodideLoaded] = useState(false);
  const [pyodide, setPyodide] = useState(null);

  // Инициализация Pyodide
  useEffect(() => {
    (async () => {
      const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
      });
      setPyodide(pyodide);
      setIsPyodideLoaded(true);
    })();
  }, []);

  // Выполнение кода
  const runCode = async () => {
    if (!pyodide) return;
  try {
    // Сбрасываем вывод перед выполнением
    setOutput("Выполняю...\n");
    
    // Перехватываем вывод print()
    let output = "";
    pyodide.setStdout({ batched: (text) => (output += text + "\n") });
    
    await pyodide.runPythonAsync(code);
    setOutput(output || "Код выполнен (но print() не вызван)");
  } catch (error) {
    setOutput(`Ошибка: ${error.message}`);
  }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Python Editor</h1>
      <CodeMirror
        value={code}
        extensions={[python()]}
        onChange={(value) => setCode(value)}
        height="300px"
      />
      <button
        onClick={runCode}
        disabled={!isPyodideLoaded}
        style={{ margin: "10px 0", padding: "8px 16px" }}
      >
        {isPyodideLoaded ? "Выполнить код" : "Загрузка Pyodide..."}
      </button>
      <div>
        <h3>Результат:</h3>
        <pre
          style={{
            background: "#282a36",
            color: "#f8f8f2",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {output}
        </pre>
      </div>
    </div>
  );
}

export default App;