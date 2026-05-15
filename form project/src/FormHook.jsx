import { useForm } from "react-hook-form";
import { useState } from "react";

export const MortgageFormHook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // initialize the hook
    defaultValues: {
      amount: "",
      term: "",
      rate: "",
      type: "",
    },
  });

  const [result, setResult] = useState(null);

  const onSubmit = (formData) => {
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
    reset();
    setResult(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Mortgage Calculator</h1>
        <button type="button" onClick={handleReset}>
          Clear All
        </button>
        <div>
          <label htmlFor="amount">Mortgage Amount</label>
          <input
            {...register("amount", { required: "This field is required" })}
          />
          {errors.amount && <p className="error">{errors.amount.message}</p>}
        </div>
        <div>
          <label htmlFor="term">Term</label>
          <input
            {...register("term", { required: "This field is required" })}
          />
          {errors.term && <p className="error">{errors.term.message}</p>}
        </div>
        <div>
          <label htmlFor="rate">Interest Rate</label>
          <input
            {...register("rate", { required: "This field is required" })}
          />
          {errors.rate && <p className="error">{errors.rate.message}</p>}
        </div>
        <div>
          <label htmlFor="type">Mortgage Type</label>
          <div className="radio-group">
            <label htmlFor="repayment">
              <input
                type="radio"
                id="repayment"
                value="repayment"
                {...register("type", { required: "This field is required" })}
              />
              Repayment
            </label>
          </div>

          <div className="radio-group">
            <label htmlFor="interestOnly">
              <input
                type="radio"
                id="interestOnly"
                value="interestOnly"
                {...register("type", { required: "This field is required" })}
              />
              Interest Only
            </label>
          </div>

          {errors.type && <p className="error">{errors.type.message}</p>}
        </div>
        <button type="submit">Calculate Repayments</button>
      </form>

      <div className="result__cont">
        {result && (
          <div>
            <h2>Results</h2>
            <p>Monthly Payment: {result.monthlyPayment}</p>
            <p>Total Payment: {result.totalPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
};
