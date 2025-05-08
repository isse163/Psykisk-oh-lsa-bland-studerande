// public/js/trends.js
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  fetch('/api/data/sleep-vs-depression')
    .then(res => res.json())
    .then(data => {
      const chartData = [['Sömn (timmar)', 'Depression'], ...data];

      const dataTable = google.visualization.arrayToDataTable(chartData);

      const options = {
        title: 'Samband mellan sömn och depression',
        hAxis: { title: 'Sömn i timmar' },
        vAxis: { title: 'Depression (0 = nej, 1 = ja)' },
        pointSize: 5,
        legend: 'none'
      };

      const chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
      chart.draw(dataTable, options);
    })
    .catch(err => console.error('Fel vid hämtning av data:', err));
}
