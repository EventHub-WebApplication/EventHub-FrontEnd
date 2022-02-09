import React, { useEffect } from 'react';
import { Button, Card, Badge } from "react-bootstrap";
import { useUserAuth } from "./Auth";
import { useState } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import Aos from 'aos';

function MyCard(prop) {
  const { user } = useUserAuth();
  const [join, setJoin] = useState(null);
  const [message, setMessage] = useState("เข้าร่วม");
  const [type, setType] = useState("primary");


  useEffect(async () => {
    if (prop.amount <= 0) { setMessage("เต็ม"); setType("warning") }
    if (prop.pat.includes(user.email)) {
      setJoin(true);
    }
    else {
      setJoin(false)
    }
  }, [prop.pat, user.email])


  const handleJoin = async (e) => {
    if (prop.amount > 0) {
      const url = "https://sheltered-tundra-26707.herokuapp.com/events/" + prop.id + "/join/" + user.email;
      const response = await axios.patch(url);
      if (response.data === "Event is already full") {
        alert("ไม่สามารถเข้าร่วมเนื่องจากปาร์ตี้เต็มแล้ว");
        window.location.reload(false);
      }
      else {
        alert("กด OK เพื่อยืนยันเข้าร่วมปาร์ตี้ " + prop.name)
        window.location.reload(false);
      }
    }
    else {
      alert("ไม่สามารถเข้าร่วมเนื่องจากปาร์ตี้เต็มแล้ว")
    }
  }

  const handleCancel = async (e) => {
    const url = "https://sheltered-tundra-26707.herokuapp.com/events/" + prop.id + "/cancel/" + user.email;
    axios.patch(url);
    alert("กด OK เพื่อยกเลิกการเข้าร่วมปาร์ตี้ " + prop.name)
    window.location.reload(false);
  }
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])


  return <Card style={{ width: '49%', marginTop: '2%' }} data-aos="fade-up">
    <Card.Img src={prop.image} style={{ marginTop: "1.5%", width: "100%", height: "100%" }} />
    <Card.Body>
      <Badge bg="secondary mb-3">{prop.cat}</Badge>
      <Card.Title>{prop.name}</Card.Title>
      <Card.Text>
        ผู้สร้างปาร์ตี้: {prop.owner}
      </Card.Text>
      <Card.Text>
        จำนวนคนที่ขาด: {prop.amount}
      </Card.Text>
      {join ? <Button variant="danger" onClick={handleCancel}>ยกเลิก</Button> : <Button variant={type} onClick={handleJoin}>{message}</Button>}
    </Card.Body>
  </Card>
}


export default MyCard;