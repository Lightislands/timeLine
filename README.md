# Express OpenID Connect Webapp Sample

See a detailed walk-through of this sample app on the [Express Quickstart](https://auth0.com/docs/quickstart/webapp/express).

## Running This Sample Locally

1. Create DB:
https://account.mongodb.com/account/login
- Connect to Cluster -> Connect your application -> copy "connection string" and add to .env DB_URL

2. Create Auth0 app with gmail login:
https://manage.auth0.com/

3. Config google console
https://console.cloud.google.com/

4. Install the dependencies in "root" with npm:
npm install

5. Install the dependencies in "client" with npm:
npm install

6. Rename `.env.example` to `.env` and check the values from auth0 settings (change Secret). 

7. Run the sample app (ui + server):
npm run dev


To run server only:

```
node server.js OR npm run start


The sample app will be served at `localhost:3000`.

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.

### Deployment

Create new Node.js app with param:
- Application root - web.lightislands.com
- Application URL - web.lightislands.com
- Application startup file - index.js
Upload Node files and React build folder
Run npm install

### Resources
## Auth0 config
- Add app in Applications/Applications
- Set google account in Authentication/Social (Client ID and Client Secret from google console), because the default Auth one does not always working.
https://github.com/auth0-samples/auth0-express-webapp-sample/tree/master/01-Login
https://auth0.com/docs/quickstart/webapp/express
## Config google console
https://console.cloud.google.com/
https://www.youtube.com/watch?v=qDuz_aWoxe8&ab_channel=OktaDev

### MongoDb
https://www.youtube.com/watch?v=scVi_6xqAEc&ab_channel=Headhonk