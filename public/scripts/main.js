//fetching the id number , that later we going to search data with,by inserting the player name.
async function getPlayerId(name) {
    const _url = `https://www.balldontlie.io/api/v1/players?search=${name}`
    const data = await fetch(_url).then(resp => resp.json())
    if (data.data[0] == undefined) {
        const showerr = document.querySelector('.showerr')
        const charterr = document.getElementById('ChartWrap')
        charterr.style.opacity = '0'
        showerr.style.opacity = '1'

    } else {
        const showerr = document.querySelector('.showerr')
        const charterr = document.getElementById('ChartWrap')
        charterr.style.opacity = '1'
        showerr.style.opacity = '0'
        return data.data[0].id
    }
}
//fetching the entire player data which will be filter by specific season , id will be passed from getPlayerid function.then
//the user submiting the year in the year input, default value = 2010
async function getPlayerData(id, season = '2010') {
    const _url = `https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${id}`
    const data = await fetch(_url).then(resp => resp.json())
    console.log(data)

    return [{
        data
    }]

}

//PREVENT REFRESH PAGE BY ENTER KEYDOWN
document.querySelector(".prevent").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
    }
});

//fetching the team ID 
async function getTeamId(name) {
    const _url = `https://api-basketball.p.rapidapi.com/teams?search=${name}`
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }
    }).then(resp => resp.json())
    if (data.response[0] == undefined) {
        const teamerr = document.querySelector('.teamerr')
        const teamchart = document.getElementById('teamStat-chart')
        teamerr.style.opacity = '1'
        teamchart.style.opacity = '0'

    } else {
        const teamerr = document.querySelector('.teamerr')
        const teamchart = document.getElementById('teamStat-chart')
        teamerr.style.opacity = '0'
        teamchart.style.opacity = '1'
        return data.response[0].id

    }
}

//fetching the team stats and data
async function getTeamData(id, season) {
    let _url = `https://api-basketball.p.rapidapi.com/statistics?league=12&season=${season}&team=${id}`
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }
    }).then(resp => resp.json())

    return data.response

}

//Main function to search and render data
async function getLiveScore(id, date1) {
    let _url = `https://api-basketball.p.rapidapi.com/games?league=${id}&season=2018-2019&date=${date1}`
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }
    }).then(resp => resp.json())

    return data.response


}

//fetching the Id of leagues around the world into option select
//on propuse have split between those following 2 functions this and down below
async function getTeamLiveId() {
    let _url = 'https://api-basketball.p.rapidapi.com/leagues';
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }


    }).then(resp => resp.json())
    return data.response

}


//fetching the Names of leagues around the world into option select
async function getTeamLiveOptions() {
    let _url = 'https://api-basketball.p.rapidapi.com/leagues';
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }


    }).then(resp => resp.json())
    let a = data.response
    a.map(item => {
        let b = new LiveID(item.name, item.id)

        console.log(item.name, item.id)
    })

}





//Start of Getting value from LiveScore home PAGE
let selectElement = document.getElementById("parentIdLive");
let valueSelected = selectElement.options[selectElement.selectedIndex].value; // get selected option value


async function getInfoFromOption() {
    let selectElement = document.getElementById("parentIdLive");
    let valueSelected = selectElement.options[selectElement.selectedIndex].value; // get selected option value

    return getNumbers(valueSelected)
}

//extract only number from the option filed
function getNumbers(string) {
    string = string.split(" ");
    var int = "";
    for (var i = 0; i < string.length; i++) {
        if (isNaN(string[i]) == false) {
            int += string[i];
        }
    }
    return parseInt(int);
}
//End of Getting value from LiveScore home PAGE



//fetching the teams names and ids for odd options selector
async function getTeamsForOdds() {
    let _url = 'https://api-basketball.p.rapidapi.com/teams?league=12&season=2019-2020';
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }


    }).then(resp => resp.json())
    return data.response

}


//fetching the team stats and data - right team
async function getTeamDataOdds(id) {
    let _url = `https://api-basketball.p.rapidapi.com/statistics?league=12&season=2018-2019&team=${id}`
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }
    }).then(resp => resp.json())
    let newOdd = new OverUnderA(data.response.points.against.average.all)
    let num = newOdd.all
    return num

}

//fetching the team stats and data - left team
async function getTeamDataOddsB(id) {
    let _url = `https://api-basketball.p.rapidapi.com/statistics?league=12&season=2018-2019&team=${id}`
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }
    }).then(resp => resp.json())
    let newOdd = new OverUnderA(data.response.points.against.average.all)
    return newOdd.all
}


