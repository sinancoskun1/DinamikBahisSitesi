import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import icons8searchSvg from "../assets/icons8-search.Svg";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedBets, setSelectedBets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/match-odds")
      .then((res) => {
        if (!res.ok) throw new Error("Veri alınamadı");
        return res.json();
      })
      .then((data) => {
        const sortedData = data.slice().sort((a, b) => {
          const [aHour, aMinute] = a.time.split(":").map(Number);
          const [bHour, bMinute] = b.time.split(":").map(Number);
          if (aHour !== bHour) return aHour - bHour;
          return aMinute - bMinute;
        });
        setMatches(sortedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBetSelection = (match, outcomeType, oddsValue) => {
    const newBet = {
      matchId: match.match_id,
      homeTeam: match.teams.home,
      awayTeam: match.teams.away,
      outcome: outcomeType,
      odds: oddsValue,
    };

    const existingBetIndex = selectedBets.findIndex(
      (bet) => bet.matchId === newBet.matchId
    );

    if (existingBetIndex > -1) {
      const updatedBets = [...selectedBets];
      updatedBets.splice(existingBetIndex, 1);
      setSelectedBets(updatedBets);
    } else {
      setSelectedBets([...selectedBets, newBet]);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  const filteredMatches = matches.filter((match) =>
    `${match.teams.home} ${match.teams.away}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const groupedMatches = filteredMatches.reduce((acc, match) => {
    const time = match.time;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(match);
    return acc;
  }, {});

  return (
    <div className="p-0">
      <div className=" d-flex ">
        <Form className="d-flex mb-0 w-100">
          <Form.Control
            type="search"
            placeholder="Takım ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <img src={icons8searchSvg} alt="search" width="32" height="50" />
        </Form>
      </div>

      {/* Bahis kuponu, arama kutusunun hemen altında */}
      {selectedBets.length > 0 && (
        <Card className="mt-4 shadow-sm">
          <Card.Header className="bg-success text-white fw-bold">
            Bahis Kuponum ({selectedBets.length} Maç)
          </Card.Header>
          <Card.Body>
            {selectedBets.map((bet) => (
              <div
                key={bet.matchId}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <div>
                  <p className="mb-0 fw-semibold">
                    {bet.homeTeam} vs {bet.awayTeam}
                  </p>
                  <p className="mb-0 text-muted">
                    Seçim:
                    {bet.outcome === "home_win"
                      ? " MS 1"
                      : bet.outcome === "draw"
                      ? " MS X"
                      : " MS 2"}
                  </p>
                </div>
                <span className="fw-bold">{bet.odds}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3 fw-bold">
              <span>Toplam Oran:</span>
              <span>
                {selectedBets
                  .reduce((total, bet) => total * bet.odds, 1)
                  .toFixed(2)}
              </span>
            </div>
            <Button variant="danger" className="w-100 mt-3">
              Kuponu Oyna
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Maçların listesi kuponun altında */}
      {Object.keys(groupedMatches).length === 0 ? (
        <p>Aradığınız kritere uygun maç bulunamadı.</p>
      ) : (
        Object.keys(groupedMatches).map((time) => (
          <Card key={time} className="mb-3 shadow-sm">
            <Card.Header className="bg-danger text-white fw-bold">
              {time}
            </Card.Header>
            <Card.Body>
              {groupedMatches[time].map((match) => (
                <div
                  key={match.match_id}
                  className="mt-0 border-bottom py-2 row align-items-center"
                >
                  <div className="col-3">
                    <p className="mb-0 text-dark fw-semibold">
                      {match.teams.home} vs {match.teams.away}
                    </p>
                  </div>
                  <div className="col-6 d-flex gap-2">
                    <Button
                      variant={
                        selectedBets.some(
                          (bet) =>
                            bet.matchId === match.match_id &&
                            bet.outcome === "home_win"
                        )
                          ? "danger"
                          : "light"
                      }
                      onClick={() =>
                        handleBetSelection(match, "home_win", match.odds.home_win)
                      }
                    >
                      <div>MS 1</div>
                      <span className="fs-6 text-muted">{match.odds.home_win}</span>
                    </Button>
                    <Button
                      variant={
                        selectedBets.some(
                          (bet) =>
                            bet.matchId === match.match_id &&
                            bet.outcome === "draw"
                        )
                          ? "danger"
                          : "light"
                      }
                      onClick={() =>
                        handleBetSelection(match, "draw", match.odds.draw)
                      }
                    >
                      <div>MS X</div>
                      <span className="fs-6 text-muted">{match.odds.draw}</span>
                    </Button>
                    <Button
                      variant={
                        selectedBets.some(
                          (bet) =>
                            bet.matchId === match.match_id &&
                            bet.outcome === "away_win"
                        )
                          ? "danger"
                          : "light"
                      }
                      onClick={() =>
                        handleBetSelection(match, "away_win", match.odds.away_win)
                      }
                    >
                      <div>MS 2</div>
                      <span className="fs-6 text-muted">{match.odds.away_win}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}