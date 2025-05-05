import { useState } from "react";
import "./count.scss";

function Count() {
  const [count, setCount] = useState(0);
  return (
    <section>
      <div>
        <div className="card">
          <button
            className="increment"
            onClick={() => setCount((count) => count + 1)}
          >
            +
          </button>
          <div className="Count">{count}</div>
          <button
            className="decrement"
            onClick={() => setCount((count) => count - 1)}
          >
            -
          </button>
        </div>
      </div>
    </section>
  );
}

export default Count;
