export default function Error({ title, message, onConfirm }) {
  return (
    <div className="bg-red-300 h-[10rem] flex  flex-col justify-center items-center  mx-auto rounded w-1/2">
      <h2 className="my-4 text-2xl font-medium text-red-100 ">{title}</h2>
      <p className="text-center mb-1 text-gray-600">{message}!</p>
      <div className="flex  justify-end w-1/3 mt-2 group ">
        <button
          onClick={onConfirm}
          className="group-hover:bg-red-400  group-hover:text-red-300 px-2 py-1 rounded bg-red-100"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
