import { useSelector } from "react-redux";
import { BiCopy } from "react-icons/bi";

function Transactions() {
  const transaction = useSelector((state) => state.transactionReducer);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear().toString().slice(2);
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time =
      date +
      "." +
      (month < 10 ? "0" + month : month) +
      "." +
      year +
      " " +
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (min < 10 ? "0" + min : min);
    return time;
  }

  console.log(transaction);
  return (
    <div className="pb-8">
      <h2 className="text-xl mb-2">Transactions</h2>
      {transaction.status === "Результат" ? (
        transaction.items.result.map((obj, id) => (
          <div
            key={id}
            className="flex flex-wrap justify-between p-2 mb-2 bg-slate-800 rounded w-full"
          >
            <div
              className={
                obj.out_msgs.length > 0
                  ? "bg-red-600 w-1 rounded"
                  : "bg-green-500 w-1 rounded"
              }
            ></div>

            <div className="">
              <div>Time</div>
              <div>{timeConverter(obj.utime)}</div>
            </div>
            <div className="">
              <div>Value</div>
              <div>
                {obj.out_msgs.length > 0
                  ? obj.out_msgs[0].value / 1000000000 + " "
                  : obj.in_msg.value / 1000000000 + " "}
                TON
              </div>
            </div>

            <div className="">
              <div>Address</div>
              <div className="flex items-center">
                {obj.out_msgs.length > 0
                  ? obj.out_msgs[0].destination.slice(0, 4) +
                    " ... " +
                    obj.out_msgs[0].destination.slice(-6)
                  : obj.in_msg.source.slice(0, 4) +
                    " ... " +
                    obj.in_msg.source.slice(-6)}
                <BiCopy className="ml-1" />
              </div>
            </div>
            <div className="">
              <div>Fee</div>
              <div>
                {"0" + (obj.fee / 1000000000 + 1).toString().slice(1)} TON
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-xl mx-auto w-3/4 mt-6">
          Что-то полшо не так или транзакции не найдены. Попробуйте обновить
          страницу
        </div>
      )}
    </div>
  );
}

export default Transactions;
