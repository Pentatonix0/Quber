import React from 'react';

const OutputWindow = ({ outputDetails, failed_test_number = null }) => {
    const safeAtob = (base64Str) => {
        // Декодируем Base64 и возвращаем строку в оригинальном виде
        return decodeURIComponent(escape(atob(base64Str)));
    };
    const get_num = (num) => {
        return (
            <pre className="px-2 py-1 font-normal text-xs text-red-500 whitespace-pre-wrap break-words overflow-auto">
                {`Failed on Test #${num}\n`}
            </pre>
        );
    };
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;
        console.log(outputDetails);
        console.log('ststus', statusId);
        if (statusId === null) {
            return;
        }
        if (statusId === 6) {
            // compilation error
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500 whitespace-pre-wrap break-words overflow-auto">
                    {safeAtob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-green-500 whitespace-pre-wrap break-words overflow-auto">
                    {outputDetails.stdout !== null
                        ? `${safeAtob(outputDetails.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 4) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500 whitespace-pre-wrap break-words overflow-auto">
                    {`Wrong Answer`}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500 whitespace-pre-wrap break-words overflow-auto">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre className="px-2 py-1 font-normal text-xs text-red-500 whitespace-pre-wrap break-words overflow-auto">
                    {safeAtob(outputDetails?.stderr)}
                </pre>
            );
        }
    };

    return (
        <div className="w-full p-3 border border-gray-300 rounded-md bg-[#1E293B] resize-y min-h-[80px] max-h-[500px] overflow-auto">
            {failed_test_number && get_num(failed_test_number)}
            {outputDetails ? <>{getOutput()}</> : null}
        </div>
    );
};

export default OutputWindow;
