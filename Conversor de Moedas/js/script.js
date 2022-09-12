start();
let isFirstConversion = true;
let valueFirstConverted = 0.0;
function start() {
  checkButtonConvert();
}

function checkButtonConvert() {
  let buttonConvert = document.getElementById('button-convert');
  buttonConvert.onclick = converter;
}

function converter() {
  primeiraConversao();
  isFirstConversion = true;
  valueFirstConverted = 0.0;
}

function primeiraConversao() {
  let moedaOrigem = extractMoedaOrigem();
  let moedaDestino = 'USD';

  let linkPrimeiraConversao = createRequestLink(
    moedaOrigem + '-' + moedaDestino
  );
  requestJSON(linkPrimeiraConversao);
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

    if (isFirstConversion) {
      convertValue(cambio);
    } else {
      convertValue(cambio);
      isFirstConversion = true;
    }
  };
}

function segundaConversao() {
  let moedaOrigem = 'USD';
  let moedaDestino = extractMoedaDestino();

  let linkSegundaConversao = createRequestLink(
    moedaOrigem + '-' + moedaDestino
  );
  requestJSON(linkSegundaConversao);
}

function JSONToNumber(conversor) {
  let textResponse = JSON.stringify(conversor);

  numberText = textResponse.indexOf('ask":') + 6;
  textResponse = textResponse.substring(numberText, numberText + 6);

  return parseFloat(textResponse);
}

function convertValue(cambio) {
  if (isFirstConversion) {
    let stringValue = document.getElementById('valor').value;
    let value = parseFloat(stringValue);
    valueFirstConverted = value * cambio;
    isFirstConversion = false;
    segundaConversao();
  } else {
    valueConverted = valueFirstConverted * cambio;
    valueConverted = valueConverted.toFixed(2);

    let labelResult = document.getElementById('label-value-moeda');
    labelResult.innerHTML = 'O valor será: ' + String(valueConverted);
  }
}
