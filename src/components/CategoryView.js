import Footer from "./Footer";
import CustomStack from "./CustomStack";
import ItemCategory from "./ItemCategory";
import Navbar from "./Navbar";

const CategoryView=()=>{
    return(
<>
        <Navbar />
        <CustomStack />
        <ItemCategory/>
        <Footer />
</>
    )
}


export default CategoryView;