<script>
    import Chart from 'svelte-frappe-charts';
    import * as raw_data from "../data.json";
    
    const topColleges = Object.keys(raw_data.byCollege).sort((a, b) => raw_data.byCollege[b] - raw_data.byCollege[a]);
    let data = {
      labels: topColleges.slice(0,5),
      datasets: [
        {
          values: topColleges.map(college => raw_data.byCollege[college]),
        }
      ]
    };
</script>
  
<Chart data={data} type="bar" colors={['#9b2226']}/>