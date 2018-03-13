<template>
	<p class="content-title">
		<slot></slot>
	</p>
</template>

<script>
	export default {
		name: 'ContentTitle',
		data() {
			return {}
		}
	}
</script>
<style lang="scss" scoped>
	.content-title {
		padding: 4px 6px;
    margin-bottom: 12px;
    font-size: 16px;
    color: #5a5e66;
    border-left: 3px solid #2dc3e8;
  }
</style>