import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
} from '@material-ui/core';
import ModalDelete from "../modalDelete/ModalDelete";
import ModalEdit from "../modalEdit/ModalEdit"
import trash from '../../source/images/trash.svg';
import edit from '../../source/images/edit.svg';
import './TableName.scss';

const TableName = ({ tasks, setTasks }) => {
	const [tempTask, setTask] = useState("");
	const [openDel, setOpenDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	const handleOpenDelete = (task) => {
		setTask(task);
		setOpenDelete(true);
	};

	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const handleOpenEdit = (task) => {
		setTask(task);
		setOpenEdit(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const tableName = [
		{
			name: "Имя",
			className: "name-table"
		},
		{
			name: "Врач",
			className: "name-table"
		},
		{
			name: "Дата",
			className: "date-table"
		},
		{
			name: "Жалобы",
			className: "lament-table"
		},
		{
			name: "",
			className: "img-table"
		}];

	return (
		<div className="form-block">
			<div className="container-table">
				<TableContainer className="container-table-component" component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead className="head-table">
							<TableRow className="table-top">
								{
									tableName.map((value, index) => <TableCell key={`name-${index}`} className={`cell-table ${value.className}`}>{value.name}</TableCell>)
								}
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
										<img
											src={trash}
											onClick={() => handleOpenDelete(task)}
											className="img-trach"
											alt="delete" />
										<img
											src={edit}
											onClick={() => handleOpenEdit(task)}
											className="img-edit"
											alt="edit" />
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{setOpenDelete && <ModalDelete
					open={openDel}
					onClose={handleCloseDelete}
					setTasks={setTasks}
					task={tempTask}
				/>}
				{openEdit && <ModalEdit
					open={openEdit}
					onClose={handleCloseEdit}
					setTasks={setTasks}
					task={tempTask}
				/>}
			</div>
		</div>
	)
}

export default TableName