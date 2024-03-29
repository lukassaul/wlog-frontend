import axios from 'axios';

export const GetLogBalanceBEAPI = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/transaction/log_balance`
    try {
      return axios({
        method: 'GET',
        url: url,
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("get log balance axios request", err)
            } else {
              console.log("get log balance axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get log balance response error catch: ", error.response)
      }
    }
}