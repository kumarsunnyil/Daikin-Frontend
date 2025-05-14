import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import userImage from "../../assets/user.png";
import "./profile.css";

function ProfileImage() {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image
            src={userImage}
            width={150}
            height={175}
            className="avatar"
            thumbnail
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileImage;
