<script lang="ts">
    import Grid from "./Grid.svelte";
    import type { Level } from "./levels";
    import { levels } from "./levels";

    const level = levels[0];

    let size: number;
    let grid: string[] = createGrid(level);
    let found: string[] = [];

    function createGrid(level: Level) {
        const copy = [...level.emojis];
        const pairs: string[] = [];
        for (let i = 0; i < level.size ** 2 / 2; i++) {
            //Randomly pick emoji and remove it from array
            const index = Math.floor(Math.random() * copy.length);
            const emoji = copy[index];
            copy.splice(index, 1);
            pairs.push(emoji);
        }
        pairs.push(...pairs); //need to have 2 of each
    }
</script>

<div class="game">
    <div class="info" />
    <div class="grid-container">
        <Grid />
    </div>
    <div class="info" />
</div>

<style>
    .game {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: min(1vmin, 0.3em);
    }

    .info {
        width: 80em;
        height: 10em;
        background-color: aqua;
    }
    .grid-container {
        width: 80em;
        height: 80em;
        background-color: blueviolet;
    }
</style>
