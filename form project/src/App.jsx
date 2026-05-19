import "./scss/App.scss";
import { MortgageFormHook } from "./FormHook";
import { MortgageResults } from "./Results";
import { useState } from "react";

function App() {
  const [result, setResult] = useState(null);

  return (
    <>
      <div className="main__container">
        {/*  <MortgageFormState /> */}
        <div className="data__div">
          <MortgageFormHook Calculate={setResult} />
        </div>
        <div className="results__div">
          <MortgageResults data={result} />
        </div>
      </div>

      <footer className="attribution">
        {" "}
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://www.frontendmentor.io/profile/ktzazz">Katia Aragón</a>.
      </footer>
    </>
  );
}

export default App;
