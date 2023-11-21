import { useEffect, useState } from "react";
import "./App.css";
import { carsData, SORT_TYPE_LIST } from "./utils/carsData";
function App() {
  const [sortType, setSortType] = useState(null);
  const [allCarsData, setAllCarsData] = useState(carsData);
  const [renderDom, setRenderDom] = useState(1);

  // Dynamic sorting function
  const sortByProperty = (property) => (a, b) => {
    console.log(property, "owowowo");
    if (property != "isInProduction") {
      const propA = a[property].toUpperCase();
      const propB = b[property].toUpperCase();

      for (let i = 0; i < Math.min(propA.length, propB.length); i++) {
        if (propA.charCodeAt(i) < propB.charCodeAt(i)) {
          return -1;
        } else if (propA.charCodeAt(i) > propB.charCodeAt(i)) {
          return 1;
        }
      }

      // If characters are the same up to the length of the shorter string, shorter string comes first
      return propA.length - propB.length;
    } else {
      if (a[property] && b[property]) {
        return 1;
      } else if (a[property]) {
        return -1;
      } else {
        return 1;
      }
    }
  };

  function SortTypeFunction(sortType) {
    let tempData = JSON.parse(JSON.stringify(allCarsData));
    let sortedData = tempData.sort(sortByProperty(sortType));
    setAllCarsData(sortedData);
    setRenderDom(renderDom + 1);
  }

  return (
    <div className="bg-white flex flex-col items-center pt-10">
      {/* Sort Filter Section */}
      <div className="flex flex-row mb-7">
        <div className="bg-red-900 px-5 py-1 rounded">
          <h1 className="text-white text-xl font-bold">Sorted by</h1>
        </div>

        {SORT_TYPE_LIST.map((item, index) => (
          <div
            className="border-2 px-5 py-1 rounded border-red-900 mx-2 cursor-pointer"
            onClick={() => {
              setSortType(item.tag);
              SortTypeFunction(item.tag);
            }}
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

      <table key={renderDom}>
        <thead>
          <tr>
            <th>BRAND</th>
            <th>MODEL</th>
            <th>COLOR</th>
            <th>TIME</th>
            <th>PRODUCTION</th>
          </tr>
        </thead>
        <tbody className="" key={allCarsData}>
          {allCarsData.map((item, index) => (
            <tr key={index}>
              <td className="text-center align-middle px-3">{item.brand}</td>
              <td className="text-center align-middle px-3">{item.model}</td>
              <td className="text-center align-middle px-3">{item.color}</td>
              <td className="text-center align-middle px-3">
                {item.createdAt.slice(0, 10)}
              </td>
              <td className="text-center align-middle">
                {item.isInProduction ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Data Section */}
      {/* {allCarsData.map((item, index) => (
        <div className="flex flex-row items-center" key={index}>
          <h1 className="text-red-800 mt-2 text-xl font-bold ">{item.model}</h1>
          <h1 className="text-red-800 mt-2 text-xl font-bold ">
            Color: {item.model}
          </h1>
        </div>
      ))} */}
    </div>
  );
}

export default App;
