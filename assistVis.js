let team1 = document.querySelector("#Team1").value;
let team2 = document.querySelector("#Team2").value;

d3.csv('assists.csv', d3.autoType).then(data => {
    
    //filter team1
    data1 = data.filter(data => data.event_team == team1)
    data2 = data.filter(data => data.event_team == team2)

    console.log(data1, data2)
    //console.log(data1[0].assist4)

    let margin = { top: 40, right: 20, bottom: 40, left: 90 },
  width =
    400 -
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

        // ---- DRAW BARS ----
        let bars = svg
            .selectAll(".bar")
            .remove()
            .exit()
            .data(data1);

        //console.log(x.domain())

        bars
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill","blue")
            .attr("x", function(d) {
                return x(d.assists);
              })
              .attr("y", function(d) {
                return y(d.goals);
              })
              .attr("height", function(d) {
                return height - y(d.goals);
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
        xAxisGroup = svg
            .select(".x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        yAxisGroup = svg.select(".y-axis").call(yAxis);

        svg.select("text.axis-title").remove();
        svg
            .append("text")
            .attr("class", "axis-title")
            .attr("x", 100)
            .attr("y", -15)
            .attr("dy", ".1em")
            .style("text-anchor", "end")
            .text("Assist Types Team 1");

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
    
            let yAxis2 = d3.axisLeft().scale(y);
    
            let xAxisGroup2 = svg2.append("g").attr("class", "x-axis2 axis");
    
            let yAxisGroup2 = svg2.append("g").attr("class", "y-axis2 axis");
    
            x2.domain(
                data.map(function(d) {
                  return d.assists;
                })
              );
              y2.domain([
                0,
                d3.max(data, function(d) {
                  return d.goals;
                })
              ]);
    
            // ---- DRAW BARS ----
            let bars2 = svg2
                .selectAll(".bar")
                .remove()
                .exit()
                .data(data2);
    
            //console.log(x.domain())
    
            bars2
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("fill","blue")
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
                .attr("x", 100)
                .attr("y", -15)
                .attr("dy", ".1em")
                .style("text-anchor", "end")
                .text("Assist Types Team 2");

            function returnString(content) {
                return content;}

})