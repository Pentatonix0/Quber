import React from 'react';

const SampleTests = ({ tests, sampleCount }) => {
    const safeAtob = (base64Str) => {
        // Декодируем Base64 и возвращаем строку в оригинальном виде
        return decodeURIComponent(escape(atob(base64Str)));
    };
    const displayedTests = tests.slice(0, sampleCount);

    return (
        <div>
            {displayedTests.map((test, index) => (
                <div key={index} className="mb-8">
                    <h3 className="text-base font-semibold border-t border-gray-300 mb-1">
                        stdin:
                    </h3>
                    <p className="text-sm px-4 mb-2">{safeAtob(test.stdin)}</p>
                    <h3 className="text-base font-semibold border-t border-gray-300 mb-1">
                        stdout:
                    </h3>
                    <p className="text-sm px-4 mb-2">{safeAtob(test.stdout)}</p>
                </div>
            ))}
        </div>
    );
};

export default SampleTests;
