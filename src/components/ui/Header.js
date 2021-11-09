import React from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true, //whether there is a delay when the user is scrolling
    threshold: 100, //how far the user has to scroll before the trigger is activated,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  return (
    <ElevationScroll>
      <Appbar position="fixed">
        <Toolbar>Arc Development</Toolbar>
      </Appbar>
    </ElevationScroll>
  );
}
