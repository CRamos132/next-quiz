import styled from 'styled-components';

const Button = styled.button`
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    border-radius: 16px;
    padding: 12px;
    background-color: ${({ theme }) => theme.colors.mainBg};
    width: 100%;
    font-family: 'Lato',sans-serif;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.mainBg};
        color: ${({ theme }) => theme.colors.mainBg};
    }
    :disabled {
        background-color: gainsboro;
        color: #444444;
        border: #444444;
        cursor: not-allowed;
    }
    &:disabled:hover {
        opacity: .5;
    }
`;

export default Button;
