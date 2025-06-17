import { Skeleton } from "@atomos_tech/genesis";
import React from "react";

const TableLoader = ({ rows }: { rows: number }) => {
  return (
    <div>
      <div className="px-4 py-3 border mt-4 flex items-center justify-between">
        <Skeleton width="20px" height="20px" />
        {[1, 2, 3, 4, 5]?.map((i) => (
          <Skeleton width="150px" height="25px" key={i} />
        ))}
        <Skeleton width="20px" height="20px" />
      </div>
      {[1, 2, 3, 4, 5]?.map((i) => (
        <div
          className="px-4 py-3 border flex items-center justify-between"
          key={i}
        >
          <Skeleton width="20px" height="20px" key={i} />
          {[1, 2, 3, 4, 5]?.map((i) => (
            <Skeleton width="150px" height="25px" key={i} />
          ))}
          <Skeleton width="20px" height="20px" />
        </div>
      ))}
    </div>
  );
};

export default TableLoader;
