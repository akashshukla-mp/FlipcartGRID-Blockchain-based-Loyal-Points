## To Run the Website follow the given instructions
Inside root directory run the following commands
```
npm install
truffle compile
truffle migrate
```
then, Navigate Inside client/src folder and replace 'contractAdress' inside 'configData.json' from the contract adress you got after running above commands, and run
```
npm install
```
inside client/frontend and client/DB

Create a .env file inside client/DB
replace these variables with your variables 

```
MONGO_URI = ''
JWT_SECRET = ''
BRAINTREE_MERCHANT_ID = ''
BRAINTREE_PUBLIC_KEY = ''
BRAINTREE_PRIVATE_KEY = ''
```

