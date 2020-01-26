<script>
import Vue from 'vue';
import { Logo } from './lib-components/index';

export default Vue.extend({
  name: 'DevLibrary',
  components: {
    Logo
  }
});
</script>

<template>
  <div id="app">
     <logo :color="'rgba(80, 250, 123, 1)'" />
  </div>
</template>
