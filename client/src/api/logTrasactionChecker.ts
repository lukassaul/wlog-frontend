import axios from 'axios';

export const CheckLogTransactionAPI = async (hash:string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/transaction/txid_check/${hash}`

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
              console.log("get log deposit transaction axios request", err)
            } else {
              console.log("get log deposit transaction axios error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("get log deposit transaction response error catch: ", error.response)
      }
    }
}
