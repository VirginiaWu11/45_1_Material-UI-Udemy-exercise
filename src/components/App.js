import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./ui/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<div>Home</div>} />
            <Route
              exact
              path="/customsoftware"
              element={<div>customsoftware</div>}
            />
            <Route exact path="/services" element={<div>Services</div>} />
            <Route exact path="/mobileapps" element={<div>mobileapps</div>} />
            <Route exact path="/websites" element={<div>websites</div>} />
            <Route exact path="/revolution" element={<div>revolution</div>} />
            <Route exact path="/about" element={<div>about</div>} />
            <Route exact path="/contact" element={<div>contact</div>} />
            <Route exact path="/estimate" element={<div>estimate</div>} />
          </Routes>
        </BrowserRouter>
        <div>Hello</div>
      </ThemeProvider>
    </>
  );
}

export default App;
