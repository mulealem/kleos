<template>
  <div id="app" class="w-screen h-screen bg-white overflow-x-hidden relative">
    <custom-header class="sticky top-0 z-50" />
    <div class="mb-4">
      <div class="bg-blue-10 px-4 flex justify-center items-center">
        <div class="w-full max-w-6xl py-7">
          <h1 class="mb-6 text-4xl">Twitter Analytics</h1>
          <div class="md:flex md:flex-row">
            <div class="w-full">
              <p class="mb-6 text-lg">
                kloes is a Twitter analytics application that gives you rich
                insights about any public Twitter profile. We analyse data about
                topics, mentions, hashtags, followers, location and hatespeechs!
              </p>
              <p class="mb-6 text-lg">
                Just enter a Twitter username in the box below and hit the
                Analyze button!
              </p>
              <form class="max-w-xl" @submit.prevent="search">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                  >Search</label
                >
                <div class="relative">
                  <div
                    class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    v-model="username"
                    id="default-search"
                    class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. elonmusk"
                    required
                  />
                  <button
                    type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Analyze
                  </button>
                </div>
              </form>
              <p class="mt-3 text-xs text-neutral-500">
                It may take up to a couple of minutes to analyze a profile so
                please be patient.
              </p>
            </div>
            <div class="w-full">
              <img src="../assets/banner.webp" alt="" />
            </div>
            <div class="w-full hidden">
              <h4 class="pb-2 text-xl">Live Examples</h4>

              <div class="flex flex-wrap justify-center items-center">
                <div
                  v-for="i in 11"
                  :key="i"
                  class="even:bg-red-100 odd:bg-blue-100 odd:h-14 odd:w-14 even:h-20 even:w-20 m-2 p-2 rounded-full"
                >
                  <div class="w-full h-full bg-red-200 rounded-full">
                    <a href="https://kloes/nzbarry"
                      ><img
                        onerror="this.onerror=null; this.src=&#39;images/avatar-person.svg&#39;"
                        rel="twipsy"
                    /></a>
                  </div>
                  <!-- title="@NZBarry" -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-4 flex justify-center mt-8">
        <div class="w-full max-w-6xl">
          <h2 class="text-2xl pb-2">How It Works</h2>
          <div class="md:flex md:flex-row">
            <div class="w-full mt-2">
              <p>
                We gather the requested user's profile and latest tweets. We
                analyze the tweet's contents and tell you about topics usage,
                mentions, hashtags and any tweet that might contain hatespeech
                content.
              </p>
            </div>
            <div class="w-full mt-2">
              <p>
                We also show you things not shown on public Twitter pages, such
                as
                <strong>join date</strong>, <strong>timezone</strong> and
                <strong>followers ratio</strong>. With kloes it's very easy and
                incredibly fast to make up your mind on whether to follow
                somebody or not!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-4 flex justify-center mt-8">
        <div class="w-full max-w-6xl">
          <h2 class="text-2xl pb-2">The Metrics</h2>
          <div class="md:flex md:flex-row">
            <div class="w-full mt-2">
              <h3 class="mb-2 text-xl">Information</h3>
              <p>
                The info section shows the publicly available information about
                a requested Twitter profile. We'll also show you the user's join
                date and timezone among other things.
              </p>
            </div>
            <div class="w-full mt-2">
              <h3 class="mb-2 text-xl">Statistics</h3>
              <p>
                These are the numbers. Followers, friends, lists and most
                importantly the followers to following ratio - something you
                should definitely watch out for before following anybody.
              </p>
            </div>
          </div>
          <div class="md:flex md:flex-row">
            <div class="w-full mt-2">
              <h3 class="mb-2 text-xl">Topics</h3>
              <p>
                This section is divided into three sub-sections - topics,
                hashtags and mentions. Each one is based on the user's latest
                tweets.
              </p>
            </div>
            <div class="w-full mt-2">
              <h3 class="mb-2 text-xl">Hatespeech Tweets</h3>
              <p>
                We take you through the user's latest tweets which might contain
                hate speech content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <custom-footer />
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import CustomFooter from "@/components/CustomFooter.vue";
export default {
  name: "Home",
  components: {
    CustomHeader,
    CustomFooter,
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    search() {
      console.log("username: ", this.username);
      if (this.username) {
        this.$router.push({ name: "analysis", params: { id: this.username } });
      }
    },
  },
};
</script>
