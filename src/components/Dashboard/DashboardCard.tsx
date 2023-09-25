import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardCard = ({ icon, color, title, value }: any) => {
    return (
        <div className={`w-full flex items-center gap-6 rounded-lg h-40 p-4 text-white hover:scale-110 transition-all duration-300 ${color}`}>

            <div className="w-20 h-20 rounded-full bg-black bg-opacity-20 text-2xl flex items-center justify-center">
                {icon && <FontAwesomeIcon icon={icon} />}
            </div>

            <div className="flex flex-col gap-2">
                <h4 className="text-base font-semibold">
                    {title}
                </h4>

                <h2 className="text-[26px] font-bold">
                    {value}
                </h2>
            </div>
        </div>
    );
}

export default DashboardCard;