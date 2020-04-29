import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'semantic-ui-react';
import { ajax_get_list_tasks_by_id, ajax_get_list_hints_by_id, ajax_create_new_task, ajax_add_answer_by_id, ajax_del_answer_by_id,  ajax_add_hint_by_id, ajax_save_info_task, ajaxGet } from './../GetInfoAjax/AdminAjax';
import ReactDOM from 'react-dom';
import { HashRouter, Redirect } from 'react-router-dom';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import Loader from './../Loader';
import HintsList from './HintsList';
import App from '../.././App';

const EditorQuestion = () => {

  const [popout, setPopout] = useState(<Loader/>);

  var id_game_local = localStorage.getItem('gameEditor');
  if(id_game_local !== undefined && id_game_local !== null) {
    window.infoUser.editID = id_game_local;
  }
  var id_this_game = window.infoUser.editID; /* ID ТЕКУЩЕЙ ИГРЫ */


  useEffect(() => {
    async function fetchRequest() {
      await ajax_get_list_tasks_by_id(id_this_game); /* ПОЛУЧЕНИЕ СПИСКА ВОПРОСОВ */
      await ajax_get_list_hints_by_id(id_this_game); /* ПОЛУЧЕНИЕ СПИСКА ПОДСКАЗОК */
      setPopout(null);
    }
    fetchRequest();
  }, []);


  var infoTask = window.infoUser.list_info_tasks_by_id;
  



  const addTask = async () => {
   await ajax_create_new_task(id_this_game);
   ReactDOM.render(
    <HashRouter>
    <Redirect from='/' to='/edit-game-for-admin'/>
    <App />
    </HashRouter>,
    document.getElementById('root')
    );
 };



 const drow_answers = (this_id_task) => {
   let arrAnswers = window.infoUser.list_info_tasks_by_id[this_id_task];
   let answers = JSON.parse(arrAnswers.answers);
   console.log(answers);
   ReactDOM.render(
    <div>
    {
     answers.map((e, index_answer) => 
     { 
      let id_task = +this_id_task + 1;
      let inpuAnswer = 'inputAnswer_'+id_task;
      console.log(e);
      return (
        <div className="input-group mb-3">
        <input type="text" class="input_answer form-control" id={inpuAnswer}  defaultValue={e}  />
        <div className="input-group-append">
        <button className="btn btn-outline-secondary" data-id-task={this_id_task} id={index_answer} onClick={delAnswer} type="button">Удалить</button>
        </div>
        </div>
        )}
      )
   }
   </div>,
   document.getElementById('answersBlock'));
 };


 const delAnswer = async (e) => {
  let this_id_task = e.target.dataset.idTask;
  let id_task = +e.target.dataset.idTask + 1;
  let id_answer = e.target.id;
  await ajax_del_answer_by_id(id_this_game, id_task, id_answer); /* УДАЛЕНИЕ ОТВЕТА */
  await ajax_get_list_tasks_by_id(id_this_game); /* ПОЛУЧЕНИЕ СПИСКА ВОПРОСОВ */
  drow_answers(this_id_task);
};


const addAnswer = async (e) => {
  let this_id_task = e.target.dataset.idTask;
  let id_task = +e.target.dataset.idTask + 1;
  await ajax_add_answer_by_id(id_this_game, id_task); /* СОЗДАНИЕ ОТВЕТА */
  await ajax_get_list_tasks_by_id(id_this_game); /* ПОЛУЧЕНИЕ СПИСКА ВОПРОСОВ */
  drow_answers(this_id_task);
};






const addHint = async (e, {hints_block}) => {
  let id_task = e.target.dataset.num; /* ID ЗАДАНИЯ */
  await ajax_add_hint_by_id(id_this_game, id_task); /* СОЗДАНИЕ НОВОЙ ПОДСКАЗКИ */
  await ajax_get_list_hints_by_id(id_this_game); /* ПОЛУЧЕНИЕ СПИСКА ПОДСКАЗОК */
  ReactDOM.render(<HintsList id_game={id_this_game} id_task={id_task - 1} hints_block={hints_block} />,
    document.getElementById(hints_block));
};






const saveTask = async (e) => {

let id_task = e.target.dataset.idTask; // ID ВОПРОСА
let num_task = e.target.dataset.numTask; // НОМЕР ВОПРОСА
let inputAnswerID = '#inputAnswer_' + num_task;
let valueInputAnswer = document.querySelectorAll(inputAnswerID);
let resultAnswers = [];
valueInputAnswer.forEach(inputAnswer => {
  resultAnswers.push(inputAnswer.value);
});
resultAnswers = JSON.stringify(resultAnswers);
let valueinputQuest = document.getElementById('inputQuest_' + id_task).value;
let valueinputPhoto = document.getElementById('inputPhoto_' + id_task).value;
let valueinputVideo = document.getElementById('inputVideo_' + id_task).value;
let valueinputTimePerLevel = document.getElementById('inputTimePerLevel_' + id_task).value;
await ajax_save_info_task(id_task, valueinputQuest, resultAnswers, valueinputPhoto, valueinputVideo, valueinputTimePerLevel);
}


return (
  <Card className='w-100 overflow-a'>


  { popout !== null ? popout :   

   <table className="mb-0 table">
   <thead>
   <tr>
   <th scope="col">Вопрос</th>
   <th scope="col">Элемент</th>
   <th scope="col">Значение</th>
   </tr>
   </thead>
   {
    infoTask.map((data, index) => {
      var hintsBlock = 'hintsBlock_'+data.id;
      var inputQuest = 'inputQuest_'+data.id;
      var inpuAnswer = 'inputAnswer_'+data.id;
      var inputPhoto = 'inputPhoto_'+data.id;
      var inputVideo = 'inputVideo_'+data.id;
      var inputTimePerLevel = 'inputTimePerLevel_'+data.id;
      return (
        <tbody>

        <th>{data.num}</th>

        <tr>
        <th></th>
        <th>Вопрос</th>
        <th><textarea id={inputQuest} className="form-control" rows="3">{data.text}</textarea></th>
        </tr>

        <tr>
        <th></th>
        <th>Ответ</th>
        <th>
        <div id='answersBlock'>
        {
          JSON.parse(data.answers).map((e, index_answer) => (
            <div className="input-group mb-3">
            <input type="text" className="input_answer form-control" id={inpuAnswer} defaultValue={e}  />
            <div className="input-group-append">
            <button className="btn btn-outline-secondary" data-id-task={index} id={index_answer} onClick={delAnswer} type="button">Удалить</button>
            </div>
            </div>
            ))
        }
        </div>
        <div className='text-center'>
        <Button onClick={addAnswer} data-id-task={index} positive >Добавить ответ</Button>
        </div>
        </th>
        </tr>

        <tr>
        <th></th>
        <th>Фото</th>
        <th><input type="text" className="form-control" id={inputPhoto} defaultValue={data.photo} /></th>
        </tr>

        <tr>
        <th></th>
        <th>Видео</th>
        <th><input type="text" className="form-control" id={inputVideo} defaultValue={data.video} /></th>
        </tr>

        <tr>
        <th></th>
        <th>Времени на уровень</th>
        <th><input type="text" className="form-control" id={inputTimePerLevel} defaultValue={data.time} /></th>
        </tr>


        <tr>
        <th></th>
        <th>Подсказки</th>
        <th>


        <th scope="col">#</th>
        <th scope="col">Подсказка</th>
        <th scope="col">Минут</th>
        <th scope="col">Секунд</th>





        <div id={hintsBlock}>
        <HintsList id_game={id_this_game} id_task={index} hints_block={hintsBlock} />
        </div>






        <div className='text-center pt-5'>
        <Button onClick={addHint} data-num={data.num} hints_block={hintsBlock} color='blue'>Добавить подсказку</Button>
        <br/><br/><br/>
        </div>

        </th>
        </tr>




        <tr>
        <th colspan="3">
        <div className='text-center'>
        <Button data-id-task={data.id} data-num-task={data.num} onClick={saveTask} positive >Сохранить результат</Button>
        </div>
        </th>
        </tr>

        <tr>
        <th colspan="3">
        <br/><br/><br/><br/>
        </th>
        </tr>

        </tbody>
        )
    })
  }


  <tfoot>
  <tr>
  <th colspan="3">
  <div className='text-center'>
  <Button
  onClick={addTask}
  color='blue'
  content='Добавить задание'
  icon='add'
  labelPosition='left'
  />
  </div>
  </th>
  </tr>
  </tfoot>

  </table>

}

</Card>
);
}


export default EditorQuestion;