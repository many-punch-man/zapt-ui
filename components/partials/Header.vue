<template>
  <header class="absolute top-2 md:top-6 w-full z-30">
    <div class="px-4 sm:px-6">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-center justify-between h-14 border border-transparent [background:linear-gradient(theme(colors.white),theme(colors.white))_padding-box,linear-gradient(120deg,theme(colors.zinc.300),theme(colors.zinc.100),theme(colors.zinc.300))_border-box] rounded-lg px-3">

          <!-- Site branding -->
          <div class="shrink-0 mr-4">
            <!-- Logo -->
            <router-link class="flex items-center justify-center bg-white w-8 h-8 rounded shadow-sm shadow-zinc-950/20" to="/">
              <img src="/assets/images/logo.png" width="24" height="24" alt="Logo">
            </router-link>
          </div>

          <!-- Desktop navigation -->
          <nav class="flex grow">

            <!-- Desktop sign in links -->
            <ul class="flex grow justify-end flex-wrap items-center">
              <li>
                <router-link class="text-sm font-medium text-zinc-500 hover:text-zinc-900 px-3 lg:px-5 py-2 flex items-center transition" to="/login">Log in</router-link>
              </li>
              <li class="ml-1">
                <router-link class="btn-sm text-zinc-100 bg-zinc-900 hover:bg-zinc-800 w-full shadow" to="/request-demo">Request Demo</router-link>
              </li>
            </ul>

          </nav>

        </div>
      </div>
    </div>
  </header>
</template>
