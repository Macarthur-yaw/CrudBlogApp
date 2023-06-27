import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");

  const initialInput = {
    text: text,
    content: content,
    source: source,
  };

  function addBlogs() {
    setBlogs([initialInput, ...blogs]);
    localStorage.setItem("items", JSON.stringify([initialInput, ...blogs]));
    // console.log(blogs);
  }

  function deleteTask(indexToDelete) {
    const updatedBlogs = blogs.filter((blog, index) => index !== indexToDelete);
    setBlogs(updatedBlogs);
    console.log(indexToDelete);
  }

  function changeDisplay() {
    setDisplay(!display);
  }

  function updateTask(indexOfElement) {
    const updatedBlogs = blogs.map((blog, index) => {
      if (indexOfElement === index) {
        return initialInput;
      }
      return blog;
    });
    setBlogs(updatedBlogs);
  }

//   const getItems = JSON.parse(localStorage.getItem("items"));
//   console.log(getItems);

  const getData = blogs.map((content, index) => {
    return (
      <div key={index}>
        {content.content}
        {content.source}
        {content.text}
        <button onClick={() => deleteTask(index)}>Delete</button>
        <button onClick={() => updateTask(index)}>Update</button>
        <Link to={`/next/${index}`}>Click</Link>
      </div>
    );
  });

  return (
    <div >
        <h2 className="bg-white-100 shadow-md p-2 text-center ">
            TechBLOG
        </h2>
        {/* welcome */}
        <div className=" text-end p-2">
      <button className="border-2 h-8 text-sm border-black p-1 rounded"  onClick={changeDisplay}>Add Blog
      
      </button>
      </div>
      {display && (
        <div className="flex flex-col border-2 p-2 border-black text-center">
          <input
          className="border-2 border-black rounded p-2 text-center"
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Name"
          />
          <br />
          <input
          className="border-2 border-black rounded p-2 text-center"
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Source"
          />
          <br />
          <input
            type="text"
            className="border-2 border-black rounded p-2 text-center"
            onChange={(e) => setSource(e.target.value)}
            value={source}
            placeholder="Content"
          />
<br/>
          <button onClick={addBlogs}>Submit</button>
        </div>
      )}

      {getData}
    </div>
  );
};

export default Navbar;
