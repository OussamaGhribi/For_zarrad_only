import { HousePlug , LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger ,DropdownMenuItem} from "../ui/dropdown-menu";
import { AvatarFallback , Avatar } from "../ui/avatar";
import { DropdownMenuContent, DropdownMenuLabel } from "../ui/dropdown-menu";
import { loginUser } from "@/store/auth-slice";
import "./test.css";


function MenuItems(){
    return (<nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {
            shoppingViewHeaderMenuItems.map(menuItem => <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        }
    </nav>
    )
}

function HeaderRightContent(){
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    function handleLogout(){
        dispatch(loginUser());
    }


    return <div className="flex lg:items-center lg:flex-row flex-col gap">
        <Button>
            <ShoppingCart className="w-6 h-6" />
            <span className="sr-only">User Cart</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black cursor-pointer">
                        <AvatarFallback className="bg-black text-white font-extrabold">
                            {user?.userName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-56">
                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate("/shop/account")}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4 " />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
    </div>
}

function ShoppingHeader(){

    //const {isAuthenticated } = useSelector(state => state.auth);
    
    return (
        <header className="sticky top-0 z-0 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to='/shop/home' className="flex items-center gap-2">
                    <HousePlug className="h-6 w-6 align-top" />
                    <span className="font-bold">
                        Ecommerce
                    </span>
                </Link>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='outline' size="icon" className="lg:hidden"> 
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle header menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs">
                    <MenuItems/>
                    <HeaderRightContent/>
                </SheetContent>
            </Sheet>
            <div className="hidden lg:block">
                <MenuItems/>
            </div>
            <div className="hidden lg:block">
                <HeaderRightContent/>
            </div> 
            
        </header>
    )
}
export default ShoppingHeader;