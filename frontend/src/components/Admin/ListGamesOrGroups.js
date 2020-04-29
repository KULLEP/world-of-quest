import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Loader from './../Loader';

import { ajax_get_list_games_or_groups } from './../GetInfoAjax/AdminAjax';


const ListGames = ({typeContent, nameContent}) => {


	const [popout, setPopout] = useState(<Loader/>);


	const nameEdit = (e) => {
		window.infoUser.editID = e.target.id;
		localStorage.setItem('gameEditor', window.infoUser.editID);
	};



	useEffect(() => {
		async function fetchRequest() {
			await ajax_get_list_games_or_groups('games');
				setPopout(null);
			}
			fetchRequest();
		}, []);


				if(typeContent === 'games') {
					
					let data = window.infoUser.info_games_admin;
					if(nameContent === undefined || nameContent === '') {
						return (
							<div>
							{
								popout !== null ? popout :  
								data.map(arr => {
									let id_game = arr.id;
									let name = arr.name;
									return (
										<div className='col-12 p-0 m-0 mb-3 row row-justify-center content-center'>	 
										<NavLink onClick={nameEdit} className='col-6 text-center' to='/info-game-for-admin'>
										<Button id={id_game} inverted color='orange'>
										{name}
										</Button>							 
										</NavLink>
										<NavLink onClick={nameEdit} className='col-6 text-center' to='/edit-game-for-admin'>
										<Button id={id_game} inverted color='blue'>
										Редактировать
										</Button>							 
										</NavLink>						
										</div>
										)  
								})
							}
							</div>)
					} else if (nameContent !== undefined) {
						return (
							data.filter(arr => {
								let name = arr.name;
								let regexp = new RegExp(`${nameContent}`, 'igm');
								let result = name.match(regexp);
								return result;
							}).map(arr => {
								let id_game = arr.id;
								let name = arr.name;
								return (	
									<div className='col-12 p-0 m-0 mb-3 row row-justify-center content-center'>
									<NavLink id={id_game} onClick={nameEdit} className='col-6 text-center' to='/info-game-for-admin'>
									<Button inverted color='orange'>
									{name}
									</Button>							 
									</NavLink>

									<NavLink id={id_game} onClick={nameEdit} className='col-6 text-center' to='/info-game-for-admin'>
									<Button inverted color='blue'>
									Редактировать
									</Button>							 
									</NavLink>
									</div>
									)					
							}
							))
					}
				} else if (typeContent === 'groups') {
					ajax_get_list_games_or_groups('teams');
					let data = window.infoUser.info_teams_admin;

					if(nameContent === undefined) {
						return (
							<div>
							{
								popout !== null ? popout :  
								data.map(arr => (
									<div className='col-12 p-0 m-0 mb-3 row row-justify-center content-center'>
									<NavLink onClick={nameEdit} className='col-6 text-center' to='/info-team-for-admin'>
									<Button id={arr.id} inverted color='orange'>
									{arr.name}
									</Button>							 
									</NavLink>
									<NavLink onClick={nameEdit} className='col-6 text-center' to='/info-team-for-admin'>
									<Button id={arr.id} inverted color='blue'>
									Редактировать
									</Button>							 
									</NavLink>
									</div>
									))
							}
							</div>
							)
					} else if (nameContent !== undefined) {
						return (
							data.filter(arr => {
								let name = arr.name;
								let regexp = new RegExp(`${nameContent}`, 'igm');
								let result = name.match(regexp);
								return result;
							}).map(arr => {
								let id_team = arr.id;
								let code = arr.id;
								let name = arr.name;
								return (
									<div className='col-12 p-0 m-0 mb-3 row row-justify-center content-center'>
									<NavLink id={code} onClick={nameEdit} className='col-6 text-center' to='/info-team-for-admin'>
									<Button  inverted color='orange'>
									{name}
									</Button>							 
									</NavLink>

									<NavLink id={code} onClick={nameEdit} className='col-6 text-center' to='/info-team-for-admin'>
									<Button  inverted color='blue'>
									Редактировать
									</Button>							 
									</NavLink>
									</div>
									)

							}
							))
					}
				}
			}

			export default ListGames;
