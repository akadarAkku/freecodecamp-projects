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
  const padding = 100;
  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, d => d.Year) - 1,
      d3.max(dataset, d => d.Year) + 1
    ])
    .range([padding, width - padding]);
  const yMin = d3.min(dataset, d => d.Seconds - 10);
  const yMax = d3.max(dataset, d => d.Seconds + 10);
  const yScale = d3
    .scaleTime()
    .domain([new Date(yMin * 1000), new Date(yMax * 1000)])
    .range([height - padding, padding]);
  console.log(yMin);
  console.log(yMax);
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.Year))
    .attr("cy", d => yScale(new Date(d.Seconds * 1000)))
    .attr("r", 5)
    .attr("class", "dot")
    .attr("data-xvalue", d => d.Year)
    .attr("data-yvalue", d => d.Time);
  // svg
  //   .selectAll("text")
  //   .data(dataset)
  //   .enter()
  //   .append("text")
  //   .attr("x", d => xScale(d.Year) + 10)
  //   .attr("y", d => yScale(createDate(d.Time)) - 10)
  //   .text(d => `${d.Seconds}, ${d.Year}`);

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const x = svg.append("g");
  x.selectAll(".tick.major").attr("class", "tick");
  x.attr("transform", `translate(0,${height - padding})`)
    .attr("class", "axis")
    .attr("id", "x-axis")
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  const y = svg.append("g");
  y.selectAll(".tick.major").attr("class", "tick");
  y.attr("transform", `translate(${padding}, 0)`)
    .attr("class", "axis")
    .attr("id", "y-axis")
    .call(yAxis);

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height / 10)
    .attr("id", "title")
    .attr("class", "title")
    .attr("transform", `translate(${-2.5 * padding},0)`)
    .text("Time");
}

getDataset().then(data => drawChart(data));
