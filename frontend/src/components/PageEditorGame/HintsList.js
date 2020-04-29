import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { ajax_del_hint_by_id, ajax_save_hint, ajax_get_list_hints_by_id} from './../GetInfoAjax/AdminAjax';
import ReactDOM from 'react-dom';

const HintsList = ({id_game, id_task, hints_block}) => {

	const infoHint = window.infoUser.list_info_hints_by_id;
	var id_this_game = window.infoUser.editID; /* ID ТЕКУЩЕЙ ИГРЫ */
	// useEffect(() => {
	// 	async function fetchRequest() {
	// 		await ajax_get_list_hints_by_id(id_game); /* ПОЛУЧЕНИЕ СПИСКА ПОДСКАЗОК */
	// 	}
	// 	fetchRequest();
	// }, []);


	const drow_hints = () => {
		ReactDOM.render(<HintsList id_game={id_game} id_task={id_task} hints_block={hints_block} />,
			document.getElementById(hints_block));
		};

		const delHint = async (e) => {
			let id_hint = e.target.dataset.idHint; /* ID Подсказки */
			let id_task_sql = id_task + 1;
			await ajax_del_hint_by_id(id_game, id_task_sql, id_hint); /* УДАЛЕНИЕ ПОДСКАЗКИ */
			await ajax_get_list_hints_by_id(id_game); /* ПОЛУЧЕНИЕ СПИСКА ПОДСКАЗОК */
			drow_hints();
		};



		const saveHint = (e) => {
			let id_task = e.target.dataset.idTask; /* НОМЕР ВОПРОСА */
			let id_hint = e.target.dataset.idHint; /* ID Подсказки */
			let id_task_sql = +id_task + 1; /* НОМЕР ВОПРОСА В БД */

			let inpuHintText = 'inpuHintText_' + id_task + '_' + id_hint;
			let inpuHintMinutes = 'inpuHintMinutes_' + id_task + '_' + id_hint;
			let inpuHintSeconds = 'inpuHintSeconds_' + id_task + '_' + id_hint;
			let textHint = document.getElementById(inpuHintText).value;
			let timeMinute = document.getElementById(inpuHintMinutes).value;
			let timeSecond = document.getElementById(inpuHintSeconds).value;


			ajax_save_hint(id_this_game, id_task_sql, id_hint, textHint, timeMinute, timeSecond);

		};



		return (
			<tbody>
			{
				infoHint.map((hintArr, i) => {
					return (
						(i == id_task) ? hintArr.map( (hint, id_hint) => {
							var inpuHintText = 'inpuHintText_' + i + '_' + id_hint;
							var inpuHintMinutes = 'inpuHintMinutes_' + i + '_' + id_hint;
							var inpuHintSeconds = 'inpuHintSeconds_' + i + '_' + id_hint;
							return ( 
								<tr>
								<th>{id_hint + 1}</th>
								<th><textarea className="form-control" id={inpuHintText} rows="3">{hint.text}</textarea></th>
								<th><input type="text" className="form-control" id={inpuHintMinutes} defaultValue={hint.minute} /></th>
								<th><input type="text" className="form-control" id={inpuHintSeconds} defaultValue={hint.second} /></th>
								<th><Button onClick={saveHint} data-id-task={i} data-id-hint={id_hint} color='green'>Сохранить</Button></th>
								<th><Button onClick={delHint} data-id-hint={id_hint} color='red'>Удалить</Button></th>
								</tr>
								)}
							)
						: null
						)
				})
			}
			</tbody>
			);
	}


	export default HintsList;
