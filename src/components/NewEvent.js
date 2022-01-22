import { useUserAuth } from "./Auth";
import React from "react";
import axios from "axios";
import { Button, Navbar, Container, Form, Alert } from "react-bootstrap";
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

    const handleCreate = async () => {
        if (name === "" || amount === null || category === "") {
            setErr("กรุณาใส่ข้อมูลให้ครบถ้วน")
        }
        else {
            await axios.post('/events', qs.stringify({ eventId: Date.now(), eventName: name, amount: amount, owner: user.email, categories: category, paticipant: [] }))
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        navigate("/home");
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">EventHub</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <div >
                            <Button variant="danger" onClick={handleSubmit}>ออกจากระบบ</Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <h3 className="mt-5">สร้างปาร์ตี้</h3>
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
                <div className="mt-3">
                    <Button variant="warning" onClick={handleCreate}>สร้าง</Button>
                    <Link to="/home" className="btn btn-danger">กลับหน้าหลัก</Link>
                </div>


            </Form>
        </>
    );
};

export default NewEvent;