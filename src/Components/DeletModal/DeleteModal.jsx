import { useEffect, useState } from "react";

export default function DeleteModal({ removeAddPlace, onCancel }) {
  console.log("Timer");
  const [remainTime, setRemainingTime] = useState(3000);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((preTime) => preTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAddPlace();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex  flex-col items-center justify-center mb-4 mt-4">
      <h2 className="text-xl font-bold text-neutral-700">
        Are you sure oyu want to delete?
      </h2>
      <div className="flex justify-center items-center  mr-8 pr-4">
        <button
          className="my-1 py-2  px-4 font-bold text-red-900/60 w-[6rem]  text-center ml-[4rem] hover:border hover:border-cyan-200 "
          onClick={removeAddPlace}
        >
          Yes
        </button>
        <button
          className="my-1 py-2  px-4 font-bold text-green-900/60 w-[6rem]  text-center ml-[4rem] hover:border hover:border-cyan-200 "
          onClick={onCancel}
        >
          No
        </button>
      </div>
      <div className="w-[80%]  bg-gray-200 rounded-full h-2.5 flex justify-start items-start mr-[2rem]">
        <div
          className={`h-2.5 rounded-full  items-start ${
            remainTime < 1000 ? "bg-red-500" : "bg-green-500"
          }`}
          style={{
            width: `${(remainTime / 3000) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
