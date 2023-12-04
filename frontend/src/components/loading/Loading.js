// Loading.js

import React from "react";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <BounceLoader color={"#7335BA"} loading={true} size={150} />
    </div>
  );
};

export default Loading;
