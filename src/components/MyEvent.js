import { useUserAuth } from "./Auth";
import { Button, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import MyCard2 from "./Card2"
import MyCard from "./Card"


const MyEvent = () => {

    const { user } = useUserAuth();
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const response = await axios.get("/ownedEvent/" + user.email);
        setData(response.data);
        const response2 = await axios.get("/paticipatedEvent/" + user.email);
        setData2(response2.data);
        console.log(response2.data);
        setLoading(false);
    }, [user.email]);

    function createCard(json) {
        return (
            <MyCard2
                pat={json.paticipant}
                id={json.eventId}
                name={json.eventName}
                amount={json.amount}
                owner={json.owner}
                cat={json.categories}
            />
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
                        <Navbar.Brand href="/home">EventHub</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <div>
                                <Button variant="danger" onClick={handleSubmit}>
                                    ออกจากระบบ
                                </Button>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className="container">
                <h1>ปาร์ตี้ที่สร้างแล้ว</h1>
                <div className="mt-4">
                    {loading ? <div>Loading....</div> : data.map(createCard)}
                    {(data.length === 0 && !loading) && <h5>คุณยังไม่มีปาร์ตี้ที่สร้าง</h5>}
                </div>
            </div>
            <div className="container mt-5">
                <h1>เข้าร่วมแล้ว</h1>
                <div className="mt-4">
                    {loading ? <div>Loading....</div> : data2.map(createCard1)}
                    {(data2.length === 0 && !loading) && <h5>คุณยังไม่มีปาร์ตี้ที่เข้าร่วม</h5>}
                </div>
            </div>

        </>
    )
}

export default MyEvent;
