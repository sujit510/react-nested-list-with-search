import { useCallback, useEffect, useState } from "react";
import { OKRTree } from "./OKRTree";
import { processData } from "./service";
import "./styles.css";

export default function App() {
  const [allData, setAllData] = useState({});
  const [data, setData] = useState({});
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetch("https://okrcentral.github.io/sample-okrs/db.json")
      .then((d) => d.json())
      .then((apiData) => {
        // console.log("apiData::", processData(apiData.data));
        const processedData = processData(apiData.data);
        setData(processedData);
        setAllData(processedData);
      })
      .catch((err) => {
        console.log("some error::", err);
      });
  }, []);

  useEffect(() => {
    const filteredData = Object.keys(allData).reduce((acc, currentKey) => {
      if (
        allData[currentKey].title?.toLowerCase().includes(searchText) ||
        allData[currentKey].children?.some((child) =>
          child.title?.toLowerCase().includes(searchText.toLowerCase())
        )
      ) {
        acc[currentKey] = {
          ...allData[currentKey],
          children: allData[currentKey].children.filter((child) =>
            child.title?.toLowerCase().includes(searchText.toLowerCase())
          )
        };
      }
      return acc;
    }, {});
    setData(filteredData);
  }, [searchText, allData]);

  const applyFilter = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        type="text"
        placeholder="type here to search.."
        onChange={applyFilter}
      />
      <OKRTree data={data} />
    </div>
  );
}
