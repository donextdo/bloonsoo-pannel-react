import { ReactNode } from "react";
import HomePage from "../HomePage/HomePage";



type Props = {
    children: ReactNode;
  };
  
const Layout:React.FC<Props> = ({children}) => {
    return ( 
        <div >
            <HomePage />
            {children}
        </div>
     );
}
 
export default Layout;