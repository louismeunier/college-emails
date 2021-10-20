<script>
  import Chart from 'svelte-frappe-charts';
  import * as dates_raw from "../dates";
  const dates = dates_raw.default;

  const average = (num, count) => Math.round((num/count)*100)/100
  // full data chart
  let data = {
    labels: Object.keys(dates).reverse(),
    datasets: [
      {
        values: Object.values(dates).reverse()
      }
    ]
  }

  // per day of the week chart
  const perDay = {
    total: {
      "Monday": 0,
      "Tuesday": 0,
      "Wednesday": 0,
      "Thursday": 0,
      "Friday": 0,
      "Saturday": 0,
      "Sunday": 0
    },
    count: {
      "Monday": 0,
      "Tuesday": 0,
      "Wednesday": 0,
      "Thursday": 0,
      "Friday": 0,
      "Saturday": 0,
      "Sunday": 0
    }
  };

  Object.keys(dates).forEach(date => {
    const dayNum = new Date(date).getDay();
    const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayNum];
    perDay.total[dow]+=dates[date]
    perDay.count[dow]++;
  })

  const data2 = {
    labels: Object.keys(perDay.total),
    datasets: [
      {
        values: Object.keys(perDay.total).map(day => average(perDay.total[day], perDay.count[day]))
      }
    ]
  }
</script>

<h3>Emails per day over the past year</h3>
<Chart 
  data={data} 
  type="line" 
  lineOptions={{hideDots: 1, spline: 1}} 
  axisOptions={{xIsSeries: true}}
  colors={['#ee9b00']}
/>

<h3>Average emails per day of the week</h3>
<Chart
  data={data2}
  type="bar"
  colors={['#057985']}
/>