function getDataset() {
  return fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  )
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json;
    });
}

function drawChart(dataset) {
  const width = 1000;
  const height = 700;
  const margin = { top: 50, right: 50, bottom: 70, left: 70 };
  const fullWidth = width + margin.right + margin.left;
  const fullHeight = height + margin.top + margin.bottom;

  // svg
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("class", "svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, d => d.Year))
    .range([0, width])
    .nice();

  const yScale = d3
    .scaleTime()
    .domain(
      d3.extent(dataset, d => d.Seconds).map(value => new Date(value * 1000))
    )
    .range([0, height])
    .nice();

  // setup color
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const circles = svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle");

  circles
    .attr("cx", d => xScale(d.Year))
    .attr("cy", d => yScale(new Date(d.Seconds * 1000)))
    .attr("r", 10)
    .attr("class", "dot")
    .attr("data-xvalue", d => d.Year)
    .attr("data-yvalue", d => new Date(d.Seconds * 1000))
    .attr("fill", d => color(d.Doping === ""));

  circles
    .on("mouseover", d => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);

      tooltip
        .html(
          `Name: ${d.Name} <br />
          Nationality: ${d.Nationality} <br />
          Year: ${d.Year}<br />
          Time: ${d.Time}<br />
          Place: ${d.Place}<br />
          Doping: ${d.Doping}
        `
        )
        .attr("data-year", d.Year)
        .style("left", d3.event.pageX + 30 + "px")
        .style("top", d3.event.pageY - 30 + "px")
        .style("visibility", "visible");
    })
    .on("mouseout", d => {
      tooltip.style("visibility", "hidden");
    });

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const x = svg.append("g");
  x.selectAll(".tick.major").attr("class", "tick");
  x.attr("transform", `translate(0,${height})`)
    .attr("class", "axis")
    .attr("id", "x-axis")
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  const y = svg.append("g");
  y.selectAll(".tick.major").attr("class", "tick");
  y.attr("class", "axis")
    .attr("id", "y-axis")
    .call(yAxis);

  // chart title
  svg
    .append("text")
    .attr("id", "title")
    .attr("class", "title")
    .attr("transform", `translate(${width / 3}, ${height / 20})`)
    .text("Doping In Professional Bycling");

  // legend
  const legend = svg
    .selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("id", "legend")
    .attr(
      "transform",
      (d, i) => `translate(${width - 20},${i * 40 + height / 4})`
    );

  // legend labels
  legend
    .append("text")
    .attr("x", -10)
    .attr("y", 16)
    .style("text-anchor", "end")
    .text(d => (d ? "No doping allegations" : "Doping allegations"));

  // legend rectangles
  legend
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 30)
    .attr("fill", d => color(d));
}

getDataset().then(data => drawChart(data));
