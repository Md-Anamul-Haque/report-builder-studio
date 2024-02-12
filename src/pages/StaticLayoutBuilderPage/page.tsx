import {
  selectStaticPage,
  staticPageSlice,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useState } from "react";
import StaticLayoutBuilder from "./builder";
import { Button, Card, TextField } from "@mui/material";
import axios from "axios";

const StaticLayoutBuilderPage = () => {
  const { fetchData, fetchUrl } = useSelector(selectStaticPage);
  const dispatch = useDispatch();
  const [newURl, setNewUrl] = useState<string>();
  if (fetchData) {
    return <StaticLayoutBuilder />;
  } else if (fetchUrl) {
    return <h2>loading...</h2>;
  } else {
    return (
      <Card
        sx={{
          padding: "20px",
          margin: "auto",
        }}
      >
        <TextField
          value={newURl}
          onChange={(e) => {
            setNewUrl(e.target.value);
          }}
          placeholder="enter a url"
          label="enter a url"
        />
        <br />
        <Button
          onClick={async () => {
            if (!newURl) {
              alert("newURl is:" + typeof newURl);
              return;
            }
            dispatch(staticPageSlice.actions.setFetchUrl(newURl));
            axios
              .get(newURl)
              .then((res) => {
                dispatch(staticPageSlice.actions.setFetchData(res.data));
              })
              .catch((err) => {
                console.log({ err });
              });
          }}
          disabled={!newURl}
          variant="contained"
        >
          Fetch now
        </Button>
      </Card>
    );
  }
};

export default StaticLayoutBuilderPage;
