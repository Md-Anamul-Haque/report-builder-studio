import DataTargetCodeEditor from "@/components/DraggableDialog";
import {
  DataSource,
  selectStaticPage,
  staticPageSlice,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { FormLabel, Switch, TextField } from "@mui/material";

const DataHandler = () => {
  const { activeI, dataSource, fetchData } = useSelector(selectStaticPage);
  const activeData = activeI ? dataSource.find((ds) => ds.i == activeI) : null;
  const dispatch = useDispatch();

  if (activeData?.type == "text:dynamic" || activeData?.type == "text:static") {
    return (
      <div>
        <FormLabel>is static</FormLabel>
        <Switch
          checked={activeData.type == "text:static"}
          onChange={(e) => {
            const newData: DataSource = e.target.checked
              ? {
                  ...activeData,
                  i: activeData.i!,
                  type: "text:static",
                }
              : {
                  ...activeData,
                  i: activeData.i!,
                  type: "text:dynamic",
                };
            dispatch(staticPageSlice.actions.setActivedataTargetCode(newData));
          }}
          inputProps={{ "aria-label": "Switch demo" }}
        />
        {activeData?.type == "text:dynamic" ? (
          <DataTargetCodeEditor
            suggestionData={
              Array.isArray(fetchData) ? fetchData?.[0] : fetchData
            }
            dataTargetCode={activeData.dataTargetCode || ""}
            onChange={(code) => {
              dispatch(
                staticPageSlice.actions.setActivedataTargetCode({
                  ...activeData,
                  dataTargetCode: code,
                })
              );
            }}
          />
        ) : (
          <TextField
            label="static value"
            value={activeData.data}
            onChange={(e) => {
              dispatch(
                staticPageSlice.actions.setActivedataTargetCode({
                  ...activeData,
                  data: e.target.value,
                })
              );
            }}
          />
        )}
      </div>
    );
  } else {
    return <>{fetchData.type}</>;
  }
};

export default DataHandler;
