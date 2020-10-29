let team1 = document.querySelector("#Team1").value;
let team2 = document.querySelector("#Team2").value;

d3.csv('games_goals_location.csv', d3.autoType).then(data => {
    console.log(data)
});