const fetch = require('node-fetch')

for(let i = 1; i <= 500; i++) {
    let username = `newUser${i}`
    let email = `newEmail@${i}.com`
    let password = `pass${i}`

    fetch(`http://localhost:5001/register`, {
        method: 'Post',
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
        headers: {
            'Content-type' : 'application/json'
        }
    })
}
