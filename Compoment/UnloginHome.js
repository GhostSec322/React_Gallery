
import Login from "./Login";
import "./Home.css"
import Pixabay from "./Pixabay";

 

function UnloginHome()
{

   return ( 
    <div className='setBackground'>
    <div className='apiArea'>
      {/* api연동 그림 영역 */}

      <Pixabay>
        <div className='search'>
          <input type='text' placeholder='태그로 검색'></input>
        </div>
      </Pixabay>

    </div>

    <div className='noneApi'>
     <h1>이미지를 업로드 하려면 로그인해주세요</h1>
     <Login/>
    </div>
  </div>
    
   );
}
export default UnloginHome;