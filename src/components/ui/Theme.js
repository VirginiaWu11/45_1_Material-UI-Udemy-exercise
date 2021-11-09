import { createTheme } from "@material-ui/core/styles";

const arcBlue = "#66e3ff";
const arcOrange = "#FFBA60";

export default createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`, //anytime you need to use this color, you can access it through the theme without having to copy this anywhere else
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
});
