import {
  selectStaticPage,
  staticPageSlice,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { Button } from "@mui/material";
// import React from "react";

// type Props = {};

const ElementProps = () => {
  const { activeI } = useSelector(selectStaticPage);
  // const activeData = activeI ? dataSource.find((ds) => ds.i == activeI) : null;
  const dispatch = useDispatch();
  if (!activeI) {
    return <></>;
  }
  return (
    <div>
      <Button
        onClick={() => {
          activeI &&
            dispatch(staticPageSlice.actions.removeItemFromBuilderByI(activeI));
        }}
      >
        delete
      </Button>
    </div>
  );
};

export default ElementProps;
