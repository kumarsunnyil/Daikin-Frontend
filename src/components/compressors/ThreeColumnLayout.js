import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThreeColumnLayout.css"; // We'll define styling here
import SerialNumberList from "./SerialNumberList";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const ThreeColumnLayout = () => {
  const [users, setUsers] = useState();
  const [locAserialNumbers, setLocASerialNumbers] = useState([]);
  const [locBserialNumbers, setLocBSerialNumbers] = useState([]);
  const [locCserialNumbers, setLocCSerialNumbers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReadyCompressors = async (locPrefix) => {
      try {
        const response = await axiosPrivate.post(
          "/com-factory/allcompressors", // Your endpoint
          { prefixes: [locPrefix] }, // Send the prefixes in the request body
          {
            signal: controller.signal, // Keep the abort controller in place
          }
        );
        console.log("Data from URL", response.data);
        isMounted && setUsers(response.data);
        if (locPrefix === "A") setLocASerialNumbers(response.data);
        if (locPrefix === "B") setLocBSerialNumbers(response.data);
        if (locPrefix === "C") setLocCSerialNumbers(response.data);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getReadyCompressors("A");
    getReadyCompressors("B");
    getReadyCompressors("C");

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="three-column-layout">
      <div className="column left">
        <div>
          <h4>Compressor Factory- (Loc - A)</h4>
          <div>
            <SerialNumberList data={locAserialNumbers} />
          </div>
        </div>
      </div>
      <div className="column center">
        <div>
          <h3>Compressor Storage Area- (Loc - A)</h3>
          <div>
            <SerialNumberList data={locBserialNumbers} />
          </div>
        </div>
      </div>
      <div className="column right">
        <div>
          <h3>Chiller Factory- (Loc - C)</h3>
          <div>
            <SerialNumberList data={locCserialNumbers} locationId = "C" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnLayout;
