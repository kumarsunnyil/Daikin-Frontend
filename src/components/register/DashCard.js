import Card from 'react-bootstrap/Card';
import './dashcard.css'

function DashCard() {
  return (
    <div className="card-center">
    <Card style={{ width: '20rem', height:'200px' }}>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>
  </div>
  );
}

export default DashCard;