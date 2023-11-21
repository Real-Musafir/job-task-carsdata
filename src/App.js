import "./App.css";
import { carsData } from "./utils/carsData";
function App() {
  return (
    <div className="App">
      {carsData.map((item, index) => (
        <div key={index}>
          <h1 className="text-black m-5 text-2xl">{item.model}asdf</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
