<script setup>
import Header from '~/components/partials/Header.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Site header -->
    <Header />

    <main class="grow">

      <section class="relative before:absolute before:inset-0 before:h-80 before:pointer-events-none before:bg-gradient-to-b before:from-zinc-100 before:-z-10">
        <div class="pt-32 pb-12 md:pt-40 md:pb-20">
          <div class="px-4 sm:px-6">

            <!-- Page header -->
            <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 class="font-inter-tight text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 via-zinc-900 to-zinc-900">Reset your password</h1>
            </div>

            <!-- Form -->
            <div class="max-w-[25rem] mx-auto p-6 rounded-lg shadow-2xl bg-gradient-to-b from-zinc-100 to-zinc-50/70 relative before:absolute before:-top-12 before:-left-16 before:w-96 before:h-96 before:bg-zinc-900 before:opacity-[.15] before:rounded-full before:blur-3xl before:-z-10">

              <form>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm text-zinc-800 font-medium mb-2" for="email">Email</label>
                    <input id="email" class="form-input text-sm w-full" type="email" placeholder="mark@acmecorp.com" required />
                  </div>
                </div>
                <div class="mt-5">
                  <button class="btn text-zinc-100 bg-zinc-900 hover:bg-zinc-800 w-full shadow">Reset Password</button>
                </div>
              </form>

            </div>

          </div>
        </div>
      </section>

    </main>

  </div>
</template>
