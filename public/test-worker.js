let counter = 0;

onconnect = function (event) {
  const port = event.ports[0];

  setInterval(printCount.bind(null, port), 1000);
};

setInterval(() => {
  counter += 1;
}, 1000);

function printCount(port) {
  port.postMessage('Counter: ' + counter);
}