import { drawGoogleChart, addMdToPage } from '../js/libs/stdLib.js';

addMdToPage(`
  ## Samband mellan sömn och depression
  Denna graf visar ett samband mellan studenters sömnvanor (i timmar) och deras nivå av depression.
`);

const response = await fetch('/api/sleep-vs-depression');
const data = await response.json();

drawGoogleChart({
  type: 'ScatterChart',
  data: [['Somn (timmar)', 'Depressionsniva'], ...data],
  options: {
    height: 500,
    chartArea: { left: 50, right: 10 },
    hAxis: { title: 'Somn (timmar)' },
    vAxis: { title: 'Depression (skala)' },
    pointSize: 5,
    title: 'Samband mellan somn och depression bland studenter'
  }
});
