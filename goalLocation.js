

let svg4 = d3
  .select(".goalLocation")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


let svg5 = d3
  .select(".goalLocation2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.select('svg4').remove()
d3.select('svg5').remove()

function updateGoal(){

  let margin = { top: 40, right: 20, bottom: 40, left: 90 },
width = 500 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

  
  let team1 = document.querySelector("#Team1").value;
  let team2 = document.querySelector("#Team2").value;

  console.log(team1)


  svg4.select("text.axis-title").remove();
  svg4
  .append("text")
  .attr("class", "axis-title")
  .attr("x", 280)
  .attr("y", -15)
  .attr("dy", ".1em")
  .style("text-anchor", "end")
  .text("Locations where a goal was made for Team 1");

  svg5.select("text.axis-title").remove();
  svg5
  .append("text")
  .attr("class", "axis-title")
  .attr("x", 280)
  .attr("y", -15)
  .attr("dy", ".1em")
  .style("text-anchor", "end")
  .text("Locations where a goal was made for Team 2");



  d3.csv('game_goals_location_ontarget.csv', d3.autoType).then(data => {
    console.log(data)


      data1 = data.filter(data => data.team1_name == team1)
      data2 = data.filter(data => data.team2_name == team2)

      console.log(data2)
      console.log("Team 1 Data", data1)
      console.log("Team 2 Data", data2)

      let location_dict_1 = {};
      let location_dict_2 = {};

      let location_info = {
        1: "Attacking half",
        2: "Defensive half",
        3: "Centre of the box",
        4: "Left Wing",
        5:	"Right wing",
        6:	"Difficult angle and long range",
        7:	"Difficult angle on the left",
        8:	"Difficult angle on the right",
        9:	"Left side of the box",
        10:	"Left side of the six yard box",
        11:	"Right side of the box",
        12:	"Right side of the six yard box",
        13:	"Very close range",
        14:	"Penalty spot",
        15:	"Outside the box",
        16:	"Long range",
        17:	"More than 35 yards",
        18:	"More than 40 yards",
        19:	"Not recorded"
      }

      // let keyname = location_info[key]

      //=== Team 1 ===

      // count how much each location occurs in goals made and store in location_dict
      data1.forEach(function(d) {
          var location = d.location;
          var keyname = location_info[location];
          if(location_dict_1[keyname] === undefined) {
            location_dict_1[keyname] = 0;
          } else {
            location_dict_1[keyname] = location_dict_1[keyname] + 1;
          }
      });
      // now store the count in each data member
      data1.forEach(function(d) {
          var location = d.location;
          var keyname = location_info[location];
          d.count = location_dict_1[keyname];
          if (d.count === 0){
            delete location_dict_1[keyname]
          }
      });

      console.log("Location 1", location_dict_1)


      let radiusVals1 = Object.keys(location_dict_1).map(function(key){
        return {radius: location_dict_1[key]*5 + 30, name: key};
      });

      console.log("Radius Values", radiusVals1)

      // === Team 2 ===
      // count how much each city occurs in list and store in countObj
      data2.forEach(function(d) {
        var location = d.location;
        var keyname = location_info[location];
        if(location_dict_2[keyname] === undefined) {
          location_dict_2[keyname] = 0;
        } else {
          location_dict_2[keyname] = location_dict_2[keyname] + 1;
        }
      });
      // now store the count in each data member
      data2.forEach(function(d) {
          var location = d.location;
          var keyname = location_info[location];
          d.count = location_dict_2[keyname];
          if (d.count === 0){
            delete location_dict_2[keyname]
          }
      });

      console.log("Location 2", location_dict_2)

      let radiusVals2 = Object.keys(location_dict_2).map(function(key){
        return {radius: location_dict_2[key]*5 + 30, name: key};
      });

      console.log("Radius Values 2", radiusVals2)

      let totalRadiusVals = Object.assign([], radiusVals2, radiusVals2);

      console.log(totalRadiusVals)


      var labels1 = svg4.selectAll('circle')
      .data(radiusVals1)
      .enter()
      .append("text")
      .text((d,i) => d.name)
      .attr('text-anchor', "middle")
      .attr('font-size', 10)
    
      
    var simulation1 = d3.forceSimulation(radiusVals1)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
      }))
      .on('tick', ticked1)
      .restart();

    
    

    // labels1.select("text").remove();
    

    function ticked1() {

      svg4.selectAll(".goalLocation")
        .remove()
        .exit()
        .data(radiusVals1)

      svg5.selectAll(".goalLocation2")
        .remove()
        .exit()
        .data(radiusVals2)

      var team1 = svg4
        .selectAll('circle')
        .data(radiusVals1)

      team1.enter()
        .append('circle')
        .attr('r', function(d) {
          return d.radius
        })
        .merge(team1)
        .attr('cx', function(d) {
          return d.x
        })
        .attr('cy', function(d) {
          return d.y
        })
        .attr('fill', 'blue')
        .on("mouseenter", (event, d) => {
          const pos = d3.pointer(event, window)
          d3.selectAll('.tooltipAssist')
              .style('display','inline-block')
              .style('position','fixed')
              .style('top', pos[1]+'px')
              .style('left', pos[0]+'px')
              .html(
                  '# of Goals: ' + d.radius
                )
              })
              .on("mouseleave", (event, d) => {
                  d3.selectAll('.tooltipAssist')
                      .style('display','none')
                  //console.log("HERE")
              });

      labels1.attr('x',(d) => {
        return d.x
      })
      .attr('y', (d) => {
        return d.y
      })

      team1.exit().remove()

    }

    var simulation2 = d3.forceSimulation(radiusVals2)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
      }))
      .on('tick', ticked2)
      .restart()

      var labels2 = svg5.selectAll('circle')
      .data(radiusVals2)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr('text-anchor', "middle")
      .attr('font-size', 10)

    function ticked2() {
      svg5.selectAll(".goalLocation2")
        .remove()
        .exit()
        .data(radiusVals2)

      var team2 = svg5
                .selectAll("circle")
                .data(radiusVals2);

       team2.enter()
            .append('circle')
            .attr('r', function(d) {
              return d.radius
            })
            .merge(team2)
            .attr('cx', function(d) {
              return d.x
            })
            .attr('cy', function(d) {
              return d.y
            })
            .attr('fill', 'red')
            .on("mouseenter", (event, d) => {
              const pos = d3.pointer(event, window)
              d3.selectAll('.tooltipAssist')
                  .style('display','inline-block')
                  .style('position','fixed')
                  .style('top', pos[1]+'px')
                  .style('left', pos[0]+'px')
                  .html(
                      '# of Goals: ' + d.radius
                    )
                  })
                  .on("mouseleave", (event, d) => {
                      d3.selectAll('.tooltipAssist')
                          .style('display','none')
                      //console.log("HERE")
                  });

        
      labels2.attr('x',(d) => {
        return d.x
      })
      .attr('y', (d) => {
        return d.y
      });
        
      team2.exit().remove()
    }

         
  })

 
}

