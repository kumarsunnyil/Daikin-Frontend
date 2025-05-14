import { useState } from "react";
import { jsPDF } from "jspdf";
// import axiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const SerialNumberList = ({ data = [], locationId }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const [selectedSerials, setSelectedSerials] = useState([]);

  const isAllSelected =
    data?.length > 0 && selectedSerials.length === data.length;

  const handleCheckboxChange = (serialNumber) => {
    const normalized = serialNumber.toString();
    setSelectedSerials((prev) =>
      prev.includes(normalized)
        ? prev.filter((sn) => sn !== normalized)
        : [...prev, normalized]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedSerials([]);
    } else {
      const allSerials = data.map((item) => item.serialNumber.toString());
      setSelectedSerials(allSerials);
    }
  };

  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleExportToPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(14);

    // Title of the document
    doc.text("Selected Compressor Details", 10, 10);

    // Headers
    doc.setFontSize(12); // Optional: you can make the header font size smaller
    doc.text("Serial Number", 10, 20); // First column header
    //   doc.text("Pick Loc Name", 50, 20); // Second column header
    doc.text("Pick Location ID", 50, 20); // Third column header
    doc.text("SerialNumber QR", 90, 20); // Third column header
    doc.text("loc QR", 130, 20); // Fourth column header

    try {
      const response = await axiosPrivate.post(
        "/com-factory/compressors/details",
        { serialNumbers: selectedSerials }
      );

      const compressorDetails = response.data;

      // Adjust starting point for each row below the header
      compressorDetails.forEach((item, index) => {
        const y = 30 + index * 30; // Start below headers
        doc.text(`${item.serialNumber}`, 10, y);
        //   doc.text(`${item.name}`, 50, y);
        doc.text(`${item.location}`, 50, y);

        if (item.qrSerial) {
          doc.addImage(item.qrSerial, "PNG", 90, y - 5, 30, 30); // Serial QR
        }
        if (item.qrLocation) {
          doc.addImage(item.qrLocation, "PNG", 120, y - 5, 30, 30); // Location QR
        }
      });

      doc.save("compressor-details.pdf");
    } catch (err) {
      console.error("Error exporting to PDF:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>
              {locationId !== "C" ? (
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              ) : (
                <span> </span>
              )}
            </th>
            <th>Location</th>
            <th>Serial Number</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item) => {
              const normalized = item.serialNumber.toString();
              return (
                <tr key={normalized}>
                  <td>
                    {locationId !== "C" && (
                      <input
                        type="checkbox"
                        checked={selectedSerials.includes(normalized)}
                        onChange={() => handleCheckboxChange(normalized)}
                      />
                    )}
                  </td>
                  <td>{item.location}</td>
                  <td>{normalized}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      {locationId !== "C" && (
        <div>
          <label htmlFor="userSelect">Select user Assign to user: </label>
          <select id="userSelect" value={selectedUser} onChange={handleChange}>
            <option value="">-- Choose User --</option>
            <option value="user1">Alice</option>
            <option value="user2">Bob</option>
            <option value="user3">Charlie</option>
            <option value="user4">Diana</option>
          </select>
          <button
            onClick={handleExportToPDF}
            disabled={selectedSerials.length === 0}
            style={{ marginTop: "10px", width: "300px" }}
          >
            Print Picklist to PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default SerialNumberList;
