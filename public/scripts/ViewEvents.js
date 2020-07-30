window.onload = () => {
  //creating the Event
  $submit.addEventListener("click", () => {
    const name = $name.value;
    const season = $season.value;

    //what happening behind the scene is actually a chain of functions
    //we start with the getPlayerId(name) - inserting a player name
    //then , well pass the id that returned to getPlayerData(id, season) as the id value[year value submited by user]
    //then we using the function that actually creating the specific stats we desire to present to the user
    //and we render the chart itself by make it visibile as soon as the data get's lodaded into it.
    getPlayerId(name)
      .then((id) => getPlayerData(id, season))
      .then(createStats)
      .then(() => {});
    document.querySelector(".Player-formwrap").style.transform =
      "translateX(-32em)";
  });

  



  //creating the Team Event
  $teamsubmit.addEventListener("click", () => {
    const name = $teamname.value;
    const season = $teamyear.value;

    //what happening behind the scene is actually a chain of functions
    //we start with the getTeamId(name) - inserting a team name
    //then , well pass the id that returned to getTeamId(id, season) as the id value[year value submited by user]
    //then we using the function that actually creating the specific stats we desire to present to the user
    //and we render the chart itself by make it visibile as soon as the data get's lodaded into it.
    getTeamId(name)
      .then((id) => getTeamData(id, season).then(CreateTeamStats))
      .then(() => {});
    document.getElementById("team-wrap").style.transform = "translateX(-32em)";
  });

  getTeamLiveId().then(getLeagueOptions);

  $getScore.addEventListener("click", () => {
    let date1 = $scoreSeason.value;
    getInfoFromOption().then((id) =>
      getLiveScore(id, date1)
      .then(createLiveScore)
      .then(() => {})
    );
  });


  

};
//creating the DOM listeners for the players search
$submit = document.getElementById("btn-boot");
$season = document.querySelector(".search-year");
$name = document.getElementById("player-name");

//creating the DOM listeners for the team search
$teamname = document.getElementById("team-name");
$teamyear = document.querySelector(".team-search-year");
$teamsubmit = document.getElementById("yearbtn-boot");

//creating the DOM listeners for the liveScore
$getScore = document.getElementById("get-score-btn");
$scoreSeason = document.getElementById("start");

//creating the DOM listener for submit Odds
$Odds = document.querySelector(".submit-odd");

//coding the registration form
$(document).ready(function () {
  $(".container").fadeIn(1000);
  $(".s2class").css({
    color: "#EE9BA3",
  });
  $(".s1class").css({
    color: "#748194",
  });
  $("#left").removeClass("left_hover");
  $("#right").addClass("right_hover");
  $(".signin").css({
    display: "none",
  });
  $(".signup").css({
    display: "",
  });
});
$("#right").click(function () {
  $("#left").removeClass("left_hover");
  $(".s2class").css({
    color: "#EE9BA3",
  });
  $(".s1class").css({
    color: "#748194",
  });
  $("#right").addClass("right_hover");
  $(".signin").css({
    display: "none",
  });
  $(".signup").css({
    display: "",
  });
});
$("#left").click(function () {
  $(".s1class").css({
    color: "#EE9BA3",
  });
  $(".s2class").css({
    color: "#748194",
  });
  $("#right").removeClass("right_hover");
  $("#left").addClass("left_hover");
  $(".signup").css({
    display: "none",
  });
  $(".signin").css({
    display: "",
  });
});

