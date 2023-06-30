import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Nex = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getItems = JSON.parse(localStorage.getItem("items"));
    setData(getItems);
  }, []);

  const getData = data.map((item, index) => {
    if (id === index.toString()) {
      return (
        <div key={index}>
          <h3>{item.text}</h3>
          <p>{item.content}</p>
          <p>{item.source}</p>
        </div>
      );
    } 
  });

  return (
    <div className="border-2  text-center p-6">
      <h1>Welcome to this page</h1>
      {getData}
    </div>
  );
};

export default Nex;
