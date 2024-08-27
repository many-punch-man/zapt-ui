<template>
  <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <Hero />
      <Features01 />
      <Features02 />
      <Features03 />
      <PricingTabs />
      <Testimonials />
      <Cta />

    </main>

    <!-- Site footer -->
    <Footer />

  </div>
</template>

<script setup lang="ts" >
import Features01 from "~/components/partials/Features01.vue";
import Hero from "~/components/partials/Hero.vue";
import Features02 from "~/components/partials/Features02.vue";
import Features03 from "~/components/partials/Features03.vue";
import PricingTabs from "~/components/partials/PricingTabs.vue";
import Testimonials from "~/components/partials/Testimonials.vue";
import Cta from "~/components/partials/Cta.vue";
import Header from "~/components/partials/Header.vue";

defineOptions({name: 'index'})

const {data,execute} = await useAsyncData(()=>getTestAPI())

</script>
