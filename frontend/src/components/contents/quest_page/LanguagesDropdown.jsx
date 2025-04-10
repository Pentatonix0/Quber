import React from 'react';
import Select from 'react-select';
import { languages } from '../../../constants/languages';

const LanguagesDropdown = ({
    onSelectChange,
    allowedLanguagesIds,
    language,
}) => {
    const allowedLanguages = languages.filter((lang) =>
        allowedLanguagesIds.includes(lang.id)
    );
    return (
        <Select
            className="z-10 w-48 text-xs"
            placeholder={`Filter By Category`}
            options={allowedLanguages}
            value={language}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    );
};

export default LanguagesDropdown;
