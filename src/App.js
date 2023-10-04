// import "./App.css";
// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const WALL_HEIGHT = 600;
// const WALL_WIDTH = 400;

// const BIRD_WIDTH = 33;
// const BIRD_HEIGHT = 28;

// const GRAVITY = 5;
// function App() {
//   const [birdposition, setBirdposition] = useState(200);

//   useEffect(() => {
//     let birdval;

//     if (birdposition < WALL_HEIGHT - BIRD_HEIGHT) {
//       birdval = setInterval(() => {
//         setBirdposition((birdposition) => birdposition + GRAVITY);
//       }, 24);
//     }
//     return () => clearInterval(birdval);
//   });

//   const handler = () => {
//     if (birdposition < BIRD_HEIGHT) {
//       setBirdposition(0);
//     } else {
//       setBirdposition((birdposition) => birdposition - 50);
//     }
//   };

//   return (
//     <Home onClick={handler}>
//       <Startgame>Click to start</Startgame>
//       <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
//         <Bird
//           height={BIRD_HEIGHT}
//           width={BIRD_WIDTH}
//           top={birdposition}
//           left={100}
//         />
//       </Background>
//     </Home>
//   );
// }

// export default App;

// const Home = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
// `;

// const Background = styled.div`
//   background-image: url("/images/background-day.png"); // Adjust the path to your image
//   background-repeat: no-repeat;
//   background-size: ${(props) => props.width}px ${(props) => props.height}px;
//   width: ${(props) => props.width}px;
//   height: ${(props) => props.height}px;
//   border: 2px solid black;
//   position: relative;
// `;

// const Bird = styled.div`
//   background-repeat: no-repeat;
//   position: absolute;
//   background-image: url("/images/yellowbird-upflap.png");
//   background-size: ${(props) => props.width}px ${(props) => props.height}px;
//   width: ${(props) => props.width}px;
//   height: ${(props) => props.height}px;
//   top: ${(props) => props.top}px;
//   left: ${(props) => props.left}px;
// `;

// const Startgame = styled.div`
//   text-align: center;
//   position: relative;
//   top: 49%;
//   background-color: black;
//   padding: 10px;
//   width: 100px;
//   left:50%;
//   margin-left:-55px;
//   color:#fff;
//   font-size:20px;
//   border-radius:10px;
// `;

import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;

const BIRD_WIDTH = 33;
const BIRD_HEIGHT = 28;

const GRAVITY = 5;

function App() {
  const [birdposition, setBirdposition] = useState(200);

  const [isStart, setIsstart] = useState(false);

  useEffect(() => {
    let birdval;

    if (isStart && birdposition < WALL_HEIGHT - BIRD_HEIGHT) {
      birdval = setInterval(() => {
        setBirdposition((birdposition) => birdposition + GRAVITY);
      }, 24);
    }
    return () => clearInterval(birdval);
  });

  const handler = () => {
    if (!isStart) setIsstart(true);
    else if (birdposition < BIRD_HEIGHT) {
      setBirdposition(0);
    } else {
      setBirdposition((birdposition) => birdposition - 50);
    }
  };

  return (
    <Home>
      <Background height={WALL_HEIGHT} width={WALL_WIDTH}>
        <Bird
          height={BIRD_HEIGHT}
          width={BIRD_WIDTH}
          top={birdposition}
          left={100}
        />
        <Startgame onClick={handler}>Click to start</Startgame>
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
  background-image: url("/images/background-day.png"); // Adjust the path to your image
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 2px solid black;
  position: relative;
`;

const Bird = styled.div`
  background-repeat: no-repeat;
  position: absolute;
  background-image: url("/images/yellowbird-upflap.png");
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Startgame = styled.div`
  text-align: center;
  position: absolute;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center the text within its parent */
  background-color: black;
  padding: 10px;
  width: 100px;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
`;
