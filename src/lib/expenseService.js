import {mockBackendUrl, backendUrl} from '../shared/apiUrl';

export const getAll = (controller) => {
 // console.log("process.env_MOCK_JSON_SERVER",process.env_MOCK_JSON_SERVER)
  if(process.env.MOCK_JSON_SERVER){
  //  console.log("tes1");
    return fetch(mockBackendUrl+""+controller).then(res => res.json());
  } else {
  //  console.log("tes2");
    return fetch(backendUrl+""+controller).then(res => res.json());
  }

};

export const createExpense = (temp) => {

console.log("temp",temp);
  fetch(backendUrl+"expense", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: "POST",
    body: JSON.stringify({temp})

})
  .then(res => {
    if (!res.ok) throw Error(res.statusText);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log(error));
}

