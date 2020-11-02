export function HeatMap(container){// selector for a chart container e.g., ".chart"

    // initialization
    var listeners = { brushed: null };

    //create svg with margin convention
    const margin = ({top: 20, right: 20, bottom: 100, left: 100});
    const w = 800 - margin.left - margin.right;
    const h = 800 - margin.top - margin.bottom;
    
    var svg = d3.selectAll(container)
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var teams;

    //define scales without domains
    var teamScale = d3.scaleBand()
        .range([0,w]);
    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateRdBu)
        .domain([1,-1])
    
        //create axes
    var xAxis = d3.axisBottom()
        .tickSize(0)
        .scale(teamScale);

    var yAxis = d3.axisLeft()
        .tickSize(0)    
        .scale(teamScale);
    
    var xAxisDisplay = svg.append("g")
        .attr('class', 'axis x-axis');

    var yAxisDisplay = svg.append('g')
        .attr('class', 'axis y-axis');

    var tooltip = d3.select(".tooltip")
        .style('display', 'none')
        .style('position', 'fixed')
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style('pointer-events', 'none');

    var tooltiptext = function(d){
        const pt1 = d.target.__data__.team1 + " against " + d.target.__data__.team2 + "<br>Outcome ratio: " + d.target.__data__.outcome_ratio.toFixed(2) ;
        let pt2;
        if (d.target.__data__.outcome_ratio >= 0){
            pt2 = "<br>" + d.target.__data__.team1 + " wins " + Math.round(d.target.__data__.outcome_ratio * 100) + " % of the time.";
        }
        else{
            pt2 = "<br>" + d.target.__data__.team1 + " loses " + Math.round(d.target.__data__.outcome_ratio *100 *-1) + "% of the time."
        }
        return pt1 + pt2;
    }
    var mouseover = function(d) {
        const pos = d3.pointer(event);
        console.log(pos);
        tooltip
            .style('display', 'block')
            .html(tooltiptext(d))
            .style('top', pos[1] + "px")
            .style('left', pos[0] + "px");
    };
    var mouseleave = function(d) {
        tooltip
            .style('display', 'none')
    };

    var legend = svg.append("g");

    //create update function
    function update(_data, league){ 
        console.log(league);
        var data = _data.filter(d =>d.league == league);
        data.map(d=>{d.outcome_ratio = (d.num_won + -1*(d.num_games-d.num_won))/d.num_games;});
        console.log(data);
        teams = new Set(data.map(d=>d.team1).sort().concat(data.map(d=>d.team2).sort()));
        console.log(teams);
        
        //update scale domains
        teamScale.domain(teams);

        const squares = svg.selectAll(".square")
            .data(data);
            
        squares.enter()
            .append("rect")
            .attr("class", "square")
            .merge(squares)
            .attr("x",d=>teamScale(d.team2))
            .attr("y", d=>teamScale(d.team1))
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", teamScale.bandwidth() )
            .attr("height", teamScale.bandwidth() )
            .style("fill", function(d) { return myColor(d.outcome_ratio )})
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on('mouseover', d=>mouseover(d))
            .on('mouseleave', mouseleave);
        
        squares.exit()
            .transition()
            .duration(100)
            .remove();
        
        xAxisDisplay
            .call(xAxis)
            .attr("transform", `translate(0, ${h})`)
            .selectAll("text")
                .attr("y", 0)
                .attr("x", 9)
                .attr("dy", ".35em")
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start");
        xAxisDisplay.select(".domain").remove();
    
        yAxisDisplay
            .call(yAxis)
            .select(".domain").remove();
    }
    function on(event, listener) {
		listeners[event] = listener;
    }
	return {
		update,
		on
	}
};