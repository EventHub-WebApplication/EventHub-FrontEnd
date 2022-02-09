import { useUserAuth } from "./Auth";
import { Navbar, Nav, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import MyCard2 from "./CardJoined"
import MyCard3 from "./CardPaticipated"
import Loader from "./Loader";


const MyEvent = () => {

    const { user } = useUserAuth();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const response = await axios.get("https://sheltered-tundra-26707.herokuapp.com/ownedEvent/" + user.email);
        setData(response.data);
        const response2 = await axios.get("https://sheltered-tundra-26707.herokuapp.com/paticipatedEvent/" + user.email);
        setData2(response2.data);
        console.log(response2.data);
        setLoading(false);
    }, [user.email]);

    function createCard(json) {
        return (
            <div>
                <MyCard2
                    pat={json.paticipant}
                    id={json.eventId}
                    name={json.eventName}
                    amount={json.amount}
                    owner={json.owner}
                    cat={json.categories}
                />
                <p></p>
            </div>
        );

    }

    function createCard1(json) {

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
            <div>
                <MyCard3
                    pat={json.paticipant}
                    id={json.eventId}
                    name={json.eventName}
                    image={img}
                    amount={json.amount}
                    owner={json.owner}
                    cat={json.categories}
                />
                <p></p>
            </div>
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

            <div className="p-6 box" style={{ marginTop: "7%", marginBottom: "5%" }}>
                <h3 style={{ textAlign: "center" }}>ปาร์ตี้ที่สร้างแล้ว</h3>
                <hr />
                <div>
                    {loading ? <Loader /> : data.map(createCard)}
                    {(data.length === 0 && !loading) && <h5 style={{ textAlign: "center" }}>คุณยังไม่มีปาร์ตี้ที่สร้าง</h5>}
                </div>
            </div>
            <div className="p-6 box" style={{ marginBottom: "5%" }}>
                <h3 style={{ textAlign: "center" }}>เข้าร่วมแล้ว</h3>
                <hr />
                <div>
                    {loading ? <Loader /> : data2.map(createCard1)}
                    {(data2.length === 0 && !loading) && <h5 style={{ textAlign: "center" }}>คุณยังไม่มีปาร์ตี้ที่เข้าร่วม</h5>}
                </div>
            </div>
            <Card className="text-center">
                <Card.Header>EventHub</Card.Header>
                <Card.Body>
                    <Card.Text style={{ color: "grey" }}>
                        พัฒนาโดย
                    </Card.Text>
                    <Card.Title>สรุจ สัตยานุรักษ์</Card.Title>
                    <Card.Text>
                        อีเมล jomsaruj@gmail.com - โทร 098-9107588
                    </Card.Text>
                    <p></p>
                </Card.Body>
                <Card.Footer className="text-muted">นำเสนอ SCB10X</Card.Footer>
            </Card>

        </>
    )
}

export default MyEvent;
