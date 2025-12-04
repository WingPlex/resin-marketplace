export default function AdminCard({ 
    title, 
    description, 
    children, 
    actions = null,
    className = "",
    padding = "p-6" 
}) {
    return (
        <div className={`bg-white rounded-lg shadow ${className}`}>
            {(title || description || actions) && (
                <div className={`border-b border-gray-200 ${padding}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            {title && (
                                <h3 className="text-lg font-k2d-semibold text-gray-900">{title}</h3>
                            )}
                            {description && (
                                <p className="mt-1 text-sm text-gray-600">{description}</p>
                            )}
                        </div>
                        {actions && (
                            <div className="flex items-center space-x-3">
                                {actions}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className={title || description || actions ? padding : ''}>
                {children}
            </div>
        </div>
    );
}

export function AdminFormCard({ title, description, children, actions = null }) {
    return (
        <AdminCard
            title={title}
            description={description}
            actions={actions}
            className="overflow-hidden"
        >
            <form className="space-y-6">
                {children}
                {actions && (
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                        {actions}
                    </div>
                )}
            </form>
        </AdminCard>
    );
}

export function AdminStatsCard({ title, value, change, icon, color = "primary" }) {
    const colorClasses = {
        primary: "bg-primary-500",
        green: "bg-green-500",
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500"
    };

    return (
        <AdminCard className="p-6">
            <div className="flex items-center">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-k2d-bold text-gray-900">{value}</p>
                    {change && (
                        <p className={`text-sm ${change.type === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                            {change.type === 'increase' ? '↗' : '↘'} {change.value}
                        </p>
                    )}
                </div>
                {icon && (
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {icon}
                        </svg>
                    </div>
                )}
            </div>
        </AdminCard>
    );
}