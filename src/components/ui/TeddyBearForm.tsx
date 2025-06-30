import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeddyBear, CreateTeddyBearRequest, UpdateTeddyBearRequest } from '@/types';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';
import { X, Plus, Trash2, Upload } from 'lucide-react';
import { useTags, Tag } from '@/hooks/useTags';
import { useMedia } from '@/hooks/useMedia';

interface TeddyBearFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTeddyBearRequest | UpdateTeddyBearRequest) => void;
  initialData?: TeddyBear | null;
  isLoading?: boolean;
}

const TeddyBearForm: React.FC<TeddyBearFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false
}) => {
  const { data: tags = [] } = useTags();
  const uploadMutation = useMedia();

  const [formData, setFormData] = useState<CreateTeddyBearRequest>({
    name: '',
    size: '',
    quantity: 0,
    price: 0,
    color: [],
    primaryImgUrl: '',
    tagIds: []
  });

  const [newColor, setNewColor] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  // Reset form when modal opens/closes or initial data changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name,
          size: initialData.size || '',
          quantity: initialData.quantity,
          price: initialData.price,
          color: initialData.color || [],
          primaryImgUrl: initialData.primaryImageUrl || '',
          tagIds: initialData.tags?.map(tag => tag.id) || []
        });
        setSelectedTagIds(initialData.tags?.map(tag => tag.id) || []);
      } else {
        setFormData({
          name: '',
          size: '',
          quantity: 0,
          price: 0,
          color: [],
          primaryImgUrl: '',
          tagIds: []
        });
        setSelectedTagIds([]);
      }
    }
  }, [isOpen, initialData]);

  const handleInputChange = (field: keyof CreateTeddyBearRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addColor = () => {
    if (newColor.trim() && !formData.color?.includes(newColor.trim())) {
      handleInputChange('color', [...(formData.color || []), newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove: string) => {
    handleInputChange('color', formData.color?.filter(color => color !== colorToRemove) || []);
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      handleInputChange('primaryImgUrl', newImageUrl.trim());
      setNewImageUrl('');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadMutation.mutateAsync(file);

      // Set the uploaded URL as primary image
      if (uploadedUrl && typeof uploadedUrl === 'string') {
        handleInputChange('primaryImgUrl', uploadedUrl);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      // You might want to show a toast notification here
    }
  };



  const toggleTag = (tagId: string) => {
    const newSelectedTags = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter(id => id !== tagId)
      : [...selectedTagIds, tagId];

    setSelectedTagIds(newSelectedTags);
    handleInputChange('tagIds', newSelectedTags);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      tagIds: selectedTagIds
    };

    if (initialData) {
      onSubmit({ ...submitData, id: initialData.id } as UpdateTeddyBearRequest);
    } else {
      onSubmit(submitData);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-card rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter teddy bear name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <Input
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  placeholder="e.g., Small, Medium, Large"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity *</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price (VND) *</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium mb-2">Colors</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add color"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addColor())}
                />
                <Button type="button" onClick={addColor} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.color?.map((color, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    {color}
                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2">Images</label>

              {/* Upload Button */}
              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={uploadMutation.isPending}
                  className="w-full flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {uploadMutation.isPending ? 'Uploading...' : 'Upload Image'}
                </Button>
              </div>

              {/* Manual URL Input */}
              <div className="flex gap-2 mb-2">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or add image URL manually"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                />
                <Button type="button" onClick={addImageUrl} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {/* Primary Image Preview */}
              {formData.primaryImgUrl && (
                <div className="mt-4 p-4 border rounded-lg border-primary bg-primary/5">
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.primaryImgUrl}
                      alt="Primary image"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Badge variant="default" className="mb-2">Primary Image</Badge>
                      <p className="text-sm text-muted-foreground truncate">
                        {formData.primaryImgUrl}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleInputChange('primaryImgUrl', '')}
                      className="text-destructive hover:text-destructive/80"
                      title="Remove image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: Tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTagIds.includes(tag.id) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.name.trim()}
                className="flex-1"
              >
                {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TeddyBearForm; 