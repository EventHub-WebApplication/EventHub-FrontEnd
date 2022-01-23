import { Form } from "react-bootstrap";
import { Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const { logIn } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setErr("");
        e.preventDefault();
        try {
            await logIn(email, password)
            navigate("/home")
        }
        catch (err) {
            setErr(err.message);
        }
    }

    return (
        <>
            <div className="p-4 box" >
                <img className="logo" src="./image/eventHub.png" style={{width: "50%", height: "50%"}}></img>
                {err && <Alert variant="danger">{err}</Alert>}
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>อีเมล</Form.Label>
                        <Form.Control type="email" placeholder="กรอกอีเมล" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>รหัสผ่าน</Form.Label>
                        <Form.Control type="password" placeholder="กรอกรหัสผ่าน" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" style={{width: "100%", backgroundColor: "#532882"}}>
                        เข้าสู่ระบบ
                    </Button>
                    <hr />
                    <Link to="/registration" className="btn btn-success" style={{width: "100%", backgroundColor: "#8A2976", borderColor: "#8A2976"}}>สร้างบัญชีผู้ใช้</Link>
                </Form>
            </div>
        </>
    );
};

export default Login;