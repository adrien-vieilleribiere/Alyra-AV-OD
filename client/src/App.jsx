import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Examples from "./components/Demo/Examples";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Intro />

          <hr />
          <Setup />
          <hr />
          <Examples />
          <Demo />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;