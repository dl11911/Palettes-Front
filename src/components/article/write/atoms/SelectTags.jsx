import React,{useState} from 'react';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import ArticleService from '../../../../service/ArticleService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
     
    },
  },
};

// 태그 선택 어찌할지 생각해보자
const names = [
 '고양이',
 '강아지',
 '뭔강아지',
 '큰강아지',
 '사료추천',
 '간식추천',
 '산책로',
 '어디갈까',
 '자유게시판',
 '원근'
 

];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectTags({ search, setSearch }) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleSearchParam = () => {
    setSearch(document.querySelector(".where").value);
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  function tagSearchSubmit(e) {
    e.preventDefault();
    <ArticleService value={personName}/>
  }

  const textSearchSubmit =(e) =>{
    
  }
  const onDelete = (e) =>{
  }
  return (
    <div>
      <FormControl sx={{m:1 ,width:"80%"}}>
        {/* <InputLabel id="demo-multiple-chip-label">태그 선택</InputLabel> */}
        <input type='text' className='where'></input>
      </FormControl>
      <Button type="submit" formMethod="get" onClick={handleSearchParam}>
        검색
      </Button >
    </div>
  );
}