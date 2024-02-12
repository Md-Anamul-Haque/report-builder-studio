import BasicTabs from "./tabs";
const RightNav = () => {
  // const dispatch = useDispatch();
  // const { activeI, dataTargetCode, fetchData } = useSelector(selectStaticPage);
  // const activeData = activeI ? dataTargetCode.find((ds) => ds.i == activeI) : null;
  // const activeLayout = activeI ? layouts.find((l) => l.i == activeI) : null;

  return (
    <div
      style={{
        display: "grid",
        flexDirection: "column",
      }}
    >
      <BasicTabs />
    </div>
  );
};

export default RightNav;
