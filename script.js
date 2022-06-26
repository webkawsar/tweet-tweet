// Select All Elements
const tweetInputElm = document.querySelector('#tweetInput');
const inputCharacterElm = document.querySelector('#character');
const submitElm = document.querySelector('#submit');

const searchTweetElm = document.querySelector('#searchTweet');
const tweetTextElm = document.querySelector('#tweetText');
const tweetTimeElm = document.querySelector('#tweetTime');
const tweetDeleteElm = document.querySelector('#tweetDelete');
const formElm = document.querySelector('form');
const listGroupElm = document.querySelector('#listGroup');


// data layer
let tweets = [];


// helper functions
const validateInput = (text) => {

    let isError = false;
    if(!text.length || text.length > 250) {
        isError = true;
    }

    return isError;
}

const generateTime = () => {
    
    return moment().format('MMMM Do YYYY, h:mm:ss a')
}

const addTweetToUI = ({id, tweetText, createdAt}) => {
    const newElm = `<li
                        class="list-group-item d-flex justify-content-between align-items-start tweet-${id}"
                    >
                        <div class="ms-2 me-auto">
                        <div class="fw-bold" id="tweetText">
                            ${tweetText}
                        </div>
                        <small class="text-muted" id="tweetTime"
                            >${createdAt}</small
                        >
                        </div>
                        <button
                            type="button"
                            class="btn btn-secondary delete-tweet"
                            id="tweetDelete"
                        >
                        Delete
                        </button>
                    </li>`
    listGroupElm.insertAdjacentHTML('afterbegin', newElm);
}


const addTweetToLocalStorage = (tweet) => {
    let tweets;
    const allTweets = localStorage.getItem('tweets')
    if(allTweets) {
        tweets = JSON.parse(allTweets);
        tweets.push(tweet);

        // update to local storage
        localStorage.setItem('tweets', JSON.stringify(tweets));

    } else {

        tweets = [];
        tweets.push(tweet);
        // update to local storage
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
}

const resetInput = () => {
    tweetInputElm.value = '';
}

const showAllTweetsToUI = (tweetsArr) => {

    listGroupElm.innerHTML = '';
    tweetsArr.forEach(item => {

        const htmlListElm = `<li
                            class="list-group-item d-flex justify-content-between align-items-start tweet-${item.id}"
                        >
                            <div class="ms-2 me-auto">
                            <div class="fw-bold" id="tweetText">
                                ${item.tweetText}
                            </div>
                            <small class="text-muted" id="tweetTime"
                                >${item.createdAt}</small
                            >
                            </div>
                            <button
                                type="button"
                                class="btn btn-secondary delete-tweet"
                                id="tweetDelete"
                            >
                            Delete
                            </button>
                        </li>`
        listGroupElm.insertAdjacentHTML('afterbegin', htmlListElm);

    })
}

const getTweetId = (elm) => {
        
    return Number(elm.parentElement.classList[4].split('-')[1]);
}

const removeTweetFromUI = (id) => {
    document.querySelector(`.tweet-${id}`).remove();
}

const removeTweetFromDataStore = (id) => {
    tweets = tweets.filter(item => item.id !== id);
}

const removeFromLocalStorage = (id) => {
    // pick from local storage
    let tweets = JSON.parse(localStorage.getItem('tweets'));
    // filter data
    tweets = tweets.filter(item => item.id !== id);
    // save data to storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}




formElm.addEventListener('submit', (e) => {
    e.preventDefault();

     // receiving input
    const tweetInput = tweetInputElm.value;
    
    // validate input
    const isError = validateInput(tweetInput);
    if(isError) {
        alert('Please provide valid input');
        return;
    }

    // add tweet to data store
    const tweet = {
        id: tweets.length,
        tweetText: tweetInput,
        createdAt: generateTime()
    }
    tweets.push(tweet);

    // add tweet to UI
    addTweetToUI(tweet);

    // add tweet to localStorage
    addTweetToLocalStorage(tweet)

    // reset the input
    resetInput();
})

document.addEventListener('DOMContentLoaded', e => {
    // checking item into local storage
    const allTweets = localStorage.getItem('tweets');
    if(allTweets) {
        tweets = JSON.parse(allTweets);
        showAllTweetsToUI(tweets);
    }
})


// delete event listener
listGroupElm.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-tweet')) {
        
        const id = getTweetId(e.target);
        // delete tweet from UI
        removeTweetFromUI(id);

        // delete tweet from data store
        removeTweetFromDataStore(id);

        // delete tweet from local storage
        removeFromLocalStorage(id);
    }
})




















