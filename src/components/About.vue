<template>
	<div class="content">
		 <div class="page-title">
		  	<h2>About</h2>
		  </div>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet pulvinar diam. Aliquam ac tellus eros. Nunc quis enim maximus, auctor nulla viverra, egestas massa. Praesent eget libero sed nulla fringilla euismod. Fusce auctor iaculis nibh in euismod. Sed eget facilisis dui. Aliquam sollicitudin tincidunt sapien vel efficitur. Mauris ut tempus sem, sit amet malesuada neque. Curabitur porta, nisi a blandit pretium, lorem urna luctus lorem, sed ultrices tellus risus eget orci. Praesent eros ex, egestas vel quam quis, finibus tempor augue. Phasellus porttitor mauris vel elementum congue. Sed malesuada nisi at lobortis pharetra. Morbi id massa ex. Aenean purus velit, gravida at tortor eget, eleifend interdum justo. Aenean est arcu, elementum id ullamcorper sit amet, pharetra vitae orci. Sed faucibus imperdiet leo.</p>
		<p>Nulla gravida at urna a sodales. Aenean rhoncus eros est, non sollicitudin tellus pharetra ac. Aliquam leo ante, accumsan a ornare eget, venenatis non elit. Fusce tempor augue lorem, eget hendrerit ante tristique quis. Ut feugiat nulla non mi imperdiet porttitor eu ac turpis. Maecenas blandit vel ex vitae tincidunt. Nunc tempus sed nisl id pellentesque. Praesent commodo luctus aliquam. Sed volutpat nulla ac iaculis lacinia. Nam at velit ac nibh vulputate accumsan. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce scelerisque consequat nisi eget ornare. Ut eget nibh urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam at odio nec diam tempus maximus.</p>
		<p>Mauris vehicula mi nec lorem aliquam sodales. Phasellus tellus ex, finibus non dignissim sed, commodo vel nisl. Sed porta feugiat odio, aliquam porta lorem gravida mattis. Vestibulum facilisis pharetra mauris, at ornare arcu facilisis eget. Etiam tempus eu ex ac convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus purus ante, non aliquet felis accumsan ut.</p>
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