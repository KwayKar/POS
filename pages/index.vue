<template>
  <DashboardLayout>
    <div>
      <PublicNav/>
        <section>
          <page/>
        </section>
          <p>This show up</p>
    </div>
  </DashboardLayout>
</template>

<script lang="ts">
import Vue from 'vue'
import DashboardLayout from "~/layouts/DashboardLayout.vue";
import PublicNav from '~/components/reuse/navigation/PublicNav.vue';
import Page from '~/components/reuse/navigation/page.vue';

export default {
  components: {
    DashboardLayout,
    PublicNav,
    Page
    
  },
};
</script>
