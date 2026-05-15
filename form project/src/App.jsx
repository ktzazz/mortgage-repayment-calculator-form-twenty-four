import "./App.css";
import { MortgageFormHook } from "./FormHook";

function App() {
  return (
    <div className="main__container">
      {/*  <MortgageFormState /> */}
      <MortgageFormHook />
    </div>
  );
}

export default App;
