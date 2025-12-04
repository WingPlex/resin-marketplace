export function StatusBadge({ status, statusConfig = null }) {
    const defaultStatusConfig = {
        'active': { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
        'inactive': { bg: 'bg-red-100', text: 'text-red-800', label: 'Inactive' },
        'draft': { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
        'archived': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Archived' },
        'pending': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pending' },
        'published': { bg: 'bg-green-100', text: 'text-green-800', label: 'Published' }
    };

    const config = statusConfig || defaultStatusConfig;
    const statusLower = status?.toLowerCase();
    const statusData = config[statusLower] || config['draft'];

    return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusData.bg} ${statusData.text}`}>
            {statusData.label}
        </span>
    );
}

export function PriorityBadge({ priority }) {
    const priorityConfig = {
        'high': { bg: 'bg-red-100', text: 'text-red-800', label: 'High' },
        'medium': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Medium' },
        'low': { bg: 'bg-green-100', text: 'text-green-800', label: 'Low' }
    };

    const priorityData = priorityConfig[priority?.toLowerCase()] || priorityConfig['low'];

    return (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityData.bg} ${priorityData.text}`}>
            {priorityData.label}
        </span>
    );
}

export function CountBadge({ count, color = "gray" }) {
    const colorClasses = {
        gray: "bg-gray-100 text-gray-800",
        blue: "bg-blue-100 text-blue-800",
        green: "bg-green-100 text-green-800",
        red: "bg-red-100 text-red-800",
        yellow: "bg-yellow-100 text-yellow-800",
        purple: "bg-purple-100 text-purple-800"
    };

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
            {count}
        </span>
    );
}

export function ImagePreview({ src, alt, fallback = null, className = "w-10 h-10" }) {
    const handleError = (e) => {
        if (fallback) {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
        }
    };

    return (
        <div className="flex-shrink-0">
            {src ? (
                <>
                    <img 
                        src={src} 
                        alt={alt}
                        className={`${className} rounded-lg object-cover`}
                        onError={handleError}
                    />
                    <div className={`${className} rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 items-center justify-center ${src ? 'hidden' : 'flex'}`}>
                        {fallback || (
                            <svg className="w-1/2 h-1/2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        )}
                    </div>
                </>
            ) : (
                <div className={`${className} rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center`}>
                    {fallback || (
                        <svg className="w-1/2 h-1/2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    )}
                </div>
            )}
        </div>
    );
}

export function UserAvatar({ user, size = "md" }) {
    const sizes = {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10",
        xl: "w-12 h-12"
    };

    const textSizes = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg"
    };

    return (
        <div className="flex items-center space-x-2">
            {user?.profile_image ? (
                <img 
                    src={user.profile_image} 
                    alt={user.name}
                    className={`${sizes[size]} rounded-full object-cover`}
                />
            ) : (
                <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center`}>
                    <span className={`text-primary-600 font-medium ${textSizes[size]}`}>
                        {user?.name?.charAt(0) || '?'}
                    </span>
                </div>
            )}
            <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Unknown'}</p>
                {user?.username && (
                    <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                )}
                {user?.email && !user?.username && (
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                )}
            </div>
        </div>
    );
}

// Form Components
export function FormGroup({ label, required = false, error = null, children, className = "" }) {
    return (
        <div className={`space-y-1 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            {children}
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}

export function Input({ 
    type = "text", 
    className = "", 
    error = false, 
    ...props 
}) {
    const baseClasses = "block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm";
    const errorClasses = error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "";
    
    return (
        <input
            type={type}
            className={`${baseClasses} ${errorClasses} ${className}`}
            {...props}
        />
    );
}

export function Textarea({ 
    className = "", 
    error = false, 
    rows = 4,
    ...props 
}) {
    const baseClasses = "block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm";
    const errorClasses = error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "";
    
    return (
        <textarea
            rows={rows}
            className={`${baseClasses} ${errorClasses} ${className}`}
            {...props}
        />
    );
}

export function Select({ 
    className = "", 
    error = false, 
    children,
    ...props 
}) {
    const baseClasses = "block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm";
    const errorClasses = error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "";
    
    return (
        <select
            className={`${baseClasses} ${errorClasses} ${className}`}
            {...props}
        >
            {children}
        </select>
    );
}

export function Button({ 
    type = "button",
    variant = "primary", 
    size = "md",
    loading = false,
    disabled = false,
    className = "", 
    children,
    ...props 
}) {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
    
    const variants = {
        primary: "bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500 disabled:bg-orange-300",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 disabled:bg-gray-50",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:bg-gray-50",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300"
    };
    
    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };
    
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {loading && (
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
            )}
            {children}
        </button>
    );
}

export function HelpText({ children, className = "" }) {
    return (
        <p className={`text-sm text-gray-500 ${className}`}>
            {children}
        </p>
    );
}

// Default export as an object containing all components
const AdminUI = {
    StatusBadge,
    PriorityBadge,
    CountBadge,
    ImagePreview,
    UserAvatar,
    FormGroup,
    Input,
    Textarea,
    Select,
    Button,
    HelpText
};

export default AdminUI;