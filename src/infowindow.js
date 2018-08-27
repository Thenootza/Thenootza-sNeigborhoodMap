export const markerInfo = (marker, infowindow) => {

  let url = `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${marker.name}&limit=1`;

  fetch(url)
  .then(
    function (response) {
      if (response.status !== 200) {
        infowindow.setContent(`Something went wrong! Please try again later! ${url}.`);
        return;
      }

      response.json()
      .then( (data) => {
        if(data[2].length) {
          let info = `<h2 class="anchors">${data[0]}</h2>
          <p class="anchors">${data[2][0]}</p>
          <a href="${data[3][0]}" target="_blank" class="anchors">Read more on wiki</a>`;
          infowindow.setContent(info);
        } else {infowindow.setContent('OOPS...wiki has no info about this place')};
      });
    }
  )
  .catch(function (err) {
    infowindow.setContent("Loading data failed", err);
  });

}
