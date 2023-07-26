<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Square from "./Square.svelte";
    export let grid: string[] = [];
    export let found: string[] = [];

    let a: number = -1;
    let b: number = -1;
    let reset_timeout: number;

    const dispatch = createEventDispatcher();
</script>

<div class="grid">
    {#each grid as emoji, i}
        <Square
            {emoji}
            selected={a == i || b == i}
            found={found.includes(emoji)}
            on:click={() => {
                clearInterval(reset_timeout);
                if (a == -1 && b == -1) {
                    a = i;
                } else if (b === -1) {
                    b = i;
                    if (grid[a] === grid[b]) {
                        //found pair
                        dispatch("found", {
                            emoji,
                        });
                    } else {
                        reset_timeout = setTimeout(() => {
                            a = b = -1;
                        }, 1000);
                    }
                } else {
                    b = -1;
                    a = i;
                }
            }}
            group={grid.indexOf(emoji) == i ? "a" : "b"}
        />
    {/each}
</div>

<style>
    .grid {
        display: grid;
        height: 100%;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 0.4em;

        /* flip effect */
        perspective: 100vw;
    }
</style>
