import image from "./assets/images/illustration-empty.svg";

export const MortgageResults = ({ data }) => {
  return (
    <div className="result__cont">
      {data === null ? (
        <>
          <img src={image} alt="empty" />
          <h2> Results shown here</h2>
          <p>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </p>
        </>
      ) : (
        <>
          {data && (
            <div>
              <h2> Your results</h2>
              <p>
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                “calculate repayments” again.
              </p>
              <p>Your monthly repayments</p>
              <p>{data.monthlyPayment}</p>
              <p> Total you'll repay over the term</p>
              <p> {data.totalPayment}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
