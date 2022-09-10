start();
function start() {
  checkButtonConvert();
}

function checkButtonConvert() {
  let buttonConvert = document.getElementById('button-convert');
  buttonConvert.onclick = converter;
}

function converter() {
  let moedas = stringMoedas();
  let link = createRequestLink(moedas);
  requestJSON(link);
}

function stringMoedas() {
  let moedaOrigem = extractMoedaOrigem();
  let moedaDestino = extractMoedaDestino();

  return (stringConversao = moedaOrigem + '-' + moedaDestino);
}

function extractMoedaOrigem() {
  moedaOrigem = document.getElementById('moeda-origem').value;
  return moedaOrigem.toUpperCase();
}

function extractMoedaDestino() {
  moedaDestino = document.getElementById('moeda-destino').value;
  return moedaDestino.toUpperCase();
}

function createRequestLink(stringMoedas) {
  // https://economia.awesomeapi.com.br/last/USD-BRL
  let linkAPI = 'https://economia.awesomeapi.com.br/last/';
  let linkCorrect = linkAPI + stringMoedas;
  return linkCorrect;
}

function requestJSON(requestLink) {
  let request = new XMLHttpRequest();
  request.open('GET', requestLink);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    let conversor = request.response;
    let cambio = JSONToNumber(conversor);
    convertValue(cambio);
  };
}

function JSONToNumber(conversor) {
  let textResponse = JSON.stringify(conversor);

  numberText = textResponse.indexOf('ask":') + 6;
  textResponse = textResponse.substring(numberText, numberText + 6);

  return parseFloat(textResponse);
}

function convertValue(cambio) {
  let stringValue = document.getElementById('valor').value;
  let value = parseFloat(stringValue);
  let valueConverted = value * cambio;
  valueConverted = valueConverted.toFixed(2);

  let labelResult = document.getElementById('label-value-moeda');
  labelResult.innerHTML = 'O valor será: ' + String(valueConverted);
}
