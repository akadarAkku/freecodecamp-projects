getDataset().then(dataset => {
  drawChart(dataset);
});

function drawChart(dataset) {
  // size constants
  const width = 1000;
  const height = 700;
  const padding = 50;

  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg");

  const tooltipDiv = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  // scales
  const xScale = d3
    .scaleTime()
    .domain([
      d3.min(dataset, d => new Date(d[0])),
      d3.max(dataset, d => new Date(d[0]))
    ])
    .range([padding, width - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, d => d[1])])
    .range([height - padding, padding]);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
      return (i * (width - 2 * padding)) / dataset.length + padding;
    })
    .attr("y", (d, i) => yScale(d[1]))
    .attr("width", width / dataset.length)
    .attr("height", (d, i) => height - padding - yScale(d[1]))
    .attr("fill", "blue")
    .attr("class", "rect bar")
    .attr("data-date", d => d[0])
    .attr("data-gdp", d => d[1])
    .on("mouseover", d => {
      tooltipDiv
        .transition()
        .duration(200)
        .style("opacity", 0.9);

      tooltipDiv
        .html("Date: " + d[0] + "<br />" + "GDP: " + d[1])
        .attr("data-date", d[0])
        .style("left", d3.event.pageX + 30 + "px")
        .style("top", d3.event.pageY - 30 + "px")
        .style("visibility", "visible");
    })
    .on("mouseout", d => {
      tooltipDiv.style("visibility", "hidden");
    });

  // X / Y axis
  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale);
  const x = svg.append("g");
  const y = svg.append("g");
  x.selectAll(".tick.major").attr("class", "tick");
  y.selectAll(".tick.major").attr("class", "tick");
  x.attr("transform", `translate(0,${height - padding})`)
    .attr("class", "axis")
    .attr("id", "x-axis")
    .call(xAxis);
  y.attr("transform", `translate(${padding},0)`)
    .attr("class", "axis")
    .attr("id", "y-axis")
    .call(yAxis);

  // title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 10)
    .attr("id", "title")
    .attr("class", "title")
    .attr("transform", `translate(${-2.5 * padding},0)`)
    .text("United States GDP");
}

function getDataset() {
  return fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  )
    .then(response => response.json())
    .then(json => {
      return json.data;
    });
}
