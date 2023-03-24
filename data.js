import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const tweetsData = [   
    {
        handle: `@Trollkid ninja`,
        profilePic: `images/troll-kid.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
        Guaranteed return on investment. DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },     
    {
        handle: `@studspaceguy`,
        profilePic: `images/stud.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                {
                handle: `@beentospace`,
                profilePic: `images/beentospace.png`,
                tweetText: `Yes! Sign me Up! 😎`,
                uuid : uuidv4()
            },
                {
                handle: `@Elon✅`,
                profilePic: `images/elon.png`,
                tweetText: `I went there last Year!😴`,
                uuid : uuidv4()
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
       {
        handle: `@noobcoder12`,
        profilePic: `images/troll-face.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML or we have to know much more than that? 😁`,
        replies: [
            {
                handle: `@stackoverflower`,
                profilePic: `images/stackoverflower.png`,
                tweetText: `NO. Obviously not, go get a job in Mcdonald's.😑`,
                uuid : uuidv4()
            },
            {
                handle: `@mdngeek`,
                profilePic: `images/mdngeek.jpg`,
                tweetText: `You are doing great!!😄`,
                uuid : uuidv4()
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]