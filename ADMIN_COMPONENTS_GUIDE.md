# Admin Panel Reusable Components Guide

This guide explains how to use the refactored admin panel components to maintain consistency and reduce code duplication across the application.

## 🧩 Available Components

### 1. AdminFilterBar
**File:** `resources/js/Components/AdminFilterBar.jsx`

Provides a Shopify-style filter bar with search, dropdowns, and filter tags.

```jsx
import AdminFilterBar from '../../../Components/AdminFilterBar';

const filterConfig = [
    {
        key: 'status',                    // Field key to filter by
        label: 'Status',                  // Display label for filter tags
        placeholder: 'All Statuses',      // Dropdown placeholder
        color: 'yellow',                  // Tag color (blue, green, purple, yellow, red)
        options: [                        // Dropdown options
            { value: 'active', label: 'Active' },
            { value: 'draft', label: 'Draft' }
        ]
    }
];

<AdminFilterBar
    searchPlaceholder="Search products..."
    searchValue={filters.search}
    onSearchChange={(value) => updateFilter('search', value)}
    filters={filterConfig}
    activeFilters={filters}
    onFilterChange={updateFilter}
    onClearFilters={clearAllFilters}
    rightActions={<CustomButton />}  // Optional right-side actions
/>
```

### 2. AdminDataTable
**File:** `resources/js/Components/AdminDataTable.jsx`

Flexible data table with customizable columns and actions.

```jsx
import AdminDataTable from '../../../Components/AdminDataTable';

const columns = [
    {
        header: 'Product Name',
        accessor: 'name',                 // Simple field access
        render: (item) => (              // Custom render function
            <div className="flex items-center">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
            </div>
        )
    },
    {
        header: 'Category',
        accessor: 'category.name',        // Nested field access
        cellClassName: 'text-center'     // Custom cell styling
    }
];

const actions = [
    {
        type: 'link',
        label: 'Edit',
        href: (item) => `/admin/products/${item.id}/edit`,
        className: 'text-indigo-600 bg-indigo-100'
    },
    {
        type: 'button',
        label: 'Delete',
        className: 'text-red-600 bg-red-100',
        onClick: (item) => handleDelete(item),
        disabled: (item) => item.status === 'archived'  // Conditional disable
    }
];

<AdminDataTable
    title="All Products"
    description="Manage your product inventory"
    data={filteredData}
    columns={columns}
    actions={actions}
    totalCount={allData.length}
    filteredCount={filteredData.length}
    activeFiltersCount={activeFiltersCount}
    onRowAction={(item) => navigateToDetail(item)}  // Optional row click handler
/>
```

### 3. AdminCard
**File:** `resources/js/Components/AdminCard.jsx`

Consistent card layouts for forms and content.

```jsx
import AdminCard, { AdminFormCard, AdminStatsCard } from '../../../Components/AdminCard';

// Basic Card
<AdminCard 
    title="Settings"
    description="Manage your preferences"
    actions={<SaveButton />}
>
    <YourContent />
</AdminCard>

// Form Card (includes form wrapper)
<AdminFormCard 
    title="Create Product"
    description="Add a new product to your inventory"
    actions={[<CancelButton />, <SaveButton />]}
>
    <FormFields />
</AdminFormCard>

// Stats Card
<AdminStatsCard
    title="Total Sales"
    value="$12,345"
    change={{ type: 'increase', value: '+12%' }}
    color="green"
    icon={<DollarIcon />}
/>
```

### 4. AdminUI Components
**File:** `resources/js/Components/AdminUI.jsx`

Small reusable UI elements.

```jsx
import { 
    StatusBadge, 
    PriorityBadge, 
    CountBadge, 
    ImagePreview, 
    UserAvatar 
} from '../../../Components/AdminUI';

// Status Badge
<StatusBadge status="active" />
<StatusBadge 
    status="custom" 
    statusConfig={{
        'custom': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Custom Status' }
    }}
/>

// Count Badge
<CountBadge count={5} color="blue" />

// Image Preview with fallback
<ImagePreview 
    src={product.image} 
    alt={product.name}
    className="w-12 h-12"
    fallback={<CustomFallback />}
/>

// User Avatar
<UserAvatar user={artist} size="lg" />
```

## 🔧 Custom Hooks

### useAdminFilters
**File:** `resources/js/Hooks/useAdminFilters.js`

