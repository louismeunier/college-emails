<script lang="ts">
	import Graph from "./components/Graph.svelte";
	import Map from "./components/Map.svelte";
	import Time from "./components/Time.svelte";
	import Link from "./components/Link.svelte";
	import Footer from "./components/Footer.svelte";
	import Animated from "./components/Animated.svelte";

	import { fly } from "svelte/transition"
	import { onMount } from "svelte";
	
	let visible = false;
	onMount(() => visible = true)

	const envelope = "✉️"
	const envelopeArrow = "📩" 
	let curEmoji = envelope;

	setInterval(() => { 
		curEmoji = curEmoji == envelope ? envelopeArrow : envelope
	}, 500)
</script>

<style>
	:global(body) {
		padding: 0;
	}
 	div.main {
		display: grid;
		grid-template-columns: minmax(0, 10rem) 1fr minmax(0, 10rem);
		grid-auto-flow: row;
		width: 100%;
		place-items: left;
	}

	:global(.main > *) {
		grid-column: 2 / -2;
		max-width: 100%;
	}
	h1 {
		text-decoration: underline;
		font-size: 3em;
		color: black;
	}

	.header {
		display: grid;
		grid-auto-flow: row;
		justify-items: center;
	}

	i {
		font-size: 1.1em;
	}

	h2 {
		font-weight: 0;
	}

	span {
		font-size: 4em;
	}
</style>

<div class="main">
	{#if visible}
		<div transition:fly={{duration: 1200, delay: 500, x: -500}} class="header">
			<h1>My College Emails</h1>
			<span>{curEmoji}</span>
			<h2>Automatically-generated statistics about my college admissions related emails, as a NYS senior.</h2>
			<i>Created by <a href="https://github.com/louismeunier" target="_blank">Louis Meunier.</a></i>
		<hr/>

		</div>
		<Animated direction="right" delay={750}>
			<Link href="where" title="Where?"/>
			<Map/>
		</Animated>
		<Animated direction="left" delay={1000}>
			<Link href="who" title="Who?"/>
			<Graph/>
		</Animated>
		<Animated direction="right" delay={1250}>
			<Link href="when" title="When?"/>
			<Time/>
		</Animated>
		<Animated direction="left" delay={1500}>
			<Footer/>
		</Animated>
	{/if}
</div>