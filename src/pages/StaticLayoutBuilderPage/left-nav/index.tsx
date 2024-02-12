import { selectStaticPage, useSelector } from "@/lib/redux";
import { Box, Card } from "@mui/material";
// import React from "react";

const LeftNav = () => {
  const { fetchData } = useSelector(selectStaticPage);
  const fetchObject = fetchData
    ? Array.isArray(fetchData)
      ? fetchData?.[0]
      : fetchData
    : {};
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        alignItems: "start",
        background: "green",
      }}
    >
      <h2>NavProvider</h2>
      {/* ---------------------- hidden layer start---------------------------- */}
      <Card
        variant="outlined"
        sx={{
          padding: "5px",
          cursor: "grab",
          display: "grid",
          textAlign: "center",
          justifyContent: "center",
        }}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer?.setData("dataSource/type", "hidden_");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
        new hidden_
      </Card>
      {/* ---------------------- hidden layer end and static layer start---------------------------- */}
      <Card
        variant="outlined"
        sx={{
          padding: "5px",
          cursor: "grab",
          display: "grid",
          textAlign: "center",
          justifyContent: "center",
        }}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer?.setData("dataSource/type", "text:static");
          e.dataTransfer?.setData("dataSource/data", "hello world");
          e.dataTransfer?.setData("layout/w", "5");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
          />
        </svg>
        new static H2
      </Card>

      <h3>dynamic some item</h3>
      {Object.entries(fetchObject).map(([k, v]) => {
        return (
          <Card
            variant="elevation"
            sx={{
              padding: "5px",
              cursor: "grab",
              display: "grid",
              textAlign: "center",
              justifyContent: "center",
            }}
            draggable={true}
            onDragStart={(e) => {
              e.dataTransfer?.setData("dataSource/type", "text:dynamic");
              e.dataTransfer?.setData("dataSource/dataTargetCode", `data.${k}`);
              e.dataTransfer?.setData(
                "layout/w",
                String(Math.ceil(String(v).length / 5))
              );
              e.dataTransfer?.setData(
                "layout/h",
                String(Math.ceil(String(v).length / 20))
              );
            }}
          >
            {k}
          </Card>
        );
      })}
    </Box>
  );
};

export default LeftNav;
