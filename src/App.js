// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [entry, setEntry] = useState();
  const [first, setFirst] = useState("EUR");
  const [second, setSecond] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${entry}&from=${first}&to=${second}`
        );
        const data = await res.json();
        setResult(data.rates[second]);
        setIsLoading(false);
      }
      if (first === second) return setResult(entry);
      convert();
    },
    [entry, first, second]
  );

  return (
    <div>
      <input
        type="text"
        value={entry}
        onChange={(e) => setEntry(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={first}
        onChange={(e) => setFirst(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={second}
        onChange={(e) => setSecond(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{result}</p>
    </div>
  );
}
