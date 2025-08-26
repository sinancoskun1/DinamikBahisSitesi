import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import gamblingSvg from "../assets/gambling.svg";
import liveStreamingSvg from "../assets/live-streaming.svg";
import onlineFootballSvg from "../assets/online-football.svg";
import commentSvg from "../assets/comment.Svg";
import basketbolSvg from "../assets/basketball.Svg";
import footballSvg from "../assets/football.Svg";
import recSvg from "../assets/rec.svg";

export default function Menu() {
  return (
    <Row className="g-0 flex-nowrap overflow-auto">
      {[
        { to: "/Bultenpage", label: "Bülten", icon: gamblingSvg },
        { to: "/commentPage", label: "Futbol", icon: footballSvg },
        { to: "/commentPage", label: "Basketbol", icon: basketbolSvg },
        { to: "/Sonuclarpage", label: "Sonuçlar", icon: liveStreamingSvg },
        { to: "/OnlineFootballPage", label: "Canlı Maçlar", icon: onlineFootballSvg },
        { to: "/commentPage", label: "Tahminci Yorumları", icon: commentSvg },
        { to: "/commentPage", label: "Canlı TV", icon: recSvg, redText:true }
      ].map((item, index) => (
        <Col key={index} xs={6} md={3} lg className="d-flex">
          <Card className="text-center flex-fill ">
            <Card.Body  style={{ height: '55px' }}>
              <Card.Title className="text-start ">
                <Link to={item.to} className="my-card-link text-decoration-none d-flex align-items-center "
                    style={item.redText ? { color: 'red' } : { color: 'black' }}>
                  <img src={item.icon} alt={item.label} className="me-2" width="20" height="20" />
                  {item.label}
                </Link>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
