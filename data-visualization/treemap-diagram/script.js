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
  const margin = { top: 100, right: 200, bottom: 10, left: 50 };
  const fullWidth = 1000;
  const fullHeight = 700;
  const width = fullWidth - margin.left - margin.right;
  const height = fullHeight - margin.top - margin.bottom;

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const treemap = d3
    .treemap()
    .size([width, height])
    .paddingInner(1);
  var root = d3.hierarchy(data).sum(d => d.value);
  treemap(root);

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .call(responsivefy)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  const cell = svg
    .selectAll("g")
    .data(root.leaves())
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
    .attr("class", "tile")
    .attr("data-name", d => d.data.name)
    .attr("data-category", d => d.data.category || d.data.name)
    .attr("data-value", d => {
      console.log(d.value);
      return d.value;
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

  cell
    .on("mouseover", d => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);

      tooltip
        .html(
          `${d.data.name} <br />
        ${d.data.category} <br />
         ${d.data.value}
      `
        )
        .attr("data-value", d.data.value)
        .style("left", () => d3.event.pageX + "px")
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

  // function to wrap text so no overlap
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
      (d, i) => `translate(${width + 10},${i * 40 + height / 4})`
    );

  // legend labels
  legend
    .append("text")
    .attr("x", 110)
    .attr("y", 16)
    .style("text-anchor", "end")
    .text(d => d);

  // legend rectangles
  legend
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 30)
    .attr("class", "legend-item")
    .attr("legend-item", d => d)
    .attr("fill", d => color(d));
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
