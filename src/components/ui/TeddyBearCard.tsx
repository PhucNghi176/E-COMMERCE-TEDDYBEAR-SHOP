import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TeddyBear } from '@/types';
import { Badge } from './badge';
import { Button } from './button';
import Image from 'next/image';
import { Edit, Trash2, Eye, Settings } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface TeddyBearCardProps {
  teddyBear: TeddyBear;
  onEdit?: (teddyBear: TeddyBear) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const TeddyBearCard: React.FC<TeddyBearCardProps> = ({ 
  teddyBear, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedColor, setSelectedColor] = useState<string>(teddyBear.color?.[0] || '');
  
  // Get currently selected tags from URL (format: ?tag=bear&&brown)
  const tagsParam = searchParams.get('tag');
  const selectedTags = tagsParam ? tagsParam.split('&&').filter(tag => tag.trim()) : [];

  const isLowStock = teddyBear.quantity <= 5;
  const isOutOfStock = teddyBear.quantity === 0;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(teddyBear);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(teddyBear.id);
  };

  const handleTagClick = (e: React.MouseEvent, tagName: string) => {
    e.stopPropagation();
    const params = new URLSearchParams(searchParams.toString());
    
    if (!selectedTags.includes(tagName)) {
      const newTags = [...selectedTags, tagName];
      params.set('tag', newTags.join('&&'));
      router.push(`?${params.toString()}`);
    }
  };



  return (
    <motion.div
      className={`bg-card rounded-xl p-4 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        isOutOfStock ? 'opacity-75' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image Container */}
      <div className="relative w-full h-80 mb-4 rounded-lg overflow-hidden">
        <Image
          src={teddyBear.primaryImageUrl || '/teddy-bear.svg'}
          alt={`${teddyBear.name} teddy bear`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Action buttons overlay */}
        {showActions && (
          <div className="absolute top-2 right-2 flex gap-2">
            {onEdit && (
              <button
                onClick={handleEditClick}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-blue-600 transition-all"
                title="Edit Product"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-red-600 transition-all"
                title="Delete Product"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Low stock indicator */}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="text-xs">
              Only {teddyBear.quantity} left!
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2">
          {teddyBear.name}
        </h3>

        {/* Details row */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Size: {teddyBear.size || 'Medium'}</span>
          <span>Qty: {teddyBear.quantity}</span>
        </div>

        {/* Colors */}
        {teddyBear.color && teddyBear.color.length > 0 && (
          <div className="flex gap-1">
            {teddyBear.color.slice(0, 4).map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? 'border-primary' : 'border-border'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
            {teddyBear.color.length > 4 && (
              <span className="text-xs text-muted-foreground flex items-center">
                +{teddyBear.color.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price and Management Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-primary">
            {teddyBear.price.toLocaleString('vi-VN')}đ
          </span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleEditClick}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Manage
            </Button>
          </div>
        </div>

        {/* Tags */}
        {teddyBear.tags && teddyBear.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {teddyBear.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.name) ? "default" : "secondary"}
                className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={(e) => handleTagClick(e, tag.name)}
              >
                {tag.name}
              </Badge>
            ))}
            {teddyBear.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{teddyBear.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TeddyBearCard; 