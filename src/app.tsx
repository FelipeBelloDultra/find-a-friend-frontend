import { useState } from "react";

import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p> <Button onClick={() => setCount(count + 1)}>Click me</Button>
    </div>
  );
}

export default App;
