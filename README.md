# Save a community member to your orbit workspace

This is a proof of concept repository for a serverless function that a Source, username and  and adds that person to an [Orbit](https://orbit.love) Workspace as a member.

## Requirements

* A place to host the function. This proof of concept uses Netlify functions
* [Orbit API key](https://docs.orbit.love/reference/authorization)
* Orbit workspace

## Environment variables

|Key|Value|
|--|----|
|ORBIT_WORKSPACE| *string* Orbit workspace ID | 


## Quick deploy with Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/brob/orbit-add-member-serverless)

The above button will fork this repository and set up a Netlify instance. Netlify SHOULD ask you for the env variable listed above. If it doesn't, you can access that from the Netlify Dashboard in the Build & Deploy settings.

## Function in other Functions as a Service platforms

The file at [/netlify/functions/addMember/addMember.js](https://github.com/brob/orbit-add-member-serverless/blob/main/netlify/functions/addMember/addMember.js) contains all the code for running this. This can be added as an AWS Lambda (or similar platform with potential tweaks).

## Usage

To use the function, it should receive a `GET` request with the following parameters:

|key|value|
|--|-----|
|source| What Identity source you want in Orbit (e.g. Twitter, GitHub, etc.)|
|username|The username in the source|
|tags|Comma separated tags to be added to the member in Orbit|

An Orbit API key is required to submit to Orbit. It can be passed to the function via the request header with a key of `x-api-key` and a value from your personal Orbit API. This allows for each team member to be shown as the person who added the new member.

### Example CURL
```
curl --request GET 'http://your-url.com/.netlify/functions/addMember?source=twitter&username=orbitmodel' \
--header 'x-api-key: your-api-key'
```


## Setting up an Apple Shortcut

This proof of concept operates under the assumption of as little interaction as possible. For those on MacOS or iOS, [an Apple Shortcut can be used](https://www.icloud.com/shortcuts/ffd196ef72b14267861b9831dddfbe0e).

*CURRENT ROADBLOCK*

Currently Apple's Shortcuts don't recognize the shortcut link properly on MacOS. The link above can be used on iOS (and works well on iOS). Once it's installed on iOS, it will be available on MacOS, as well. Hopefully, Apple fixes this in the near future.

The Shortcut can be initiated from the menu bar on MacOS. It will ask for a source, username, and list of tags. When installed, the Shortcut will ask for an API key and a serverless function URL to run.

After the member is added to your workspace, it will automatically open a new browser window with the member.

## Non-Apple usage

Since this is a serverless function, any method that can send a request with the right header and query parameters would work. This could be crafted into a JS bookmarklet to be used in other OSes.