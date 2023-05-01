import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";


export default function Errors() {
  return (
    <Container>
      <Alert variant='warning' dismissible style={{justifyContent:"center"}}>
        Pokemon not found.
      </Alert>
    </Container>    
  )
}