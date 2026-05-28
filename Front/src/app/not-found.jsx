import Oscar from "@/component/oscar/oscar";
import React from "react";

function NotFound() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-lvh">
      <Oscar width={175} height={175}/>
      <p className="text-(--second) text-2xl">Page Not Found</p>
    </div>
  );
}

export default NotFound;
