# EasyFetch 0.1.1
Perform easier fetches in Static FrontEnd projects, You don't need to declare and instantiate inputs to get their 
URL Include
```
https://easyfetch.smarttech.pe/js/easyfetch.js

```

values. EasyFetch will do it for you
```
<body>
  <input type="text" id="email-login">
  <input type="text" id="password-login">
</body>

```



```
async function loginAdmin() {
  let response = await easyFetch
    .fetchData(
      "/admin/signin",
      {
        email: "email-login",
        password: "password-login",
      },
      "POST",
      true
    )
    .catch((e) => {
      console.error(e);
      return null;
    });
  console.log("Response",response)
}
```
