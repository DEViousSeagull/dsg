import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Empleados() {
    return (
        <div className="container">
            <h1>Empleados</h1>
            <hr />
            <Outlet />
        </div>
    );
};

export { Empleados };
