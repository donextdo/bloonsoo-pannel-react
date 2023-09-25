import React, { ReactNode } from 'react';

interface ContentProps {
    children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        minWidth: 'calc(100vw - 14rem)',
        minHeight: 'calc(100vh - 5rem)',
        zIndex: 50,
        marginLeft: '224px',
        marginTop: '80px',
        backgroundColor: 'white',
        overflow: 'auto'
    };

    return (
        <div style={containerStyle}>
            {children}
        </div>
    );
}

export default Content;
