import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faTimes} from "@fortawesome/free-solid-svg-icons";

const Add = () => {
  const [display, setDisplay] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [info, setInfo] = useState([]);
  const [active, setActive] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  useEffect(() => {
    const getInfo = JSON.parse(localStorage.getItem("items"));
    setInfo(getInfo || []);
  }, []);

  function addBlogs() {
    const initialInput = {
      text: text,
      content: content,
      source: source,
    };

    setBlogs([initialInput, ...blogs]);
    localStorage.setItem("items", JSON.stringify([initialInput, ...blogs]));
    setInfo(JSON.parse(localStorage.getItem("items")));

    setText("");
    setContent("");
    setSource("");
  }

  function deleteTask(indexToDelete) {
    const updatedBlogs = info.filter((_, index) => index !== indexToDelete);
    setBlogs(updatedBlogs);
    setInfo(updatedBlogs);
    localStorage.setItem("items", JSON.stringify(updatedBlogs));
  }

  function changeDisplay() {
    setDisplay(!display);
    setActive(false);
    setUpdateIndex(null);
  }

  function updateTask(indexOfElement) {
    const blogToUpdate = info[indexOfElement];
    setText(blogToUpdate.text);
    setContent(blogToUpdate.content);
    setSource(blogToUpdate.source);
    setUpdateIndex(indexOfElement);
    setDisplay(true);
    setActive(true);
  }

  function handleUpdate() {
    const updatedBlogs = info.map((blog, index) => {
      if (updateIndex === index) {
        return {
          text: text,
          content: content,
          source: source,
        };
      }
      return blog;
    });

    setInfo(updatedBlogs);
    localStorage.setItem("items", JSON.stringify(updatedBlogs));

    setText("");
    setContent("");
    setSource("");
    setDisplay(false);
    setActive(false);
    setUpdateIndex(null);
  }

  return (
    <div>
      <h2 className="bg-white-100 shadow-md p-2 text-center">TechBLOG</h2>
      <div className="text-end p-2">
        <button
          className="border-2 h-8 text-sm border-black p-1 rounded"
          onClick={changeDisplay}
        >
          <FontAwesomeIcon icon={faPlus}/>
          Add Blog
        </button>
      </div>
      {display && (
  
  
  <div className="flex flex-col w-full sm:w-96 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl p-2 bg-gray-100">
    <div className="flex justify-end">
      <FontAwesomeIcon onClick={() => setDisplay(false)} className="p-2 cursor-pointer" icon={faTimes} />
    </div>
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
    <br />
    <div className="flex flex-row">
      <button
        className="border-2 border-black w-full sm:w-20 mx-auto rounded bg-black text-white mb-2 sm:mb-0 sm:mr-2"
        onClick={addBlogs}
      >
        Submit
      </button>
  
      {active && updateIndex !== null && (
        <button
          className="border-2 border-black w-full sm:w-20 mx-auto rounded bg-black text-white"
          onClick={handleUpdate}
        >
          Update
        </button>
      )}
    </div>
  </div>
  
      )}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 mt-4">
          {info.map((content, index) => (
            <div
              key={index}
              className="w-full rounded bg-white-600 p-2 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">{content.text}</h3>
              <p className="text-gray-600 mb-2">{content.source}</p>
              <p className="text-gray-500">{content.content}</p>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  onClick={() => updateTask(index)}
                >
                  Update
                </button>
                <Link
                  className="text-blue-500 underline ml-2"
                  to={`/next/${index}`}
                >
                  See more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Add;

