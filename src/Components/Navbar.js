import React from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../Redux/user/userAction";
import { useDispatch } from "react-redux";
import { fetchHistory } from "../Redux/history/historyAction";
import showToast from "../showToast";
import { useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const Navbar = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    window.postMessage({ type: 'FROM_PAGE', payload: { type: message } }, '*');
  }


  const replay=()=>{
    sendMessageToExtension_replay('start_replaying')
  }

  const handleChange=(e)=>{
    e.preventDefault();
    setUri(e.target.value)
  }

  function RecordingInput() {
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col gap-2">
              <div className="">Enter URI</div>
             
              <input
                value={uri}
                onChange={handleChange}
                className="py-[4px] outline-none border-b-[1px] border-b-gray-400"
                type="text"
                placeholder="URI"
                name="URI"
              />
              <button
                onClick={() => {
                  handleClose();
                  callExtension();
                }}
                className="rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]   font-bold  bg-[#ff4343]  text-white"
              >
                Submit
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

  const { loader } = useSelector((store) => {
    return store.loader;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
    dispatch(updateUser());
    showToast({
      msg: "Successfully logged out",
      type: "success",
    });
  };
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
          {localStorage.getItem("token") !== null && (
            <button
              onClick={() => {
                handleOpen();
              }}
              className="rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white"
            >
              Record
            </button>
          )}
          {localStorage.getItem("token") !== null && (
            <button onClick={()=>{replay()}} className="rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white">
              Replay
            </button>
          )}
          {localStorage.getItem("token") !== null && (
            <button
              className="rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white"
              onClick={() => {
                navigate("/history");
                dispatch(fetchHistory());
              }}
            >
              History
            </button>
          )}
          {localStorage.getItem("token") !== null ? (
            <button
              className="rounded-md px-3 py-[2px] text-[13px] sm:text-[17px]  font-bold  bg-[#ff4343]  text-white"
              onClick={logoutHandler}
            >
              LogOut
            </button>
          ) : (
            <button
              className="rounded-md px-3 py-[3px] text-[18px] font-bold  bg-[#ff4343]  text-white"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
      <div>{loader && <LinearProgress color="primary" />}</div>
      <RecordingInput />
    </div>
  );
};

export default Navbar;
