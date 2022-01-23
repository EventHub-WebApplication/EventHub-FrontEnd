import { useUserAuth } from "./Auth";
import React from "react";
import axios from "axios";
import { Button, Navbar, Form, Alert, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom"
import { useState } from "react";

const qs = require('qs');

const NewEvent = () => {
    const { logOut, user } = useUserAuth();
    const [err, setErr] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleCreate = async (e) => {
        if (name === "" || amount === "" || category === "") {
            setErr("กรุณาใส่ข้อมูลให้ครบถ้วน")
            e.preventDefault();
        }
        else {
            await axios.post('/events', qs.stringify({ eventId: Date.now(), eventName: name, amount: amount, owner: user.email, categories: category, paticipant: [] }))
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            navigate("/home");
        }

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
            <div className="p-4 box" >
                <h3 style={{ textAlign: "center" }}>สร้างปาร์ตี้</h3>
                <hr />
                {err && <Alert variant="danger">{err}</Alert>}
                <Form>
                    <Form.Group className="mb-3 mt-4" maxLength="16" controlId="formBasicEmail">
                        <Form.Label>ชื่อปาร์ตี้</Form.Label>
                        <Form.Control type="text" placeholder="ใส่ชื่อปาร์ตี้ของคุณ" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>จำนวนคน</Form.Label>
                        <Form.Control type="text" placeholder="ใส่จำนวนคน" onChange={(e) => setAmount(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="disabledSelect">ประเภทของปาร์ตี้</Form.Label>
                        <Form.Select id="disabledSelect" onChange={(e) => setCategory(e.target.value)}>
                            <option value="">ประเภท</option>
                            <option value="ดนตรี">ดนตรี</option>
                            <option value="อาหาร">อาหาร</option>
                            <option value="สัมมนา">สัมมนา</option>
                            <option value="เครื่องยนต์">เครื่องยนต์</option>
                            <option value="สังสรรค์">สังสรรค์</option>
                            <option value="สัตว์เลี้ยง">สัตว์เลี้ยง</option>
                            <option value="ภาพยนตร์">ภาพยนตร์</option>
                        </Form.Select>
                    </Form.Group>

                    <Button onClick={handleCreate} style={{ width: "100%", backgroundColor: "#532882", borderColor: "#532882" }}>สร้าง</Button>
                    <p></p>
                    <Link to="/home" className="btn btn-danger" style={{ width: "100%", backgroundColor: "black", borderColor: "black"}}>กลับหน้าหลัก</Link>

                </Form>
            </div>
        </>
    );
};

export default NewEvent;