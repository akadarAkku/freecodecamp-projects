function getDataset() {
  return fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  )
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json.data;
    });
}

getDataset();
