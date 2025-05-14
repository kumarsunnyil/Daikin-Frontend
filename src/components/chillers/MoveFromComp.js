import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Image } from "react-bootstrap";
import qrCode from '../../assets/QRCode.png'

const MoveFromComp = () => {
  const [compressors, setCompressors] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
 
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCompressors = async () => {
      try {
        const response = await axiosPrivate.get("/com-factory/scanned", {
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

      await axiosPrivate.patch(`/com-factory/scanFactoryQR/${serialNumber}/scanned`, {
        status: newStatus,
      });
      setCompressors((prev) =>
        prev.map((comp) =>
          comp.serialNumber === serialNumber ? { ...comp, status: newStatus } : comp
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (

    <Container className="mt-4">
      <h2 className="mb-3">Compressors Ready for movement fdfd</h2>
      <Row>
        {console.log(compressors)}
        {compressors.length ? (
          compressors.map((comp) => (
            <Col key={comp._id} xs={12} sm={6} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{comp.name || "Unnamed Compressor"}</Card.Title>
                  <Card.Text>Serial-Number: {comp.serialNumber}</Card.Text>
                  <Image
                    src={qrCode}
                    thumbnail
                    width={50}
                    height={50}
                    className="mb-2"
                  />
                  <Form.Group controlId={`status-${comp._id}`}>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={comp.status || ""}
                      onChange={(e) =>
                        handleStatusChange(comp.serialNumber, e.target.value)
                      }
                    >
                      <option value="">Select Status</option>
                      <option value="SCANNED" selected>To Storage</option>
                      <option value="SCANN_TO_MOVE">Scan To Move Storage</option>
                      <option value="MAINTENANCE">Maintenance</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No compressors found.</p>
        )}
      </Row>
    </Container>
    

  );
};

export default MoveFromComp;
