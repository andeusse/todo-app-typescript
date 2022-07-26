import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Modal, Stack, TextField } from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { GetTodoItem } from '../types/TodoItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

type Props = {
	open: boolean;
	todoItem: GetTodoItem | undefined;
	updateItem: (getItem: GetTodoItem) => void;
	setOpen: (open: boolean) => void;
};

const UpdateTodoItemModal = (props: Props) => {
	const { open, todoItem, updateItem, setOpen } = props;

	const [cloneTodoItem, setCloneTodoItem] = useState<GetTodoItem | undefined>(
		undefined
	);

	useEffect(() => {
		if (todoItem) {
			setCloneTodoItem({ ...todoItem });
		}
	}, [todoItem]);

	const propertyChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		propName: string
	) => {
		if (cloneTodoItem) {
			const value = e.currentTarget.value;
			setCloneTodoItem((old) => {
				return old
					? {
							...old,
							[propName]: value,
					  }
					: undefined;
			});
		}
	};

	const handleDateChange = (
		value: Date | null | undefined,
		propName: string
	) => {
		if (value && cloneTodoItem) {
			setCloneTodoItem((old) => {
				return old
					? {
							...old,
							[propName]: value,
					  }
					: undefined;
			});
		}
	};

	const onCheckedChangeHandler = () => {
		let endDate: Date | undefined = undefined;
		if (!cloneTodoItem?.isFinished) {
			endDate = new Date();
		}
		setCloneTodoItem((old) => {
			if (old) {
				return { ...old, isFinished: !old.isFinished, endDate: endDate };
			}
		});
	};

	return (
		<React.Fragment>
			{cloneTodoItem && (
				<Modal
					open={open}
					onClose={() => {
						setOpen(false);
					}}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Stack spacing={5} direction="column">
								<TextField
									required
									id="outlined-multiline-flexible"
									label="Description"
									multiline
									rows={5}
									value={cloneTodoItem.description}
									onChange={(e) => propertyChangeHandler(e, 'description')}
								/>
								<DateTimePicker
									label="Start Date"
									value={cloneTodoItem.startDate}
									onChange={(value) => handleDateChange(value, 'startDate')}
									renderInput={(params) => <TextField {...params} />}
								/>
								{cloneTodoItem.isFinished && (
									<DateTimePicker
										label="End Date"
										value={cloneTodoItem.endDate}
										onChange={(value) => handleDateChange(value, 'endDate')}
										renderInput={(params) => <TextField {...params} />}
									/>
								)}
								<Checkbox
									size="medium"
									checked={cloneTodoItem.isFinished}
									onClick={onCheckedChangeHandler}
								></Checkbox>
								<Button
									variant="contained"
									startIcon={<Save />}
									disabled={cloneTodoItem.description === ''}
									onClick={() => {
										updateItem(cloneTodoItem!);
									}}
								>
									Save
								</Button>
								<Button
									variant="contained"
									color="error"
									startIcon={<Close />}
									disabled={cloneTodoItem.description === ''}
									onClick={() => {
										setOpen(false!);
									}}
								>
									Close
								</Button>
							</Stack>
						</LocalizationProvider>
					</Box>
				</Modal>
			)}
			{!cloneTodoItem && <></>}
		</React.Fragment>
	);
};

export default UpdateTodoItemModal;