//creating dynamic logo switches for left logo
$(".select-odd").mouseup(function () {
  const images = ["public/images/LOGOS/atlanta.png", "public/images/LOGOS/boston.png", "public/images/LOGOS/brooklyn.png", "public/images/LOGOS/npla.png", "public/images/LOGOS/chicago.png", "public/images/LOGOS/cleveland.png", "public/images/LOGOS/dallas.png", "public/images/LOGOS/Denver.png", "public/images/LOGOS/Detroit.png", "public/images/LOGOS/GoldenState.png", "public/images/LOGOS/Houston.png", "public/images/LOGOS/indiana.png", "public/images/LOGOS/clippers.png", "public/images/LOGOS/lakers.png", "public/images/LOGOS/mem.png", "public/images/LOGOS/mia.png", "public/images/LOGOS/bucks.png", "public/images/LOGOS/mina.png", "public/images/LOGOS/npla.png", "public/images/LOGOS/nyc.png", "public/images/LOGOS/okc.png", "public/images/LOGOS/Magic.png", "public/images/LOGOS/phila.png", "public/images/LOGOS/suns.png", "public/images/LOGOS/port.png", "public/images/LOGOS/kings.png", "public/images/LOGOS/spurs.png", "public/images/LOGOS/raps.png", "public/images/LOGOS/jazz.png", "public/images/LOGOS/wash.png"];
  console.log("yay");
  let selectElementOddsAA = document.querySelector(".select-odd");
  let valueSelectedOddB =
    selectElementOddsAA.options[selectElementOddsAA.selectedIndex].value; // get selected option value

  if (valueSelectedOddB == "132 Atlanta Hawks") {
    document.querySelector(".left-logo").src = images[0];
  } else if (valueSelectedOddB == "133 Boston Celtics") {
    document.querySelector(".left-logo").src = images[1];
  } else if (valueSelectedOddB == "134 Brooklyn Nets") {
    document.querySelector(".left-logo").src = images[2];
  } else if (valueSelectedOddB == "135 Charlotte Hornets") {
    document.querySelector(".left-logo").src = images[3];
  } else if (valueSelectedOddB == "136 Chicago Bulls") {
    document.querySelector(".left-logo").src = images[4];
  } else if (valueSelectedOddB == "137 Cleveland Cavaliers") {
    document.querySelector(".left-logo").src = images[5];
  } else if (valueSelectedOddB == "138 Dallas Mavericks") {
    document.querySelector(".left-logo").src = images[6];
  } else if (valueSelectedOddB == "139 Denver Nuggets") {
    document.querySelector(".left-logo").src = images[7];
  } else if (valueSelectedOddB == "140 Detroit Pistons") {
    document.querySelector(".left-logo").src = images[8];
  } else if (valueSelectedOddB == "141 Golden State Warriors") {
    document.querySelector(".left-logo").src = images[9];
  } else if (valueSelectedOddB == "142 Houston Rockets") {
    document.querySelector(".left-logo").src = images[10];
  } else if (valueSelectedOddB == "143 Indiana Pacers") {
    document.querySelector(".left-logo").src = images[11];
  } else if (valueSelectedOddB == "144 Los Angeles Clippers") {
    document.querySelector(".left-logo").src = images[12];
  } else if (valueSelectedOddB == "145 Los Angeles Lakers") {
    document.querySelector(".left-logo").src = images[13];
  } else if (valueSelectedOddB == "146 Memphis Grizzlies") {
    document.querySelector(".left-logo").src = images[14];
  } else if (valueSelectedOddB == "147 Miami Heat") {
    document.querySelector(".left-logo").src = images[15];
  } else if (valueSelectedOddB == "148 Milwaukee Bucks") {
    document.querySelector(".left-logo").src = images[16];
  } else if (valueSelectedOddB == "149 Minnesota Timberwolves") {
    document.querySelector(".left-logo").src = images[17];
  } else if (valueSelectedOddB == "150 New Orleans Pelicans") {
    document.querySelector(".left-logo").src = images[18];
  } else if (valueSelectedOddB == "151 New York Knicks") {
    document.querySelector(".left-logo").src = images[19];
  } else if (valueSelectedOddB == "152 Oklahoma City Thunder") {
    document.querySelector(".left-logo").src = images[20];
  } else if (valueSelectedOddB == "153 Orlando Magic") {
    document.querySelector(".left-logo").src = images[21];
  } else if (valueSelectedOddB == "154 Philadelphia 76ers") {
    document.querySelector(".left-logo").src = images[22];
  } else if (valueSelectedOddB == "154 Atlanta Hawks") {
    document.querySelector(".left-logo").src = images[23];
  } else if (valueSelectedOddB == "155 Phoenix Suns") {
    document.querySelector(".left-logo").src = images[24];
  } else if (valueSelectedOddB == "156 Portland Trail Blazers") {
    document.querySelector(".left-logo").src = images[25];
  } else if (valueSelectedOddB == "157 Sacramento Kings") {
    document.querySelector(".left-logo").src = images[26];
  } else if (valueSelectedOddB == "158 San Antonio Spurs") {
    document.querySelector(".left-logo").src = images[27];
  } else if (valueSelectedOddB == "159 Toronto Raptors") {
    document.querySelector(".left-logo").src = images[28];
  } else if (valueSelectedOddB == "160 Utah Jazz") {
    document.querySelector(".left-logo").src = images[29];
  } else if (valueSelectedOddB == "161 Washington Wizards") {
    document.querySelector(".left-logo").src = images[29];
  }
});





