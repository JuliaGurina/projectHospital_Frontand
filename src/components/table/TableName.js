import React, { useState } from "react";
import axios from 'axios';
import trash from '../../source/images/trash.svg';
import edit from '../../source/images/edit.svg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './TableName.scss';

const TableName = ({ tasks, setTasks }) => {
    const [indexEdit, setIndex] = useState(null);
    const [textNew, setEdit] = useState("");

    const deleteTask = async (index) => {
        await axios
            .delete(`http://localhost:5000/deleteTask?_id=${tasks[index]._id}`)
            .then((res) => {
                setTasks(res.data.data);
            });
    }

    const editTask = (index) => {
        setIndex(index);
        setEdit(tasks[index].text);
    };

    return (
        <div className="form-block">
            <div className="container-table">
                <TableContainer className="container-table-component" component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead className="head-table">
                            <TableRow className="table-top">
                                <TableCell className="cell-table name-table" align="right">Имя</TableCell>
                                <TableCell className="cell-table name-table" align="right">Врач</TableCell>
                                <TableCell className="cell-table date-table" align="right">Дата</TableCell>
                                <TableCell className="cell-table lament-table" align="right">Жалобы</TableCell>
                                <TableCell className="cell-table img-table" align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="body-table">
                            {tasks.map((task, index) =>
                                <TableRow key={`row-${index}`}>
                                    <TableCell align="right" className="cell-table">{task.name}</TableCell>
                                    <TableCell align="right" className="cell-table">{task.doctor}</TableCell>
                                    <TableCell align="right" className="cell-table">{task.date}</TableCell>
                                    <TableCell align="right" className="cell-table  lament-body">{task.lament}</TableCell>
                                    <TableCell align="right" className="cell-table">
                                        <img src={trash} onClick={() => deleteTask(index)} className="img-trach" alt="delete" />
                                        <img src={edit} onClick={() => editTask(index)} className="img-edit" alt="edit" />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default TableName