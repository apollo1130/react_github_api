import styled from 'styled-components';
import {Link} from 'react-router-dom';


const Wrapper = styled.div``
const RepoList = styled.li`
    padding: 15px 0px 15px 0px;
    border-bottom: 1px #e1e4e8 solid !important;
    list-style-type: none;
`
const RepoListItem = styled.span`
`
const Title = styled.h2`
    margin-top: 0px;
    font-weight: bold;
`

const RepoItemWrapper = styled.button`
    border: none;
    width: 100%
`
const SpanProperty = styled.span`
    margin-right: 16px !important;
    color: #586069 !important
    &:hover {
        color: blue !important;
    }
`

const StyledLink = styled(Link)`
    color: black;
    margin: 0.5em 0;
    font-family: Helvetica, Arial, sans-serif;

    &:hover {
        text-decoration: underline;
    }
    &.active {
        color: red;
    }
`;
export {RepoList, RepoListItem, Wrapper,Title,StyledLink,SpanProperty,RepoItemWrapper}
