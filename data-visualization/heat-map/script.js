const getData = () => {
  const URL =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";
  return fetch(URL).then(response => response.json());
};

getData().then(data => console.log(data));
