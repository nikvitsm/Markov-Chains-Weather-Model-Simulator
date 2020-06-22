function createSvgElement(tagName) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

function Application() {
  "use strict"
  var app = this;

  this.model = new Model();
  this.stateMargin = 30;
  //this.stateSize = 50;
  this.stateSize = 75;
  //this.arrowSize = 5;
  this.arrowSize = 15;
  this.stateFontSize = 20;
  this.nstates = 6;
  //this.showPlot = false;
  //this.samplePath = [[0, 0]];
  this.isRunning = false;
  this.stepped = false;

  //
  var i = 0;
  var ii = 0;
  //var colors = ["Yellow", "Blue", "Red", "Green", "Gray", "Pink", "Violet"];
  var colors = ["Gold", "CadetBlue", "Red", "Green", "Gray", "Pink", "Violet"];
  //var weathers = ["Sunny", "Cloudy", "Windy", "Rainy", "Stormy", "Snowy"];
  var weathers = ["Sunny", "Cloudy", "Windy", "Rainy", "Stormy", "Haily"];
  var visits = [0, 0, 0, 0, 0, 0];
  var percentages = [0, 0, 0, 0, 0, 0];
  var chart;
  var reset = false;
  //var valuesText = [];

  //
  var unkw = [];
  var eq = [];

  /*
  var eq0 = unkw[0] + " =";
  var eq1 = unkw[1] + " =";
  var eq2 = unkw[2] + " =";
  var eq3 = unkw[3] + " =";
  var eq4 = unkw[4] + " =";
  var eq5 = unkw[5] + " =";
  */



  window.onload = function () {
    CanvasJS.addColorSet("myColors",
                [//colorSet Array
                 colors[0],
                 colors[1],
                 colors[2],
                 colors[3],
                 colors[4],
                 colors[5]                
                ]);


    chart = new CanvasJS.Chart("chartContainer0", {
      theme: "light1", // "light2", "dark1", "dark2"
      colorSet: "myColors",
      animationEnabled: false, // change to true		
      data: [
      {
        // Change type to "bar", "area", "spline", "pie",etc.
        bevelEnabled: true,
        type: "column",
        toolTipContent: "<img src=\"Beautified-Version/graphics/\"{label}.gif\"\" style=\"width:40px; height:20px;\"> <br><b>{label}</b>: {y}",
        dataPoints: [
          { label: weathers[0],  y: visits[0]  },
          { label: weathers[1], y: visits[1]  },
          { label: weathers[2], y: visits[2]  },
          { label: weathers[3],  y: visits[3]  },
          { label: weathers[4],  y: visits[4]  },
          { label: weathers[5],  y: visits[5]  }
        ]
      }
      ]
    });
    chart.render();

    //
    var pieChart = new CanvasJS.Chart("chartContainer1", {
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      colorSet: "myColors",
      exportEnabled: true,
      animationEnabled: false,
      title: {
        text: ""
      },
      data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<img src=\"Beautified-Version/graphics/\"{label}.gif\"\" style=\"width:40px; height:20px;\"> <br> <b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} {y}%",
        dataPoints: [
          { label: weathers[0],  y: percentages[0]  },
          { label: weathers[1], y: percentages[1]  },
          { label: weathers[2], y: percentages[2]  },
          { label: weathers[3],  y: percentages[3]  },
          { label: weathers[4],  y: percentages[4]  },
          { label: weathers[5],  y: percentages[5]  }
        ]
      }]
    });
    pieChart.render();
    
    //
    var dataPoints0 = [];
    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];

    var lineChart = new CanvasJS.Chart("chartContainer2", {
      //theme: "light2", // "light1", "light2", "dark1", "dark2"
      colorSet: "myColors",
      animationEnabled: true,
      title:{
        text: ""  
      },
      subtitles: [{
        text: "Try Clicking and Hovering over Legends!"
      }],
      axisX: {
        lineColor: "black",
        labelFontColor: "black"
      },
      axisY2: {
        gridThickness: 0,
        title: "",
        titleFontColor: "black",
        labelFontColor: "black"
      },
      legend: {
        cursor: "pointer",
        itemmouseover: function(e) {
          e.dataSeries.lineThickness = e.chart.data[e.dataSeriesIndex].lineThickness * 2;
          e.dataSeries.markerSize = e.chart.data[e.dataSeriesIndex].markerSize + 2;
          e.chart.render();
        },
        itemmouseout: function(e) {
          e.dataSeries.lineThickness = e.chart.data[e.dataSeriesIndex].lineThickness / 2;
          e.dataSeries.markerSize = e.chart.data[e.dataSeriesIndex].markerSize - 2;
          e.chart.render();
        },
        itemclick: function (e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: "spline",
        name: weathers[0],
        markerSize: 5,
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPoints0
      },
      {
        type: "spline",
        name: weathers[1],
        markerSize: 5,
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPoints1
      },
      {
        type: "spline",
        name: weathers[2],
        markerSize: 5,
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPoints2
      },
      {
        type: "spline",
        name: weathers[3],
        markerSize: 5,
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPoints3
      },
      {
        type: "spline",
        name: weathers[4],
        markerSize: 5,
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPoints4
      },      
      {
        type: "spline",
        name: weathers[5],
        markerSize: 5,
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: dataPoints5
      }]
    });
    lineChart.render();




    //
    function updateCharts() {
      if (!app.isRunning || !app.stepped) { return; }
      // var boilerColor, deltaY, yVal;
      var dps = chart.options.data[0].dataPoints;
      for (var i = 0; i < dps.length; i++) {
        dps[i] = { label: weathers[i],  y: visits[i]  };
        /*
        deltaY = Math.round(2 + Math.random() *(-2-2));
        yVal = deltaY + dps[i].y > 0 ? dps[i].y + deltaY : 0;
        boilerColor = yVal > 200 ? "#FF2500" : yVal >= 170 ? "#FF6000" : yVal < 170 ? "#6B8E23 " : null;
        dps[i] = {label: "Boiler "+(i+1) , y: yVal, color: boilerColor};
        */
      }
      var pieDps = pieChart.options.data[0].dataPoints;
      for (var i = 0; i < pieDps.length; i++) {
        pieDps[i] = { label: weathers[i],  y: percentages[i]  };
      }

      var numberOfsteps = app.model.get("steps");    
      	// pushing the new values
        dataPoints0.push({
          x: numberOfsteps,
          y: visits[0]
        });
        dataPoints1.push({
          x: numberOfsteps,
          y: visits[1]
        });
        dataPoints2.push({
          x: numberOfsteps,
          y: visits[2]
        });
        dataPoints3.push({
          x: numberOfsteps,
          y: visits[3]
        });
        dataPoints4.push({
          x: numberOfsteps,
          y: visits[4]
        });
        dataPoints5.push({
          x: numberOfsteps,
          y: visits[5]
        });

        /*
        console.log(reset);
        if (reset) {
          dataPoints0.x = [];
          reset = false;
        }
        */
      
      // chart.options.data[0].dataPoints = dps; 
      chart.render();
      pieChart.render();
      lineChart.render();

      if (app.stepped) {
        app.stepped = false;
        app.isRunning = false;
      }
    };
    updateCharts();
    setInterval(function() {updateCharts()}, 500);

  }



  function createGraph() {
    //function updateEdge(edge)
    function updateEdge(edge, text) {
      return function(value) {

        //

        i++;
        edge.setAttribute("stroke", colors[ii]);
        if (i % app.nstates == 0) { ii++; }

        //console.log(i);
        //


        // Reset
        //if (i == 30) {i = 0; ii = 0}
        //

        if (value < 1e-6) {
          edge.setAttribute("stroke-opacity", 0);
        } else {
          edge.setAttribute("stroke-opacity", 0.4 + 0.9 * value);
          edge.setAttribute("stroke-width", 1.2 + 4 * value);

          //
          //
          var textNode = document.createTextNode(value);
          text.appendChild(textNode);
          //
        }
      };
    }

   function updateCircle(circle) {
      return function(value) {
        //circle.setAttribute("fill-opacity", value);
        circle.setAttribute("fill-opacity", value / 2 + 0.2);
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", 1.5 * value + 0.1 + "2"); 
        circle.setAttribute("r", app.stateSize / 2);       
      };
    }

    function circleClick(circle, state) {
      return function() {
        app.selectState(state);
        circle.setAttribute("stroke", "CadetBlue");
        circle.setAttribute("stroke-width", "5");
        circle.setAttribute("r", app.stateSize / 1.9);
      };
    }

    function getStatePosition(i) {
      var theta = 2.0 * 3.1415927 * (i - 0.5) / app.nstates;
      return new Vector(
          svgWidth / 2 + circleRadius * Math.sin(theta),
          svgHeight / 2 - circleRadius * Math.cos(theta));
    }

    var svg = createSvgElement("svg");
    //var circleRadius = 120;
    var circleRadius = 240;
    var svgWidth = 2 * circleRadius + app.stateSize + 2 * app.stateMargin;
    var svgHeight = 2 * circleRadius + app.stateSize + 2 * app.stateMargin;
    var from, to;

    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);

    var j = 0;
    /**
     * Construct edges
     */
    for (from = 0; from < app.nstates; from++) {
      var P = getStatePosition(from);
      for (to = 0; to < app.nstates; to++) {
        var Q = getStatePosition(to);
        var edge = createSvgElement("path");
        var A, B, C, M, R, normal, Z1, Z2;     
                  
        if (from == to) {
          // Construct self-edge
          M = new Vector(svgWidth / 2, svgHeight / 2);
          var MQ = Q.minus(M).normalize();
          normal = MQ.normal().normalize();
          var l = app.stateSize/(2*Math.sqrt(2));
          A = Q.add(normal.multiply(l)).add(MQ.multiply(l));
          B = Q.add(normal.multiply(-l)).add(MQ.multiply(l));
          var R1 = Q.add(normal.multiply(l)).add(MQ.multiply(2.5*l));
          var R2 = Q.add(normal.multiply(-l)).add(MQ.multiply(2.5*l));
          C = Q.add(MQ.multiply(2.1*l)).add(normal.multiply(-app.arrowSize/2));
          Z1 = C.add(normal.multiply(app.arrowSize)).add(MQ.multiply(-app.arrowSize));
          Z2 = C.add(normal.multiply(app.arrowSize)).add(MQ.multiply(app.arrowSize));

          edge.setAttribute("d", "M" + A + " C" + R1 + " " + R2 + " " + B
              + "M" + Z1 + " L" + C + " L" + Z2);
        } else {
          // Construct non-self-edge
          var PQ = Q.minus(P);
          var lambda = 0.5 * app.stateSize / PQ.length();
          //var controlSize = 100;
          //var controlSize = 10;
          var controlSize = 20;
          normal = PQ.normal().normalize();
          R = P.add(Q).multiply(0.5).add(normal.multiply(controlSize));

          //var eps = 4;
          var eps = 8;
          A = P.multiply(1-lambda).add(Q.multiply(lambda)).add(normal.multiply(eps));
          B = Q.multiply(1-lambda).add(P.multiply(lambda)).add(normal.multiply(eps));
          C = A.add(B).multiply(0.5).add(normal.multiply(0.3 * controlSize));
          Z1 = C.add(normal.multiply(app.arrowSize)).add(PQ.normalize().multiply(-app.arrowSize));
          Z2 = C.add(normal.multiply(-app.arrowSize)).add(PQ.normalize().multiply(-app.arrowSize));

          edge.setAttribute("d", "M" + A
              + " Q" + R + " " + B
              + " M" + Z1 + " L" + C + " L" + Z2);
        }
        edge.setAttribute("stroke", "brown");
        //edge.setAttribute("stroke-width", "2.5");
        //edge.setAttribute("stroke-width", "3.5");
        edge.setAttribute("fill", "transparent");
        


        // values on the edges
        var position = getStatePosition(A / 2);

        var text = createSvgElement("text");
        text.setAttribute("x", C.x);
        text.setAttribute("y", C.y + app.stateFontSize / 3);
        text.setAttribute("font-family", "Exo");
        text.setAttribute("font-size", app.stateFontSize / 1.2 + "px");
        text.setAttribute("text-anchor", "middle");                                        
        //
        
        app.model.listen("prob" + from + "," + to, updateEdge(edge, text)); 
        
        /*
        while (text) {
          svg.removeChild(text);
        }                   
        */
       //valuesText[to] = text;
       //console.log(valuesText[to]);

        svg.appendChild(edge);

        svg.appendChild(text);

        // svg.selectAll("*").remove();
      }
    }

    /**
     * Construct nodes
     */
    for (from = 0; from < app.nstates; from++) {
      var position = getStatePosition(from);

      var circle = createSvgElement("circle");
      circle.setAttribute("cx", position.x);
      circle.setAttribute("cy", position.y);
      circle.setAttribute("r", app.stateSize / 2);
      circle.setAttribute("stroke", "black");
      circle.setAttribute("stroke-width", "2");
      
      //circle.setAttribute("fill", "cornflowerblue");

      circle.setAttribute("fill", colors[i]);
      i++;
      
      var text = createSvgElement("text");
      text.setAttribute("x", position.x);
      text.setAttribute("y", position.y + app.stateFontSize / 3);
      text.setAttribute("font-family", "Exo");
      text.setAttribute("font-size", app.stateFontSize + "px");
      text.setAttribute("text-anchor", "middle");


      var textNode = document.createTextNode(colors[from]);
      var textNode = document.createTextNode(weathers[from]);
      text.appendChild(textNode);

      //
      var image = createSvgElement("image");
      image.setAttribute("x", position.x - 20);
      image.setAttribute("y", position.y - 2);

      image.setAttribute("height", 40);
      image.setAttribute("width", 40);

      image.setAttribute("r", app.stateSize / 2);
      image.setAttribute('href', "graphics/" + weathers[from] + ".gif");
      image.setAttribute("fill-opacity", 0.1);
      //image.setAttribute("fill", colors[i]);
      //
      
      app.model.listen("state-" + from, updateCircle(circle));
      circle.onclick = circleClick(circle, from);
      text.onclick = circleClick(circle, from);
      
      svg.appendChild(image);

      svg.appendChild(circle);
      svg.appendChild(text);
    }
    document.getElementById("graph").appendChild(svg);
  }
  
  // Transition probabilities (Transition matrix)
  function createMatrix() {
   function updateBackground(element) {
      return function(value) {
        value = Math.min(1, Math.max(0, value));
        element.style['background-color'] = 'rgba(221, 238, 255, ' + value + ')';
      };
    }

    var table = document.createElement("table");

    //
    var tr = document.createElement("tr");
    
    // Add headers headers
    th = document.createElement("th");
    tr.appendChild(th);
    for (i = 0; i < app.nstates; i++) {
      th = document.createElement("th");
      var textNode = document.createTextNode(weathers[i]);
      //if (i == -1) {textNode = document.createTextNode("");}
      //
      th.style.color = colors[i];
      //
      th.appendChild(textNode);
      tr.appendChild(th);
    }
    table.appendChild(tr);
    //

    for (var from = 0; from < app.nstates; from++) {
      //var tr = document.createElement("tr");
      tr = document.createElement("tr");
      
      // Add left side headers
      /*
      th = document.createElement("th");
      tr.appendChild(th);
      */
      var th = document.createElement("th");
      //
      th.style.color = colors[from];
      //
      var textNode = document.createTextNode(weathers[from]);
      th.appendChild(textNode);
      tr.appendChild(th);
      //

      for (var to = 0; to < app.nstates; to++) {
        var td = document.createElement("td");
        var input = new ModelInput(app.model, "prob" + from + "," + to);

        //console.log(input.element);
        td.appendChild(input.element);
        tr.appendChild(td);
        app.model.listen("state-" + from, updateBackground(input.element));
      }
      table.appendChild(tr);
      
      
      // Add right side headers
      var th = document.createElement("th");
      var textNode = document.createTextNode(weathers[from]);
      //
      th.style.color = colors[from];
      //
      th.appendChild(textNode);
      tr.appendChild(th);
      //
      
    }

    // Add bottom headers
    tr = document.createElement("tr");
    th = document.createElement("th");
    tr.appendChild(th);
    for (i = 0; i < app.nstates; i++) {
      th = document.createElement("th");
      var textNode = document.createTextNode(weathers[i]);
      //if (i == -1) {textNode = document.createTextNode("");}
      //
      th.style.color = colors[i];
      //
      th.appendChild(textNode);
      tr.appendChild(th);
    }
    table.appendChild(tr);
    //
            
    document.getElementById("matrix").appendChild(table);
  }
  
  function createButtons() {
    var runButton = new Button("Run", app.startSimulation);
    var stopButton = new Button("Stop", app.stopSimulation);
    var stepButton = new Button("Step", app.runSimulationSteps(1));
    var resetButton = new Button("Reset", app.resetSimulation);
    //var speedLabel = new Span("Speed:");
    var speedInput = new ModelInput(app.model, "speed");
    
    var buttons = document.getElementById("buttons");
    var toolTip = document.getElementById("toolTip");
    //buttons.appendChild(stepButton.element);
    buttons.appendChild(runButton.element);
    buttons.appendChild(stopButton.element);
    buttons.appendChild(stepButton.element);
    buttons.appendChild(resetButton.element);
    //buttons.appendChild(speedLabel.element);
    toolTip.appendChild(speedInput.element);
  }
  
  function createStats() {
    var tr;
    var th;
    var td;
    var i;
    var span;

    var steps = new ModelSpan(app.model, "steps");    

    var table = document.createElement("table");
    tr = document.createElement("tr");
    
    // Add headers
    th = document.createElement("th");
    tr.appendChild(th);
    for (i = 0; i < app.nstates; i++) {
      th = document.createElement("th");
      //
      th.style.color = colors[i];
      //
      var textNode = document.createTextNode(weathers[i]);
      th.appendChild(textNode);
      tr.appendChild(th);
    }
    table.appendChild(tr);

    // Add count statistics
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.appendChild(document.createTextNode("Visits"));
    tr.appendChild(td);
    for (i = 0; i < app.nstates; i++) {
      span = new ModelSpan(app.model, "count-" + i);
      td = document.createElement("td");
      //
      td.style.color = colors[i];
      //
      td.appendChild(span.element);
      tr.appendChild(td);
    }
    table.appendChild(tr);
    
    // Add count statistics
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.appendChild(document.createTextNode("Visits (%)"));
    tr.appendChild(td);
    for (i = 0; i < app.nstates; i++) {
      span = new ModelSpan(app.model, "percentage-" + i);
      td = document.createElement("td");
      //
      td.style.color = colors[i];
      //
      td.appendChild(span.element);
      tr.appendChild(td);
    }
    table.appendChild(tr);

    document.getElementById("steps").appendChild(steps.element);
    document.getElementById("stats").appendChild(table);
  }

  function createDistr() {

    document.getElementById("distr").innerHTML = "";
    
    document.getElementById("distr").appendChild( document.createTextNode("System of equations:"));
    // Stationary distribution
    var table = document.createElement("table");
    var tr;
    var td;

    for (var i = 0; i <= 5; i++) {
      tr = document.createElement("tr");
      td = document.createElement("td");


      //Trimming
      if (eq[i].substring(4,5) == "+") {
        eq[i] = eq[i].substring(0,3) + eq[i].substring(5,);
      }
      if (i == 5) {
        if (eq[i].substring(24,25) == "+") {
          eq[i] = eq[i].substring(0,23) + eq[i].substring(25,);
        }
      }

      td.appendChild(document.createTextNode(eq[i]));
      tr.appendChild(td);
      table.appendChild(tr);
    }
    document.getElementById("distr").appendChild(table);

    var solution = "";
    try {
      solution = nerdamer.solveEquations([eq[0], eq[1], eq[2], eq[3], eq[6], eq[5]]);
    }
    catch(err) {
      document.getElementById("distr").appendChild( document.createTextNode("No distinct solution."));
      return;
    }
    
    var solutionString = "";
    var vistits;
    var allTheSolutions = "";

    document.getElementById("distr").appendChild(document.createTextNode("Solution: "));
    document.getElementById("distr").appendChild( document.createElement('br') );
    for (i = 0; i <= 5; i++) {
      solutionString = solution[i].toString();
      //console.log(solutionString);
      allTheSolutions += solutionString.substring(2, 7) + " ";
      vistits = document.createTextNode(solutionString.substring(0, 1)  + " = " + solutionString.substring(2, 7) + "; ");
      document.getElementById("distr").appendChild(vistits);
    }

    document.getElementById("distr").appendChild( document.createElement('br') );

    document.getElementById("distr").appendChild( document.createTextNode("π = ( ") );

    document.getElementById("distr").appendChild(document.createTextNode(allTheSolutions));

    document.getElementById("distr").appendChild( document.createTextNode(")") );
  }

  /* dygraph Plot
  function createPlot() {
    if (app.showPlot) {
      app.dygraph = new Dygraph(document.getElementById("plot"), app.samplePath, {
        strokeWidth: 0.0,
        drawPoints: true,
        pointSize: 4,
        highlightCircleSize: 6,
            showRoller: true,
            valueRange: [0.0, 5],
            labels: ['Time', 'State']});
    }
  }

  function updatePlot() {
    if (app.showPlot) {
      app.dygraph.updateOptions( { 'file': app.samplePath } );
    }
  }
  */

  function performSteps(nsteps) {
    var i;
    if (nsteps == undefined) {
      nsteps = 1;
    }
    var curState = app.model.get("state");
    
    var stateCount = [];
    for (i = 0; i < app.nstates; i++) {
      stateCount[i] = 0;
    }

    var currentTime = app.model.get("steps");
    
    for (var step = 0; step < nsteps; step++) {
      var nextState = app.nstates - 1;
      var z = Math.random();
      var sum = 0;
      for (i = 0; i < app.nstates - 1; i++) {
        sum += parseFloat(app.model.get("prob" + curState + "," + i));
        if (z < sum) {
          nextState = i;
          break;
        }
      }
      app.model.set("count-" + nextState, app.model.get("count-" + nextState) + 1);
      //app.samplePath.push([currentTime + step, nextState + 1]);
      stateCount[nextState]++;
      curState = nextState;
    }
  
    // Update model  
    var steps = app.model.get("steps") + nsteps;
    app.model.set("steps", steps);
    for (i = 0; i < app.nstates; i++) {
      var count = app.model.get("count-" + i);
      var percentage = Math.round(100 * count / steps);
      //
      visits[i] = count;
      percentages[i] = percentage;
      //console.log(visits[0]);
      //window.onload();
      //
      app.model.set("percentage-" + i, percentage + "%");
    }
    
    function updateGraphColors() {
      app.model.set("state", curState);
      for (var i = 0; i < app.nstates; i++) {
        app.model.set("state-" + i, stateCount[i] / nsteps);
      }
    }

    /*
    // Update plot
    updatePlot()
    */

    if (nsteps == 1) {
      var speed = app.model.get("speed");
      app.selectState(-1);
      setTimeout(updateGraphColors, speed * 0.2);
    } else {
      updateGraphColors();
    }
  }
   
  this.selectState = function(state) {
    app.model.set("state", state);
    for (var i = 0; i < app.nstates; i++) {
      app.model.set("state-" + i, (i == state) ? 1 : 0);
    }
  }
  
  //Fills in values in the matrix
  this.setMatrix = function(matrix) {
    var sum = 0;
    app.resetSimulation();
    //
    unkw[0] = "a";
    unkw[1] = "b"; 
    unkw[2] = "c"; 
    unkw[3] = "d"; 
    unkw[4] = "f";
    unkw[5] = "1 - a - b - c - d - f";
  
    unkw[6] = "g";
  
    
    for (var ind = 0; ind <= 6; ind++) {
      eq[ind] = "";
      eq[ind] = unkw[ind] + " =";
    }
    //

    for (var i = 0; i < app.nstates; i++) {
      for (var j = 0; j < app.nstates; j++) {
        var value = matrix[i][j];
        value = +value.toFixed(2);


        //
        if (value != 0) {
          if (j == 0) {
            if (i == 0) {
              eq[0] += ' ' + value + unkw[i];
            } else if (i == 5) {
              eq[0] += " + ";
              eq[0] += ' ' + value + "(" + unkw[5] + ")";
            } else {
              eq[0] += " + ";
              eq[0] += ' ' + value + unkw[i];
            }
          } else if (j == 1) {
            if (i == 0) {
              eq[1] += ' ' + value + unkw[i];
            } else if (i == 5) {
              eq[1] += " + ";
              eq[1] += ' ' + value + "(" + unkw[5] + ")";
            } else {
              eq[1] += " + ";
              eq[1] += ' ' + value + unkw[i];
            }
          } else if (j == 2) {
            if (i == 0) {
              eq[2] += ' ' + value + unkw[i];
            } else if (i == 5) {
              eq[2] += " + ";
              eq[2] += ' ' + value + "(" + unkw[5] + ")";
            } else {
              eq[2] += " + ";
              eq[2] += ' ' + value + unkw[i];
            }
          } else if (j == 3) {
            if (i == 0) {
              eq[3] += ' ' + value + unkw[i];
            } else if (i == 5) {
              eq[3] += " + ";
              eq[3] += ' ' + value + "(" + unkw[5] + ")";
            } else {
              eq[3] += " + ";
              eq[3] += ' ' + value + unkw[i];
            }
          } else if (j == 4) {
            if (i == 0) {
              eq[0] += ' ' + value + unkw[i];

              eq[6] += ' ' + value + unkw[i];
            } else if (i == 5) {
              eq[4] += " + ";
              eq[4] += ' ' + value + "(" + unkw[5] + ")";

              eq[6] += " + ";
              eq[6] += ' ' + value + "(" + unkw[5] + ")";
            } else {
              eq[4] += " + ";
              eq[4] += ' ' + value + unkw[i];

              eq[6] += " + ";
              eq[6] += ' ' + value + unkw[i];
            }
          } else if (j == 5) {
            if (i == 0) {
              eq[5] += ' ' + value + unkw[i];
            } else if (i == 5) {
              eq[5] += " + ";
              eq[5] += ' ' + value + "(" + unkw[5] + ")";
            } else {
              eq[5] += " + ";
              eq[5] += ' ' + value + unkw[i];
            }
          }
        }
      
        
        //console.log(eq[5]);
        //console.log(i + ": " + eq[5]);
        //

        /*
        sum += value;
        if (j == 5) {
          console.log(sum);
          sum = 0;
        }
        */


        
        //console.log(value);
        app.model.set("prob" + i + "," + j, value);
      }
    }
    
    createDistr();
  };

  this.stopSimulation = function() {
    app.isRunning = false;
    app.selectState(app.getState());
    if (app.timer != undefined) {
      clearInterval(app.timer);
      app.timer = undefined;
    }
  };
  
  this.runSimulationSteps = function(nsteps) {
    return function() {
      app.isRunning = true;
      app.stepped = true;
      performSteps(nsteps); 
    };
  };

  this.startSimulation = function() {
    app.stopSimulation();
    app.isRunning = true;
    var speed = parseInt(app.model.get("speed"));
    if (speed <= 30) {
      // do one step per call, and call each 1/speed seconds
      app.timer = setInterval(app.runSimulationSteps(1), 1000 / speed);
    } else {
      // call roughly each 50 ms and do a number of steps in the same call 
      var steps = Math.ceil(speed / 30); 
      app.timer = setInterval(app.runSimulationSteps(steps), 1000 * steps / speed);
    }
  };
  
  this.resetSimulation = function() {
    app.stopSimulation();
    app.model.set("steps", 0);
    reset = true;
    //app.samplePath = [];
    for (var i = 0; i < app.nstates; i++) {
      app.model.set("count-" + i, 0);
      app.model.set("percentage-" + i, "-");
    }
    //updatePlot();
  };
  
  this.setSpeed = function(speed) {
    app.stopSimulation();
    app.model.set("speed", speed);
  };
  
  this.getState = function() {
    return app.model.get("state");
  };
  

  this.start = function() {
    $('.dropdown-toggle').dropdown();

    createButtons();
    createGraph();
    createMatrix();
    createStats();
    //createPlot();

    app.setSpeed(2);
    app.selectState(0);

    loadDefaultExample();
    app.resetSimulation();

  };
}

