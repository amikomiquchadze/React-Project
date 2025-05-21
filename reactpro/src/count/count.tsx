import { useState } from "react";
import "./count.scss";
import { Link, useParams } from "react-router-dom";

function Count() {
  const { age } = useParams<{ age?: string }>();
  const initialCount = age && !isNaN(+age) ? parseInt(age, 10) : 0;
  const [count, setCount] = useState<number>(initialCount);

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
      <div style={{ marginTop: "2rem" }}>
        <Link
          to="/users"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007BFF",
            color: "#fff",
            borderRadius: "4px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          ← Back to Users
        </Link>
      </div>
    </section>
  );
}

export default Count;
