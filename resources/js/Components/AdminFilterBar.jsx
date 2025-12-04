import { useState } from 'react';

export default function AdminFilterBar({
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    filters = [],
    activeFilters = {},
    onFilterChange,
    onClearFilters,
    rightActions = null
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const activeFiltersCount = Object.values(activeFilters).filter(value => value !== '').length;

    return (
        <div className="bg-white border border-gray-200 rounded-lg">
            {/* Main Filter Bar */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[300px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                    </div>

                    {/* Dynamic Filters */}
                    {filters.map((filter) => (
                        <div key={filter.key} className="relative">
                            <select
                                value={activeFilters[filter.key] || ''}
                                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="">{filter.placeholder}</option>
                                {filter.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    ))}

                    {/* More Filters Button */}
                    {filters.length > 3 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                            </svg>
                            More filters
                        </button>
                    )}

                    {/* Add filter placeholder */}
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add filter
                    </button>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-2 ml-auto">
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={onClearFilters}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Cancel
                            </button>
                        )}
                        <button className="text-sm text-gray-700 hover:text-gray-900">
                            Save as
                        </button>
                        {rightActions}
                    </div>
                </div>

                {/* Active Filter Tags */}
                {activeFiltersCount > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {searchValue && (
                            <FilterTag
                                label={`Search: "${searchValue}"`}
                                onRemove={() => onSearchChange('')}
                                color="blue"
                            />
                        )}
                        {filters.map((filter) => {
                            const value = activeFilters[filter.key];
                            if (!value) return null;
                            
                            const option = filter.options.find(opt => opt.value === value);
                            return (
                                <FilterTag
                                    key={filter.key}
                                    label={`${filter.label}: ${option?.label || value}`}
                                    onRemove={() => onFilterChange(filter.key, '')}
                                    color={filter.color || 'green'}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

function FilterTag({ label, onRemove, color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        green: 'bg-green-100 text-green-800 hover:bg-green-200',
        purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
        yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        red: 'bg-red-100 text-red-800 hover:bg-red-200'
    };

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${colorClasses[color]}`}>
            {label}
            <button
                onClick={onRemove}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-opacity-20"
            >
                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </span>
    );
}