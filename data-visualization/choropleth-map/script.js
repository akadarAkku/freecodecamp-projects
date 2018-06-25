const countyURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";
const educationURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";

const getData = () => {
  return fetch(countyURL).then(response => response.json());
};

getData().then(data => {
  return fetch(educationURL)
    .then(eduResponse => eduResponse.json())
    .then(edu => drawGraph(data, edu));
});

const toArray = obj => {
  let result = [];
  for (let property in obj) {
    result.push(obj[property]);
  }
  return result;
};

const drawGraph = (countyData, educationData) => {
  // constants
  const COLORS = [
    "#E8F5E9",
    "#C8E6C9",
    "#A5D6A7",
    "#81C784",
    "#66BB6A",
    "#4CAF50",
    "#43A047",
    "#388E3C",
    "#2E7D32",
    "#1B5E20"
  ];
  const margin = { top: 100, right: 300, bottom: 0, left: 300 };
  const fullWidth = 1920;
  const fullHeight = 1080;
  const width = fullWidth - margin.left - margin.right;
  const height = fullHeight - margin.top - margin.bottom;

  // scale to convert value to color
  const minMax = d3.extent(educationData, d => d.bachelorsOrHigher);
  const colorScale = d3
    .scaleQuantize()
    .domain(minMax)
    .range(COLORS);

  // create father svg
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", fullWidth)
    .attr("height", fullHeight)
    .append("g")
    .attr("class", "svg")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // topojson map
  var path = d3.geoPath();
  const map = svg
    .append("g")
    .selectAll(".county")
    .data(topojson.feature(countyData, countyData.objects.counties).features)
    .enter()
    .append("path");

  map
    .attr("class", "county")
    .attr("data-fips", d => {
      const value = educationData.find(ele => ele.fips === d.id);
      return value.fips;
    })
    .attr("data-education", d => {
      const value = educationData.find(ele => ele.fips === d.id)
        .bachelorsOrHigher;
      return value;
    })
    .attr("d", path)
    .style("fill", d => {
      const value = educationData.find(ele => ele.fips === d.id)
        .bachelorsOrHigher;
      return colorScale(value);
    });

  // tooltip
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  // tooltip event handling
  map
    .on("mouseover", d => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);

      tooltip
        .html(() => {
          const obj = educationData.find(ele => ele.fips === d.id);
          return `${obj.area_name} <br /> ${obj.bachelorsOrHigher}`;
        })
        .attr("data-education", () => {
          const obj = educationData.find(ele => ele.fips === d.id);
          return obj.bachelorsOrHigher;
        })
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .style("visibility", "visible");
    })
    .on("mouseout", d => {
      tooltip.style("visibility", "hidden");
    });

  // legend
  const legendItem = svg
    .append("g")
    .attr("id", "legend")
    .selectAll(".legend-item")
    .data(COLORS)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("x", width);

  legendItem
    .append("rect")
    .attr("width", 50)
    .attr("height", 50)
    .attr("x", width - 310)
    .attr("y", (d, i) => i * 50)
    .style("fill", d => d);

  legendItem
    .append("text")
    .attr("x", width - 250)
    .attr("y", (d, i) => 35 + i * 50)
    .text(d => {
      return colorScale
        .invertExtent(d)
        .map(value => value.toFixed(1))
        .join("-");
    });

  // title
  svg
    .append("text")
    .attr("id", "title")
    .attr("class", "title")
    .attr("transform", `translate(${width / 3}, ${-40})`)
    .text("US Education");

  // description
  svg
    .append("text")
    .attr("id", "description")
    .attr("class", "description")
    .attr("transform", `translate(${width / 4.5}, ${0})`)
    .text("Percentage of people with bachelor's degree or higher");
};
