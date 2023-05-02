/** @jsxImportSource theme-ui */

import { CaduceusStaffIcon} from '@components';


export const PageLoading = () => {
    return (
        <div  className="flex flex-col justify-center items-center "
        sx={{
            height: "88vh"
        }}>
            <div className="flex flex-col items-center mb-8">
                <div  >
                    <CaduceusStaffIcon {...{className: "animate-pulse h-40 w-30 mr-3 text-inherit"}}/>
               
                </div>
                <h2 className="font-bold">Loading..</h2>
            </div>
        </div>
    );
}