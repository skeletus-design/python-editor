import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

function App() {
  const [code, setCode] = React.useState('print("Hello, Python!")');

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Python Editor</h1>
      <CodeMirror
        value={code}
        extensions={[python()]} // Подсветка Python
        onChange={(value) => setCode(value)}
        height="400px"
      />
      <div>
        <h3>Код:</h3>
        <pre>{code}</pre>
      </div>
    </div>
  );
}

export default App;