import { useState } from "react";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p> <Button onClick={() => setCount(count + 1)}>Click me</Button>
      <Input.Container>
        <Input.Label to="password">Hello</Input.Label>
        <Input
          hasError={count === 10}
          name="password"
          type="password"
        />
        <Input.Error message={count === 10 ? "Something wrong happened" : ""} />
      </Input.Container>
    </div>
  );
}

export default App;
