import axios from 'axios';

export const GetTransactionsAPI = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/transaction/report`
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
              console.log("get transaction reports axios request", err)
            } else {
              console.log("get transaction reports axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get transaction reports response error catch: ", error.response)
      }
    }
}