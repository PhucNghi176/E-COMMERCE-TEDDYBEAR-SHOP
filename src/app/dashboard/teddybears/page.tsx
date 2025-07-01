'use client';

import { motion } from 'framer-motion';
import { Search, Plus, Filter, Grid, List, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTags, Tag } from '@/hooks/useTags';
import { useTeddyBears, useCreateTeddyBear, useUpdateTeddyBear, useDeleteTeddyBear } from '@/hooks/useTeddyBears';
import TeddyBearCard from '@/components/ui/TeddyBearCard';
import TeddyBearForm from '@/components/ui/TeddyBearForm';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { CreateTeddyBearRequest, TeddyBear, UpdateTeddyBearRequest } from '@/types';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TeddyBearsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTeddyBear, setEditingTeddyBear] = useState<TeddyBear | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deletingTeddyBear, setDeletingTeddyBear] = useState<TeddyBear | null>(null);

  // Get selected tags from URL parameters (format: ?tag=bear&&brown)
  const tagsParam = searchParams.get('tag');
  const selectedTags = tagsParam ? tagsParam.split('&&').filter(tag => tag.trim()) : [];

  const { data: tags, isLoading: tagsLoading } = useTags();
  const { data: teddyBears, isLoading: teddyBearsLoading } = useTeddyBears({
    searchTerm: debouncedQuery,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
    pageIndex: 1,
    pageSize: 20,
    tags: selectedTags.join(','), // Pass selected tags as comma-separated string to API
  });

  const createMutation = useCreateTeddyBear();
  const updateMutation = useUpdateTeddyBear();
  const deleteMutation = useDeleteTeddyBear();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle tag click - add/remove from URL parameters
  const handleTagClick = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let newTags: string[];

    if (selectedTags.includes(tagName)) {
      // Remove tag if already selected
      newTags = selectedTags.filter(tag => tag !== tagName);
    } else {
      // Add tag if not selected
      newTags = [...selectedTags, tagName];
    }

    // Update URL with new tag format
    if (newTags.length > 0) {
      params.set('tag', newTags.join('&&'));
    } else {
      params.delete('tag');
    }

    router.push(`?${params.toString()}`);
  };

  // Clear all tag filters
  const clearAllTags = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('tag');
    router.push(`?${params.toString()}`);
  };

  // Remove specific tag
  const removeTag = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const newTags = selectedTags.filter(tag => tag !== tagName);

    if (newTags.length > 0) {
      params.set('tag', newTags.join('&&'));
    } else {
      params.delete('tag');
    }

    router.push(`?${params.toString()}`);
  };

  const handleCreateNew = () => {
    setEditingTeddyBear(null);
    setIsFormOpen(true);
  };

  const handleEdit = (teddyBear: TeddyBear) => {
    setEditingTeddyBear(teddyBear);
    setIsFormOpen(true);
  };

  const handleDelete = (teddyBear: TeddyBear) => {
    setDeletingTeddyBear(teddyBear);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingTeddyBear) return;

    try {
      await deleteMutation.mutateAsync(deletingTeddyBear.id);
      toast.success('Teddy bear deleted successfully! 🧸');
      setDeleteConfirmOpen(false);
      setDeletingTeddyBear(null);
    } catch (error) {
      toast.error('Failed to delete teddy bear');
      console.error('Delete error:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setDeletingTeddyBear(null);
  };

  const handleFormSubmit = async (formData: CreateTeddyBearRequest | UpdateTeddyBearRequest) => {
    try {
      if (editingTeddyBear) {
        await updateMutation.mutateAsync(formData as UpdateTeddyBearRequest);
        toast.success('Teddy bear updated successfully! 🧸✨');
      } else {
        await createMutation.mutateAsync(formData as CreateTeddyBearRequest);
        toast.success('New teddy bear created successfully! 🧸💕');
      }
      setIsFormOpen(false);
      setEditingTeddyBear(null);
    } catch (error) {
      toast.error(editingTeddyBear ? 'Failed to update teddy bear' : 'Failed to create teddy bear');
      console.error('Form submit error:', error);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <motion.section
        className="w-full min-h-[40vh] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="text-center space-y-8 px-4" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your teddy bear inventory and product catalog
          </p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        className="w-full py-16 bg-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          {/* Controls */}
          <motion.div className="space-y-8 mb-12" {...fadeIn}>
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">
                Product Inventory
              </h2>

              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="flex border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <Button onClick={handleCreateNew} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </div>

            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 p-4 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtered by:
                </span>
                {selectedTags.map((tagName) => (
                  <Badge
                    key={tagName}
                    variant="default"
                    className="flex items-center gap-1 cursor-pointer hover:bg-primary/80"
                    onClick={() => removeTag(tagName)}
                  >
                    {tagName}
                    <X className="h-3 w-3" />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllTags}
                  className="h-6 px-2 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Tag Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm font-medium text-muted-foreground flex items-center">
                Filter by tags:
              </span>
              {!tagsLoading && tags?.map((tag: Tag) => (
                <Badge
                  key={tag.id}
                  variant={selectedTags.includes(tag.name) ? 'default' : 'outline'}
                  className="cursor-pointer transition-colors hover:bg-primary/10"
                  onClick={() => handleTagClick(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search teddy bears..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 py-3"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search indicator */}
            {searchQuery && (
              <p className="text-sm text-muted-foreground text-center">
                Searching for: "<span className="font-medium text-foreground">{searchQuery}</span>"
              </p>
            )}
          </motion.div>

          {/* Teddy Bears Grid/List */}
          <div className={`${viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'grid grid-cols-1 gap-4'
            }`}>
            {teddyBearsLoading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-card rounded-xl p-4 border animate-pulse">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-4 rounded w-2/3"></div>
                </div>
              ))
            ) : teddyBears?.items?.length > 0 ? (
              teddyBears.items.map((teddyBear: TeddyBear) => (
                <TeddyBearCard
                  key={teddyBear.id}
                  teddyBear={teddyBear}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(teddyBear)}
                  showActions={true}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🧸</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedTags.length > 0
                    ? `No products found${searchQuery ? ` for "${searchQuery}"` : ''}${selectedTags.length > 0 ? ` with tags: ${selectedTags.join(', ')}` : ''}`
                    : 'Start by adding your first product!'
                  }
                </p>
                <div className="flex gap-2 justify-center">
                  {(searchQuery || selectedTags.length > 0) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        clearAllTags();
                      }}
                    >
                      Clear all filters
                    </Button>
                  )}
                  <Button onClick={handleCreateNew}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add your first product
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {teddyBears && teddyBears.items.length > 0 && (
            <div className="flex justify-center mt-12 gap-2">
              <Button
                variant="outline"
                disabled={!teddyBears.hasPreviousPage}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={!teddyBears.hasNextPage}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Form Modal */}
      <TeddyBearForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTeddyBear(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingTeddyBear}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deletingTeddyBear?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  );
}
