let ports = [];
let messages = [];

onconnect = function (event) {
  const port = event.ports[0];
  ports.push(port);
};

setInterval(getNews, 1000);

function getNews() {
  const newsUrl = 'http://in.decentstudio.com:8081/api/news';
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', newsUrl, true);
  httpRequest.onload = handleNewsResponse;
  httpRequest.send();
}

function handleNewsResponse() {
  if (this.status === 200) {
    const newsItems = JSON.parse(this.responseText);
    sendNewsToUI(newsItems);
  }
}

function sendNewsToUI(newsItems) {
  ports.forEach(port => port.postMessage(newsItems));
}
