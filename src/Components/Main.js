import React from "react";
import { useState } from "react";

function Main() {
    const [data, setData] = useState([]);
    window.addEventListener("message", (event) => {
        console.log("Message received in web page ", event.data);
        if (event.data && event.data.type === "FROM_EXTENSION") {
            const res = event.data.activities;
            setData(res);
        }
    });

    const dummyData = [
        { type: "scroll", scrollTop: 227, scrollLeft: 0 },
        {
            type: "click",
            x: 822,
            y: 274,
            xPath: "//*[@id='searchInput']",
            boundingRect:
                "data:image/png;base64,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",
        },
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
            boundingRect:
                "data:image/png;base64,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",
        },
        { type: "scroll", scrollTop: 2, scrollLeft: 0 },
        { type: "scroll", scrollTop: 2023, scrollLeft: 0 },
        {
            type: "click",
            x: 350,
            y: 596,
            xPath: "//*[@id='mw-content-text']/div[2]/div[4]/ul[1]/1i[20]/div[1]/div[2]/div[1]/a[1]",
            boundingRect:
                "data:image/png;base64,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",
        },
        {
            type: "click",
            x: 1825,
            y: 124,
            xPath: "//*[@id='button3']",
            boundingRect:
                "data:image/png;base64,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",
        },
    ];

    return (
        <div className="mt-[72px]  flex flex-col">
            <div>
                <div>
                    <div className=" p-5 text-xl font-bold">Activity Logs</div>
                    <div className="flex flex-col gap-4">
                        <div className="p-4">
                            {/* {data.map((event, index) => (
                                <div
                                    key={index}
                                    className="mb-4 p-4 border border-gray-200 rounded-lg shadow-md"
                                >
                                    <h3 className="text-lg font-semibold mb-2">
                                        {index + 1}: {event.type} event
                                    </h3>
                                    <p className="text-sm text-gray-600 pb-2">
                                        Type: {event.type}
                                    </p>
                                    {event.type === "scroll" && (
                                        <div className="">
                                            <p className="text-sm">
                                                Scroll Top: {event.scrollTop}
                                            </p>
                                            <p className="text-sm">
                                                Scroll Left: {event.scrollLeft}
                                            </p>
                                        </div>
                                    )}
                                    {event.type === "click" && (
                                        <div className="">
                                            <p className="text-sm">
                                                X: {event.x}
                                            </p>
                                            <p className="text-sm">
                                                Y: {event.y}
                                            </p>
                                            <p className="text-sm">
                                                XPath: {event.xPath}
                                            </p>
                                            <img
                                                src={event.screenshot}
                                                alt="Click"
                                            />
                                        </div>
                                    )}
                                    {event.type === "typing" && (
                                        <div className="">
                                            <p className="text-sm">
                                                XPath: {event.xPath}
                                            </p>
                                            <p className="text-sm">
                                                Text: {event.text}
                                            </p>
                                        </div>
                                    )}
                                    {event.type === "assert" && (
                                        <div className="">
                                            <p className="text-sm">
                                                XPath : {event.xPath}
                                            </p>
                                            <p className="text-sm">
                                                x: {event.x}
                                            </p>
                                            <p className="text-sm">
                                                y: {event.y}
                                            </p>
                                            <img
                                                src={event.screenshot}
                                                alt="Click"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))} */}
                            {data.map((event, index) =>
                                event.type === "network" ? (
                                    <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-white">
                                        <div>
                                            {index + 1}: Network Request :{" "}
                                            <p className="text-gray-500">
                                                {event.url}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={index}
                                        className="mb-6 p-6 border border-gray-200 rounded-lg shadow-lg bg-white"
                                    >
                                        <h3 className="text-xl font-bold mb-4 text-blue-600">
                                            {index + 1}:{" "}
                                            {event.type
                                                .charAt(0)
                                                .toUpperCase() +
                                                event.type.slice(1)}{" "}
                                            Event
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            <span className="font-semibold">
                                                Type:
                                            </span>{" "}
                                            {event.type}
                                        </p>
                                        {event.type === "scroll" && (
                                            <div className="text-gray-700">
                                                <p className="text-sm mb-2">
                                                    <span className="font-semibold">
                                                        Scroll Top:
                                                    </span>{" "}
                                                    {event.scrollTop}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-semibold">
                                                        Scroll Left:
                                                    </span>{" "}
                                                    {event.scrollLeft}
                                                </p>
                                            </div>
                                        )}
                                        {event.type === "click" && (
                                            <div className="text-gray-700">
                                                <p className="text-sm mb-2">
                                                    <span className="font-semibold">
                                                        X:
                                                    </span>{" "}
                                                    {event.x}
                                                </p>
                                                <p className="text-sm mb-2">
                                                    <span className="font-semibold">
                                                        Y:
                                                    </span>{" "}
                                                    {event.y}
                                                </p>
                                                <p className="text-sm mb-4">
                                                    <span className="font-semibold">
                                                        XPath:
                                                    </span>{" "}
                                                    {event.xPath}
                                                </p>
                                                <p className="text-sm mb-4">
                                                    <span className="font-semibold">
                                                        Other Properties:
                                                    </span>{" "}
                                                    {Object.keys(
                                                        event.otherProperties
                                                    ).map((key) => (
                                                        <span key={key}>
                                                            {/* Display key and value */}
                                                            {key}:{" "}
                                                            {
                                                                event
                                                                    .otherProperties[
                                                                    key
                                                                ]
                                                            }{" "}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </p>
                                                <img
                                                    src={event.screenshot}
                                                    alt="Click"
                                                    className="w-full h-[5rem] object-contain "
                                                    // className="w-full h-auto max-h-64 object-contain border border-gray-300 rounded-md"
                                                />
                                            </div>
                                        )}
                                        {event.type === "typing" && (
                                            <div className="text-gray-700">
                                                <p className="text-sm mb-2">
                                                    <span className="font-semibold">
                                                        XPath:
                                                    </span>{" "}
                                                    {event.xPath}
                                                </p>
                                                <p className="text-sm">
                                                    <span className="font-semibold">
                                                        Text:
                                                    </span>{" "}
                                                    {event.text}
                                                </p>
                                            </div>
                                        )}
                                        {event.type === "assert" && (
                                            <div className="text-gray-700">
                                                <p className="text-sm mb-2">
                                                    <span className="font-semibold">
                                                        XPath:
                                                    </span>{" "}
                                                    {event.xPath}
                                                </p>
                                                <p className="text-sm mb-2">
                                                    <span className="font-semibold">
                                                        X:
                                                    </span>{" "}
                                                    {event.x}
                                                </p>
                                                <p className="text-sm mb-4">
                                                    <span className="font-semibold">
                                                        Y:
                                                    </span>{" "}
                                                    {event.y}
                                                </p>
                                                <p className="text-sm mb-4">
                                                    <span className="font-semibold">
                                                        Other Properties:
                                                    </span>{" "}
                                                    {Object.keys(
                                                        event.otherProperties
                                                    ).map((key) => (
                                                        <span key={key}>
                                                            {/* Display key and value */}
                                                            {key}:{" "}
                                                            {
                                                                event
                                                                    .otherProperties[
                                                                    key
                                                                ]
                                                            }{" "}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </p>

                                                <img
                                                    src={event.screenshot}
                                                    alt="Assert"
                                                    className="w-full h-[5rem] object-contain  "
                                                    // className="w-full h-auto max-h-64 object-contain border border-gray-300 rounded-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
