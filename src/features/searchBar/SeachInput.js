import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchInput = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = (query) => {
        // console.log(query); //this returns every key as I type
        setSearchQuery(query);
    };

    const onSubmitSearch = () => {
        onSearch(searchQuery);
    };

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            onIconPress={onSubmitSearch} // Call the onSearch callback when the search icon is pressed
            iconColor={'tomato'}
            elevation={2}
            onSubmitEditing={onSubmitSearch} // Call the onSearch callback when search button is pressed on keyboard
            value={searchQuery}
            clearTextOnFocus
        />
    );
};

export default SearchInput;
