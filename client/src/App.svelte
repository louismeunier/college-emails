<script lang="ts">
	import Map from "./components/Map.svelte";
</script>

<style>
	div.main {
		display: grid;
		grid-auto-flow: row;
		width: 100%;
		place-items: center;
		gap: 5em;
	}

	h1 {
		text-decoration: double underline;
		font-size: 3em;
		color: black;
	}

	h3 {
		font-style: italic;
		color: gray;
		font-size: 0.8em;
	}

	.header {
		display: grid;
		grid-auto-flow: row;
		justify-items: center;
	}
</style>

<div class="main">
	<div class="header">
		<h1>My College Emails</h1>
		<h2>Programatically generated statistics about where colleges have been emailing me from.</h2>
		<h3>Data is updated monthly, and uses data from the past year. You can learn more <a href="https://github.com/louismeunier/college-emails">here.</a></h3>
	</div>
	<Map/>
</div>