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

  const getItems = JSON.parse(localStorage.getItem("items"));
  console.log(getItems);

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
    <div>
      <button onClick={changeDisplay}>Add</button>

      {display && (
        <div>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Name"
          />
          <br />
          <input
            type="text"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Source"
          />
          <br />
          <input
            type="text"
            onChange={(e) => setSource(e.target.value)}
            value={source}
            placeholder="Content"
          />

          <button onClick={addBlogs}>Submit</button>
        </div>
      )}

      {getData}
    </div>
  );
};

export default Navbar;
