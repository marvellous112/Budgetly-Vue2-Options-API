<template>
    <section class="w-screen h-screen text-center flex flex-col justify-center items-center overflow-hidden">
        <h1 class="text-[22px] min-w-max sm:text-3xl font-black tracking-wide uppercase m-8">page not found | 404</h1>

        <p class="text-lg sm:text-xl">
            Retrun to the
            <router-link exact :to="{ name: 'home' }" class="capitalize underline text-emerald-400 support:hover:text-emerald-500">home page</router-link>
        </p>
    </section>
</template>