import Balance from "./components/Balance";
import Header from "./components/Header";
import Transactions from "./components/Transactions";

function App() {
  return (
    <div className="text-white text-base">
      <Header />
      <div className="w-11/12 mx-auto">
        <Balance />
      </div>

      <div className="w-11/12 lg:w-3/5 mx-auto">
        <Transactions />
      </div>
    </div>
  );
}

export default App;
