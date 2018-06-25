const countyURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";
const educationURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";

const getData = () => {
  return fetch(countyURL).then(response => response.json());
};

getData().then(data => {
  drawGraph(data);
});

const toArray = obj => {
  let result = [];
  for (let property in obj) {
    result.push(obj[property]["arcs"][0]);
  }
  return result;
};

const drawGraph = countyData => {
  const margin = { top: 150, right: 50, bottom: 300, left: 200 };
  const fullWidth = 1920;
  const fullHeight = 1080;
  const width = fullWidth - margin.left - margin.right;
  const height = fullHeight - margin.top - margin.bottom;
  var path = d3.geoPath();
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .call(responsivefy)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  const nations = svg
    .append("g")
    .selectAll(".nations")
    .data(topojson.feature(countyData, countyData.objects.nation).features)
    .enter()
    .append("path")
    .attr("class", "nations")
    .attr("d", path);

  const states = svg
    .append("g")
    .selectAll("states")
    .data(topojson.feature(countyData, countyData.objects.states).features)
    .enter()
    .append("path")
    .attr("class", "states")
    .attr("d", path)
    .style("stroke", "white")
    .style("stroke-width", "3")
    .style("opacity", "0.5");

  const counties = svg
    .append("g")
    .selectAll(".counties")
    .data(topojson.feature(countyData, countyData.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "counties")
    .attr("d", path)
    .style("stroke", "white")
    .style("stroke-width", "1")
    .style("opacity", "0.5");
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
