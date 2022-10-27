var axios = require("axios");
const { NLClient, Language } = require("@expertai/nlapi");
require("dotenv").config();

var EAI_username = process.env.EAI_USERNAME;
var EAI_password = process.env.EAI_PASSWORD;
var TWITTER_token = process.env.TWITTER_TOKEN;

// console.log(EAI_username, EAI_password, TWITTER_token);

exports.handler = async function (event, context) {
  const username = event.queryStringParameters.username || "endashawdemsis";
  // console.log(username);

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(EAI_username),
  // };

  var eai_credential = {
    username: EAI_username,
    password: EAI_password,
  };

  var eai_config = {
    method: "post",
    url: "https://developer.expert.ai/oauth2/token",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    data: eai_credential,
  };

  eai_token = "Bearer ";
  console.log("_________________", eai_credential);
  var eai_login = await axios(eai_config);
  if (eai_login) {
    eai_token = eai_token + eai_login.data;
    // console.log("res:", eai_login);
  }

  // console.log(eai_login);
  // axios(eai_config)
  //   .then(function (response) {
  //     eai_token = eai_token + response.data;
  //     console.log("eai_token aquired!");
  //     // console.log(eai_token);
  //   })
  //   .catch(function (error) {
  //     console.log("error login");
  //   });

  const url = "https://api.twitter.com/2/";
  const authorization = "Bearer " + TWITTER_token;

  var userConfig = {
    method: "get",
    url:
      url +
      "users/by/username/" +
      username +
      "?user.fields=public_metrics,profile_image_url,location,verified,description,url,created_at",
    headers: {
      Authorization: authorization,
    },
  };

  var user = await axios(userConfig);
  // console.log("user: ", user.data.data);

  var tweetConfig = {
    method: "get",
    url:
      url +
      "users/" +
      user.data.data.id +
      "/tweets?tweet.fields=author_id,entities,in_reply_to_user_id,source,public_metrics&max_results=15",
    headers: {
      Authorization: authorization,
    },
  };
  var tweets = await axios(tweetConfig);

  async function hateSpeechAnalysis(text) {
    var data = JSON.stringify({
      document: {
        text: text,
      },
    });

    var config = {
      method: "post",
      url: "https://nlapi.expert.ai/v2/detect/hate-speech/en",
      headers: {
        Authorization: eai_token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    var res = await axios(config);
    return res;
  }

  var mentions = [];
  var hashtags = [];
  var urls = [];
  var tweeterClients = [];
  var topics = [];
  var hateSpeechs = [];

  var tweetCount = 0;
  var tweetWithMentions = 0;
  var tweetWithHashTags = 0;
  var tweetWithLinks = 0;
  var noOfReplies = 0;

  if (tweets.data.data) {
    await tweets.data.data.forEach(async (tweet) => {
      if (tweet.entities) {
        if (tweet.entities.annotations) {
          tweet.entities.annotations.forEach((annotation) => {
            if (annotation.probability > 0.7) {
              if (
                topics.findIndex(
                  (topic) => topic.text == annotation.normalized_text
                ) === -1
              ) {
                topics.push({
                  text: annotation.normalized_text,
                  probability: annotation.probability,
                });
              } else {
                topics.forEach((topic) => {
                  topic.probability =
                    topic.probability + annotation.probability;
                });
              }
            }
          });
        }
        if (tweet.entities.mentions) {
          tweet.entities.mentions.forEach((mention) => {
            if (!mentions.includes(mention.username)) {
              mentions.push(mention.username);
            }
          });
          tweetWithMentions = tweetWithMentions + 1;
        }
        if (tweet.entities.urls) {
          tweet.entities.urls.forEach((url) => {
            if (!urls.includes(url.url)) {
              urls.push(url.url);
            }
          });
          tweetWithLinks = tweetWithLinks + 1;
        }
        if (tweet.entities.hashtags) {
          tweet.entities.hashtags.forEach((hashtag) => {
            if (!hashtags.includes(hashtag.hashtag)) {
              hashtags.push(hashtag.tag);
            }
          });
          tweetWithHashTags = tweetWithHashTags + 1;
        }
        if (tweet.source) {
          if (!tweeterClients.includes(tweet.source)) {
            tweeterClients.push(tweet.source);
          }
        }
        if (tweet.in_reply_to_user_id) {
          noOfReplies = noOfReplies + 1;
        }
      }
      tweetCount = tweetCount + 1;
    });

    await Promise.all(
      tweets.data.data.map(async (tweet) => {
        var hateSpeech = await hateSpeechAnalysis(tweet.text);
        if (hateSpeech.data.success) {
          if (hateSpeech.data.data.categories) {
            if (hateSpeech.data.data.categories.length) {
              var hateSpeechTweet = {
                tweet_id: tweet.id,
                text: tweet.text,
                public_metrics: tweet.public_metrics,
                categories: [],
              };
              hateSpeech.data.data.categories.forEach((category) => {
                category.hierarchy.forEach((cat) => {
                  hateSpeechTweet.categories.push(cat);
                });
              });
              hateSpeechs.push(hateSpeechTweet);
            }
          }
        }
      })
    );
  }

  var tweetAnalysis = {
    tweetCount,
    tweetWithMentions,
    tweetWithHashTags,
    tweetWithLinks,
    noOfReplies,
    mentions,
    hashtags,
    urls,
    tweeterClients,
    topics,
  };

  var result = {
    user: user.data,
    tweetAnalysis,
    hateSpeechs,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
