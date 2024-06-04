import React from "react";
import { useNavigate } from "react-router-dom";
import { useState ,useDispatch} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const Navbar = () => {

  const [uri, setUri] = useState("");

  function sendMessageToExtension(message) {
    window.postMessage(
      { type: "FROM_PAGE", payload: { type: message, url: uri } },
      "*"
    );
  }

  const callExtension = (e) => {
    sendMessageToExtension("start_recording");
  };

  function sendMessageToExtension_replay(message) {
    window.postMessage({ type: "FROM_PAGE", payload: { type: message } }, "*");
  }

  const replay = () => {
    sendMessageToExtension_replay("start_replaying");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUri(e.target.value);
  };

  const [add, setAdd] = useState(false);

  function AddURI() {
    const saveHandler = (e) => {
      callExtension();
      setAdd(false);
      setUri("");
      e.preventDefault();
    };
    return (
      <div className="w-[100%] h-[100%]">
        <div className="flex  justify-center items-center h-[100%] w-[100%] md:w-[70%] mx-auto ">
          <form
            onSubmit={saveHandler}
            className="gap-[20px] flex flex-col p-[20px] bg-white rounded-[10px] w-[80%] drop-shadow-lg border-[1px] border-gray-400 z-50"
          >
            <div className="flex text-center justify-between text-[18px] font-bold">
              <span>Enter URI</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setAdd(false);
                }}
              >
                <CloseOutlinedIcon />
              </span>
            </div>
            <input
              value={uri}
              onChange={handleChange}
              className="py-[4px] outline-none border-b-[1px] border-b-gray-400"
              type="text"
              placeholder="URI"
              name="URI"
            />

            <button
              type="submit"
              className="rounded-md px-3 py-[3px] text-[18px] font-bold  bg-[#ff4343]  text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  

  const navigate = useNavigate();
  return (
    <div className="bg-white w-[100%] fixed top-0 z-10 shadow-md ">
      <div className="container w-[100%] px-[30px] py-4 mx-auto flex items-center justify-between">
        <div className="text-[26px]  font-bold  flex justify-center item-center">
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            uiTesting
          </span>
        </div>
        <div className=" flex gap-[5px] justify-center item-center">
            <button
              onClick={() => {
                setAdd(true);
              }}
              className="rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white"
            >
              Record
            </button>
          
            <button
              onClick={() => {
                replay();
              }}
              className="rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white"
            >
              Replay
            </button>
        </div>
      </div>
      {add && (
        <div className="fixed top-0 left-0 w-[100%] h-[100%]  z-50 bg-[#535151a2]">
          <AddURI setAdd={setAdd} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
