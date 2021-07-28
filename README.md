# mandi-api

An express JS API web-service.

## Installation

Install all the npm modules 

``` 
npm install
```

In addition to npm packages, if [mongodb](https://www.mongodb.com/try/download/community)  is not installed in your system, please go ahead and install it, because the service 
is not using cloud services.

Also, if your default port is other than `3000` and default mongodb url other than `127.0.0.1:27017`, kindly change it in `config/test.env`
```
PORT = <YOUR DEFAULT PORT>
MONGODB_URL = mongodb://<YOUR URL>/mandi-api-test
```

### To test the API 

```
npm run test
```

 >_Press 'a' if prompted to run the tests_

---

 The testing framework used is Jest and two `environment variables` files exists to avoid tampering of the dev data by the running tests.
 
**Commodity** is the Schema of the collection which stores the aggregate data formed using reports sent. **Report** is the schema of the 
 reports sent by an agent of the mandi.
 
 ### To calculate mean price
 
 To avoid floating point errors while calculating the mean of price, `mathjs` library is used and to reduce the complexity of calculating price per Kg, while saving
 the report an additional `perKg` field is added which is then used to calculate the mean price through a middleware on save method of **Commodity** Schema.
 
 






