import React ,{useRef} from 'react'
import "./Articles.css";

const Data=()=>{
    return(
        <div className='news'>
            <img src="https://www.99acres.com/microsite/wp-content/blogs.dir/6161/files/2022/12/Most-popular-localities-in-Noida-320x180.jpg?1720188894000" ></img>
            <div style={{fontSize:20,fontWeight:500,textAlign:"left"}} >Read this Article</div>
        </div>
    )
}
const BlockData=()=>{
    return(
        <div className="ArticleBlock">
            <div style={{fontSize:25,fontWeight:500,textAlign:"left",paddingTop:30}} >Read this Article</div>
            <div className='flex flex-row mt-20 text-left justify-between'>
            <div className='block'>
                <div className='datablock'>Recently Launched Projects in Noida</div>
                <div className='datablock'>Godrej Jardinia in Sector 146 Noida</div>
                <div className='datablock'>Capital Ultra Luxury Floors in Sector 73 Noida
                </div>
                <div className='datablock'>Escon Panache Premium villas in Noida Extension</div>


            </div>
            <div className='block'>
                <div className='datablock'>Recently Launched Projects in Noida</div>
                <div className='datablock'>Godrej Jardinia in Sector 146 Noida</div>
                <div className='datablock'>Capital Ultra Luxury Floors in Sector 73 Noida
                </div>
                <div className='datablock'>Escon Panache Premium villas in Noida Extension</div>


            </div><div className='block'>
                <div className='datablock'>Recently Launched Projects in Noida</div>
                <div className='datablock'>Godrej Jardinia in Sector 146 Noida</div>
                <div className='datablock'>Capital Ultra Luxury Floors in Sector 73 Noida
                </div>
                <div className='datablock'>Escon Panache Premium villas in Noida Extension</div>


            </div>
            </div>
            

        </div>
    )
}
const Articles=React.forwardRef((props, ref) =>{

    const handleFocusInput = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };
  return (
    <>
    <div className='articles' ref={ref} >
        <div style={{fontSize:30,fontWeight:500,textAlign:"left"}}>Intresting Reads</div>
        <div className='flex flex-row'>
        <Data></Data>
        <Data></Data>
        <Data></Data>
        <Data></Data>
        </div>
  
    </div>
    <BlockData></BlockData>
    </>
  )
});
export default Articles;