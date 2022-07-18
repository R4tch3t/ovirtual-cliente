import { FC } from 'react';
import {FlayoutNoti} from './Flayout';

type Props = {
    FixedMenu?: boolean
}
export const NotiIcon:FC<Props> = ({FixedMenu}) => {

return (
    <FlayoutNoti FixedMenu={FixedMenu} />
)
/*return (
    <>
        
            <button
                type="button"
                className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >

                    <span className="sr-only">View notifications</span>
                    <StyledBadge badgeContent={badgeContent} color="success">
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </StyledBadge>        
                
            </button>
        
    </>
)   */

}