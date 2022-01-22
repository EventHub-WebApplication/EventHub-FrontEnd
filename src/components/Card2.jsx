import { Card, Badge, Button } from "react-bootstrap";
import axios from "axios";



function MyCard2(prop) {

    const handleDelete = async (e) => {
        const url = "/events/" + prop.id;
        axios.delete(url);
        alert("กด OK เพื่อยืนยัน")
        window.location.reload(false);
    }

    return <Card>
        <Card.Body>
            <Badge bg="secondary mb-3">{prop.cat}</Badge>
            <Card.Title>{prop.name}</Card.Title>
            <Card.Text>
                จำนวนคนที่ขาด: {prop.amount} คน
            </Card.Text>
            <Card.Text>
                เข้าร่วมแล้ว: {prop.pat.length} คน
            </Card.Text>
        </Card.Body>
        <Button variant="danger" onClick={handleDelete}>ลบปาร์ตี้</Button>
    </Card>
}

export default MyCard2;

