import axios from 'axios';

export interface SwapRequestProps {
    txid: string,
    userWlogAddress: string,
    depositAddress: string,
    network: string
}

export const SwapRequestAPI = async (props: SwapRequestProps) => {
    const url = 'http://localhost:3000/transaction/swap_request'
    const data = props
    try {
      return axios({
        method: 'POST',
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("post axios swap request", err)
            } else {
              console.log("post axios swap request error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("post axios swap request response error catch: ", error.response)
      }
    }
}