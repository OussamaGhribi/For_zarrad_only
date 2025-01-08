import { Navigate } from "react-router-dom";

function CheckAuth({IsAuthentificated,user,children}){
    const location=uselocation()
    if(!IsAuthentificated && !(location.pathname.includes('/login')||
location.pathname.includes('/register')
)){
    return <Navigate to='/auth/login'/>;

}
    if(IsAuthentificated && (location.pathname.includes('/login')||location.pathname.includes('/register'))){
        if(user?.role==='admin'){
            return <navigate to="/admin/dashboard"/>;
        } else{
            return <navigate to="/shop/home"/>;
        }
    }
    if(IsAuthentificated && user?.role !== 'admin' && location.pathname.includes('admin') ){
        return <Navigate to="/unauth-page"/>
    }
    if(IsAuthentificated&& user?.role==='admin'&&location.pathname.includes('shop')){
        return <Navigate to="/admin/dashboard"/>
    }
    return <>{children}</>
}
export default CheckAuth;