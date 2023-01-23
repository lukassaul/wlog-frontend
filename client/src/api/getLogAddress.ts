import axios from 'axios';

export const GetLogAddressAPI = async () => {
    const url = 'http://38.242.245.144:3001/transaction/generate_address'
    try {
      return axios({
        method: 'GET',
        url: url,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("get log address axios request", err)
            } else {
              console.log("get log address axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get log address response error catch: ", error.response)
      }
    }
}
