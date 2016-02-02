stellar-sms-client
==================

This is a demo of Stellar SMS Client. This project was developed during Stellar Hack Day. **Do not use in production.**

## Current functionality

* Only one account working (configurable by updating app config files).
* After [deploying the app](#testing-using-heroku-and-twilio) you can send a transaction by sending SMS to your Twilio phone numer: `send [federation name] [amount]`. For example: `send joyce 10` will send 10 STR to Joyce.
* If you want to use your **test** account update config. You account must be funded - get some free lumens on [Galaxy](https://www.stellar.org/galaxy/).

## Future Usage scenarios

### Registration

This is the idea of usage of this system in production. We don't want users to send their passwords via SMS because of the following reasons:

* Passwords should be complicated and we don't want users type complicated passwords every time they're sending a payment.
* Mobile devices save sent messages.
* There should be an additional layer of authentication in case of device theft.
* We don't want plain-text passwords to be transmitted via 3rd party networks (GSM/Twilio etc.).

To meet requirements above we can use a system of one-time passwords.

1. User opens a webapp where he/she can login using stellar-wallet login data.
1. stellar-wallet returns encrypted keychain data to a webapp.
1. Webap decrypts keychain data in user's browser.
1. 20 random keys are generated.
1. Keychain data is encrypted by each of random keys. After encrypting keychain data, each key is SHA-256 hashed. Half of a hash and encrypted data are sent to a server.
1. User can print/save encryption keys which are now their one-time passwords.

In a production version users probably should be allowed to opt-out from one-time passwords solution or we should allow users to use 2 wallets: one for every day spendings (does not require passwords), another with savings (one-time passwords required).

### Sending a transaction

1. Users sends SMS with a transaction recipient (this can be address or federation name) and amount to be sent.
1. User receives SMS with transaction summary.
1. If everything is correct user needs to send one of one-time passwords (or a specific one, ex. 3rd.) to confirm a transaction.
1. Server calculates a SHA-256 hash and finds encrypted data in a database. Then decrypts keychain data, signs and submits a transaction. Used one-time password is removed from a database.
1. Server sends SMS message to a user with a confirmation.

In this demo transactions are sent right away.

## Testing using Heroku and Twilio

You can test this app live [using Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app).

After deploying your app you need to configure [Twilio](https://www.twilio.com/):

1. Create a phone number that is capable of sending/receiving SMS.
1. Update stellar-sms-client configuration with your Twilio API credentials and phone number. Deploy your app again.
1. In your phone number details set SMS & MMS > Request URL to:
```
https://[your heroku app URL]/receive
```
Request method should be set to `HTTP POST`.