//creating dynamic logo switches for right logo
$(".select-oddB").mouseup(function () {
  const images = ["public/images/LOGOS/atlanta.png", "public/images/LOGOS/boston.png", "public/images/LOGOS/brooklyn.png", "public/images/LOGOS/npla.png", "public/images/LOGOS/chicago.png", "public/images/LOGOS/cleveland.png", "public/images/LOGOS/dallas.png", "public/images/LOGOS/Denver.png", "public/images/LOGOS/Detroit.png", "public/images/LOGOS/GoldenState.png", "public/images/LOGOS/Houston.png", "public/images/LOGOS/indiana.png", "public/images/LOGOS/clippers.png", "public/images/LOGOS/lakers.png", "public/images/LOGOS/mem.png", "public/images/LOGOS/mia.png", "public/images/LOGOS/bucks.png", "public/images/LOGOS/mina.png", "public/images/LOGOS/npla.png", "public/images/LOGOS/nyc.png", "public/images/LOGOS/okc.png", "public/images/LOGOS/Magic.png", "public/images/LOGOS/phila.png", "public/images/LOGOS/suns.png", "public/images/LOGOS/port.png", "public/images/LOGOS/kings.png", "public/images/LOGOS/spurs.png", "public/images/LOGOS/raps.png", "public/images/LOGOS/jazz.png", "public/images/LOGOS/wash.png"];
  console.log("yay");
  let selectElementOddsBB = document.querySelector(".select-oddB");
  let valueSelectedOddBB = selectElementOddsBB.options[selectElementOddsBB.selectedIndex].value; // get selected option value

  if (valueSelectedOddBB == "132 Atlanta Hawks") {
    document.querySelector(".logo-right").src = images[0];
  } else if (valueSelectedOddBB == "133 Boston Celtics") {
    document.querySelector(".logo-right").src = images[1];
  } else if (valueSelectedOddBB == "134 Brooklyn Nets") {
    document.querySelector(".logo-right").src = images[2];
  } else if (valueSelectedOddBB == "135 Charlotte Hornets") {
    document.querySelector(".logo-right").src = images[3];
  } else if (valueSelectedOddBB == "136 Chicago Bulls") {
    document.querySelector(".logo-right").src = images[4];
  } else if (valueSelectedOddBB == "137 Cleveland Cavaliers") {
    document.querySelector(".logo-right").src = images[5];
  } else if (valueSelectedOddBB == "138 Dallas Mavericks") {
    document.querySelector(".logo-right").src = images[6];
  } else if (valueSelectedOddBB == "139 Denver Nuggets") {
    document.querySelector(".logo-right").src = images[7];
  } else if (valueSelectedOddBB == "140 Detroit Pistons") {
    document.querySelector(".logo-right").src = images[8];
  } else if (valueSelectedOddBB == "141 Golden State Warriors") {
    document.querySelector(".logo-right").src = images[9];
  } else if (valueSelectedOddBB == "142 Houston Rockets") {
    document.querySelector(".logo-right").src = images[10];
  } else if (valueSelectedOddBB == "143 Indiana Pacers") {
    document.querySelector(".logo-right").src = images[11];
  } else if (valueSelectedOddBB == "144 Los Angeles Clippers") {
    document.querySelector(".logo-right").src = images[12];
  } else if (valueSelectedOddBB == "145 Los Angeles Lakers") {
    document.querySelector(".logo-right").src = images[13];
  } else if (valueSelectedOddBB == "146 Memphis Grizzlies") {
    document.querySelector(".logo-right").src = images[14];
  } else if (valueSelectedOddBB == "147 Miami Heat") {
    document.querySelector(".logo-right").src = images[15];
  } else if (valueSelectedOddBB == "148 Milwaukee Bucks") {
    document.querySelector(".logo-right").src = images[16];
  } else if (valueSelectedOddBB == "149 Minnesota Timberwolves") {
    document.querySelector(".logo-right").src = images[17];
  } else if (valueSelectedOddBB == "150 New Orleans Pelicans") {
    document.querySelector(".logo-right").src = images[18];
  } else if (valueSelectedOddBB == "151 New York Knicks") {
    document.querySelector(".logo-right").src = images[19];
  } else if (valueSelectedOddBB == "152 Oklahoma City Thunder") {
    document.querySelector(".logo-right").src = images[20];
  } else if (valueSelectedOddBB == "153 Orlando Magic") {
    document.querySelector(".logo-right").src = images[21];
  } else if (valueSelectedOddBB == "154 Philadelphia 76ers") {
    document.querySelector(".logo-right").src = images[22];
  } else if (valueSelectedOddBB == "154 Atlanta Hawks") {
    document.querySelector(".logo-right").src = images[23];
  } else if (valueSelectedOddBB == "155 Phoenix Suns") {
    document.querySelector(".logo-right").src = images[24];
  } else if (valueSelectedOddBB == "156 Portland Trail Blazers") {
    document.querySelector(".logo-right").src = images[25];
  } else if (valueSelectedOddBB == "157 Sacramento Kings") {
    document.querySelector(".logo-right").src = images[26];
  } else if (valueSelectedOddBB == "158 San Antonio Spurs") {
    document.querySelector(".logo-right").src = images[27];
  } else if (valueSelectedOddBB == "159 Toronto Raptors") {
    document.querySelector(".logo-right").src = images[28];
  } else if (valueSelectedOddBB == "160 Utah Jazz") {
    document.querySelector(".logo-right").src = images[29];
  } else if (valueSelectedOddBB == "161 Washington Wizards") {
    document.querySelector(".logo-right").src = images[29];
  }
});

  $Odds.addEventListener("click", () => {
    sumOverUnder()
    sumWinsPrecentages()
  })

  getTeamsForOdds().then(getTeamsInfoForOdds)
  getTeamsForOdds().then(getTeamsInfoForOddsB)