Manages filter state and data filtering logic.

```jsx
import { useAdminFilters } from '../../../Hooks/useAdminFilters';

const {
    filters,                    // Current filter values
    filteredData,              // Filtered dataset
    activeFiltersCount,        // Number of active filters
    updateFilter,              // Update single filter: (key, value) => void
    clearAllFilters,           // Clear all filters: () => void
    setFilters                 // Set multiple filters: (filtersObject) => void
} = useAdminFilters(originalData, {
    status: '',                // Initial filter values
    category_id: '',
    search: ''
});

// Usage
updateFilter('status', 'active');
updateFilter('search', 'product name');
clearAllFilters();
```

## 📝 Migration Guide

### Step 1: Replace Filter Logic

**Before:**
```jsx
const [filters, setFilters] = useState({ search: '', status: '' });
const [filteredProducts, setFilteredProducts] = useState(products);

useEffect(() => {
    let filtered = products;
    if (filters.search) {
        filtered = filtered.filter(p => p.name.includes(filters.search));
    }
    if (filters.status) {
        filtered = filtered.filter(p => p.status === filters.status);
    }
    setFilteredProducts(filtered);
}, [filters, products]);
```

**After:**
```jsx
const { filters, filteredData, updateFilter, clearAllFilters } = useAdminFilters(products);
```

### Step 2: Replace Filter Bar

**Before:**
```jsx
<div className="bg-white border rounded-lg p-4">
    <input 
        value={filters.search}
        onChange={(e) => setFilters({...filters, search: e.target.value})}
        placeholder="Search..."
    />
    <select 
        value={filters.status}
        onChange={(e) => setFilters({...filters, status: e.target.value})}
    >
        <option value="">All</option>
        <option value="active">Active</option>
    </select>
</div>
```

**After:**
```jsx
<AdminFilterBar
    searchValue={filters.search}
    onSearchChange={(value) => updateFilter('search', value)}
    filters={filterConfig}
    activeFilters={filters}
    onFilterChange={updateFilter}
    onClearFilters={clearAllFilters}
/>
```

### Step 3: Replace Data Tables

**Before:**
```jsx
<table className="min-w-full">
    <thead>
        <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {products.map(product => (
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                    <span className={`px-2 py-1 rounded ${product.status === 'active' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {product.status}
                    </span>
                </td>
                <td>
                    <Link href={`/edit/${product.id}`}>Edit</Link>
                    <button onClick={() => delete(product.id)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
```

**After:**
```jsx
<AdminDataTable
    data={filteredData}
    columns={columns}
    actions={actions}
    totalCount={products.length}
    filteredCount={filteredData.length}
/>
```

## 🎨 Styling Guidelines

### Colors
- **Primary**: Blue tones for main actions
- **Success**: Green for positive states (active, success)
- **Warning**: Yellow for attention states (pending, draft)
- **Danger**: Red for destructive actions (delete, error)
- **Secondary**: Gray for neutral states (inactive, disabled)

### Spacing
- Use Tailwind's spacing scale: `space-y-6` for sections, `space-x-2` for inline elements
- Card padding: `p-6` for content, `p-4` for compact areas
- Button padding: `px-4 py-2` for normal buttons, `px-3 py-1` for small buttons

### Typography
- Headlines: `font-k2d-bold` for main headings
- Subheadings: `font-k2d-semibold` 
- Body: Default font-weight for content
- Meta text: `text-gray-500` for secondary information

## 🚀 Benefits

1. **Consistency**: All admin pages look and feel the same
2. **Maintainability**: Update styles in one place, affects all pages
3. **Developer Experience**: Less boilerplate code, focus on business logic
4. **Performance**: Reused components are optimized and tested
5. **Accessibility**: Built-in accessibility features in components
6. **Testing**: Easier to test isolated, reusable components

## 📋 TODO: Implementation Checklist

- [ ] Replace Products Index with refactored version
- [ ] Replace Categories Index with refactored version  
- [ ] Replace Artists Index with refactored version
- [ ] Update Create/Edit forms to use AdminCard components
- [ ] Add sorting functionality to AdminDataTable
- [ ] Add pagination support to AdminDataTable
- [ ] Create AdminForm components for consistent form layouts
- [ ] Add keyboard shortcuts for common actions
- [ ] Implement bulk actions (select multiple items)
- [ ] Add export functionality to tables