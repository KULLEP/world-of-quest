import React from 'react';
import { SearchInput } from 'react-onsenui'; // Only import the necessary components


const SearchMy = ({searchText, onChange}) => {

	return(
		<SearchInput id='searchMy' 
		onChange={onChange}
		modifier='material'
		placeholder={searchText} />
		)
}

export default SearchMy;