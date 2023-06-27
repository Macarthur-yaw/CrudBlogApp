import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Nex = () => {
//   const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem("items"));
    setData(getItems);
  }, []);

  return (
    <div>
      <h1>Welcome to the next page</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <p>{item.source}</p>
        </div>
      ))}
    </div>
  );
};

export default Nex;
