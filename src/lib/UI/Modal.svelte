<script lang="ts">
	export let showModal: boolean;
	export let header = '';

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="w-96"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		{#if header}
			<div class="flex items-center pt-2 pb-4">
				<h1 class="text-3xl font-bold dark:text-text-primary-dark">{header}</h1>
			</div>
		{/if}
		<slot />
		<div class="flex justify-end gap-2 mt-2">
			<slot name="footer" close={() => dialog.close()} />
		</div>
	</div>
</dialog>

<style>
    dialog {
        max-width: 32em;
        border: none;
        padding: 0;
        @apply rounded-lg dark:bg-fills-primary-dark;
    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }

    dialog > div {
        padding: 16px;
    }

    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }

    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
