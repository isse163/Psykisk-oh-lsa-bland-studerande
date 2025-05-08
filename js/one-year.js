import { addPage, drawGoogleChart, tableFromData } from './libs/utils.js';

// Lägg till en ny sida i menyn
addPage('Sömn vs Depression', 'sleepDepression');

// Hämta data via backend
const response = await fetch('/api/sleep-vs-depression');
const rawData = await response.json();

// Format för Google Charts
const chartData = [['Sömn (timmar)', 'Depressionsnivå'], ...rawData];

// Rita ett scatter chart
drawGoogleChart('ScatterChart', 'sleepDepression', chartData, {
  height: 500,
  title: 'Samband mellan sömnlängd och depressionsnivå',
  hAxis: { title: 'Sömn (timmar)' },
  vAxis: { title: 'Depression (skala)' },
  pointSize: 6,
  legend: 'none'
});

// Tabellvisning
const tableDiv = document.createElement('div');
tableDiv.appendChild(tableFromData([
  ['Sömn (timmar)', 'Depressionsnivå'],
  ...rawData
]));
document.getElementById('sleepDepression').appendChild(tableDiv);
 