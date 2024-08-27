// uno.config.ts
import {defineConfig, presetAttributify, presetUno,transformerVariantGroup} from 'unocss'
import zaptPreset from "./zapt-preset"

export default defineConfig({
    // ...UnoCSS options
    presets: [
        presetAttributify({}),
        presetUno(),
        zaptPreset(),
    ],
    transformers: [transformerVariantGroup()],
    shortcuts: {
        //     这里是快捷方式，允许多个规则组合在一起
        'center-row': 'flex flex-row justify-center items-center'
    }
})