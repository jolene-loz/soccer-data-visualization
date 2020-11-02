import {HeatMap} from './HeatMap.js';

var csvdata;

var data = d3.csv('team_scores_agg_directional_with_league.csv', d3.autoType).then(data => {
    console.log("reached data loading")
    csvdata = data;
    console.log(data);
    var heatmap = HeatMap('.heatmap');
    d3.select("#league")
        .on('change', (event,d)=>{
            var league = event.target.value;
            console.log("new type selected: ", league);
            heatmap.update(data, league);
        })
    heatmap.update(data, 'England');

    
});