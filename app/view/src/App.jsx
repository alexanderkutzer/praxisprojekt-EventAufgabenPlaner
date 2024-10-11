import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Button from "./components/Button";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl font-bold mb-8">
                viteReactEmptyTest Project
            </h1>
            <img src={viteLogo} alt="Vite logo" />

            <img src={reactLogo} alt="React logo" />

            <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </Button>
        </div>
    );
}

export default App;
