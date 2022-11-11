import { FlexibleXYPlot, LineSeries } from "react-vis";
import { useDispatch, useSelector } from "react-redux";

import ReactLogo from "../utils/blobanimation.svg";
// import { fetchBalance } from "../redux/slices/balanceSlice";
import { fetchСhart } from "../redux/slices/chartSlice";
import { useEffect } from "react";

function Balance() {
  let data = [];
  let nowPrice = 0;
  let lastPrice = 0;
  let minuteFivePrice = 0;
  let minute30Price = 0;
  let hourPrice = 0;
  const balance = useSelector((state) => state.balanceReducer.items);
  const chart = useSelector((state) => state.chartReducer);
  const dispatch = useDispatch();
  //   const getBalance = async () => {
  //     dispatch(fetchBalance());
  //   };
  const getData = async () => {
    console.log("bac bac");
    dispatch(fetchСhart());
  };
  //   useEffect(() => {
  //     getBalance();
  //   }, []);
  useEffect(() => {
    getData();
  }, []);
  if (chart.status === "Результат") {
    data = chart.items.prices.map((obj, id) => ({
      time: obj[0],
      x: id + 1,
      y: obj[1],
    }));
    nowPrice = data[data.length - 1].y; //now price
    lastPrice = data[0].y; //yesterday price
    minuteFivePrice = data[data.length - 2].y;
    minute30Price = data[data.length - 7].y;
    hourPrice = data[data.length - 13].y;
  }

  return (
    <>
      <div className="relative flex flex-col items-center md:flex-row justify-between items-center z-10 backdrop-blur-2xl border border-slate-800 w-full my-8 p-3 rounded">
        <div className=" font-light mt-24 h-48 sm:ml-6 md:ml-12 whitespace-nowrap">
          <div className="text-5xl md:text-3xl">
            {balance.result / 1000000000}
            <span className="text-xl"> TON</span>
          </div>
          <div className="text-xl">
            {((balance.result / 1000000000) * nowPrice).toString().slice(0, 5)}{" "}
            $
          </div>
        </div>
        <div className="mr-4 w-full sm:w-11/12 md:w-1/2 h-40 mb-24 md:mb-0">
          <FlexibleXYPlot
            stroke={
              nowPrice - lastPrice > 0 ? "rgb(34 197 94)" : "rgb(220 38 38)"
            }
          >
            <LineSeries
              data={data}
              strokeWidth={2}
              curve={"curveMonotoneX"}
              style={{
                fill: "rgba(15, 23, 42, 0)",
              }}
            />
          </FlexibleXYPlot>
          <div className="flex justify-between  ml-auto mb-4 w-11/12">
            <div>{lastPrice.toString().slice(0, 4)}</div>
            <div>{nowPrice.toString().slice(0, 4)}</div>
          </div>
          <div className="flex justify-between ml-auto w-11/12 font-light">
            <div
              className={
                nowPrice - hourPrice > 0 ? "text-green-500" : "text-red-600"
              }
            >
              {((nowPrice * 100) / hourPrice - 100).toString().slice(0, 4)} % |
              1 h
            </div>
            <div
              className={
                nowPrice - minute30Price > 0 ? "text-green-500" : "text-red-600"
              }
            >
              {((nowPrice * 100) / minute30Price - 100).toString().slice(0, 4)}{" "}
              % | 30 min
            </div>
            <div
              className={
                nowPrice - minuteFivePrice > 0
                  ? "text-green-500"
                  : "text-red-600"
              }
            >
              {((nowPrice * 100) / minuteFivePrice - 100)
                .toString()
                .slice(0, 4)}{" "}
              % | 5 min
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute z-0 ml-3 md:ml-7 top-24 w-64 opacity-50"
        src={ReactLogo}
        alt="logo"
      />
    </>
  );
}

export default Balance;
