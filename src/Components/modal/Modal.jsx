// import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { forwardRef } from "react";
import { useEffect, useRef } from "react";
const Modal = forwardRef(function Modal({ children, open }) {
  const dialog = useRef();

  // useImperativeHandle(ref, () => {
  //   return {
  //     open() {
  //       dialog.current.showModal();
  //     },
  //     close() {
  //       dialog.current.close();
  //     },
  //   };
  // });

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog
      className="fixed top-1/3 left-1/3 rounded-lg px-6 py-8 w-[30rem] backdrop:bg-cyan-200/30  bg-neutral-500/99  "
      ref={dialog}
    >
      {open ? children : ""}
      <form method="dialog" className="relative">
        <button className="absolute bottom-0 right-0  bg-sky-200 px-4 py-1 rounded-md text-slate-800 hover:bg-sky-900/60 hover:text-neutral-900">
          Close
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
