import React from "react";
import { useDispatch } from "react-redux";

import { fetchTransaction } from "../redux/slices/transactionSlice";
import { fetchBalance } from "../redux/slices/balanceSlice";

function Window() {
  const isMounted = React.useRef(false);
  const [address, setAddress] = React.useState(localStorage.getItem("Address"));
  const [send, setSend] = React.useState(false);
  const dispatch = useDispatch();

  const getBalance = async () => {
    console.log(address);
    dispatch(fetchBalance(address));
  };

  const getData = async () => {
    dispatch(fetchTransaction(address));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("Address", address);
    }
    getBalance();
    getData();

    isMounted.current = true;
  }, [send]);
  return (
    <div className="absolute bg-slate-800  z-20 top-24 inset-x-0 mx-auto w-11/12 lg:w-1/2 px-5 py-4 rounded border border-slate-800">
      <div className="mb-3">Введите адрес кошелька 💎</div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="bg-[#0f172a] w-full p-1 rounded border border-slate-800"
      />
      <button
        className="block border  rounded py-1 px-2 ml-auto mt-2"
        onClick={() => setSend(!send)}
      >
        Send
      </button>
    </div>
  );
}

export default Window;
