import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../../styles/carrot/CarrotList.css';
import carrotService from '../../service/carrotService';
import CreateIcon from "@mui/icons-material/Create";
import { Box, Button, ButtonGroup, Fab, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CarrotResults from './CarrotResults';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const CarrotList = () => {
    const navigate = useNavigate();

    //전체 리스트
    const [carrot, setCarrot] = useState([]);
    //검색 결과 리스트
    const [search, setSearch] = useState([]);
    //키워드 입력
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("carrotId");
    const [dir, setDir] = useState(true); //오름차순
    const [where, setWhere] = useState([]); //검색 리스트
    const [ref, inView] = useInView();

      useEffect(() => {
        console.log("board page search changed = " + where);
        setWhere(where);
        setPage(1); // search 값이 들어오면 페이지를 1로 초기화(Page = 1일 때만 조회가 되기 때문)
        setCarrot([]); // articles를 초기화
        fetchCarrot(true);
      }, [where, sort])

    // useEffect(() => {
    //     fetchCarrot();
    //   }, []);

      const fetchCarrot = (reset = false) => {
        const pageToFetch = reset ? 1 : page;
        carrotService.getCarrotList(pageToFetch, sort, dir, where).then((res) => {
        console.log(res);
        setCarrot((carrot) => (reset ? res.data : [...carrot, ...(res.data)]));
          //setPage(page => page + 1);
        setPage((page) => pageToFetch + 1);
        })
          .catch((err) => { console.log(err) });
      };

      const fetchSearch = (keyword) => {
        carrotService.getSearchList(keyword).then((res) => {
        console.log("keyword ="+ keyword);
        setSearch(res.data);
        }).catch((err) => {
            console.log(err);
        });
      };

          //무한 페이징
    useEffect(() => {
      // inView가 true 일때만 실행한다.
        if (inView && page > 1) {
          console.log(inView);
          fetchCarrot();
        }
    }, [inView]);

    const handleResetFilter = () => {
      setWhere('');
    };
  
    // 정렬
    const SortChange = (sortValue, dirValue) => {
      setSort(sortValue);
      setDir(dirValue);
      setPage(1);
      //setCarrot([]);
      // fetchCarrot(true);
    };

    // 태그
    const WhereChange = (whereValue) => {
        setWhere(whereValue);
    };

    const onKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("키워드" + keyword);
        if (keyword) {
            fetchSearch(keyword);
            setKeyword(''); // 검색어 초기화
        } else {
            fetchCarrot();
        }
    };

    return (
        <div className="product-list-container">
            <div id="header_content">
              {/* <img src="" alt='dd' style={{height:'80px', width:'90px'}} onClick={() => navigate(`/carrot/myCarrot`)}/> */}
            <form onSubmit={handleSearch}>
                    <input class="search_input" 
                        type="text" 
                        placeholder="물품을 검색해보세요" 
                        style={{marginRight:'10px', backgroundColor:'#EAEAEA', color:'black'}}
                        value={keyword}
                        onChange={onKeywordChange}
                        />
                <button variant="outlined" type="submit">검색하기</button>
                </form>
            </div>
            <div class="filter-buttons-container">
              <div class="filter-buttons">
                      <button className="filter-button me-4" onClick={handleResetFilter}>전체</button>
                      <button className="filter-button me-4" onClick={() => WhereChange('판매')}>판매</button>
                      <button className="filter-button me-4" onClick={() => WhereChange('구매')}>구매</button>
                      <button className="filter-button me-4" onClick={() => WhereChange('나눔')}>나눔</button>
                      <button className="filter-button me-4" onClick={() => WhereChange('산책')}>산책</button>
              </div>
            </div>
          <div>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  paddingTop: '10px'
                }}
              >
                <ButtonGroup variant="text" aria-label="Basic button group" 
                sx={{      
                  '& .MuiButtonGroup-grouped': {
                    borderColor: '#d0d0d0', // 구분선 색상
                    padding: '4px 3px', // 버튼 내부 여백 조절
                    fontSize: '12px', // 버튼 글자 크기 조절
                  },}}>
                  <Button onClick={() => SortChange('carrotLike', true)} sx={{color:'black'}}>인기순</Button>
                  <Button onClick={() => SortChange('carrot_price', true)} sx={{color:'black'}}>가격 높은 순</Button>
                  <Button onClick={() => SortChange('carrot_price', false)} sx={{color:'black'}}>가격 낮은 순</Button>
                  <Button onClick={() => SortChange('carrot_createdAt', false)} sx={{color:'black'}}>오래된 순</Button>
                </ButtonGroup>
              </Box>
            {search.length > 0 ? (
                <CarrotResults carrot={search} />
            ) : (
                <CarrotResults carrot={carrot} />
            )}
                <Link to="/carrot/post">
                    <button className="floating-button">
                      <CreateIcon />
                    </button>
                </Link>
                <div ref={ref}></div>
            </div> 
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Fab color="secondary" aria-label="edit">
                <EditIcon />
              </Fab>
            </Box>
      </div>
    );
};

export default CarrotList;