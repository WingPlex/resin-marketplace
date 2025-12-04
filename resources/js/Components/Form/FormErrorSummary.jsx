import { forwardRef } from 'react';

const FormErrorSummary = forwardRef(({ 
    errors, 
    errorCount, 
    hasErrors, 
    scrollToField, 
    getFieldLabel,
    actionText = "submitting",
    className = ""
}, ref) => {
    if (!hasErrors) return null;

    return (
        <div ref={ref} className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800">
                        Please fix the following {errorCount} error{errorCount !== 1 ? 's' : ''} before {actionText}:
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                            {Object.entries(errors).map(([field, message]) => (
                                <li key={field}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToField(field)}
                                        className="hover:underline cursor-pointer text-left"
                                    >
                                        <span className="font-medium">{getFieldLabel(field)}:</span> {message}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex text-red-400 hover:text-red-600"
                    >
                        <span className="sr-only">Scroll to top</span>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
});

FormErrorSummary.displayName = 'FormErrorSummary';

export default FormErrorSummary;