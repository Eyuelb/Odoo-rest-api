/** @jsxImportSource theme-ui */
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button, Input} from "theme-ui";

function TableSearch({ searchText, onSearch }) {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className='flex items-center'>
            <div className='mr-auto md:mr-4 md:w-56'>
                <Input label="Search here" value={searchText} onChange={handleChange} color='deep-purple' />
            </div>
        </div>
    );
}

function TablePagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handleClick = (page) => {
        onPageChange(page);
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-center p-2 text-sm">
                Page<span className='font-bold'>&nbsp;{currentPage}&nbsp;</span>of<span className='font-bold'>&nbsp;{totalPages}&nbsp;</span>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => handleClick(currentPage - 1)}
                    className={`py-2 px-1 borderfont-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 hover:text-gray-800'
                        }`}
                    disabled={currentPage === 1}
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handleClick(page)}
                        className={`py-2 px-3 border font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${page === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 hover:text-gray-800'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handleClick(currentPage + 1)}
                    className={`py-2 px-1 borderfont-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 hover:text-gray-800'
                        }`}
                    disabled={currentPage === totalPages}
                >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>

    );
}


function TableFiltering({ columns, onFilter }) {
    const handleChange = (event, key) => {
        onFilter(key, event.target.value);
    };

    return (
        <div>
            {columns.map((column,key) => (
                <div key={key}>
                    <label htmlFor={`table-filter-${column.key}`}>{column.headerTitle}:</label>
                    <input
                        id={`table-filter-${column.key}`}
                        type="text"
                        onChange={(event) => handleChange(event, column.key)}
                    />
                </div>
            ))}
        </div>
    );
}

function TableSorting({ columns, sortColumn, sortOrder, onSort }) {
    const handleClick = (column) => {
        onSort(column);
    };

    return (
        <div>
            <span>Sort by:</span>
            {columns.map((column,key) => (
                <button key={key} onClick={() => handleClick(column.key)}>
                    {column.headerTitle}
                    {sortColumn === column.key && sortOrder === 'asc' && <>&uarr;</>}
                    {sortColumn === column.key && sortOrder === 'desc' && <>&darr;</>}
                </button>
            ))}
        </div>
    );
}

function TableHead({ columns, classData, sortColumn, sortOrder, onSort }) {
    const handleClick = (column) => {
        onSort(column);
    };
    return (
        <thead className={getClass(classData, 'thead')} sx={getSx(classData, 'thead')}>
            <tr className={getClass(classData, 'tr')} sx={getSx(classData, 'tr')}>
                {columns.map((column,key) => (

                    
                    (!!(column.headerTitle) && (typeof column.headerTitle == 'string'))?
                     <th key={key} className={getClass(classData, 'th')} sx={getSx(classData, 'th')} onClick={() => handleClick(column.key)}>{column.headerTitle}</th>
                    :console.log("Provide headerTitle is not string or not initialized")
                ))}
            </tr>
        </thead>
    );
}

function TableBody({ data, columns, classData }) {
    const renderButton = (ActionName, ActionIcon, ActionIconColor, onClickHandler) => (
        <Button variant="text" className='p-2 transition duration-500 ease-in-out'
        sx={{

            boxShadow: t => `0px 1px 1px 0px ${t.colors.text}`,
            '&:hover': {
                boxShadow: t => `0px 1px 3px 0px ${t.colors.text}`,
            },
        }}
        onClick={onClickHandler}>
          {!!ActionIcon ? <ActionIcon color={ActionIconColor} className={`${"w-4 h-4 opacity-55 drop-shadow-xl "}${'text-'+ActionIconColor}`}/>:
          ActionName}
        </Button>
      );
      
      const renderTooltip = (key, content, buttonElement, direction = 'top', color = 'gray') => {
        const directionClasses = {
          top: '-translate-y-full bottom-1',
          bottom: 'bottom-full top-full',
          left: '-translate-x-full right-full',
          right: 'right-full left-full',
        };
        const directionClass = directionClasses[direction] || '-translate-y-full bottom-full';
        const colorClass = `bg-${color}-400`;
      
        return (
          <div key={key} className="relative group">
            {buttonElement}
            <div 
            sx={{
                color: t => t.colors.navIconHover,
                
            }}
            className={`transition duration-500 ease-in-out opacity-0 transform scale-0 absolute z-1000 ${directionClass} -translate-x-1/2 ${colorClass} rounded-md shadow-lg py-2 px-4 group-hover:opacity-100 group-hover:scale-100`}>
              {content}
            </div>
          </div>
        );
      };
    return (
        <tbody className={getClass(classData, 'tbody')} sx={getSx(classData, 'tbody')}>
            
            {data.map((row) => (
                <tr key={row.id} className={getClass(classData, 'tr')} sx={getSx(classData, 'tr')}>
                    {columns.map(({action,key,customTextColor,customTextReplacment},index) => (
                         (!!(action) && (Array.isArray(action)) && (action.length > 0))? 
                         <td key={index} className={getClass(classData, 'td')+" p-1" } sx={getSx(classData, 'td')}>
                               {action.map(({ActionName,ActionIcon,ActionIconColor,ActionKey,ActionHandler,ActionTask},key) =>(
                                      (!!(ActionIcon) && ActionIcon != '')?
                                      renderTooltip(
                                        key,
                                        ActionName,
                                        renderButton(ActionName, ActionIcon, ActionIconColor, () => ActionHandler(row[ActionKey],ActionTask))
                                      )
                                      
                                      :<div key={key}><Button >{ActionName}</Button></div>
                                // <div key={key}><button >{actionName}</button></div>
                                 ))}
                          </td>
                              :
                          (!!(key) && (typeof key == 'string'))?
                          (!!(customTextColor) && (typeof customTextColor == 'object'))?
                          <td key={index} className={getClass(classData, 'td')}  sx={getSx(classData, 'td')}>
                            <div
                            sx={{
                                background:customTextColor[row[key]],
                                borderRadius:"7px",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                padding:"1px",
                                width:"100px",
                                color:"black",
                                
                                
                              }}>
                            {!!(customTextReplacment) && (typeof customTextReplacment == 'object')?customTextReplacment[row[key]]:row[key]} 
                            </div>
                            
                            
                            </td>
                          :
                          <td key={index} className={getClass(classData, 'td')} sx={getSx(classData, 'td')}>
                            {!!(customTextReplacment) && (typeof customTextReplacment == 'object')?customTextReplacment[row[key]]:row[key]} 

                            </td>
                              :
                              ''        
                    ))
                    }
                </tr>
            ))}
        </tbody>
    );
}


function TableFoot({ columns,currentPage, totalPages, onPageChange, classData }) {
    return (
        <tfoot>
            <tr>
                <td className="py-2" colSpan={columns.length}>
                    <div className={getClass(classData, 'tfoot')} sx={getSx(classData, 'tfoot')}>
                    <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
                    </div>
                </td>
            </tr>
        </tfoot>
    );
}
function TableLoading({ columns, numRows, classData  }) {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((dots) => (dots === '...' ? '' : dots + '.'));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <table className="w-full border ">
            <caption className="text-lg font-medium mb-4">Loading...</caption>
            <thead className={getClass(classData, 'thead')} sx={getSx(classData, 'thead')}>
                
                <tr className={getClass(classData, 'tr')} sx={getSx(classData, 'tr')}>
                    {columns.map((column,key) => (
                        (!!(column.headerTitle) && (typeof column.headerTitle == 'string'))?
                    <th key={key} className={getClass(classData, 'th')} sx={getSx(classData, 'th')} onClick={() => handleClick(column.key)}>{column.headerTitle}</th>
                    :console.log("Provide headerTitle is not string or not initialized")
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array(numRows)
                    .fill()
                    .map((_, index) => (
                        <tr key={index} className={getClass(classData, 'tr')} sx={getSx(classData, 'tr')}>
                            {columns.map((column,key) => (
                                <td key={key} className={getClass(classData, 'td')} >
                                    <div className="animate-pulse h-3 rounded bg-gray-300"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
            <tfoot>
                <tr>
                    <td className="py-2" colSpan={columns.length}>
                        <p className="text-sm">

                            {/* {dots} This may take a moment. */}
                        </p>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

function TablePartsHolder({ tableLoading, paginatedData, tableTittle, columns, classData, onSearch, onFilter, sortColumn, sortOrder, onSort, currentPage, totalPages, onPageChange, searchText }) {


    return (
        <div className="overflow-hidden w-full h-full ">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{tableTittle != null && tableTittle}</h2>
                    <div className="w-1/3">
                        <TableSearch searchText={searchText} onSearch={onSearch} />
                    </div>
                </div>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="px-7 py-4 shadow overflow-hidden border-b sm:rounded-lg">
                            {tableLoading ? <TableLoading columns={columns} numRows={10} classData={classData} /> :
                                <table className={getClass(classData, 'table')}  sx={getSx(classData, 'table')}>
                                    <TableHead columns={columns} classData={classData} sortColumn={sortColumn} sortOrder={sortOrder} onSort={onSort} />
                                    <TableBody data={paginatedData} columns={columns} classData={classData} />
                                    <TableFoot columns={columns} currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} classData={classData}/>
                                </table>}
                        </div>
                    </div>
                </div>
            </div>

    );
}

function getClass(classData, type) {
    const found = classData.find(item => item.for === type);
    return found ? found.class : '';
}
function getSx(classData, type) {
    const found = classData.find(item => item.for === type);
    return found ? found.sx : {};
}


function useTable({
    data,
    defaultSortColumn,
    defaultSortOrder,
    rowsPerPage,
    searchKeys,
}) {
    const [sortColumn, setSortColumn] = useState(defaultSortColumn);
    const [sortOrder, setSortOrder] = useState(defaultSortOrder);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [filters, setFilters] = useState({});

    const sortedData = useMemo(() => {
        const column = sortColumn;
        const order = sortOrder === 'asc' ? 1 : -1;
        return data.slice().sort((a, b) => {
            if (a[column] < b[column]) {
                return -1 * order;
            }
            if (a[column] > b[column]) {
                return 1 * order;
            }
            return 0;
        });
    }, [data, sortColumn, sortOrder]);

    const filteredData = useMemo(() => {
        return sortedData.filter((row) => {
            for (const [key, value] of Object.entries(filters)) {
                if (!row[key].includes(value)) {
                    return false;
                }
            }
            return true;
        });
    }, [sortedData, filters]);

    const searchedData = useMemo(() => {
        if (!searchText) {
            return filteredData;
        }

        const searchTextLower = searchText.toLowerCase();
        return filteredData.filter((row) => {
            for (const key of searchKeys) {
                const value = row[key];
                if (value && value.toString().toLowerCase().includes(searchTextLower)) {
                    return true;
                }
            }
            return false;
        });
    }, [filteredData, searchText, searchKeys]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return searchedData.slice(startIndex, endIndex);
    }, [currentPage, searchedData, rowsPerPage]);

    const totalPages = Math.ceil(searchedData.length / rowsPerPage);

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        setCurrentPage(1);
    };

    const handleFilter = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({});
        setCurrentPage(1);
    };

    return {
        sortedData,
        paginatedData,
        totalPages,
        currentPage,
        searchText,
        filters,
        handleSort,
        handlePageChange,
        handleSearch,
        handleFilter,
        clearFilters,
    };
}
export const Table = ({ TableConfiguration, data, tableLoading}) => {
    const { TableTittle, ColumnsData, ClassData,defaultSortOrder,defaultSortColumn,rowsPerPage,searchKeys } = TableConfiguration[0];
    const {
        sortedData,
        paginatedData,
        totalPages,
        currentPage,
        searchText,
        filters,
        handleSort,
        handlePageChange,
        handleSearch,
        handleFilter,
        clearFilters,
    } = useTable({
        data,
        defaultSortColumn: defaultSortColumn,
        defaultSortOrder: defaultSortOrder,
        rowsPerPage: rowsPerPage,
        searchKeys,
    });
    return (
        <TablePartsHolder
            tableLoading={tableLoading}
            paginatedData={paginatedData}
            tableTittle={TableTittle}
            columns={ColumnsData}
            classData={ClassData}
            searchText={searchText}
            onSearch={handleSearch}
            onFilter={handleFilter}
            sortColumn={defaultSortColumn}
            sortOrder={sortedData}
            onSort={handleSort}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    );
};



