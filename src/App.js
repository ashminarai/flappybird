import styled from "styled-components";
import { useEffect, useState } from "react";

// Constants for bird, wall, and obstacle sizes and physics
const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 2; // Adjusted gravity for smoother movement
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;

function App() {
  // State variables for game control
  const [isStart, setIsStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [birdpos, setBirdPos] = useState(100);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);

  // Update bird's position based on gravity
  useEffect(() => {
    let intVal;
    if (isStart && !isGameOver) {
      intVal = setInterval(() => {
        setBirdPos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  }, [isStart, isGameOver]);

  // Move the obstacle and update score
  useEffect(() => {
    let objval;
    if (isStart && objPos >= -OBJ_WIDTH && !isGameOver) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart && !isGameOver) setScore((score) => score + 1);
    }
  }, [isStart, objPos, isGameOver]);

  // Check for collisions and reset game
  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >= WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setIsGameOver(true);
      setIsStart(false);
      setBirdPos(300);
    }
  }, [isStart, birdpos, objHeight, objPos]);

  // Click handler to start game or flap bird
  const handler = () => {
    if (!isStart && !isGameOver) setIsStart(true);
    else if (isStart && !isGameOver) setBirdPos((birdpos) => birdpos - 50); // Move the bird upwards when clicked
    else if (isGameOver) {
      // Restart the game
      setIsGameOver(false);
      setIsStart(true);
      setBirdPos(100);
      setObjPos(WALL_WIDTH);
      setObjHeight(0);
      setScore(0);
    }
  };

  return (
    <Home onClick={handler}>
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        {isGameOver ? (
          <GameOverScreen>
            <GameOverText>Game Over</GameOverText>
            <ScoreText>Score: {score}</ScoreText>
            <RestartButton onClick={handler}>Restart</RestartButton>
          </GameOverScreen>
        ) : (
          <>
            {!isStart ? <Startboard>Click To Start</Startboard> : null}
            <Obj
              height={objHeight}
              width={OBJ_WIDTH}
              left={objPos}
              top={0}
              deg={180}
            />
            <Bird
              height={BIRD_HEIGHT}
              width={BIRD_WIDTH}
              top={birdpos}
              left={100}
            />
            <Obj
              height={WALL_HEIGHT - OBJ_GAP - objHeight}
              width={OBJ_WIDTH}
              left={objPos}
              top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
              deg={0}
            />
            {isStart && <ScoreShow>Score: {score}</ScoreShow>}
          </>
        )}
      </Background>
    </Home>
  );
}

export default App;

const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-image: url("./images/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div`
  position: absolute;
  background-image: url("./images/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div`
  position: relative;
  background-image: url("./images/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

const Startboard = styled.div`
  position: relative;
  top: 49%;
  background-color: black;
  padding: 10px;
  width: 100px;
  left: 50%;
  margin-left: -50px;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
`;

const ScoreShow = styled.div`
  text-align: center;
  background-color: black;
  padding: 10px;
  width: 100px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 18px;
  border-radius: 10px;
`;

const GameOverScreen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
`;

const GameOverText = styled.div`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ScoreText = styled.div`
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
`;

const RestartButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;

