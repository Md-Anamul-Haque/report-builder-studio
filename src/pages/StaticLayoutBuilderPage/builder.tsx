// StableGridLayout.tsx
import { v4 as uuidv4 } from "uuid";
import styles from "./staticLayout.module.css";

import {
  DataSource,
  selectStaticPage,
  staticPageSlice,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { Button } from "@mui/material";
import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import NavProvider from "./NavProvider";
import { getCodeToValue } from "@/lib/util";

const ReactGridLayout = WidthProvider(RGL);
const StaticLayoutBuilder: React.FC = () => {
  const { dataSource, layouts, activeI, fetchData } =
    useSelector(selectStaticPage);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  const dispatch = useDispatch();
  const onDrop = (
    _layout: RGL.Layout[],
    item: RGL.Layout,
    e: React.DragEvent<HTMLDivElement>
  ): void => {
    const new_i = uuidv4();
    const new_type = e.dataTransfer.getData(
      "dataSource/type"
    ) as DataSource["type"];
    let newDataSource: DataSource;
    if (new_type === "hidden_") {
      newDataSource = {
        i: new_i,
        type: "hidden_",
      };
    } else if (new_type == "text:dynamic") {
      newDataSource = {
        i: new_i,
        type: new_type, //text:dynamic
        dataTargetCode: e.dataTransfer.getData("dataSource/dataTargetCode"),
      };
    } else {
      newDataSource = {
        i: new_i,
        type: new_type, //text:static
        data: e.dataTransfer.getData("dataSource/data"),
      };
    }
    dispatch(
      staticPageSlice.actions.createNewElement({
        layout: {
          h: Number(e.dataTransfer.getData("layout/h")) || item.h,
          i: new_i,
          w: Number(e.dataTransfer.getData("layout/w")) || item.w,
          x: item.x,
          y: item.y,
        },
        dataSource: newDataSource,
      })
    );
  };

  return (
    <NavProvider>
      <div
        style={{
          background: "#b6aca1",
          width: "8in",
          height: "11in",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <div
          onClick={() => {
            dispatch(staticPageSlice.actions.setActiveItem(""));
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
          }}
        ></div>
        <div className={styles.ReactGridLayout}>
          <ReactGridLayout
            className={styles["draggable-handle"]}
            layout={layouts}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onDrop={onDrop}
            measureBeforeMount={false}
            preventCollision={false}
            isDroppable={true}
            cols={12}
            rowHeight={30}
            draggableHandle=".draggable-handle"
            useCSSTransforms
            autoSize
            containerPadding={[5, 70]}
            onLayoutChange={(newLayout) => {
              dispatch(staticPageSlice.actions.setLayouts(newLayout));
            }}
          >
            {layouts.map((item, i) => {
              const data =
                dataSource.find((ds) => ds.i == item.i) || ({} as DataSource); //getlayoutSataSourceByI(dataTargetCode, item.i);
              if (data.type == "hidden_") {
                return (
                  <Button
                    variant="text"
                    key={item.i}
                    className="ReactGridLayoutItem draggable-handle"
                    onClick={() => {
                      dispatch(
                        staticPageSlice.actions.setActiveItem(String(item.i))
                      );
                    }}
                  >
                    {`${data.type}`}
                  </Button>
                );
              } else if (data.type == "text:dynamic") {
                return (
                  <Button
                    // color=""
                    variant={item.i == activeI ? "outlined" : "contained"}
                    // sx={{
                    //   background: "#fff",
                    // }}
                    key={item.i}
                    className="ReactGridLayoutItem draggable-handle"
                    onClick={() => {
                      dispatch(
                        staticPageSlice.actions.setActiveItem(String(item.i))
                      );
                    }}
                  >
                    {getCodeToValue(
                      fetchData || "",
                      data?.dataTargetCode || "",
                      i
                    ) || "dynamic"}
                  </Button>
                );
              } else {
                return (
                  <Button
                    color="secondary"
                    variant="contained"
                    key={item.i}
                    className="ReactGridLayoutItem draggable-handle"
                    onClick={() => {
                      dispatch(
                        staticPageSlice.actions.setActiveItem(String(item.i))
                      );
                    }}
                  >
                    {data?.data || data.type || "empty"}
                  </Button>
                );
              }

              // }
            })}
          </ReactGridLayout>
          {/* {JSON.stringify(layouts)} */}
        </div>
      </div>
    </NavProvider>
  );
};

export default StaticLayoutBuilder;
