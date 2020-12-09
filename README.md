# Time for friends

### Fullstack project with React, Node.js, express and MongoDB.
Includes challenges as date & time management, Mongo Schema and Context factories.

## Start server and reset DB 
```js
cd backend
node server reset-db
```

## Start frontend
```js
cd frontend
npm run start
```

### Sidenote
Can't serve frontend from server, because Babel transpiles Classes to Functions to support old browsers. This breaks the frontend ORM for handling REST requests.


<details>
    <summary>Hidden Details</summary>
    Something small enough to escape casual notice.
</details>

<style>
details {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: .5em .5em 0;
}

summary {
    font-weight: bold;
    margin: -.5em -.5em 0;
    padding: .5em;
}

details[open] {
    padding: .5em;
}

details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: .5em;
}
</style>
