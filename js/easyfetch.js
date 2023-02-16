class EasyFetch {
  constructor() {
    this.production = false;
    this.strings = {
      aFieldToPayloadIsVoid: "Un campo está vacio",
    };
    this.inputs = this.getInputs();
  }

  getInputs() {
    return document.querySelectorAll("input,TextArea,select");
  }

  async fetchData(
    urlApi,
    params = {},
    method = "GET",
    verify = false,
    headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  ) {
    params = this.formatParams(params);

    let url = this.production
      ? "https://" + window.location.host + urlApi
      : window.location.protocol+"//"+ window.location.host + urlApi;
    if (!this.production) {
      console.log("FETCHING", method, url);
    }
    if (verify) {
      if (!this.checkParams(params)) {
        console.log("VERIFY", "Fetch Stoped");
        //alert(this.strings.aFieldToPayloadIsVoid);
        throw new Error(`FETCH ERROR! eror: a field to payload is void`);
      }
    }
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!this.production && data) {
      console.log("FETCH DATA", data);
    }
    return data;
  }
  formatParams(params) {
    for (let i in params) {
      for(let y=0;y<this.inputs.length;y++){
        if(params[i]==this.inputs[y].id){
          params[i]=this.inputs[y].value
          break;
        }
      }
    }
    if (!this.production) {
      console.log("PARAMS PAYLOAD", params);
    }
    return params;
  }
  checkParams(params) {
    for (let i in params) {
      if (!params[i] || params[i] == null || params[i] == undefined) {
        console.log("VERIFY The value '" + i + "' is void");
        return false;
      }
    }
    return true;
  }
  setCookie(name,value,path="/"){
    document.cookie = name+"=" + value + ";path="+path;
  }
  getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
let easyFetch = new EasyFetch();
