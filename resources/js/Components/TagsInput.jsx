import { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

export default function TagsInput({ 
    tags = [], // Array of tag IDs or tag objects
    availableTags = [], // All available tags from database
    onChange, 
    placeholder = "Add tags...", 
    className = "",
    error = null 
}) {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Convert tags to tag objects if they're IDs
    const selectedTags = tags.map(tag => {
        if (typeof tag === 'object' && tag.id) {
            return tag;
        } else {
            // It's an ID, find the tag object
            return availableTags.find(t => t.id === tag) || { id: tag, name: `Tag ${tag}`, color: '#gray' };
        }
    });

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue.trim()) {
            const selectedTagIds = selectedTags.map(tag => tag.id);
            const filtered = availableTags.filter(tag => 
                !selectedTagIds.includes(tag.id) &&
                tag.name.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    }, [inputValue, selectedTags, availableTags]);

    // Handle clicks outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const addTag = (tag) => {
        if (tag && !selectedTags.find(t => t.id === tag.id)) {
            // Return just the IDs for the form
            const newTagIds = [...selectedTags.map(t => t.id), tag.id];
            onChange(newTagIds);
        }
        setInputValue('');
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    const removeTag = (tagToRemove) => {
        // Return just the IDs for the form
        const newTagIds = selectedTags.filter(tag => tag.id !== tagToRemove.id).map(tag => tag.id);
        onChange(newTagIds);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredSuggestions.length > 0) {
                addTag(filteredSuggestions[0]);
            }
        } else if (e.key === 'Backspace' && inputValue === '' && selectedTags.length > 0) {
            removeTag(selectedTags[selectedTags.length - 1]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setInputValue('');
        }
    };

    const handleSuggestionClick = (tag) => {
        addTag(tag);
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className={`
                flex flex-wrap gap-2 p-3 border rounded-lg bg-white min-h-[44px] focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500
                ${error ? 'border-red-300' : 'border-gray-300'}
            `}>
                {selectedTags.map((tag) => (
                    <span
                        key={tag.id}
                        className="inline-flex items-center px-2 py-1 text-white text-sm rounded-full"
                        style={{ backgroundColor: tag.color }}
                    >
                        {tag.name}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-white hover:text-gray-200 focus:outline-none"
                        >
                            <X size={14} />
                        </button>
                    </span>
                ))}
                <div className="flex items-center flex-1 min-w-[120px]">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                            if (inputValue.trim() && filteredSuggestions.length > 0) {
                                setShowSuggestions(true);
                            }
                        }}
                        placeholder={selectedTags.length === 0 ? placeholder : ""}
                        className="flex-1 outline-none bg-transparent placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => handleSuggestionClick(tag)}
                            className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                            <span
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: tag.color }}
                            ></span>
                            <span className="text-sm font-medium">{tag.name}</span>
                            {tag.description && (
                                <span className="ml-2 text-xs text-gray-500">{tag.description}</span>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
                Start typing to see available tags. Press Enter to select, or click on suggestions.
            </p>
        </div>
    );
}