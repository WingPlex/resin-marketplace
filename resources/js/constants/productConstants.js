// Form field options and constants
export const FINISH_TYPE_OPTIONS = [
    { value: 'glossy', label: 'Glossy' },
    { value: 'matte', label: 'Matte' },
    { value: 'clear', label: 'Clear' },
    { value: 'opaque', label: 'Opaque' },
    { value: 'metallic', label: 'Metallic' },
    { value: 'pearl', label: 'Pearl' },
    { value: 'shimmer', label: 'Shimmer' },
];

export const PROCESSING_TIME_OPTIONS = [
    { value: '1', label: '1 Day' },
    { value: '2', label: '2 Days' },
    { value: '3', label: '3 Days' },
    { value: '5', label: '5 Days' },
    { value: '7', label: '1 Week (7 Days)' },
    { value: '10', label: '10 Days' },
    { value: '14', label: '2 Weeks (14 Days)' },
    { value: '21', label: '3 Weeks (21 Days)' },
    { value: '30', label: '1 Month (30 Days)' },
];

export const STATUS_OPTIONS = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'out_of_stock', label: 'Out of Stock' },
];

export const THEME_EXAMPLES = [
    'Floral', 'Ocean', 'Minimal', 'Geode', 'Galaxy', 'Abstract', 'Boho', 'Pastel', 'Aesthetic', 'Mandala'
];

export const IDEAL_FOR_EXAMPLES = [
    'Birthday', 'Anniversary', 'Wedding gift', 'Return gifts', 'Office décor', 'Desk accessory'
];

export const INCLUSIONS_EXAMPLES = [
    'Chain', 'Hook', 'Stand', 'Box', 'Gift wrapping'
];

// Initial form data for products
export const getInitialProductData = () => ({
    name: '',
    slug: '',
    description: '',
    price: '',
    category_id: '',
    artist_id: '',
    featured_image: '',
    gallery_images: '',
    materials: '',
    dimensions: '',
    colors_available: '',
    stock_quantity: '',
    sku: '',
    tags: [],
    weight: '',
    is_customizable: false,
    customization_options: '',
    status: 'draft',
    finish_type: '',
    theme: [],
    processing_time_days: '',
    care_instructions: '',
    ideal_for: [],
    inclusions: [],
    safety_notes: '',
    meta_title: '',
    meta_description: '',
    seo_keywords: '',
});

// Field labels for error handling
export const PRODUCT_FIELD_LABELS = {
    name: 'Product Name',
    slug: 'URL Slug',
    description: 'Description',
    price: 'Price',
    category_id: 'Category',
    artist_id: 'Artist',
    featured_image: 'Featured Image',
    gallery_images: 'Gallery Images',
    materials: 'Materials',
    dimensions: 'Dimensions',
    colors_available: 'Available Colors',
    stock_quantity: 'Stock Quantity',
    sku: 'SKU',
    tags: 'Tags',
    weight: 'Weight',
    customization_options: 'Customization Options',
    status: 'Status',
    finish_type: 'Finish Type',
    theme: 'Theme/Style',
    processing_time_days: 'Processing Time',
    care_instructions: 'Care Instructions',
    ideal_for: 'Ideal For',
    inclusions: 'Included Items',
    safety_notes: 'Safety Notes',
    meta_title: 'Page Title',
    meta_description: 'Meta Description',
    seo_keywords: 'SEO Keywords'
};

// Helper function to convert product data for editing
export const getEditProductData = (product) => ({
    name: product.name || '',
    slug: product.slug || '',
    description: product.description || '',
    price: product.price || '',
    category_id: product.category_id || '',
    artist_id: product.artist_id || '',
    featured_image: product.featured_image || '',
    gallery_images: product.gallery_images ? JSON.stringify(product.gallery_images) : '',
    materials: product.materials ? JSON.stringify(product.materials) : '',
    dimensions: product.dimensions ? JSON.stringify(product.dimensions) : '',
    colors_available: product.colors_available ? JSON.stringify(product.colors_available) : '',
    stock_quantity: product.stock_quantity || '',
    sku: product.sku || '',
    tags: product.tags ? product.tags.map(tag => tag.id) : [],
    weight: product.weight || '',
    is_customizable: product.is_customizable || false,
    customization_options: product.customization_options ? JSON.stringify(product.customization_options) : '',
    status: product.status || 'draft',
    finish_type: product.finish_type || '',
    theme: product.theme || [],
    processing_time_days: product.processing_time_days || '',
    care_instructions: product.care_instructions || '',
    ideal_for: product.ideal_for || [],
    inclusions: product.inclusions || [],
    safety_notes: product.safety_notes || '',
    meta_title: product.meta_title || '',
    meta_description: product.meta_description || '',
    seo_keywords: product.seo_keywords || '',
});