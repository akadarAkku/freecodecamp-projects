const countyURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";
const educationURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";

const getData = () => {
  // return fetch(URL).then(response => response.json());
  return Promise.resolve();
};

getData().then(data => {
  // console.log(data);
  drawGraph();
});

const drawGraph = (data = null) => {
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

  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .style("fill", "aquamarine");
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
