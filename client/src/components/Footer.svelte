<script>
    import * as updated from "../updated.json";

    const fmt_date = new Date(updated.value).toLocaleString();
</script>

<style>
    h3 {
		font-style: italic;
		color: gray;
		font-size: 0.8em;
		text-align: center;
	}
</style>

<h3>Data <s>is</s> WAS updated weekly, <s>and uses data from the past year.</s> You can learn more <a href="https://github.com/louismeunier/college-emails">here.</a>
	<br><em>As I've graduated high school and no longer receive dozens of college emails a day, data is no longer automatically updated!</em></h3>
<h3 class="footer">Last updated {fmt_date}</h3>