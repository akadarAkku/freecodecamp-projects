const getData = () => {
  const URL =
    "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json";
  return fetch(URL).then(response => response.json());
};

getData().then(data => {
  console.log(data);
  drawGraph(data);
});

const drawGraph = data => {
  const margin = { top: 150, right: 50, bottom: 50, left: 50 };
  const fullWidth = 1920;
  const fullHeight = 1080;
  const width = fullWidth - margin.left - margin.right;
  const height = fullHeight - margin.top - margin.bottom;

  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const treemap = d3
    .treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingInner(1);

  const root = d3.hierarchy(data).sum(d => d.value);

  treemap(root);

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .call(responsivefy)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const cell = svg
    .selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x0}, ${d.y0})`);

  cell
    .append("rect")
    .attr("width", function(d) {
      return d.x1 - d.x0;
    })
    .attr("height", function(d) {
      return d.y1 - d.y0;
    })
    .style("fill", d => color(d.data.category))
    .style("stroke", "black");

  cell
    .append("text")
    .append("tspan")
    .text(function(d) {
      return d.data.name;
    })
    .attr("y", 20)
    .attr("x", 10)
    .each(wrap);

  // // chart title
  // svg
  //   .append("text")
  //   .attr("id", "title")
  //   .attr("class", "title")
  //   .attr("transform", `translate(${width / 2.5}, ${-80})`)
  //   .text("Monthly Temperature");

  // // description
  // svg
  //   .append("text")
  //   .attr("id", "description")
  //   .attr("class", "description")
  //   .attr("transform", `translate(${width / 2.3}, ${-30})`)
  //   .text("1753-2015 Temperatures");

  // legend
  function wrap() {
    var self = d3.select(this),
      textLength = self.node().getComputedTextLength(),
      text = self.text();
    const width = this.parentNode.parentNode.firstChild.getAttribute("width");
    while (textLength > width - 20 && text.length > 0) {
      text = text.slice(0, -1);
      self.text(text + "...");
      textLength = self.node().getComputedTextLength();
    }
  }
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
