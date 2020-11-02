let team1 = document.querySelector("#Team1").value;
let team2 = document.querySelector("#Team2").value;

let margin = { top: 40, right: 20, bottom: 40, left: 90 },
width =
  500 -
  margin.left -
  margin.right,
height = 300 - margin.top - margin.bottom;

      width = width > 600 ? 600 : width;

      let svg = d3
      .select(".assistVis1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // AXIS

      let x = d3
      .scaleBand()
      .range([0, width])
      .paddingInner(0.1);

      let y = d3.scaleLinear().range([height, 0]);

      let xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(function(d) {
          return returnString(d,50);
      });

      let yAxis = d3.axisLeft().scale(y);

      let xAxisGroup = svg.append("g").attr("class", "x-axis axis");

      let yAxisGroup = svg.append("g").attr("class", "y-axis axis");

      let svg2 = d3
            .select(".assistVis2")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
            // AXIS
    
            let x2 = d3
            .scaleBand()
            .range([0, width])
            .paddingInner(0.1);
    
            let y2 = d3.scaleLinear().range([height, 0]);
    
            let xAxis2 = d3
            .axisBottom()
            .scale(x2)
            .tickFormat(function(d) {
                return returnString(d,50);
            });
    
            let yAxis2 = d3.axisLeft().scale(y2);
    
            let xAxisGroup2 = svg2.append("g").attr("class", "x-axis2 axis");
    
            let yAxisGroup2 = svg2.append("g").attr("class", "y-axis2 axis");

      function returnString(content) {
        return content;}

    let svgAssist = d3
      .select(".assistVis3")
      .append("svg")
      .attr('height',120)
      .attr('width', 230)
      .attr('border', 4)

function updateAssist(){
  console.log("HERE")
    team1 = document.querySelector("#Team1").value;
    team2 = document.querySelector("#Team2").value;
    d3.csv('assists.csv', d3.autoType).then(data => {
    
    //filter team1
    data = data.filter(data => data.event_team == team1 || data.event_team == team2)
   //data2 = data.filter(data => data.event_team == team2)

    console.log(data)
    //console.log(data1[0].assist4)

        x.domain(
            data.map(function(d) {
              return d.assists;
            })
          );
          y.domain([
            0,
            d3.max(data, function(d) {
              return d.goals;
            })
          ]);

          svg.selectAll(".legend")
                .remove()
                .exit()
                .data(data)
    
        // ---- DRAW BARS ----
        let bars = svg
            .selectAll(".bar")
            .remove()
            .exit()
            .data(data);

        //console.log(x.domain())

        bars
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill",function(d) {
                if (d.event_team == team1){
                    return 'blue';
                } else {
                    return 'red';
                }
            })
            .attr("x", function(d) {
                if (d.event_team == team1){
                    return x(d.assists);
                } else {
                    return x(d.assists) + 36;
                }
              })
              .attr("y", function(d) {
                return y(d.goals);
              })
              .attr("height", function(d) {
                return height - y(d.goals);
              })
            .attr("width", x.bandwidth()/2)
            .on("mouseenter", (event, d) => {
                const pos = d3.pointer(event, window)
                d3.selectAll('.tooltipAssist')
                    .style('display','inline-block')
                    .style('position','fixed')
                    .style('top', pos[1]+'px')
                    .style('left', pos[0]+'px')
                    .html(
                        'Successes: ' + d.goals 
                    )
            })
            .on("mouseleave", (event, d) => {
                d3.selectAll('.tooltipAssist')
                    .style('display','none')
                //console.log("HERE")
            });
    
        xAxisGroup = svg
            .select(".x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        yAxisGroup = svg.select(".y-axis").call(yAxis);

        svg.select("text.axis-title").remove();
        svg
            .append("text")
            .attr("class", "axis-title")
            .attr("x", 280)
            .attr("y", -15)
            .attr("dy", ".1em")
            .style("text-anchor", "end")
            .text("Number of Sucessful Assist Types Teams 1 and 2");

            svg
            .enter()
            .append('g')
            .attr("class", "legend")
            .attr('x', '10px')
            .attr('y','40px')
            .attr('height', '30px')
            .attr('width', '30px')

            svg.selectAll('.legend')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', function(d){
                if (d.event_team == team1){
                    return 'blue'
                } else {
                    return 'red'
                }
            }) 
            .attr('x', 215)
            .attr('y', function(d){
                
                    if (d.event_team == team1){
                return 25}
                    else{
                       return 55}
                    }

            )
            .attr('height', '20px')
            .attr('width','20px')
            
            svg.selectAll('.legend')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'legend')
            .attr('x', 250)
            .attr('y', function(d){
                if (d.event_team == team1){
                    return 42}
                        else{
                           return 70}
            })
            .text(function(d){
                if (d.event_team == team1){
                    return team1}
                        else{
                           return team2}
            })

            x2.domain(
                data.map(function(d) {
                  return d.assists;
                })
              );
              y2.domain([
                0,
                d3.max(data, function(d) {
                  return d.fails;
                })
              ]);
    
              svg2
                .selectAll(".legend")
                .remove()
                .exit()
                .data(data)

            // ---- DRAW BARS ----
            let bars2 = svg2
                .selectAll(".bar2")
                .remove()
                .exit()
                .data(data);

                

                
            //console.log(x.domain())
    
            bars2
                .enter()
                .append("rect")
                .attr("class", "bar2")
                .attr("fill",function(d) {
                    if (d.event_team == team1){
                        return 'blue';
                    } else {
                        return 'red';
                    }
                })
                .attr("x", function(d) {
                    if (d.event_team == team1){
                        return x2(d.assists);
                    } else {
                        return x2(d.assists) + 36;
                    }
                  })
                  .attr("y", function(d) {
                    return y2(d.fails);
                  })
                  .attr("height", function(d) {
                    return height - y2(d.fails);
                  })
                .attr("width", x2.bandwidth()/2)
                .on("mouseenter", (event, d) => {
                    const pos = d3.pointer(event, window)
                    d3.selectAll('.tooltipAssist')
                        .style('display','inline-block')
                        .style('position','fixed')
                        .style('top', pos[1]+'px')
                        .style('left', pos[0]+'px')
                        .html(
                            'Fails: ' + d.fails 
                        )
                })
                .on("mouseleave", (event, d) => {
                    d3.selectAll('.tooltipAssist')
                        .style('display','none')
                    //console.log("HERE")
                });
                
        
            xAxisGroup2 = svg2
                .select(".x-axis2")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis2);
    
            yAxisGroup2 = svg2.select(".y-axis2").call(yAxis2);
    
            svg2.select("text.axis-title").remove();
            svg2
                .append("text")
                .attr("class", "axis-title")
                .attr("x", 290)
                .attr("y", -15)
                .attr("dy", ".1em")
                .style("text-anchor", "end")
                .text("Number of Failed Assist Types Teams 1 and 2");

                svg2
                .enter()
                .append('g')
                .attr("class", ".legend")
                .attr('x', '10px')
                .attr('y','40px')
                .attr('height', '30px')
                .attr('width', '30px')
    
                svg2.selectAll('.legend')
                .data(data)
                .enter()
                .append('rect')
                .attr('fill', function(d){
                    if (d.event_team == team1){
                        return 'blue'
                    } else {
                        return 'red'
                    }
                }) 
                .attr('x', 214)
                .attr('y', function(d){
                    
                        if (d.event_team == team1){
                    return 25}
                        else{
                           return 55}
                        }
    
                )
                .attr('height', '20px')
                .attr('width','20px')
                
                svg2.selectAll('.legend')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'legend')
                .attr('x', 250)
                .attr('y', function(d){
                    if (d.event_team == team1){
                        return 42}
                            else{
                               return 70}
                })
                .text(function(d){
                    if (d.event_team == team1){
                        return team1}
                            else{
                               return team2}
                })

                svgAssist
                .append('text')
                .attr('x', 30)
                .attr('y',20)
                .text("Assist 0 = Unassisted goal")

                svgAssist
                .append('text')
                .attr('x', 30)
                .attr('y',40)
                .text("Assist 1 = Pass")

                svgAssist
                .append('text')
                .attr('x', 30)
                .attr('y',60)
                .text("Assist 2 = Cross")

                svgAssist
                .append('text')
                .attr('x', 30)
                .attr('y',80)
                .text("Assist 3 = Headed Pass")

                svgAssist
                .append('text')
                .attr('x', 30)
                .attr('y',100)
                .text("Assist 4 = Through Ball")

                // svgAssist.append("rect")
       			// .attr("x", 0)
       			// .attr("y", 0)
       			// .attr("height", 100)
       			// .attr("width", 100)
       			// .style("stroke", black)
       			// .style("fill", "none")
       			// .style("stroke-width", 4);
            

            
            
    
            // x2.domain(
            //     data.map(function(d) {
            //       return d.assists;
            //     })
            //   );
            //   y2.domain([
            //     0,
            //     d3.max(data, function(d) {
            //       return d.goals;
            //     })
            //   ]);
    
            // ---- DRAW BARS ----
           /* let bars2 = svg2
                .selectAll(".bar")
                .remove()
                .exit()
                .data(data2);
    
            //console.log(x.domain())
    
            bars2
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("fill","red")
                .attr("x", function(d) {
                    return x2(d.assists);
                  })
                  .attr("y", function(d) {
                    return y2(d.goals);
                  })
                  .attr("height", function(d) {
                    return height - y2(d.goals);
                  })
                .attr("width", x.bandwidth())
                // .on("mouseover", function(event, d) {
                // //Get this bar's x/y values, then augment for the tooltip
                // let xPosition =
                //     margin.left +
                //     width / 2 +
                //     parseFloat(d3.select(this).attr("x")) +
                //     x.bandwidth() / 2;
                // let yPosition =
                //     margin.top + parseFloat(d3.select(this).attr("y")) / 2 + height;
                // })
                //Update the tooltip position and value
                // d3.select("#tooltip")
                //     .style("left", xPosition + "px")
                //     .style("top", yPosition + "px")
                //     .select("#value")
                //     .text(d.Visitors);
    
                // //Show the tooltip
                // d3.select("#tooltip").classed("hidden", false);
                // })
                // .on("mouseout", function(d) {
                // //Hide the tooltip
                // d3.select("#tooltip").classed("hidden", true);
                // });
    
            // ---- DRAW AXIS	----
            xAxisGroup2 = svg2
                .select(".x-axis2")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis2);
    
            yAxisGroup2 = svg2.select(".y-axis2").call(yAxis2);
    
            svg2.select("text.axis-title").remove();
            svg2
                .append("text")
                .attr("class", "axis-title")
                .attr("x", 150)
                .attr("y", -15)
                .attr("dy", ".1em")
                .style("text-anchor", "end")
                .text("Successful Assist Types Team 2");

            
        
                x3.domain(
                    data.map(function(d) {
                      return d.assists;
                    })
                  );
                  y3.domain([
                    0,
                    d3.max(data, function(d) {
                      return d.fails;
                    })
                  ]);
        
                // ---- DRAW BARS ----
                let bars3 = svg3
                    .selectAll(".bar")
                    .remove()
                    .exit()
                    .data(data1);
        
                //console.log(x.domain())
        
                bars3
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("fill","blue")
                    .attr("x", function(d) {
                        return x3(d.assists);
                      })
                      .attr("y", function(d) {
                        return y3(d.fails);
                      })
                      .attr("height", function(d) {
                        return height - y3(d.fails);
                      })
                    .attr("width", x.bandwidth())
                    // .on("mouseover", function(event, d) {
                    // //Get this bar's x/y values, then augment for the tooltip
                    // let xPosition =
                    //     margin.left +
                    //     width / 2 +
                    //     parseFloat(d3.select(this).attr("x")) +
                    //     x.bandwidth() / 2;
                    // let yPosition =
                    //     margin.top + parseFloat(d3.select(this).attr("y")) / 2 + height;
                    // })
                    //Update the tooltip position and value
                    // d3.select("#tooltip")
                    //     .style("left", xPosition + "px")
                    //     .style("top", yPosition + "px")
                    //     .select("#value")
                    //     .text(d.Visitors);
        
                    // //Show the tooltip
                    // d3.select("#tooltip").classed("hidden", false);
                    // })
                    // .on("mouseout", function(d) {
                    // //Hide the tooltip
                    // d3.select("#tooltip").classed("hidden", true);
                    // });
        
                // ---- DRAW AXIS	----
                xAxisGroup3 = svg3
                    .select(".x-axis3")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis3);
        
                yAxisGroup3 = svg3.select(".y-axis3").call(yAxis3);
        
                svg3.select("text.axis-title").remove();
                svg3
                    .append("text")
                    .attr("class", "axis-title")
                    .attr("x", 150)
                    .attr("y", -15)
                    .attr("dy", ".1em")
                    .style("text-anchor", "end")
                    .text("Failed Assist Types Team 1");
        
                  
        
                x4.domain(
                    data.map(function(d) {
                      return d.assists;
                    })
                  );
                  y4.domain([
                    0,
                    d3.max(data, function(d) {
                      return d.fails;
                    })
                  ]);
        
                // ---- DRAW BARS ----
                let bars4 = svg4
                    .selectAll(".bar")
                    .remove()
                    .exit()
                    .data(data2);
        
                //console.log(x.domain())
        
                bars4
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("fill","red")
                    .attr("x", function(d) {
                        return x4(d.assists);
                      })
                      .attr("y", function(d) {
                        return y4(d.fails);
                      })
                      .attr("height", function(d) {
                        return height - y4(d.fails);
                      })
                    .attr("width", x.bandwidth())
                    // .on("mouseover", function(event, d) {
                    // //Get this bar's x/y values, then augment for the tooltip
                    // let xPosition =
                    //     margin.left +
                    //     width / 2 +
                    //     parseFloat(d3.select(this).attr("x")) +
                    //     x.bandwidth() / 2;
                    // let yPosition =
                    //     margin.top + parseFloat(d3.select(this).attr("y")) / 2 + height;
                    // })
                    //Update the tooltip position and value
                    // d3.select("#tooltip")
                    //     .style("left", xPosition + "px")
                    //     .style("top", yPosition + "px")
                    //     .select("#value")
                    //     .text(d.Visitors);
        
                    // //Show the tooltip
                    // d3.select("#tooltip").classed("hidden", false);
                    // })
                    // .on("mouseout", function(d) {
                    // //Hide the tooltip
                    // d3.select("#tooltip").classed("hidden", true);
                    // });
        
                // ---- DRAW AXIS	----
                xAxisGroup4 = svg4
                    .select(".x-axis4")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis4);
        
                yAxisGroup4 = svg4.select(".y-axis4").call(yAxis4);
        
                svg4.select("text.axis-title").remove();
                svg4
                    .append("text")
                    .attr("class", "axis-title")
                    .attr("x", 150)
                    .attr("y", -15)
                    .attr("dy", ".1em")
                    .style("text-anchor", "end")
                    .text("Failed Assist Types Team 2");
*/
            

})
}