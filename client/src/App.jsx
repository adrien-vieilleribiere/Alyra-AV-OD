import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">

          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
