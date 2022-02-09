import React, { useEffect } from 'react';
import { Button, Card, Badge } from "react-bootstrap";
import { useUserAuth } from "./Auth";
import { useState } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import Aos from 'aos';

function MyCard3(prop) {
  const { user } = useUserAuth();
  const [join, setJoin] = useState(null);

  useEffect(async () => {
    if (prop.pat.includes(user.email)) {
      setJoin(true);
    }
    else {
      setJoin(false)
    }
  }, [prop.pat, user.email])


  const handleJoin = async (e) => {
    const url = "https://sheltered-tundra-26707.herokuapp.com/events/" + prop.id + "/join/" + user.email;
    axios.patch(url);
    alert("กด OK เพื่อยืนยันเข้าร่วมปาร์ตี้ " + prop.name)
    window.location.reload(false);
  }

  const handleCancel = async (e) => {
    const url = "https://sheltered-tundra-26707.herokuapp.com/events/" + prop.id + "/cancel/" + user.email;
    axios.patch(url);
    alert("กด OK เพื่อยกเลิกการเข้าร่วมปาร์ตี้ " + prop.name)
    window.location.reload(false);
  }
  useEffect(() => {
    Aos.init({duration: 2000});
  }, [])


  return <Card style={{ width: '100%', marginTop: '2%'}} data-aos="fade-up">
    <Card.Img src={prop.image} style={{marginTop: "1.5%", width: "100%", height: "100%"}}/>
    <Card.Body>
      <Badge bg="secondary mb-3">{prop.cat}</Badge>
      <Card.Title>{prop.name}</Card.Title>
      <Card.Text>
        ผู้สร้างปาร์ตี้: {prop.owner}
      </Card.Text>
      <Card.Text>
        จำนวนคนที่ขาด: {prop.amount}
      </Card.Text>
      {join ? <Button variant="danger" onClick={handleCancel}>ยกเลิก</Button> : <Button variant="primary" onClick={handleJoin}>เข้าร่วม</Button>}
    </Card.Body>
  </Card>
}


export default MyCard3;