//******stopped here , numbers indeed sum and rendered to the DOM , continue.... */
async function sumOverUnder() {
    let first = await getInfoFromOptionOddsB().then(id => getTeamDataOddsB(id))
    let sec = await getInfoFromOptionOdds().then(id => getTeamDataOddsB(id))


    sum = parseFloat(first) + parseFloat(sec);
    let placeIt = document.querySelector('.total')
    let placeIt2 = document.querySelector('.outputright')
    var intvalue = Math.floor(sum);
    placeIt.value = intvalue;
    placeIt2.innerHTML = `OverUnder: ${intvalue}`
}









//------------------------------------------------------------left side team---------------------------------------------------------------
//Start of Getting value from select team at Odds PAGE - OVER UNDER BET
let selectElementOddsA = document.querySelector(".select-odd");
let valueSelectedOdds = selectElementOddsA.options[selectElementOddsA.selectedIndex].value; // get selected option value



async function getInfoFromOptionOdds() {
    let selectElementOddsAA = document.querySelector(".select-odd");
    let valueSelectedOddB = selectElementOddsAA.options[selectElementOddsAA.selectedIndex].value; // get selected option value


    return getNumbersB(valueSelectedOddB)
}

//extract only number from the option filed
function getNumbersB(string) {
    string = string.split(" ");
    var int = "";
    for (var i = 0; i < string.length; i++) {
        if (isNaN(string[i]) == false) {
            int += string[i];
        }
    }
    return parseInt(int);
}
//END of Getting value from select team at Odds PAGE ==> will lead to page manager and getTotalA will return the final number

/* --------------------------------------right side team------------------ */

//Start of Getting value from select team at Odds PAGE - OVER UNDER BET
let selectElementOddsB = document.querySelector(".select-oddB");
let valueSelectedOddsB = selectElementOddsB.options[selectElementOddsB.selectedIndex].value; // get selected option value


async function getInfoFromOptionOddsB() {
    let selectElementOddsBB = document.querySelector(".select-oddB");
    let valueSelectedOddBB = selectElementOddsBB.options[selectElementOddsBB.selectedIndex].value; // get selected option value

    return getNumbersBB(valueSelectedOddBB)
}

//extract only number from the option filed
function getNumbersBB(string) {
    string = string.split(" ");
    var int = "";
    for (var i = 0; i < string.length; i++) {
        if (isNaN(string[i]) == false) {
            int += string[i];
        }
    }
    return parseInt(int);
}
//END of Getting value from select team at Odds PAGE ==> will lead to page manager and getTotalA will return the final number




//fetching the team Wins percentage - left team
async function getTeamWinsOdds(id) {
    let _url = `https://api-basketball.p.rapidapi.com/statistics?league=12&season=2018-2019&team=${id}`
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }
    }).then(resp => resp.json())
 return [data.response.team.name, data.response.games.wins.all.percentage]

}

//fetching the team Wins percentage - right team
async function getTeamWinsOddsB(id) {
    let _url = `https://api-basketball.p.rapidapi.com/statistics?league=12&season=2018-2019&team=${id}`
    const data = await fetch(_url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-basketball.p.rapidapi.com",
            "x-rapidapi-key": "57d232847cmsh0a9d72b14f80278p12121ajsn9ee235948318"
        }
    }).then(resp => resp.json())
 return [data.response.team.name,data.response.games.wins.all.percentage]

}



async function sumWinsPrecentages() {
    let firstW = await getInfoFromOptionOdds().then(id => getTeamWinsOdds(id))
    let secW = await getInfoFromOptionOddsB().then(id => getTeamWinsOddsB(id))
document.querySelector('.totalW').value = 
`TeamA: ${firstW[0]} ${firstW[1]}% To Win|| TeamB: ${secW[0]} ${secW[1]}% To Win`
document.querySelector(".team1").value = firstW[0]
document.querySelector(".team2").value = secW[0]
 document.querySelector('.outputLeft').innerHTML = `<div class="first">${firstW[0]} has  ${firstW[1]}% To Win </div><div class="sec">${secW[0]} has ${secW[1]}% To Win</div>`

if (firstW[1] > secW[1]){
    document.querySelector(".first").style.color = 'red'
} else { 
        document.querySelector(".sec").style.color = 'red'

}



}

