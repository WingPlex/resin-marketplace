import { Link, router } from '@inertiajs/react';

export default function AdminDataTable({
    title,
    description,
    data = [],
    columns = [],
    actions = [],
    totalCount,
    filteredCount,
    activeFiltersCount = 0,
    emptyState = null,
    onRowAction = null
}) {
    const handleAction = (action, item) => {
        if (action.type === 'link') {
            // Handle navigation
            if (action.href) {
                router.visit(action.href(item));
            }
        } else if (action.type === 'button') {
            // Handle button click
            if (action.onClick) {
                action.onClick(item);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-k2d-semibold text-gray-900">{title}</h3>
                    {description && (
                        <p className="text-sm text-gray-600">{description}</p>
                    )}
                </div>
                {(totalCount !== undefined && filteredCount !== undefined) && (
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{filteredCount}</span> of <span className="font-medium">{totalCount}</span> items
                        {activeFiltersCount > 0 && (
                            <span className="text-gray-500"> with {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied</span>
                        )}
                    </p>
                )}
            </div>

            {data && data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* Table Header */}
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                                {actions.length > 0 && (
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, rowIndex) => (
                                <tr 
                                    key={item.id || rowIndex} 
                                    className={`hover:bg-gray-50 ${onRowAction ? 'cursor-pointer' : ''}`}
                                    onClick={() => onRowAction && onRowAction(item)}
                                >
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${column.cellClassName || ''}`}>
                                            {column.render ? column.render(item, rowIndex) : (
                                                <span className="text-sm text-gray-900">
                                                    {column.accessor ? getNestedValue(item, column.accessor) : ''}
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                    
                                    {/* Actions Column */}
                                    {actions.length > 0 && (
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                {actions.map((action, actionIndex) => (
                                                    <ActionButton
                                                        key={actionIndex}
                                                        action={action}
                                                        item={item}
                                                        onAction={handleAction}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <EmptyState 
                    emptyState={emptyState} 
                    activeFiltersCount={activeFiltersCount}
                />
            )}
        </div>
    );
}

function ActionButton({ action, item, onAction }) {
    const baseClasses = "px-3 py-1 rounded text-xs font-medium transition-colors inline-flex items-center justify-center";
    
    if (action.type === 'link') {
        return (
            <Link
                href={action.href(item)}
                className={`${baseClasses} ${action.className || 'text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200'}`}
                title={action.title}
            >
                {action.label}
            </Link>
        );
    }

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onAction(action, item);
            }}
            className={`${baseClasses} ${action.className || 'text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'}`}
            disabled={action.disabled && action.disabled(item)}
            title={action.title}
        >
            {action.label}
        </button>
    );
}

function EmptyState({ emptyState, activeFiltersCount }) {
    if (emptyState) {
        return (
            <div className="text-center py-12">
                {emptyState}
            </div>
        );
    }

    return (
        <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            </div>
            <h3 className="mt-4 text-lg font-k2d-semibold text-gray-900">
                {activeFiltersCount > 0 ? 'No items found' : 'No items yet'}
            </h3>
            <p className="mt-2 text-gray-500">
                {activeFiltersCount > 0 
                    ? 'Try adjusting your filters to see more results.'
                    : 'Get started by adding your first item.'
                }
            </p>
        </div>
    );
}

// Helper function to get nested object values
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}