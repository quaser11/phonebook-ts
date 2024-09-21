import styled from '@emotion/styled'
import {NavLink} from 'react-router-dom'

export const Link = styled(NavLink)`
    position: relative;
    text-decoration: none;
    color:white;
    
    &.active{
        &:after{
            content: '';
            display: block;
            position:absolute;
            top:20px;
            width:100%;
            height:2px;
            background-color:white;
            border-radius:10px;
        }
    }
`