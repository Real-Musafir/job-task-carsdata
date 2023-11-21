import { useEffect, useState } from "react";
import "./App.css";
import { carsData, SORT_TYPE_LIST } from "./utils/carsData";
function App() {
  const [sortType, setSortType] = useState(null);
  const [allCarsData, setAllCarsData] = useState(carsData);

  // let sScore = JSON.parse(JSON.stringify(scoreArray))

  // Dynamic sorting function
  const sortByProperty = (property) => (a, b) => {
    if (property != "isInProduction") {
      const propA = a[property].toUpperCase();
      const propB = b[property].toUpperCase();

      if (propA < propB) {
        return -1;
      } else if (propA > propB) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return a[property] - b[property];
    }
  };

  useEffect(() => {
    if (sortType) {
      let sortedData = carsData.sort(sortByProperty(sortType));
      setAllCarsData(sortedData);
    }
  }, [sortType]);
  return (
    <div className="bg-white flex flex-col items-center">
      {/* Sort Filter Section */}
      <div className="flex flex-row">
        <div className="bg-red-900 px-5 py-1 rounded">
          <h1 className="text-white text-xl font-bold">Sorted by</h1>
        </div>

        {SORT_TYPE_LIST.map((item, index) => (
          <div
            className="border-2 px-5 py-1 rounded border-red-900 mx-2 cursor-pointer"
            onClick={() => setSortType(item.tag)}
            key={index}
          >
            <h1
              className={`${
                item.tag === sortType ? "text-red-900" : null
              } font-bold`}
            >
              {item.title}
            </h1>
          </div>
        ))}
      </div>

      {/* Data Section */}
      {allCarsData.map((item, index) => (
        <div key={index}>
          <h1 className="text-red-800 m-5 text-3xl font-bold ">{item.model}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
