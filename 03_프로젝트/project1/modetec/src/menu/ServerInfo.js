import { useNavigate } from "react-router-dom";

export default function Serverinfo(){
    const movePage = useNavigate();

    function goresource(){
        movePage('./menu/resource');
    }
    return(
        <div className="Serverinfo">
            서버상세페이지입니다.
            <button onClick={goresource}>리소스로 이동</button>
        </div>
    );
}