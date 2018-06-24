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
  const margin = { top: 0, right: 0, bottom: 0, left: 50 };
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

  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "lightblue")
    .style("stroke", "green");

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(monthlyVariance, d => d.year))
    .range([0, width]);

  const yScale = d3
    .scaleBand()
    .domain(monthlyVariance.map(variance => variance.month))
    .range([height, 0]);

  const xAxis = d3.axisBottom(xScale);
  svg.append("g").call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg.append("g").call(yAxis);
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
