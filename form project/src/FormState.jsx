import { useState } from "react";

export const MortgageFormState = () => {
  const [formData, setFormData] = useState({
    amount: "",
    term: "",
    rate: "",
    type: "", //repayment or interest only
  });

  const [result, setResult] = useState(null);

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, //copy the info
      [name]: value, // update the given field
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the form from submitting

    // validate the form
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "This field is required";
    if (!formData.term) newErrors.term = "This field is required";
    if (!formData.rate) newErrors.rate = "This field is required";
    if (!formData.type) newErrors.type = "This field is required";

    setError(newErrors);

    // if there are errors we'll stop here
    if (Object.keys(newErrors).length > 0) return;

    // if all's good
    const P = parseFloat(formData.amount);
    const n = parseFloat(formData.term) * 12;
    const r = parseFloat(formData.rate) / 100 / 12;

    let monthly;
    let total;

    if (formData.type === "repayment") {
      const x = Math.pow(1 + r, n);
      monthly = P * ((r * x) / (x - 1));
      total = monthly * n;
    } else {
      //interest only
      monthly = P * r;
      total = monthly * n + P;
    }

    setResult({
      monthlyPayment: monthly.toFixed(2),
      totalPayment: total.toFixed(2),
    });
  };

  const handleReset = () => {
    setFormData({
      amount: "",
      term: "",
      rate: "",
      type: "",
    });
    setResult(null);
    setError({});
  };

  return (
    <>
      <div className="form__container">
        <div className="h1__div">
          <h1>Mortgage Calculator</h1>
          <button
            className="clear__btn"
            type="button"
            onClick={() => handleReset()}
          >
            Clear All
          </button>
        </div>

        <form>
          <div>
            <label>Mortgage Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
            {error.amount && <p className="error">{error.amount}</p>}
          </div>

          <div>
            <label>Mortgage Term</label>
            <input
              type="number"
              name="term"
              value={formData.term}
              onChange={handleChange}
            />
            {error.term && <p className="error">{error.term}</p>}
          </div>

          <div>
            <label>Interest Rate</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
            />
            {error.rate && <p className="error">{error.rate}</p>}
          </div>

          <div>
            <label>Mortgage Type</label>
            <label>
              <input
                type="radio"
                name="type"
                value="repayment"
                checked={formData.type === "repayment"}
                onChange={handleChange}
              />
              Repayment
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="interestOnly"
                checked={formData.type === "interestOnly"}
                onChange={handleChange}
              />
              Interest Only
            </label>
            {error.type && <p className="error">{error.type}</p>}
          </div>

          <button
            className="calculate__btn"
            type="submit"
            onClick={handleSubmit}
          >
            Calculate Repayments
          </button>
        </form>
      </div>

      <div className="result__container">
        {!result ? (
          <div className="empty_state">No results to show</div>
        ) : (
          <div className="completed_container">
            <h2>Your results</h2>
            <p>Monthly Payment: ${result.monthlyPayment}</p>
            <p>Total Payment: ${result.totalPayment}</p>
          </div>
        )}
      </div>
    </>
  );
};
