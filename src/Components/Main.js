import React from "react";
// import MainSidebar from "./MainSidebar";
// import Card from "./Card";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useState } from "react";
import { useSelector } from "react-redux";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function Main() {

  const [data, setData] = useState([])
  window.addEventListener('message',(event)=>{
    console.log('Message received in web page ', event.data)
    if (event.data && event.data.type === 'FROM_EXTENSION'){
      const res = event.data.activities
      setData(res)

    }
  })


  const dummyData = [
    { type: "scroll", scrollTop: 227, scrollLeft: 0 },
    { type: "click", x: 822, y: 274, xPath: "//*[@id='searchInput']" },
    {
      type: "typing",
      xPath: "//*[@id='searchInput']",
      text: "Hi, How are you?",
    },
    {
      type: "click",
      x: 1141,
      y: 267,
      xPath: "//*[@id='search-form']/fieldset[1]/button[1]/i[1]",
    },
    { type: "scroll", scrollTop: 2, scrollLeft: 0 },
    { type: "scroll", scrollTop: 2023, scrollLeft: 0 },
    {
      type: "click",
      x: 350,
      y: 596,
      xPath:
        "//*[@id='mw-content-text']/div[2]/div[4]/ul[1]/1i[20]/div[1]/div[2]/div[1]/a[1]",
    },
    { type: "click", x: 1825, y: 124, xPath: "//*[@id='button3']" },
  ];

  return (
    <div className="mt-[72px]  flex flex-col">
      <div>
        <div>
          <div className=" p-5 text-xl font-bold">Activity Logs</div>
          <div className="flex flex-col gap-4">
            <div className="p-4">
              {data.map((event, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    Event {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 pb-2">Type: {event.type}</p>
                  {event.type === "scroll" && (
                    <div className="">
                      <p className="text-sm">Scroll Top: {event.scrollTop}</p>
                      <p className="text-sm">Scroll Left: {event.scrollLeft}</p>
                    </div>
                  )}
                  {event.type === "click" && (
                    <div className="">
                      <p className="text-sm">X: {event.x}</p>
                      <p className="text-sm">Y: {event.y}</p>
                      <p className="text-sm">XPath: {event.xPath}</p>
                    </div>
                  )}
                  {event.type === "typing" && (
                    <div className="">
                      <p className="text-sm">XPath: {event.xPath}</p>
                      <p className="text-sm">Text: {event.text}</p>
                    </div>
                  )}
                  {event.type === 'assert' && (
                    <div className="">
                      <p className="text-sm">XPath : {event.xPath}</p>
                      <p className="text-sm">x: {event.x}</p>
                      <p className="text-sm">y: {event.y}</p>
                      </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
