import axios from 'axios';

export interface RedeemRequestProps {
    amount: number,
    txid: string,
    txTimeStamp: number,
    userLogAddress: string,
    network: string
}

export const RedeemRequestAPI = async (props: RedeemRequestProps) => {
    const url = 'http://localhost:3000/transaction/redeem_request'
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
              console.log("post axios Redeem request", err)
            } else {
              console.log("post axios Redeem request error something else", err.request)
            }
          }
        )
    } catch (error: any) {
      if (error.response) {
        console.log("post axios Redeem request response error catch: ", error.response)
      }
    }
}