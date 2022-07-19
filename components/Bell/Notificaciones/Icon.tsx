import { FC } from 'react';
import {FlayoutNoti} from './Flayout';

type Props = {
    FixedMenu?: boolean
}
export const NotiIcon:FC<Props> = ({FixedMenu}) => {

return (
    <FlayoutNoti FixedMenu={FixedMenu} />
)

}