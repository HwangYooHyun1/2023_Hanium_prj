import React from 'react'
import styled from "styled-components"
const TableRow = styled.tr`
    td{
        padding: 5px;
        border: 1px inset #ccc;
        font-size: 1rem;
        border-left: none;
        border-right: none; 
    }
`;

export const ScanningItem = ({ result }) => {
    const { vulnerability, content, status } = result;

    return (
        <TableRow>
            <td>{vulnerability}</td>
            <td>{content}</td>
            <td>{status}</td>
        </TableRow>
    )
}
