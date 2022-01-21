import { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState("");
  const [passwordcon, setPasswordCon] = useState("");
  const [err, setErr] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      if(!consent){
        setErr("กรุณายอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งานก่อนการสร้างบัญชี")
        e.preventDefault();
      }
      else if (passwordcon != password){
          setErr("ยืนยันรหัสผ่านล้มเหลว")
          e.preventDefault();
      }
      else{
        setErr("");
        e.preventDefault();
        try{
            await signUp(email, password)
            navigate("/");
        }
        catch(err){
            setErr(err.message);
        }
    }
  }
  return (
    <>
        <h1>สร้างบัญชีผู้ใช้</h1>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>อีเมล</Form.Label>
                <Form.Control type="email" placeholder="กรอกอีเมล" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control type="password" placeholder="กรอกรหัสผ่าน" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <Form.Label>ยืนยันรหัสผ่าน</Form.Label>
                <Form.Control type="password" placeholder="กรอกรหัสผ่านอีกครั้ง" onChange={(e) => setPasswordCon(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน" onChange={(e) => setConsent(e.target.value)}/>
            </Form.Group>
            <Button variant="success" type="submit">
                สร้างบัญชีผู้ใช้
            </Button>
            <p></p>
            <Link to="/" className="btn btn-danger"> กลับหน้าแรก</Link>
        </Form>
    </>
  );
};

export default Registration;