# create-subject-with-filter

mimicing rxjs Subject exposing filter only. Attempts to create a small webpacked file using rxjs/Subject is currently too hard to '[patch](https://gist.github.com/ericelliott/827f9628a8e032645df991d9f1e2140f)' 

# Install

[yarn add create-subject-with-filter](https://www.npmjs.com/package/create-subject-with-filter)

# Usage

```javascript
const {
	next: newMessage,
	subscribe: handleMessage,
	filter: filterMessage
} = createSubject()

//do something
handleMessage(msg => bar(msg))

//Send message
newMessage({payload:'bar'})

//filter the subscription
const filtered = filterMessage(msg => payload==='foo')

//subscribe and get the subscription back
const subscription = filtered.subscribe(msg => foo(msg))

///unsubscribe
subscription.unsubscribe()

```
