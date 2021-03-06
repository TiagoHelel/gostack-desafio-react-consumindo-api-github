import styled, { keyframes, css } from 'styled-components'

const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(360deg)
    }
`

export const Loading = styled.div`
    color: #fff;
    font-size: 200px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    ${css`
        svg {
            animation: ${rotate} 2s linear infinite;
        }
    `}
`

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }
    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }
    h1 {
        font-size: 24px;
        margin-top: 10px;
    }
    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`
export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;
    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        & + li {
            margin-top: 10px;
        }
        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }
        div {
            flex: 1;
            margin-left: 15px;
            strong {
                font-size: 16px;
                a {
                    text-decoration: none;
                    color: #333;
                    &:hover {
                        color: #7159c1;
                    }
                }
                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }
            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;

        h1 {
            padding: 2px 2px;
            font-size: 16px;
            background: #f2f2f2;
            border-radius: 4px;
            margin: 1px;
            color: #7159c1;
        }

        a {
            text-decoration: none;
        }

        h1.selected {
            color: #f2f2f2;
            background: #7159c1;
        }
    }

    h1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        div {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }

        div.pagination {
            span {
                color: #7159c1;
                font-size: 16px;
                padding: 2px 2px;
                background: #f2f2f2;
                border-radius: 4px;
                margin: 1px;
            }

            a {
                text-decoration: none;
            }
        }
    }

    p {
        color: #7159c1;
        font-size: 16px;
        background: #f2f2f2;
        border-radius: 4px;
        padding: 2px 2px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
