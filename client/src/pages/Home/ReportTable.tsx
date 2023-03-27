import moment from "moment";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import useTable from "../../hooks/useTable";
import TableFooter from "./TableFooter";

interface Transactions {
    data: Array<{}>,
    rowsPerPage: number
}


const ReporTable = ({ data, rowsPerPage }: Transactions) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <Table striped bordered hover variant="dark">
            <thead className="font-white purple-solid-bg">
                <tr>
                    <th className="pv1">ACTION</th>
                    <th className="pv1">DATE & TIME</th>
                    <th className="pv1">AMOUNT (WLOG)</th>
                </tr>
            </thead>
            <tbody>
              {slice.map((tx:any, index:number) => {
                if(tx.status === "COMPLETED") {
                  let link = tx.transaction==="DEPOSIT" ? `https://polygonscan.com/tx/${tx.txidWLOGMint}` : `https://polygonscan.com/tx/${tx.txidWLOGTransfer}`
                  return (
                    <tr onClick={()=> window.open(link, "_blank")} className="pointer" key={index}>
                      <td>{tx.transaction==="DEPOSIT" ? "SWAP" : "REDEEM"}</td>
                      <td>{moment(tx.createdAt).format('MMMM D, YYYY - h:mm:ss a')}</td>
                      <td>{tx.transaction==="DEPOSIT" ? tx.twmAmount : tx.twrAmount}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </Table>
          <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default ReporTable;