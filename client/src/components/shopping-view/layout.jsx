import ShoppingHeader from "./header";

function ShoppingLayout(){
    return(
        <div className="flex flex-col bg-white overflow-hidden">
            {/*common hearder*/}
            <ShoppingHeader/>
            <main className="flex flex-col w-full">
                <outlet/>
            </main>
        </div>
    );
}
export default ShoppingLayout;