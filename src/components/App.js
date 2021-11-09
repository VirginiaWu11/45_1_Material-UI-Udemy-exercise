import Header from "./ui/Header";
import { ThemeProvider } from "@material-ui/styles";

function App() {
  return (
    <ThemeProvider>
      <Header />
      hello!
    </ThemeProvider>
  );
}

export default App;
