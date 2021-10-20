<script lang="ts">
    import { fly } from "svelte/transition";
    export let direction: "left" | "right";
    export let delay: number = 500;
    const transition = direction == "left" 
        ? { duration: 1200, delay: delay, x: -500}
        : { duration: 1200, delay: delay, x: 500}

</script>

<div transition:fly={transition}>
    <slot/>
</div>