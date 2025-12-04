import React from 'react';
import FormField from '../Form/FormField';
import TextareaField from '../Form/TextareaField';
import SelectField from '../Form/SelectField';
import JsonField from '../Form/JsonField';
import { 
    FINISH_TYPE_OPTIONS, 
    PROCESSING_TIME_OPTIONS, 
    THEME_EXAMPLES, 
    IDEAL_FOR_EXAMPLES, 
    INCLUSIONS_EXAMPLES 
} from '../../constants/productConstants';

export default function ResinPropertiesSection({ data, setData, errors }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Resin Properties</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                    label="Finish Type"
                    id="finish_type"
                    value={data.finish_type}
                    onChange={(e) => setData('finish_type', e.target.value)}
                    options={FINISH_TYPE_OPTIONS}
                    placeholder="Select finish type"
                    error={errors.finish_type}
                />

                <SelectField
                    label="Processing Time (Days)"
                    id="processing_time_days"
                    value={data.processing_time_days}
                    onChange={(e) => setData('processing_time_days', parseInt(e.target.value) || '')}
                    options={PROCESSING_TIME_OPTIONS}
                    placeholder="Select processing time"
                    helpText="Time required for resin curing and processing"
                    error={errors.processing_time_days}
                />

                <JsonField
                    label="Theme/Style (JSON Array)"
                    id="theme"
                    value={data.theme}
                    onChange={(value) => setData('theme', value)}
                    placeholder='["Floral", "Ocean", "Minimal"]'
                    examples={THEME_EXAMPLES}
                    error={errors.theme}
                    className="md:col-span-2"
                />

                <JsonField
                    label="Ideal For (JSON Array)"
                    id="ideal_for"
                    value={data.ideal_for}
                    onChange={(value) => setData('ideal_for', value)}
                    placeholder='["Birthday", "Anniversary", "Office décor"]'
                    examples={IDEAL_FOR_EXAMPLES}
                    error={errors.ideal_for}
                    className="md:col-span-2"
                />

                <JsonField
                    label="Included Items (JSON Array)"
                    id="inclusions"
                    value={data.inclusions}
                    onChange={(value) => setData('inclusions', value)}
                    placeholder='["Chain", "Hook", "Stand", "Gift Box"]'
                    examples={INCLUSIONS_EXAMPLES}
                    error={errors.inclusions}
                    className="md:col-span-2"
                />

                <TextareaField
                    label="Care Instructions"
                    id="care_instructions"
                    value={data.care_instructions}
                    onChange={(e) => setData('care_instructions', e.target.value)}
                    placeholder="e.g., Wipe with soft cloth, Keep away from heat/sunlight, Not dishwasher safe"
                    helpText="Special handling instructions for resin products"
                    error={errors.care_instructions}
                    className="md:col-span-2"
                />

                <TextareaField
                    label="Safety Notes"
                    id="safety_notes"
                    value={data.safety_notes}
                    onChange={(e) => setData('safety_notes', e.target.value)}
                    placeholder="e.g., Food safe, Waterproof, Heat-resistant up to 60°C"
                    helpText="Safety information: Food safe/not food safe, Waterproof, Heat-resistant"
                    error={errors.safety_notes}
                    className="md:col-span-2"
                />
            </div>
        </div>
    );
}