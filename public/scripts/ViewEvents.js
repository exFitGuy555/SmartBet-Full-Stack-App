window.onload = () => {


    //creating the Event
    $submit.addEventListener('click', () => {
        const name = $name.value
        const season = $season.value

        //what happening behind the scene is actually a chain of functions
        //we start with the getPlayerId(name) - inserting a player name
        //then , well pass the id that returned to getPlayerData(id, season) as the id value[year value submited by user]
        //then we using the function that actually creating the specific stats we desire to present to the user 
        //and we render the chart itself by make it visibile as soon as the data get's lodaded into it.
        getPlayerId(name).then(id => getPlayerData(id, season)).then(createStats).then(() => {})
        document.querySelector('.Player-formwrap').style.transform = 'translateX(-32em)';



    })

    //creating the Team Event
    $teamsubmit.addEventListener('click', () => {
        const name = $teamname.value
        const season = $teamyear.value

        //what happening behind the scene is actually a chain of functions
        //we start with the getTeamId(name) - inserting a team name
        //then , well pass the id that returned to getTeamId(id, season) as the id value[year value submited by user]
        //then we using the function that actually creating the specific stats we desire to present to the user 
        //and we render the chart itself by make it visibile as soon as the data get's lodaded into it.
        getTeamId(name).then(id => getTeamData(id, season).then(CreateTeamStats)).then(() => {})
        document.getElementById('team-wrap').style.transform = 'translateX(-32em)'


    })


    getTeamLiveId().then(getLeagueOptions)

    let counter = 0
    $getScore.addEventListener('click', () => {
        let date1 = $scoreSeason.value
        getInfoFromOption().then(id => getLiveScore(id, date1).then(createLiveScore).then(() => {}))
    })




}
//creating the DOM listeners for the players search
$submit = document.getElementById("btn-boot")
$season = document.querySelector(".search-year")
$name = document.getElementById("player-name")

//creating the DOM listeners for the team search
$teamname = document.getElementById('team-name')
$teamyear = document.querySelector('.team-search-year')
$teamsubmit = document.getElementById('yearbtn-boot')


$getScore = document.getElementById('get-score-btn');
$scoreSeason = document.getElementById('start');



//coding the registration form
$(document).ready(function () {
    $(".container").fadeIn(1000);
    $(".s2class").css({
        "color": "#EE9BA3"
    });
    $(".s1class").css({
        "color": "#748194"
    });
    $("#left").removeClass("left_hover");
    $("#right").addClass("right_hover");
    $(".signin").css({
        "display": "none"
    });
    $(".signup").css({
        "display": ""
    });
});
$("#right").click(function () {
    $("#left").removeClass("left_hover");
    $(".s2class").css({
        "color": "#EE9BA3"
    });
    $(".s1class").css({
        "color": "#748194"
    });
    $("#right").addClass("right_hover");
    $(".signin").css({
        "display": "none"
    });
    $(".signup").css({
        "display": ""
    });
});
$("#left").click(function () {
    $(".s1class").css({
        "color": "#EE9BA3"
    });
    $(".s2class").css({
        "color": "#748194"
    });
    $("#right").removeClass("right_hover");
    $("#left").addClass("left_hover");
    $(".signup").css({
        "display": "none"
    });
    $(".signin").css({
        "display": ""
    });
});


//creating the email transport 
