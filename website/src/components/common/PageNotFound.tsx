import { PAGE_HOME } from '@/config/constants';
import Link from 'next/link';
import React from 'react';

const PageNotFound = () => {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
                <h1>Page not found</h1>
                <Link href={PAGE_HOME}>Back to home</Link>
            </div>
        </div>
    );
};

export default PageNotFound;