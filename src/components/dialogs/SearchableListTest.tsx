import React from 'react';
import { Paper } from '@material-ui/core';
import SearchableList from './SearchableList';

export default function SearchableListTest() {
  return (
    <SearchableList<string>
      data={['item1', 'item4', 'tsrtsrt', 'item2']}
      itemMapper={(item) => <Paper>{item}</Paper>}
      labelMapper={(item) => item}
    />
  );
}
