import React from 'react'
import './button.css'

export default props =>
    <button className={`
        button
        ${props.operation ? 'operation' : ''}
        ${props.twocolumn ? 'twocolumn' : ''}
        ${props.treecolumn ? 'treecolumn' : ''}
    `}
    onClick={e => props.click(e.target.innerHTML)}
    >
        {props.label}
    </button>