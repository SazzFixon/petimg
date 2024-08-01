<script lang="ts">
	import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@petimg/svelte'
	import petimg from '@petimg/core'
	import Webcam from '@petimg/webcam'
	import XHRUpload from '@petimg/xhr-upload'

	const createpetimg = () => {
		return new petimg().use(Webcam).use(XHRUpload, {
			bundle: true,
			endpoint: 'http://localhost:9967/upload',
			allowedMetaFields: ['something'],
			fieldName: 'files',
		})
	}

	let petimg1 = createpetimg()
	let petimg2 = createpetimg()

	let open = false;
	let showInlineDashboard = true;
</script>

<main>
	<h1>Welcome to the <code>@petimg/svelte</code> demo!</h1>
	<h2>Inline Dashboard</h2>
	<label>
      <input
        type="checkbox"
				bind:checked={showInlineDashboard}
			/>
      Show Dashboard
	</label>
	{#if showInlineDashboard}
		<Dashboard
			petimg={petimg1}
			plugins={['Webcam']}
		/>
	{/if}
	<h2>Modal Dashboard</h2>
	<div>
		<button on:click={() => open = true}>Show Dashboard</button>
		<DashboardModal
			petimg={petimg2}
			open={open}
			props={{
				onRequestCloseModal: () => open = false,
				plugins: ['Webcam']
			}}
		/>
	</div>

	<h2>Drag Drop Area</h2>
	<DragDrop
		petimg={petimg1}
	/>

	<h2>Progress Bar</h2>
	<ProgressBar
		petimg={petimg1}
		props={{
			hideAfterFinish: false
		}}
	/>
</main>
<style global>
	@import "@petimg/core/dist/style.min.css";
	@import "@petimg/dashboard/dist/style.min.css";
	@import "@petimg/drag-drop/dist/style.min.css";
	@import "@petimg/progress-bar/dist/style.min.css";
	input[type="checkbox"] {
		user-select: none;
	}
</style>
