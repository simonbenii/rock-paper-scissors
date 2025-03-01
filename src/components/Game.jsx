"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentCutIcon from "@mui/icons-material/ContentCut";

const choices = [
  { name: "kő", icon: <SportsHandballIcon /> },
  { name: "papír", icon: <DescriptionIcon /> },
  { name: "olló", icon: <ContentCutIcon /> },
];

export default function Game() {
  const [mounted, setMounted] = useState(false);
  const [round, setRound] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [team1Wins, setTeam1Wins] = useState(0);
  const [team2Wins, setTeam2Wins] = useState(0);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [namesEntered, setNamesEntered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getRandomChoice = () =>
    choices[Math.floor(Math.random() * choices.length)].name;

  const determineWinner = (p1, p2, b1, b2) => {
    let team1Score = 0;
    let team2Score = 0;

    if (
      (p1 === "kő" && p2 === "olló") ||
      (p1 === "papír" && p2 === "kő") ||
      (p1 === "olló" && p2 === "papír")
    )
      team1Score++;

    if (
      (p2 === "kő" && p1 === "olló") ||
      (p2 === "papír" && p1 === "kő") ||
      (p2 === "olló" && p1 === "papír")
    )
      team1Score++;

    if (
      (b1 === "kő" && b2 === "olló") ||
      (b1 === "papír" && b2 === "kő") ||
      (b1 === "olló" && b2 === "papír")
    )
      team2Score++;

    if (
      (b2 === "kő" && b1 === "olló") ||
      (b2 === "papír" && b1 === "kő") ||
      (b2 === "olló" && b1 === "papír")
    )
      team2Score++;

    return { team1Score, team2Score };
  };

  const playRound = () => {
    if (!player1Choice || !player2Choice) return;

    const bot1Choice = getRandomChoice();
    const bot2Choice = getRandomChoice();

    const scores = determineWinner(
      player1Choice,
      player2Choice,
      bot1Choice,
      bot2Choice
    );
    const winner = getRoundWinner(scores);

    const roundInfo = {
      round,
      player1Choice,
      player2Choice,
      bot1Choice,
      bot2Choice,
      team1Score: scores.team1Score,
      team2Score: scores.team2Score,
      winner,
    };

    setResults([...results, roundInfo]);
    setRoundResult(roundInfo);
    setPlayer1Choice(null);
    setPlayer2Choice(null);

    if (scores.team1Score > scores.team2Score) {
      setTeam1Wins(team1Wins + 1);
    } else if (scores.team2Score > scores.team1Score) {
      setTeam2Wins(team2Wins + 1);
    }

    if (round < 10) {
      setRound(round + 1);
    } else {
      setGameOver(true);
    }
  };

  const getRoundWinner = (scores) => {
    if (scores.team1Score > scores.team2Score) {
      return "Csapat 1 (Játékosok)";
    } else if (scores.team2Score > scores.team1Score) {
      return "Csapat 2 (Botok)";
    } else {
      return "Döntetlen";
    }
  };

  const resetGame = () => {
    setRound(1);
    setResults([]);
    setGameOver(false);
    setRoundResult(null);
    setTeam1Wins(0);
    setTeam2Wins(0);
    setPlayer1Name("");
    setPlayer2Name("");
    setNamesEntered(false);
  };

  const getFinalWinner = () => {
    if (team1Wins > team2Wins) {
      return `A ${player1Name} és ${player2Name} csapata nyerte a meccset!`;
    } else if (team2Wins > team1Wins) {
      return `A botok csapata nyerte a meccset!`;
    } else {
      return "A meccs döntetlen lett!";
    }
  };

  const handleStartGame = () => {
    if (player1Name && player2Name) {
      setNamesEntered(true);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        Kő - Papír - Olló
      </Typography>
      <Box
        textAlign="center"
        mt={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "90vh",
        }}
      >
        {!namesEntered ? (
          <>
            <Typography variant="h5" gutterBottom>
              Kérlek, add meg a játékosok neveit:
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Játékos 1 neve"
                  variant="outlined"
                  fullWidth
                  value={player1Name}
                  onChange={(e) => setPlayer1Name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Játékos 2 neve"
                  variant="outlined"
                  fullWidth
                  value={player2Name}
                  onChange={(e) => setPlayer2Name(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartGame}
                fullWidth
              >
                Játék indítása
              </Button>
            </Box>
          </>
        ) : !gameOver ? (
          <>
            <Typography variant="h5" gutterBottom>
              {round}. kör
            </Typography>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={5}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">{player1Name}</Typography>
                  {choices.map((choice) => (
                    <Button
                      key={choice.name}
                      variant={
                        player1Choice === choice.name ? "contained" : "outlined"
                      }
                      onClick={() => setPlayer1Choice(choice.name)}
                      sx={{ margin: 1 }}
                      startIcon={choice.icon}
                      fullWidth
                    >
                      {choice.name}
                    </Button>
                  ))}
                </Paper>
              </Grid>

              <Grid item xs={12} sm={5}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">{player2Name}</Typography>
                  {choices.map((choice) => (
                    <Button
                      key={choice.name}
                      variant={
                        player2Choice === choice.name ? "contained" : "outlined"
                      }
                      onClick={() => setPlayer2Choice(choice.name)}
                      sx={{ margin: 1 }}
                      startIcon={choice.icon}
                      fullWidth
                    >
                      {choice.name}
                    </Button>
                  ))}
                </Paper>
              </Grid>
            </Grid>

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={playRound}
                disabled={!player1Choice || !player2Choice}
                fullWidth
              >
                Következő kör
              </Button>
            </Box>

            {roundResult && (
              <Box mt={4} style={{ display: "flex", justifyContent: "center" }}>
                <Alert severity="info" icon={false}>
                  <Typography variant="h6">
                    {roundResult.round}. kör eredménye:
                  </Typography>
                  <Typography variant="body1">
                    {player1Name} választása: {roundResult.player1Choice} |{" "}
                    {player2Name} választása: {roundResult.player2Choice}
                    <br />
                    Bot 1 választása: {roundResult.bot1Choice} | Bot 2
                    választása: {roundResult.bot2Choice}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    Győztes: {roundResult.winner}
                  </Typography>
                </Alert>
              </Box>
            )}
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Játék vége!
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {getFinalWinner()}
            </Typography>

            <Box mt={4}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Kör</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Játékosok választásai</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Botok választásai</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Eredmény</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((res, index) => (
                      <TableRow key={index}>
                        <TableCell>{res.round}</TableCell>
                        <TableCell>
                          {res.player1Choice} | {res.player2Choice}
                        </TableCell>
                        <TableCell>
                          {res.bot1Choice} | {res.bot2Choice}
                        </TableCell>
                        <TableCell>{res.winner}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={resetGame}
                fullWidth
              >
                Új játék indítása
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
