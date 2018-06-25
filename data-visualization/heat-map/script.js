const getData = () => {
  const URL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
  return fetch(URL).then(response => response.json());
};

getData().then(data => {
  console.log(data);
  drawGraph(data);
});

const drawGraph = ({ baseTemperature, monthlyVariance }) => {
  const COLORS = [
    "royalblue",
    "deepskyblue",
    "lightgreen",
    "#f9edd5",
    "wheat",
    "sandybrown"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const margin = { top: 150, right: 50, bottom: 300, left: 200 };
  const fullWidth = 1920;
  const fullHeight = 1080;
  const width = fullWidth - margin.left - margin.right;
  const height = fullHeight - margin.top - margin.bottom;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .call(responsivefy)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  const tempScale = d3
    .scaleLinear()
    .domain(d3.extent(monthlyVariance, mv => mv.variance))
    .range([1, 5]);

  const minMaxYear = d3.extent(monthlyVariance, d => d.year);
  const xScale = d3
    .scaleLinear()
    .domain(minMaxYear)
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(monthlyVariance.map(variance => variance.month))
    .range([height, 0]);

  // X axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  svg
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0, ${height})`)
    .attr("id", "x-axis")
    .attr("class", "axis");

  // Y axis
  const yAxis = d3.axisLeft(yScale).tickFormat((d, i) => MONTHS[d - 1]);
  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("class", "axis");

  const rectangles = svg
    .selectAll("rect")
    .data(monthlyVariance)
    .enter()
    .append("rect");

  rectangles
    .attr("width", width / (minMaxYear[1] - minMaxYear[0]))
    .attr("height", yScale.bandwidth())
    .attr(
      "x",
      (d, i) => (parseInt(i / 12) * width) / (minMaxYear[1] - minMaxYear[0])
    )
    .attr("y", d => yScale(d.month))
    .attr("data-month", d => d.month - 1)
    .attr("data-year", d => d.year)
    .attr("data-temp", d => baseTemperature + d.variance)
    .style("fill", d => COLORS[Math.round(tempScale(d.variance))])
    .attr("class", "cell");

  rectangles
    .on("mouseover", d => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);

      tooltip
        .html(
          `Temperature: ${(baseTemperature + d.variance).toFixed(2)} <br />
        Variance: ${d.variance.toFixed(2)} <br />
        Year: ${d.year}<br />
        Month: ${d.month}
      `
        )
        .attr("data-year", d.year)
        .style("left", () => {
          if (d3.event.pageX <= 160) {
            return d3.event.pageX + "px";
          }
          if (d3.event.pageX >= 800) {
            return d3.event.pageX - 180 + "px";
          }
          return d3.event.pageX - 80 + "px";
        })
        .style("top", d3.event.pageY - 130 + "px")
        .style("visibility", "visible");
    })
    .on("mouseout", d => {
      tooltip.style("visibility", "hidden");
    });

  // chart title
  svg
    .append("text")
    .attr("id", "title")
    .attr("class", "title")
    .attr("transform", `translate(${width / 2.5}, ${-80})`)
    .text("Monthly Temperature");

  // description
  svg
    .append("text")
    .attr("id", "description")
    .attr("class", "description")
    .attr("transform", `translate(${width / 2.3}, ${-30})`)
    .text("1753-2015 Temperatures");

  // legend
  const legend = svg
    .selectAll(".legend")
    .data(COLORS)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("id", "legend")
    .attr("transform", (d, i) => `translate(${0},${(i + 1) * 45 + height})`);
  // legend labels

  legend
    .append("text")
    .attr("x", 80)
    .attr("y", 30)
    .style("text-anchor", "start")
    .text(d => {
      let text;
      switch (d) {
        case COLORS[0]:
          text = "Very Cold";
          break;
        case COLORS[1]:
          text = "Cold";
          break;
        case COLORS[2]:
          text = "Lukewarm";
          break;
        case COLORS[3]:
          text = "Normal";
          break;
        case COLORS[4]:
          text = "Hot";
          break;
        default:
          text = "Very Hot";
      }
      return text;
    });

  legend
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 40)
    .attr("height", 40)
    .attr("fill", d => d);
};

const responsivefy = svg => {
  const container = d3.select(svg.node().parentNode);
  const width = parseInt(svg.style("width"));
  const height = parseInt(svg.style("height"));
  const aspect = width / height;

  const resize = () => {
    const targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  };

  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize);

  d3.select(window).on(`resize.${container.attr("id")}`, resize);
};
