import { useUserAuth } from "./Auth";
import React from "react";
import { Button, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MyCard from "./Card"


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="mb-5">
        <Navbar bg="light">
          <Container>
            <Navbar.Brand href="#">EventHub</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <div>
                <Button variant="danger" onClick={handleSubmit}>
                  ออกจากระบบ
                </Button>
                <Link to="/myevent" className="btn btn-primary">ปาร์ตี้ของฉัน</Link>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="container">
        <div className="d-grid gap-2">
          <Link to="/new" className="btn btn-warning">
            สร้างปาร์ตี้
          </Link>
        </div>
        <div className="mt-4">
          {loading ? <div>Loading....</div> : data.map(createCard)}
        </div>
      </div>
    </>
  );
};

export default Home;