# kloes

kloes is a Twitter analytics application that gives you rich insights about any public Twitter profile. We analyse data about topics, mentions, hashtags, followers, location and hatespeechs!

The process:

API request to twitter api to get a user by username
API request to twitter to get tweets by user Id
For each tweet:
API request to expert.ai hate spech detection API endpoint
Return the result as

```
user object from twiter API,
tweetAnalysis:{
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
}, hatespeechs:{
tweet_id,
text,
public_metrics,
categories,
}
```

## Project setup

add .env file

```
EAI_USERNAME = xxxxxxxxx;
EAI_PASSWORD = xxxxxxxxx;
TWITTER_TOKEN=xxxxxxxxx;
```

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
