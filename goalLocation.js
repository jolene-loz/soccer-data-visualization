

    // width = 500 - margin.left - margin.right,
    // height = 300 - margin.top - margin.bottom;

d3.csv('game_goals_location_ontarget.csv', d3.autoType).then(data => {
    //filter team1
    // data = data.filter(data => data.team2 == team2)
    //data2 = data.filter(data => data.event_team == team2)
    console.log(data)

    const svg = d3.select('.goalLocation')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // let circles = svg.selectAll("circle")
    //     .data(data.location)
    //     .enter()
    //     .append("circle")
    //     .attr('cx', function(d, i){
    //         return d.x;
    //     })
    //     .attr("cy", (d,i)=>d.y)
    //     .attr("fill", "skyblue")
    //     .attr('r', 4);


    
})
