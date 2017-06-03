const newsUrl = 'http://localhost:8081/api/news';

onconnect = function (event) {
  const port = event.ports[0];

  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', newsUrl, true);
  httpRequest.onload = (event) => {
    console.log('Ready state:', httpRequest.readyState);
    console.log('Status', httpRequest.statusText);
    console.log('Response text:', httpRequest.responseText);
  };
};

setInterval(() => {
  counter += 1;
}, 1000);

function sendMessages(port) {
  port.postMessage(messages);
}
