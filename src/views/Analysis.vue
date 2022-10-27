<template>
  <div class="w-screen h-screen flex flex-col bg-white overflow-x-hidden">
    <custom-header />
    <div
      v-if="isLoading"
      class="h-full flex flex-col justify-center items-center"
    >
      <dot-loader :loading="isLoading" color="blue"></dot-loader>
      <div class="p-5">Analyzing @{{ username }}...</div>
    </div>
    <div
      v-if="!isLoading"
      class="w-full pt-3 pb-5 border-b border-b-neutral-300 px-4 flex justify-center"
    >
      <div class="w-full max-w-6xl py-4">
        <!-- <div>{{ user }}</div> -->

        <div class="w-full flex items-center">
          <div class="h-16 w-16 md:w-16 md:h-16 rounded-full bg-red-100 mr-5">
            <div class="w-full h-full rounded-full bg-neutral-300">
              <img class="rounded-full" :src="user.profile_image_url" />
            </div>
            <!-- alt="Endashaw Demsis Profile Image" -->
          </div>
          <div class="">
            <div class="text-sm text-neutral-400">@{{ user.username }}</div>
            <h1 class="flex items-center">
              {{ user.name }}
              <img
                v-if="user.verified"
                src="../assets/verified.png"
                alt=""
                class="ml-2 w-5"
              />
            </h1>
            <!-- <div>
              <span class="text-sm text-neutral-600"
                >Updated: October 12, 2022
              </span>
            </div> -->
          </div>
        </div>
        <div class="pt-8 max-w-3xl">
          <div class="md:flex md:flex-row">
            <div class="w-full">
              <div class="w-full mb-1 flex justify-between">
                Location
                <span class="right bold">{{ user.location }}</span>
              </div>

              <div class="w-full mb-1 flex justify-between">
                Joined
                <span class="right">{{ user.created_at | formatDate }}</span>
              </div>
              <div class="w-full mb-1 flex justify-between">
                URL
                <span class="right"
                  ><a :href="user.url">{{ user.url }}</a></span
                >
              </div>
              <div class="w-full mb-1 flex justify-between">
                Description <span class="right">{{ user.description }}</span>
              </div>
            </div>
            <div class="w-full md:pl-8" v-if="user.public_metrics">
              <div class="w-full mb-1 flex justify-between">
                Followers
                <span class="right">{{
                  user.public_metrics.followers_count | abbr
                }}</span>
              </div>
              <div class="w-full mb-1 flex justify-between">
                Following
                <span class="right">{{
                  user.public_metrics.following_count | abbr
                }}</span>
              </div>
              <div class="w-full mb-1 flex justify-between">
                Ratio
                <span class="right">
                  {{
                    (user.public_metrics.followers_count /
                      user.public_metrics.following_count)
                      | formatNumber
                  }}
                </span>
              </div>
              <div class="w-full mb-1 flex justify-between">
                Tweets
                <span class="right">{{
                  user.public_metrics.tweet_count | abbr
                }}</span>
              </div>
              <div class="w-full mb-1 flex justify-between">
                Listed
                <span class="right">{{
                  user.public_metrics.listed_count | abbr
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!isLoading"
      class="w-full p-4 bg-neutral-100 flex justify-center"
    >
      <div class="w-full max-w-6xl bg-neutral-100 flex justify-start">
        <div class="w-full max-w-3xl">
          <div class="">
            <div class="bg-white p-4 px-6 mb-4 shadow">
              <h2 class="pb-3 text-xl font-bold border-b border-b-neutral-200">
                Hate Speech Tweets
              </h2>
              <div class="mt-2 flex flex-wrap">
                <div
                  class="bg-white w-full border rounded-lg p-5"
                  v-for="(tweet, index) in hateSpeechs"
                  :key="index"
                >
                  <div class="flex justify-between">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-green-500 rounded-full">
                        <img
                          class="rounded-full"
                          :src="user.profile_image_url"
                        />
                      </div>

                      <div class="text-sm ml-3">
                        <div class="text-neutral-700">@{{ user.username }}</div>
                        <div class="flex items-center">
                          {{ user.name }}
                          <img
                            v-if="user.verified"
                            src="../assets/verified.png"
                            alt=""
                            class="ml-1 w-4"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <a
                        :href="
                          'https://twitter.com/elonmusk/status/' +
                          tweet.tweet_id
                        "
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="p-3">{{ tweet.text }}</div>
                  <div class="flex text-sm">
                    <div class="px-3 py-1 mr-3 bg-neutral-200 rounded-full">
                      {{ tweet.public_metrics.retweet_count | abbr }} Retweet
                    </div>
                    <div class="px-3 py-1 mr-3 bg-neutral-200 rounded-full">
                      {{ tweet.public_metrics.quote_count | abbr }} Quote Tweets
                    </div>
                    <div class="px-3 py-1 mr-3 bg-neutral-200 rounded-full">
                      {{ tweet.public_metrics.like_count | abbr }} Likes
                    </div>
                  </div>
                  <div class="pt-2">
                    <div class="text-sm bold py-2">Tags</div>
                    <div class="flex flex-wrap">
                      <div
                        v-for="(tag, index) in tweet.categories"
                        :key="index"
                        class="px-3 py-1 mr-3 bg-red-300 rounded-full text-sm"
                      >
                        {{ tag }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- title="@joshua_ubeku / mentioned 3 times" -->
              </div>
            </div>
            <div class="bg-white p-4 px-6 mb-4 shadow">
              <h2 class="pb-3 text-xl font-bold border-b border-b-neutral-200">
                Tweets Analysis
              </h2>
              <p class="my-4">
                We analyzed {{ tweetAnalysis.tweetCount }} of the tweets by @{{
                  user.username
                }}
                and here's what we found.
              </p>
              <div
                class="md:flex md:flex-row justify-center py-2 border-b border-b-neutral-100"
              >
                <div class="w-3/4 md:w-5/12">Tweets with @mentions</div>
                <div class="w-1/4 md:w-2/12 text-right pr-2">
                  {{ tweetAnalysis.tweetWithMentions }} /
                  {{ tweetAnalysis.tweetCount }}
                </div>
                <div class="w-full md:w-5/12 bg-blue-200">
                  <div
                    class="bg-blue-500 h-1 md:h-6"
                    role="progressbar"
                    :style="{
                      width:
                        (tweetAnalysis.tweetWithMentions /
                          tweetAnalysis.tweetCount) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>
              <div
                class="md:flex md:flex-row justify-center py-2 border-b border-b-neutral-100"
              >
                <div class="w-3/4 md:w-5/12">Tweets with #hashtags</div>
                <div class="w-1/4 md:w-2/12 text-right pr-2">
                  {{ tweetAnalysis.tweetWithHashTags }} /
                  {{ tweetAnalysis.tweetCount }}
                </div>
                <div class="w-full md:w-5/12 bg-blue-200">
                  <div
                    class="bg-blue-500 h-1 md:h-6"
                    role="progressbar"
                    :style="{
                      width:
                        (tweetAnalysis.tweetWithHashTags /
                          tweetAnalysis.tweetCount) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>
              <div
                class="md:flex md:flex-row justify-center py-2 border-b border-b-neutral-100"
              >
                <div class="w-3/4 md:w-5/12">Tweets with links</div>
                <div class="w-1/4 md:w-2/12 text-right pr-2">
                  {{ tweetAnalysis.tweetWithLinks }} /
                  {{ tweetAnalysis.tweetCount }}
                </div>
                <div class="w-full md:w-5/12 bg-blue-200">
                  <div
                    class="bg-blue-500 h-1 md:h-6"
                    role="progressbar"
                    :style="{
                      width:
                        (tweetAnalysis.tweetWithLinks /
                          tweetAnalysis.tweetCount) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>
              <div
                class="md:flex md:flex-row justify-center py-2 border-b border-b-neutral-100"
              >
                <div class="w-3/4 md:w-5/12">Replies</div>
                <div class="w-1/4 md:w-2/12 text-right pr-2">
                  {{ tweetAnalysis.noOfReplies }} /
                  {{ tweetAnalysis.tweetCount }}
                </div>
                <div class="w-full md:w-5/12 bg-blue-200">
                  <div
                    class="bg-blue-500 h-1 md:h-6"
                    role="progressbar"
                    :style="{
                      width:
                        (tweetAnalysis.noOfReplies / tweetAnalysis.tweetCount) *
                          100 +
                        '%',
                    }"
                  ></div>
                </div>
              </div>
              <div
                class="md:flex md:flex-row justify-center py-2 border-b border-b-neutral-100"
              >
                <div class="w-3/4 md:w-3/12">Twitter clients usage</div>
                <div class="w-full md:w-9/12">
                  <span
                    v-for="(client, index) in tweetAnalysis.tweeterClients"
                    :key="index"
                    >{{ client }}</span
                  >
                </div>
              </div>
            </div>
            <div class="bg-white p-4 px-6 mb-4 shadow">
              <h2 class="pb-3 text-xl font-bold border-b border-b-neutral-200">
                Topics
              </h2>
              <p class="mt-4 mb-2">
                <span
                  v-for="(topic, index) in tweetAnalysis.topics"
                  :key="index"
                  class="pr-2 text-blue-700"
                  >{{ topic.text }}</span
                >
              </p>
            </div>
            <div class="bg-white p-4 px-6 mb-4 shadow">
              <h2 class="pb-3 text-xl font-bold border-b border-b-neutral-200">
                Hashtags
              </h2>
              <p class="mt-4 mb-2">
                <a
                  v-for="(hashtag, index) in tweetAnalysis.hashtags"
                  :key="index"
                  class="pr-2 text-blue-700"
                  :href="'https://twitter.com/#!/search/' + hashtag"
                  aria-label="3"
                  >#{{ hashtag }}</a
                >
              </p>
            </div>
            <div class="bg-white p-4 px-6 mb-4 shadow">
              <h2 class="pb-3 text-xl font-bold border-b border-b-neutral-200">
                Mentions
              </h2>
              <div class="mt-2 flex flex-wrap">
                <a
                  v-for="(mention, index) in tweetAnalysis.mentions"
                  :key="index"
                  class="pr-2 text-blue-700"
                  :href="'https://twitter.com/' + mention"
                  aria-label="3"
                  >@{{ mention }}</a
                >

                <!-- title="@joshua_ubeku / mentioned 3 times" -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <custom-footer />
  </div>
</template>
<script>
import axios from "axios";
import { shortenLargeNumber } from "../abbrevate";
import moment from "moment";
import DotLoader from "vue-spinner/src/DotLoader.vue";

import CustomHeader from "@/components/CustomHeader.vue";
import CustomFooter from "@/components/CustomFooter.vue";
export default {
  name: "Analysis",
  created() {
    // console.log(shortenLargeNumber(1818396, 1));
    this.search(this.$route.params.id);
  },
  components: {
    CustomHeader,
    CustomFooter,
    DotLoader,
  },
  data() {
    return {
      username: "",
      user: {},
      tweetAnalysis: {},
      hateSpeechs: [],
      isLoading: true,
    };
  },
  methods: {
    search(username) {
      this.isLoading = true;
      this.username = username;
      var config = {
        method: "get",
        url: ".netlify/functions/analysis?username=" + username,
      };
      var that = this;
      axios(config)
        .then(function (response) {
          that.user = response.data.user.data;
          that.user.profile_image_url = that.user.profile_image_url.replace(
            "normal.jpg",
            "400x400.jpg"
          );
          that.tweetAnalysis = response.data.tweetAnalysis;
          that.hateSpeechs = response.data.hateSpeechs;
          console.log("response: ", response.data);
          that.isLoading = false;
        })
        .catch(function (error) {
          console.log("error", error);
          that.isLoading = false;
        });
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    },
    abbr: function (num) {
      return shortenLargeNumber(num, 1);
    },
    formatDate: function (value) {
      if (value) {
        return moment(String(value)).format("MMM YYYY");
      }
    },
    formatNumber: function (value) {
      if (value) {
        return parseFloat(value.toFixed(2));
      }
    },
  },
};
</script>
