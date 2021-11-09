import React from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import logo from "../../assets/logo.svg";

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

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logo: {
    height: "7em",
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <Appbar position="fixed" color="primary">
          <Toolbar disableGutters>
            {/* <Typography variant="h3">Arc Development</Typography> */}
            <img src={logo} alt="company logo" className={classes.logo} />
          </Toolbar>
        </Appbar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
