import React from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import logo from "../../assets/logo.svg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    fontFamily: "Raleway",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
    minWidth: 10,
    marginLeft: "25px",
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
            <Tabs className={classes.tabContainer}>
              <Tab className={classes.tab} label="Home" />
              <Tab className={classes.tab} label="Services" />
              <Tab className={classes.tab} label="The Revolution" />
              <Tab className={classes.tab} label="About Us" />
              <Tab className={classes.tab} label="Contact Us" />
            </Tabs>
          </Toolbar>
        </Appbar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
