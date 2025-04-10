import React from 'react';

const Limits = ({ compileSettings }) => {
    return (
        <div className="bg-gray-100 border border-gray-300 rounded-md">
            <div className="p-2">
                {Object.entries(compileSettings).map(([key, value]) => (
                    <div key={key} className="flex">
                        <p className="text-xs font-semibold">{key}:</p>
                        <p className="text-xs font-base ml-2">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Limits;
