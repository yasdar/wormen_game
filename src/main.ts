import $ from "jquery";
import { Boot } from "./Boot";
import { PlayGame } from "./PlayGame";
import { Preload } from "./Preload";
import {gameSettings,AboutGame, scoreData} from "./Config";
import Chart from 'chart.js/auto';
$(function(){ 
  console.log('js ready'); 

  $('#startGameBt').on('click',()=>{startGame()})
  $('#easyLevel').on('click',()=>{selectLevel("easy")})
  $('#mediumLevel').on('click',()=>{selectLevel("medium")})
  $('#hardLevel').on('click',()=>{selectLevel("hard")})
  $('#restartGameBt').on('click',()=>{restartGame()})
  

  AboutGame.endGame = endGame;

  let doc:any = document;

  window.addEventListener("popstate", function (event) {
    if (window.location.search.includes("screen=third")) {
      doc.getElementById("firstScreen").style.display = "none";
      doc.getElementById("secondScreen").style.display = "none";
      doc.getElementById("thirdScreen").style.display = "block";
    } else if (window.location.search.includes("screen=second")) {
      doc.getElementById("firstScreen").style.display = "block";
      doc.getElementById("secondScreen").style.display = "block";
      doc.getElementById("thirdScreen").style.display = "none";
    } else {
      doc.getElementById("firstScreen").style.display = "none";
      doc.getElementById("secondScreen").style.display = "block";
      doc.getElementById("thirdScreen").style.display = "block";
    }
  });
});
function selectLevel(level:any) {
console.log(level)
  //force data
  if(level == "easy"){
    $("#timeLimit").val(gameSettings.easyLevel.time);
    $( "#jumpingBar" ).prop( "checked", false );
  }
  else if(level == "medium"){
    $("#timeLimit").val(gameSettings.mediumLevel.time);
    $( "#jumpingBar" ).prop( "checked", true );
  }
  else if(level == "hard"){
    $("#timeLimit").val(gameSettings.hardLevel.time);
    $( "#jumpingBar" ).prop( "checked", true );
  }

  gameSettings.level = level;
  let doc:any = document;
  doc
    .getElementById("easyLevel")
    .classList.remove(
      "bg-gradient-to-r",
      "from-blue-600",
      "via-blue-500",
      "to-blue-700"
    );
    doc.getElementById("easyLevel").classList.add("bg-gray-500");
    doc
    .getElementById("mediumLevel")
    .classList.remove(
      "bg-gradient-to-r",
      "from-blue-600",
      "via-blue-500",
      "to-blue-700"
    );
    doc.getElementById("mediumLevel").classList.add("bg-gray-500");
    doc
    .getElementById("hardLevel")
    .classList.remove(
      "bg-gradient-to-r",
      "from-blue-600",
      "via-blue-500",
      "to-blue-700"
    );
    doc.getElementById("hardLevel").classList.add("bg-gray-500");

    doc.getElementById(level + "Level").classList.remove("bg-gray-500");
    doc
    .getElementById(level + "Level")
    .classList.add(
      "bg-gradient-to-r",
      "from-blue-600",
      "via-blue-500",
      "to-blue-700"
    );
}
function startGame(event?:any) {
  let doc:any = document;
  gameSettings.timeLimit =
  doc.getElementById("timeLimit").value || "60";
  gameSettings.jumpingBar = doc.getElementById("jumpingBar").checked;
  showSecondScreen(event);
}

function showSecondScreen(event:any) {
  let doc:any = document;
  console.log("game settings:", gameSettings);
  doc.getElementById("firstScreen").style.display = "none";
  doc.getElementById("secondScreen").style.display = "block";
  window.history.pushState({ screen: "second" }, "", "?screen=2");

  //start the game
    playGame();

}
function playGame(){

  if( AboutGame.Game != null ){
    AboutGame.Game.scene.start("PlayGame");
  }else{
    AboutGame.Game = new Phaser.Game(
      {
        type: Phaser.CANVAS,
        transparent:true,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          parent: 'GameDiv',
          width: AboutGame.width,
          height: AboutGame.height,
      },
      scene: [Boot,Preload,PlayGame]
  }
  );
  }
  
}
function showThirdScreen(event?:any) {
  let doc:any = document;
  doc.getElementById("firstScreen").style.display = "none";
  doc.getElementById("secondScreen").style.display = "none";
  doc.getElementById("thirdScreen").style.display = "block";

  window.history.pushState({ screen: "third" }, "", "?screen=3");
  const scoreHTML = `
    <div class="z-10 flex flex-col items-center gap-4">
      <span class="text-slate-400 text-6xl font-bold mt-4">${scoreData.totalScore}</span>
      <p class="text-gray-50 text-3xl font-bold">Score</p>
      <div>
        <div class="mb-6 grid grid-cols-3 gap-4">
          <div class="rounded-lg bg-slate-900/50 p-2 sm:p-4">
            <p class="text-xs font-medium text-slate-400">Correct</p>
            <p class="text-lg font-semibold text-white">${scoreData.correct}</p>
          </div>
          
          <div class="rounded-lg bg-slate-900/50 p-2 sm:p-4">
            <p class="text-xs font-medium text-slate-400">Incorrect</p>
            <p class="text-lg font-semibold text-white">${scoreData.incorrect}</p>
          </div>
          
          <div class="rounded-lg bg-slate-900/50 p-2 sm:p-4">
            <p class="text-xs font-medium text-slate-400">Best Score</p>
            <p class="text-lg font-semibold text-white">${scoreData.bestScore}</p>
          </div>
        </div>
      </div>
    </div>
  `;

doc.getElementById("scoreContainer").innerHTML = scoreHTML;
console.log("plot cahrt now")

  const lineCtx = doc.getElementById("lineChart").getContext("2d");

    AboutGame.ActualChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Progress",
            data: [12, 19, 3, 5, 2, 3],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false,
          },
        },
      },
    });
}
function updateScoreData(correct:any, incorrect:any) {
  scoreData.correct = correct;
  scoreData.incorrect = incorrect;
  
  scoreData.totalScore = Math.round((correct / (correct + incorrect)) * 100);

  if (scoreData.totalScore > scoreData.bestScore) {
    scoreData.bestScore = scoreData.totalScore;
    localStorage.setItem("bestScore", scoreData.bestScore);
  }
}

function initializeScores() {
  const savedBestScore = localStorage.getItem("bestScore");
  if (savedBestScore) {
    scoreData.bestScore = parseInt(savedBestScore);
  }

  scoreData.correct = 0;
  scoreData.incorrect = 0;
  scoreData.totalScore = 0;
}

function endGame() {
  //hide reset/game
  updateScoreData(AboutGame.playerAnswers.c,AboutGame.playerAnswers.inc);
  showThirdScreen();
}
function showFirstScreen(event?:any) {
//  if (event) event.preventDefault();
  let doc:any = document;
  doc.getElementById("firstScreen").style.display = "block";
  doc.getElementById("secondScreen").style.display = "none";
  doc.getElementById("thirdScreen").style.display = "none";

  window.history.pushState({ screen: "third" }, "", "?screen=1");
}
function restartGame() {
  AboutGame.ActualChart?.destroy();
  showFirstScreen();
}
