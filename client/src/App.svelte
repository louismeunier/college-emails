<script lang="ts">
	import Graph from "./components/Graph.svelte";
	import Map from "./components/Map.svelte";
	import { fly } from "svelte/transition"
	import { onMount } from "svelte";
	let visible = false;
	onMount(() => visible = true)
</script>

<style>
	div.main {
		display: grid;
		grid-auto-flow: row;
		width: 100%;
		place-items: center;
	}

	div.sub {
		width: 75%;
		display: grid;
		grid-auto-flow: row;
		place-items: left;
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
		/* justify-items: center; */
	}
</style>

<div class="main">
	{#if visible}
	<div transition:fly={{duration: 2100, delay: 100, y: -1000}}  class="sub">
		<div class="header">
			<h1>My College Emails</h1>
			<h2>Programatically generated statistics about where colleges have been emailing me from.</h2>
			<h3>Data is updated monthly, and uses data from the past year. You can learn more <a href="https://github.com/louismeunier/college-emails">here.</a></h3>
		</div>
		<h2>Where?</h2>
		<Map/>
		<h2>Who?</h2>
		<Graph/>
	</div>	
	{/if}
</div>