// https://nuxt.com/docs/api/configuration/nuxt-config
import {include, exclude} from "./build/optimize";

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', "@nuxt/devtools", 'nuxt-aos','@element-plus/nuxt','@pinia/nuxt','@pinia-plugin-persistedstate/nuxt'],
    elementPlus: {
        importStyle: 'scss',
        themes: ['dark'],
    },
    css: ['~/assets/scss/index.scss'],
    imports: {
        dirs: [
            'composables',
            'composables/**',
        ]
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
                    quietDeps: true
                }
            }
        },
        optimizeDeps: {include, exclude}
    },
    postcss: {
        plugins: {
            autoprefixer: {}
        }
    },
    routeRules: {
        "/admin-api/**":{
            proxy: "http://172.28.198.75:48080/admin-api/**"
        }
    },
})