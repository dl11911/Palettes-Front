import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '@mui/system';
import React, { useRef } from 'react';


const ImageEdit = ({previewList,setPreviewList,imgFiles,setImgFiles,deleteChoiceImage}) => {

  const dragItem = useRef();
  const dragOverItem = useRef();
  const isSmallScreen = useMediaQuery('(max-width:500px)');
  const dragStart = idx => {
    dragItem.current = idx;

  };

  const dragEnter = idx => {
    dragOverItem.current = idx;

  };
  const onTouchStart = (index) => {
    dragStart(index);
  };

  const onTouchMove = (index) => {
    dragEnter(index);
  };

  const onTouchEnd = () => {
    drop();
  };
  const drop = () => {
    const copyListItems = [...previewList];
    const copyFiles = Array.from(imgFiles);

    const dragItemContent = copyListItems[dragItem.current];
    const dragFilesContent = copyFiles[dragItem.current];

    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    copyFiles.splice(dragItem.current, 1);
    copyFiles.splice(dragOverItem.current, 0, dragFilesContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setPreviewList(copyListItems);
    setImgFiles(copyFiles);
  };

  //-> files의 상태도 변화가 필요함
  //-> 이미지 중복검사의 files의 상태는 그대로 이기 때문에

  

  return (
    <>
      {
        previewList &&

        previewList.map((item, index) => (
          <div
            onDragStart={() => dragStart(index)}
            onDragEnter={() => dragEnter(index)}
            onDragOver={e => e.preventDefault()}
            onDragEnd={drop}
            onTouchStart={() => onTouchStart(index)}
            onTouchMove={() => onTouchMove(index)}
            onTouchEnd={onTouchEnd}
            key={index}
            draggable
            className='image-container editImage-container'
          >

            <img src={item} alt={index} width={isSmallScreen ? '123':'123'} height={isSmallScreen ? '123':'123'} style={{display:'inline-block'}}/>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => deleteChoiceImage(index)} />

          </div>
        ))}
    </>
  );
}
export default ImageEdit;