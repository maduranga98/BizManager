import React, { useRef, useReducer } from "react";

const initialState = {
  five: 0,
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  six: 0,
  total: 0,
};

function reducer(state, action) {
  const newState = { ...state, [action.type]: action.value };
  newState.total =
    Object.values(newState).reduce((sum, val) => sum + val, 0) - newState.total;
  return newState;
}

const CashTable = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refs = {
    five: useRef(),
    one: useRef(),
    two: useRef(),
    three: useRef(),
    four: useRef(),
    six: useRef(),
  };

  const handleChange = (type, multiplier) => {
    const value = Number(refs[type].current.value) * multiplier;
    dispatch({ type, value });
  };

  return (
    <div className="w-50">
      <table className="w-[400px] border border-gray-300">
        <caption className="text-black font-serif font-bold py-2">
          Cash Details
        </caption>
        <tbody>
          {[
            { type: "five", label: "5000", multiplier: 5000 },
            { type: "one", label: "1000", multiplier: 1000 },
            { type: "two", label: "500", multiplier: 500 },
            { type: "three", label: "100", multiplier: 100 },
            { type: "four", label: "50", multiplier: 50 },
            { type: "six", label: "20", multiplier: 20 },
          ].map(({ type, label, multiplier }) => (
            <tr key={type} className="border">
              <td className="px-4 py-2">{label} *</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  ref={refs[type]}
                  onChange={() => handleChange(type, multiplier)}
                  className="w-20 border-b border-black focus:outline-none pl-2"
                />
              </td>
              <td className="px-4 py-2">{state[type]}</td>
            </tr>
          ))}
          <tr className="border">
            <td colSpan="2" className="font-semibold px-4 py-2">
              Total
            </td>
            <td className="px-4 py-2">{state.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CashTable;
