let margin = { top: 40, right: 20, bottom: 100, left: 90 };
let width = 800 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;
let svg4 = d3
  .select(".goalLocation")
  .append("svg")
  .attr("width", 400 + margin.left + margin.right)
  .attr("height", 800 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


let svg5 = d3
  .select(".goalLocation2")
  .append("svg")
  .attr("width", 400 + margin.left + margin.right)
  .attr("height", 600 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var labelList1 = []
  var labelList2 = []
d3.select('svg4').remove()
d3.select('svg5').remove()

export function updateGoal(team1, team2){

  svg5.selectAll('.label2').remove()
  svg4.selectAll('.label1').remove()
  labelList2 = []
  labelList1 = []


  let margin = { top: 40, right: 20, bottom: 100, left: 90 },
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

  
  // let team1 = document.querySelector("#Team1").value;
  // let team2 = document.querySelector("#Team2").value;

  console.log(team1)
 

    if (team1 != team2){
      svg5.attr('opacity', 1)
    } else {
      svg5.attr('opacity', 0)
    }
  

  d3.csv('game_goals_location_ontarget.csv', d3.autoType).then(data => {
    console.log(data)


      var data1 = data.filter(data => data.team1_name == team1)
      var data2 = data.filter(data => data.team2_name == team2)

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
        5:  "Right wing",
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
        18:	"More than 40 yards"
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
        return {radius: location_dict_1[key] + 20, name: key};
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
        return {radius: location_dict_2[key]+ 20, name: key};
      });

      console.log("Radius Values 2", radiusVals2)

      let totalRadiusVals = Object.assign([], radiusVals2, radiusVals2);

      console.log(totalRadiusVals)
    
      
    var simulation1 = d3.forceSimulation(radiusVals1)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius + 10
      }))
      .on('tick', ticked1)
      .restart();

    // labels1.select("text").remove();
    

    function ticked1() {
     // svg5.selectAll('.label1').remove()

      //labelList1 = []

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
          if (d.name === "Centre of the box"){
            return d.x - 275
         } else if (d.name === 'Very close range'){
           return d.x - 278
         }
        })
        .attr('cy', function(d) {
          if (d.name === "Centre of the box"){
             return d.y - 50
          } else if (d.name === 'Very close range'){
            return d.y - 110
          })
    

        .attr('fill', d3.color('rgb(103, 0, 31)'))
        .attr('opacity', 0.8)
        .attr('class', 'circle1')
        .on("mouseenter", (event, d) => {
          const pos = d3.pointer(event, window)
          d3.selectAll('.tooltipAssist')
              .style('display','block')
              .style('position','fixed')
              .style('top', event.clientY + 'px')
              // .style('top', pos[1]+'px')
              .style('left', pos[0]+'px')
              .html(
                  '# of Goals: ' + (d.radius - 20)
                )
              })
              .on("mouseleave", (event, d) => {
                  d3.selectAll('.tooltipAssist')
                      .style('display','none')
                  //console.log("HERE")
              });

              var labels1 = svg4.selectAll('circle1')
              .data(radiusVals1)
              .enter()
              .append("text")
              .attr('class', 'label1')
              .style('font-weight', 'bold')
              .text(function (d){
                if (!labelList1.includes(d.name)){
                  labelList1.push(d.name)
                  // console.log(labelList2)
                  return d.name
                }})
              .attr('text-anchor', "middle")
              .attr('font-size', 10)

      labels1.attr('x',(d) => {
        return d.x - 200
      })
      .attr('y', (d) => {
        return d.y - 10
      })

      team1.exit().remove()

    }

    var simulation2 = d3.forceSimulation(radiusVals2)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius + 10
      }))
      .on('tick', ticked2)
      .restart()

    
     

    function ticked2() {
      //svg5.selectAll('.label2').remove()
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
              if (d.name === "Centre of the box"){
                return d.x - 275
             } else if (d.name === 'Very close range'){
               return d.x - 278
             }
            })
            .attr('cy', function(d) {
              if (d.name === "Centre of the box"){
                 return d.y - 50
              } else if (d.name === 'Very close range'){
                return d.y - 110
              }
            })
            .attr('fill', d3.color('rgb(5, 48, 97)'))
            .attr('opacity', 0.8)
            .attr('class','circle2')
            .on("mouseenter", (event, d) => {
              console.log(event);
              console.log(d);
              const pos = d3.pointer(event, window)
              d3.selectAll('.tooltipAssist')
                  .style('display','block')
                  .style('position','fixed')
                  .style('top', event.clientY + 'px')
                  // .style('top', pos[1]+'px')
                  .style('left', pos[0]+'px')
                  .html(
                      '# of Goals: ' + (d.radius - 20)
                    )
                  })
                  .on("mouseleave", (event, d) => {
                      d3.selectAll('.tooltipAssist')
                          .style('display','none')
                      //console.log("HERE")
                  });
          
          var labels2 = svg5.selectAll('circle2')
                  .data(radiusVals2)
                  .enter()
                  .append("text")
                  .attr('class', 'label2')
                  .attr('width', 20)
                  .style('font-weight', 'bold')
                  .text(function (d){
                    if (!labelList2.includes(d.name)){
                      labelList2.push(d.name)
                      // console.log(labelList2)
                      return d.name
                    }})
                  .attr('text-anchor', 'middle')
                  .attr('font-size', 10)

        
      labels2.attr('x',(d) => {
        return d.x - 200
      })
      .attr('y', (d) => {
        return d.y - 10
      });
 
      team2.exit().remove()
    }

         
  })

 
}