<template>
  <div class="content">
		 <div class="page-title">
		  	<h2>Recommended Movies!</h2>
		 </div>
	</div>
</template>

<script>
  export default {
		created(){
			this.$emit('loadingInit'); // Initiate loading
			setTimeout(() => {this.$emit('loadingCompleted');}, 600); // Close Loading animation
		}
  }
</script>