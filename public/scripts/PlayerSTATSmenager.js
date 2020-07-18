//extract the stats we desire to represent to the user
const createStats = (_ar) => {
    _ar.map(item => {
        let stat = new PLAYER(item.data.data[0].pts, item.data.data[0].ast, item.data.data[0].reb, item.data.data[0].stl, item.data.data[0].fga, item.data.data[0].fgm, item.data.data[0].min, item.data.data[0].season);

        //Using a Chart.js Chart to display the Data
        const ctx = document.getElementById('Stat-chart').getContext('2d');
        //specifing the String value of each chart's bar
        const STATSINFO = ['POINTS', 'ASSISTS', 'REBOUND', 'STEALS', 'ATTEMPTS', 'MADE']
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: STATSINFO,
                datasets: [{
                    //pushing the data from the create stats function into the chart
                    data: [stat.pts, stat.ast, stat.reb, stat.stl, stat.attempt, stat.made],
                    //color of each bar by order
                    backgroundColor: [
                        'rgba(0, 125, 199, 0.7)',
                        'rgba(198, 207, 213, 0.7)',
                        'rgba(0,0,0, 0.8)',
                        'rgba(97, 138, 187, 0.7)',
                        'rgba(1, 24, 64, 0.7)',
                        'rgba(111, 33, 47, 0.8)',
                    ],
                    //color of bar border of each
                    borderColor: [
                        'rgba(0,0,0, 0.8)',
                        'rgba(0,0,0, 0.8)',
                        'rgba(0,0,0, 0.8)',
                        'rgba(0,0,0, 0.8)',
                        'rgba(0,0,0, 0.8)',
                        'rgba(0,0,0, 0.8)',


                    ],
                    borderWidth: 1
                }]
            },
            options: {
                tooltips: {
                    titleFontFamily: "Graduate",
                    titleFontSize: 40,
                    bodyFontFamily: "Graduate",
                    bodyFontSize: 25,
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(0,0,0)',
                        fontSize: 30,
                        boxWidth: 0,

                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            //creating the loading effect
                            beginAtZero: true,
                            fontSize: 30,
                            fontFamily: "Graduate",

                        }
                    }],
                    yAxes: [{
                        ticks: {
                            //creating the loading effect
                            beginAtZero: true,
                            fontSize: 30,
                            fontFamily: "Graduate",

                        }
                    }]
                }

            }
        });


    })
}




const CreateTeamStats = (myObj) => {
    //entries is returning an array of given objects key : value ==> {a:'guy',b:'harel'} into ==> [['a', 'guy'], ['b', 'harel']]
    myObj = (Object.entries(myObj))
    console.log(myObj)
    Object.keys(myObj).map(() => { //returns the names of the enumerable props names, by that { 0: 'a', 1: 'b', 2: 'c' }; == > ['0', '1', '2']

        let ptsAvg = myObj[4][1].against.average.all;
        let gamesPlayed = myObj[3][1].played.all;
        let gamesW = myObj[3][1].wins.all.total;
        let gamesL = myObj[3][1].loses.all.total;


        //Using a Chart.js Chart to display the Data
        const ctx = document.getElementById('teamStat-chart').getContext('2d');
        //specifing the String value of each chart's bar
        const STATSINFO = ['Points-avg', 'Games-Played', 'Games-Wins', 'Games-Loses']
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: STATSINFO,
                datasets: [{
                    label: 'AVG',
                    //pushing the data from the create stats function into the chart
                    data: [ptsAvg, gamesPlayed, gamesW, gamesL],
                    //color of each bar by order
                    backgroundColor: [
                        'rgba(0, 125, 199, 0.7)',
                        'rgba(198, 207, 213, 0.7)',
                        'rgba(0,0,0, 0.8)',
                        'rgba(97, 138, 187, 0.7)',
                    ],
                    //color of bar border of each
                    borderColor: [
                        'rgba(85,37,130, 0.4)',
                        'rgba(253,185,39, 0.4)',
                        'rgba(0,0,0, 0.4)',
                        'rgba(85,37,130, 0.4)',
                        'rgba(253,185,39, 0.4)',
                        'rgba(253,185,39, 0.4)',
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                tooltips: {
                    titleFontFamily: "Graduate",
                    titleFontSize: 40,
                    bodyFontFamily: "Graduate",
                    bodyFontSize: 25,
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        fontColor: 'rgb(0,0,0)',
                        fontSize: 30,
                        boxWidth: 0,

                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            //creating the loading effect
                            beginAtZero: true,
                            fontSize: 30,
                            fontFamily: "Graduate",

                        }
                    }],
                    yAxes: [{
                        ticks: {
                            //creating the loading effect
                            beginAtZero: true,
                            fontSize: 30,
                            fontFamily: "Graduate",

                        }
                    }]
                }

            }
        });


    })
}

//Important to go over Chart.js docs to see its full potential,here is VERY low options involved.


const createLiveScore = (_arr) => {
    console.log(_arr)
    _arr.map(item => {
        let score = new Live("#parent", item.teams.home.name, item.teams.away.name, item.scores.home.quarter_1, item.scores.away.quarter_1,
            item.scores.home.quarter_2, item.scores.away.quarter_2, item.scores.home.quarter_3, item.scores.away.quarter_3, item.scores.home.total,
            item.scores.away.total)
        score.renderLive();
    })
    /*   let score = new Live("#parent", _arr[0], _arr[1], _arr[2], _arr[3], _arr[4], _arr[5], _arr[6],_arr[7], _arr[8],_arr[9]);
      score.renderLive(); */

}


const getLeagueOptions = (_arr) => {
    _arr.map(item => {
        let name = new LiveID(item.name, item.id)
        name.renderId();


    })


}