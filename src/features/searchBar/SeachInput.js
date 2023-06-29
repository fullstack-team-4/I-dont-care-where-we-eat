import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchInput = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = (query) => {
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
            value={searchQuery}
            clearTextOnFocus
        />
    );
};

export default SearchInput;
