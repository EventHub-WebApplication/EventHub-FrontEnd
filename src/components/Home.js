import { useUserAuth } from "./Auth";
import React from "react";
import { Button, Navbar, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


const Home = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#">EventHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <div >
                    <Button variant="danger" onClick={handleSubmit}>ออกจากระบบ</Button>
                </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>

      <div className="d-grid gap-2">
        <Link to="/new" className="btn btn-warning">สร้างปาร์ตี้</Link>
      </div>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>TTTTTTTTTTTTTTTT</Card.Title>
                <Card.Text>
                ที่ว่างที่เหลือ: 
                </Card.Text>
                <Button variant="primary">เข้าร่วม</Button>
            </Card.Body>
        </Card>

    </>
  );
};

export default Home;