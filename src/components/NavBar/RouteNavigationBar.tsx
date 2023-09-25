import { faArrowLeft, faArrowRight, faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const RouteNavigationBar = ({handleSave, handleEditToggle, editMode, previous, current, next, handlePrevious, handleNext}:any) => {
    return ( 
        <div className="w-full py-3 bg-gray-50 shadow-md px-4 grid grid-cols-3">
        <div className="w-full flex items-center justify-start">
          {previous && !editMode && (
            <div onClick={handlePrevious}  className="text-gray-600 text-sm font-normal flex items-center gap-1 cursor-pointer">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>{previous}</span>
            </div>
          )}
        </div>
  
        <div className="w-full flex items-center justify-center">
          {current && (
            <div className="text-gray-800 text-lg font-bold flex items-center gap-3">
              <span>{current}</span>
              {!editMode ? (
                <button onClick={handleEditToggle}>
                  <FontAwesomeIcon icon={faPenToSquare} className="text-blue-600" />
                </button>
              ) : (
                <>
                  <button onClick={handleEditToggle}>
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-lg" />
                  </button>
  
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-700 text-white font-semibold text-sm rounded-lg hover:bg-blue-900"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          )}
        </div>
  
        <div className="w-full flex items-center justify-end">
          {next && !editMode && (
            <div onClick={handleNext}  className="text-gray-600 text-sm font-normal flex items-center gap-1 cursor-pointer">
              <span>{next}</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          )}
        </div>
      </div>
     );
}
 
export default RouteNavigationBar;