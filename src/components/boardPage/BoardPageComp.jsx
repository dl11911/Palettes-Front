// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import "../../styles/board/BoardList.css"
import ArticleService from '../../service/ArticleService.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardPageItem from './BoardPageItem.jsx';
import { Stack, useMediaQuery } from '@mui/system';
import { Chip, Fab, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PetsIcon from '@mui/icons-material/Pets';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog } from '@fortawesome/free-solid-svg-icons';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function BoardPageComp() {

  const [search, setSearch] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [boardName, setBoardName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width:500px)');


  //URL에서 sort 값 가져오기
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sortParam = queryParams.get("sort");
  const navigate = useNavigate();
  //초기화 설정
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(sortParam);
  //const [sort, setSort] = useState(sortParam || 'articleId'); 
  const [dir, setDir] = useState(true); //오름차순
  const [where, setWhere] = useState(""); //검색
  const [ref, inView] = useInView();


  useEffect(() => {
    console.log("board page search changed = " + search);
    setWhere(search);
    setPage(1); // search 값이 들어오면 페이지를 1로 초기화(Page = 1일 때만 조회가 되기 때문)
    setArticles([]); // articles를 초기화
    fetchArticles(true);
  }, [search, sort, boardName, dir])

  useEffect(() => {
    if (sortParam) {
      setSort(sortParam); // 쿼리 파라미터에서 sort 값을 읽어 설정
      setArticles([]);
      setPage(1);
    };
  }, [sortParam]);


  const fetchArticles = (reset = false) => {

    const searchString = search.map(item => item).join(',');

    const pageToFetch = reset ? 1 : page;

    ArticleService.getArticleList(pageToFetch, sort, dir, searchString, boardName).then((res) => {
      console.log("where =@!@!@!@!@" + search);
      // console.log(res);

      const resultString = res.data.map(obj => obj.articleTags).join(',')
      const arrayWithoutDuplicateFromResult = [...new Set(resultString.split(','))];

      setTagList(tagList => reset ? arrayWithoutDuplicateFromResult : [...tagList, ...(arrayWithoutDuplicateFromResult)]);
      setArticles(articles => reset ? res.data : [...articles, ...(res.data)]);

      //setPage(page => page + 1);
      setPage(page => pageToFetch + 1);
    })
      .catch((err) => { console.log(err) });
  };

  //무한 페이징
  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView && page > 1) {
      console.log(inView)
      fetchArticles();
    }
  }, [inView]);

  const addBoardName = (value) => {

    if (boardName === value) {
      setBoardName('');
    }
    else {
      setBoardName(value)
    }
  }

  const addSearch = (tag) => {

    if (!search.includes(tag)) {
      console.log('aaaaaa')
      setSearch([...search, tag])
    }

  }

  const delSearch = (tag) => {
    setSearch(search.filter(item => item !== tag))
  }

  const onReset = () => {
    setBoardName('')
    setSearch([])
    setTagList([])
  }
  const WHOLE = `${boardName === "" ? "boardSelectBtn selected" : "boardSelectBtn"} `;
  const FreeBoardClassName = `${boardName === "FREEBOARD" ? "boardSelectBtn selected" : "boardSelectBtn"} `;
  const INFORMATIONClassName = `${boardName === "INFORMATION" ? "boardSelectBtn selected" : "boardSelectBtn"} `;
  const SHOWClassName = `${boardName === "SHOW" ? "boardSelectBtn selected" : "boardSelectBtn"}`;
  const QNAClassName = `${boardName === "QNA" ? "boardSelectBtn selected" : "boardSelectBtn"} `;

  return (
    <>
      <div className='Item-header'>

        <div className='boardSelectBtn'>
          <IconButton id="basic-button" aria-label="settings" onClick={onReset} className={WHOLE}>
            <span>
              <HomeOutlinedIcon sx={{ fontSize: '30pt' }} />
              <Typography variant="body2">전체</Typography>
            </span>
          </IconButton>
          <IconButton id="basic-button" aria-label="settings" onClick={() => addBoardName('FREEBOARD')} className={FreeBoardClassName} >
            <span>
              <PetsIcon sx={{ fontSize: '27pt' }} />
              <Typography variant="body2">자유</Typography>
            </span>
          </IconButton>
          <IconButton id="basic-button" aria-label="settings" onClick={() => addBoardName('INFORMATION')} className={INFORMATIONClassName} >
            <span>
              <FontAwesomeIcon icon={faCat} style={{ padding: 3, fontSize: '25pt' }} />
              <Typography variant="body2" >정보</Typography>
            </span>
          </IconButton>
          <IconButton id="basic-button" aria-label="settings" onClick={() => addBoardName('SHOW')} className={SHOWClassName} >
            <span>
              <FontAwesomeIcon icon={faDog} style={{ padding: 3, fontSize: '25pt' }} />
              <Typography variant="body2" sx={{}}>자랑</Typography>
            </span>
          </IconButton>

          <IconButton id="basic-button" aria-label="settings" onClick={() => addBoardName('QNA')} className={QNAClassName}>
            <span>
              <ContactSupportIcon sx={{fontSize: '26pt' }} />
              <Typography variant="body2" sx={{}}>질문</Typography>
            </span>
          </IconButton>
        </div>

        <div className={`tagList ${isExpanded ? 'expanded' : ''}`}>

          {

            tagList.map((item, index) =>
              item !== '' ?
                <Stack direction="row" spacing={1} key={index} sx={{ display: 'inline-block', margin: '10px' }}>
                  <Chip label={item} variant="outlined" onClick={() => addSearch(item)} />
                </Stack>
                : null

            )
          }
        </div>
        {
          tagList.length > 10 && (
            <button onClick={() => setIsExpanded(!isExpanded)} className='toggleButton'>
              {isExpanded ? '접기' : '펼치기'}
            </button>
          )}
        <div className='selectedTagList'>

          {
            search && search.map((item, index) =>

              <Stack direction="row" spacing={1} sx={{ display: 'inline-block', margin: '10px' }} key={index}>

                <Chip label={item} variant="outlined" onDelete={() => delSearch(item)} />

              </Stack>
            )
          }

        </div>
      </div>
      <div style={{ textAlign: 'right', margin: '15px 0' }}>
        <Button onClick={() => setDir(true)}>최신순</Button> / <Button onClick={() => setDir(false)}>오래된순</Button></div>
      <div className="container mx-auto px-4 py-4">

        {
          articles.map(articles =>
            <BoardPageItem key={articles.articleId} article={articles} />
          )
        }
        <div ref={ref}>끝</div>
      </div>
      <Fab color="secondary" aria-label="edit" onClick={() => navigate('/article/write')}
        sx={{
          position: 'fixed',
          bottom: 75,
          right: isSmallScreen ? 30 : 480

        }}>
        <EditIcon sx={{ fontSize: '30pt' }} />
      </Fab>
    </>
  );
};

export default BoardPageComp;


  {/* <button className={FreeBoardClassName} value="FREEBOARD" onClick={addBoardName}>자유</button> */ }
  {/* <button className={INFORMATIONClassName} value="INFORMATION" onClick={addBoardName}>정보</button> */ }
  {/* <button className={SHOWClassName} value="SHOW" onClick={addBoardName}>자랑</button> */ }
  {/* <button className={QNAClassName} value="QNA" onClick={addBoardName}>질문</button> */ }
