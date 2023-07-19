import { useNavigate } from "react-router-dom";

export default function Resource(){
    const movePage = useNavigate();

    function Goresource(){
        movePage('./menu/ServerInfo');
    }
    return(
        <div className="Resource">
            홈입니다.
            <button onClick={Goresource}>리소스로 이동</button>
        </div>
    );
}