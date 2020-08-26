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

