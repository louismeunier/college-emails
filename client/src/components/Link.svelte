<script>
    export let href;
    export let title;

    let hovered = false;
    const toggleHover = () => {hovered = !hovered}
</script>

<style>
    h2:hover { 
		text-decoration: underline;
		cursor: pointer;
	}

	a {
		color: black;
	}
</style>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<a href={`#${href}`} on:mouseover={toggleHover} on:mouseout={toggleHover}>
    <h2 id={href}>{title} {hovered ? "#" : ""}</h2>
</a>