import {useContext, useState} from "react";
import { Input, Dropdown, Menu } from "antd";
import {ArchiveContext} from "@/providers/ArchiveProvider";
import {CloseCircleOutlined} from "@ant-design/icons";

const SearchDropdown = ({changeYear}) => {
    const [searchValue, setSearchValue] = useState("");
    const [open, setOpen] = useState(false);
    const {years} = useContext(ArchiveContext);

    const onlyYears = years.map(year => year.year+"");
    const filteredOptions = searchValue ? onlyYears.filter(option => option.includes(searchValue)) : onlyYears;
    const handleSelect = (option) => {
        setSearchValue(option);
        setOpen(false);
        changeYear(option)
    };

    const menuItems = filteredOptions.map(option => ({
        key: option,
        label: (
            <div onClick={() => handleSelect(option)} className="cursor-pointer">
                {option}
            </div>
        ),
    }));
    const handleClear = (e) => {
        e.stopPropagation();
        setSearchValue("");
        setOpen(false);
    };
    return (
        <Dropdown menu={{ items: menuItems }} open={open} trigger={[]}>
            <div className="relative w-full">
                <Input
                    placeholder="20..."
                    className="w-full p-2 pr-8 rounded-lg border border-gray-700 bg-gray-900 text-white select-year"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 200)}
                />
                {searchValue && (
                    <CloseCircleOutlined
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer remove-tag"
                        onClick={handleClear}
                    />
                )}
            </div>
        </Dropdown>
    );
};

export default SearchDropdown;