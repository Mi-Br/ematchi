<script lang="ts">
    import { get_tweemoji_url } from "./utils";

    export let found: string[] = [];
</script>

<div class="found">
    {#each found as emoji (emoji)}
        <img alt={emoji} src={get_tweemoji_url(emoji)} />
    {/each}
</div>

<style>
    .found {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5em;
    }
    img {
        width: 4em;
        height: 4em;
    }
</style>
