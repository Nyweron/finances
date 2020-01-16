import React from "react";
import { Route } from "react-router-dom";

import IndexOne from "../container/indexOne";
import Index2 from "../container/index2";
import Index3 from "../container/index3";

const navigationItem = () => {
  return (
    <div>
      <Route path="/" component={IndexOne} />
      <Route path="/index2" component={Index2} />
      <Route path="/index3" component={Index3} />
      <p>TEST1</p>
    </div>
  );
};

export default navigationItem;
