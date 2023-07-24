<script lang="ts">
    export let emoji: string;
    export let selected: boolean;
    export let found: boolean;
</script>

<div class="square" class:flipped={selected}>
    {#if !found}
        <button on:click />
        <span>{emoji}</span>
    {/if}
</div>

<style>
    .square {
        background-color: blanchedalmond;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .flipped button {
        background-color: red;
    }

    span {
        font-size: 10em;
        pointer-events: none;
    }

    button {
        position: absolute;
        width: 100%;
        height: 100%;
        background: none;
    }
</style>
