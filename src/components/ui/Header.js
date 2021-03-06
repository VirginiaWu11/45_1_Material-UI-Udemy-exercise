import React, { useState, useEffect, useMemo } from "react";
import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import logo from "../../assets/logo.svg";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    marginBottom: "3rem",
    [theme.breakpoints.down("md")]: { marginBottom: "2rem" },
    [theme.breakpoints.down("xs")]: { height: "1.25em" },
  },
  logo: {
    height: "7rem",
    [theme.breakpoints.down("md")]: { height: "6rem" },
    [theme.breakpoints.down("xs")]: { height: "5rem" },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "50px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    opacity: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = useMemo(
    () => [
      { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
      {
        name: "Custom Software Development",
        link: "/customsoftware",
        activeIndex: 1,
        selectedIndex: 1,
      },
      {
        name: "Mobile App Development",
        link: "/mobileapps",
        activeIndex: 1,
        selectedIndex: 2,
      },
      {
        name: "Website Development",
        link: "/websites",
        activeIndex: 1,
        selectedIndex: 3,
      },
    ],
    []
  );

  const routes = useMemo(
    () => [
      { name: "Home", link: "/", activeIndex: 0 },
      { name: "Services", link: "/services", activeIndex: 1 },
      { name: "The Revolution", link: "/revolution", activeIndex: 2 },
      { name: "About Us", link: "/about", activeIndex: 3 },
      { name: "Contact Us", link: "/contact", activeIndex: 4 },
    ],
    []
  );
  useEffect(() => {
    [...menuOptions, ...routes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });

    // const pathname = {
    //   "/": { value: 0 },
    //   "/services": { value: 1, selectedIndex: 0 },
    //   "/computersoftware": { value: 1, selectedIndex: 1 },
    //   "/mobileapps": { value: 1, selectedIndex: 2 },
    //   "/websites": { value: 1, selectedIndex: 3 },
    //   "/revolution": { value: 2 },
    //   "/about": { value: 3 },
    //   "/contact": { value: 4 },
    // };
    // setValue(
    //   pathname.hasOwnProperty(window.location.pathname)
    //     ? pathname[window.location.pathname].value
    //     : 0
    // );
    // setSelectedIndex(
    //   pathname.hasOwnProperty(window.location.pathname)
    //     ? pathname[window.location.pathname].selectedIndex
    //     : 0
    // );
  }, [menuOptions, routes, value, selectedIndex]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        <Tab
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={handleClick}
          to="/services"
          label="Services"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/revolution"
          label="The Revolution"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/about"
          label="About Us"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/contact"
          label="Contact Us"
        />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }} //in mui docs, menu api inherits from paper
        MenuListProps={{ onMouseLeave: handleClose }} //close the menu when no longer hovering
        elevation={0}
      >
        {menuOptions.map((option, index) => (
          <MenuItem
            key={option.name}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, index);
              setValue(1);
              handleClose();
            }}
            selected={index === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          <ListItem
            className={
              value === 0
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            divider
            button
            disableTypography
            component={Link}
            to="/"
            selected={value === 0}
          >
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            className={
              value === 1
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
            onClick={() => {
              setOpenDrawer(false);
              setValue(1);
            }}
            divider
            button
            disableTypography
            component={Link}
            to="/services"
            selected={value === 1}
          >
            <ListItemText>Services</ListItemText>
          </ListItem>
          <ListItem
            className={
              value === 2
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
            onClick={() => {
              setOpenDrawer(false);
              setValue(2);
            }}
            divider
            button
            disableTypography
            component={Link}
            to="/revolution"
            selected={value === 2}
          >
            <ListItemText>The Revolution</ListItemText>
          </ListItem>
          <ListItem
            className={
              value === 3
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
            onClick={() => {
              setOpenDrawer(false);
              setValue(3);
            }}
            divider
            button
            disableTypography
            component={Link}
            to="/about"
            selected={value === 3}
          >
            <ListItemText>About Us</ListItemText>
          </ListItem>
          <ListItem
            className={
              value === 4
                ? [classes.drawerItem, classes.drawerItemSelected]
                : classes.drawerItem
            }
            onClick={() => {
              setOpenDrawer(false);
              setValue(4);
            }}
            divider
            button
            disableTypography
            component={Link}
            to="/contact"
            selected={value === 4}
          >
            <ListItemText>Contact Us</ListItemText>
          </ListItem>
          <ListItem
            className={
              value === 5
                ? [
                    classes.drawerItem,
                    classes.drawerItemSelected,
                    classes.drawerItemEstimate,
                  ]
                : [classes.drawerItem, classes.drawerItemEstimate]
            }
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            disableTypography
            component={Link}
            to="/estimate"
            selected={value === 5}
          >
            <ListItemText
              className={
                value === 5
                  ? [
                      classes.drawerItem,
                      classes.drawerItemSelected,
                      classes.drawerItemEstimate,
                    ]
                  : [classes.drawerItem, classes.drawerItemEstimate]
              }
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <ElevationScroll>
        <Appbar position="fixed" color="primary">
          <Toolbar disableGutters>
            {/* toolbar makes the words go horizontally instead of on top of each other */}
            {/* <Typography variant="h3">Arc Development</Typography> */}
            <Button
              disableRipple
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </Appbar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
