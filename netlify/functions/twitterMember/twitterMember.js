require('dotenv').config()
const fetch = require('node-fetch').default

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const { url } = event.queryStringParameters
    const urlFragments = url.split('https://twitter.com/')
    
    if (urlFragments && urlFragments.length == 1) return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Not a valid Twitter URL'
      })
    }
    

    const username = `@${urlFragments[1]}`
    console.log(username)

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ORBIT_API_KEY}`
      },
      body: JSON.stringify({
        identity: {
          source: 'twitter',
          username: `${username}`
        },
        member: {
          tags_to_add: ['added:follow-up']
        }
      })
    };

    const response = await fetch(`https://app.orbit.love/api/v1/${process.env.ORBIT_WORKSPACE}/members`, options)
    const json = await response.json()
    const member = json.data
    const { id, attributes } = member
    const { name } = attributes
    console.log(json)
    const successMessage = {
      message: `Successfully added ${name} to the Orbit member list with id of ${id}`,
      url: `https://app.orbit.love/${process.env.ORBIT_WORKSPACE}/members/${id}`
    }
      

    return {
      statusCode: 200,
      body: JSON.stringify(successMessage),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
