import { useUserAuth } from "./Auth";
import React from "react";
import { Navbar, Nav, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MyCard from "./Card";
import Loader from "./Loader";



const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(4);

  useEffect(async () => {
    const response = await axios.get("/events");
    setData(response.data);
    setLoading(false);
    console.log(response.data);
  }, []);

  function createCard(json) {

    let img = "";
    if (json.categories === "ดนตรี") {
      img = "./image/music.jpeg"
    }
    else if (json.categories === "อาหาร") {
      img = "./image/food.jpeg"
    }
    else if (json.categories === "สัมมนา") {
      img = "./image/saminar.jpeg"
    }
    else if (json.categories === "เครื่องยนต์") {
      img = "./image/car.jpeg"
    }
    else if (json.categories === "สังสรรค์") {
      img = "./image/party.png"
    }
    else if (json.categories === "สัตว์เลี้ยง") {
      img = "./image/animal.png"
    }
    else if (json.categories === "ภาพยนตร์") {
      img = "./image/movie.png"
    }

    return (
      <MyCard
        pat={json.paticipant}
        id={json.eventId}
        name={json.eventName}
        image={img}
        amount={json.amount}
        owner={json.owner}
        cat={json.categories}
      />
    );
  }


  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadMore = async () => {
    setVisible((prevValue) => prevValue + 4);
  };

  return (
    <>
      <Navbar bg="white" className="MyNav" fixed="top">
        <Navbar.Brand href="/home" style={{ marginLeft: "6.7%" }}>
          EventHub
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/myevent">ปาร์ตี้ของฉัน</Nav.Link>
          <Nav.Link href="/new">สร้างปาร์ตี้</Nav.Link>
          <Nav.Link onClick={handleSubmit}>ออกจากระบบ</Nav.Link>
        </Nav>
      </Navbar>
      <div className="container" style={{ width: "88%" }}>
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="row">
            <Link to="/new" className="btn btn-outline-info">สร้างปาร์ตี้</Link></div>
        </div>

        <div className="container" style={{ marginBottom: "5%" }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            {loading ? <Loader /> : data.slice(0,visible).map(createCard)}
            {loading ? <div></div> : <Button variant="info" type="submit" style={{width: "100%", marginTop: "3%"}} onClick={loadMore}>โหลดเพิ่ม</Button>}
          </div>
        </div>
      </div>
      <Card className="text-center">
        <Card.Header>EventHub</Card.Header>
        <Card.Body>
          <Card.Title>สรุจ สัตยานุรักษ์</Card.Title>
          <Card.Text>
            นิสิตชั้นปีที่ 3 คณะวิศวกรรมซอฟท์แวร์และความรู้ นานาชาติ มหาวิทยาลัยเกษตรศาสตร์
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">นำเสนอ SCB10X</Card.Footer>
      </Card>
    </>
  );
};

export default Home;