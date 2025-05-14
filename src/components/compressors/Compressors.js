import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Carousel, Image } from "react-bootstrap";
import qrCode from "../../assets/QRCode.png";
import ControlledCarousel from "./ControlledCarousel";

const Compressors = () => {
  const [compressors, setCompressors] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCompressors = async () => {
      try {
        const response = await axiosPrivate.get("/com-factory/list", {
          signal: controller.signal,
        });
        isMounted && setCompressors(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getCompressors();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleStatusChange = async (serialNumber, newStatus) => {
    try {
      await axiosPrivate.patch(
        `/com-factory/scanFactoryQR/${serialNumber}/scanned`,
        {
          status: newStatus,
        }
      );
      setCompressors((prev) =>
        prev.map((comp) =>
          comp.serialNumber === serialNumber
            ? { ...comp, status: newStatus }
            : comp
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <Container className="mt-4">
      <ControlledCarousel />
    </Container>
  );
};

export default Compressors;
