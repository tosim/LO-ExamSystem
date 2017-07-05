<template>
  <div>
    <LayoutContent>
      <div slot="content">
        <slot name="main"></slot>
      </div>
    </LayoutContent>
  </div>
</template>
<style lang="css">
  body {
    margin: 0 0px;
  }

  a {
    text-decoration: none;
  }

</style>
<script type="text/babel">
  import LayoutContent from './content/content';
  export default{
    components: {
      LayoutContent
    }
  }
</script>
