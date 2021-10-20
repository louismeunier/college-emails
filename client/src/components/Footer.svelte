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

<h3 class="footer">last updated {fmt_date}</h3>