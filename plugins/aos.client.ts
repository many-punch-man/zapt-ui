// plugins/aos.client.js

import AOS from 'aos';
import 'aos/dist/aos.css';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use({
        install(Vue) {
            Vue.directive('aos', {
                mounted(el, binding) {
                    el.setAttribute('data-aos', binding.value);
                    AOS.init();
                },
            });
        },
    });
});
