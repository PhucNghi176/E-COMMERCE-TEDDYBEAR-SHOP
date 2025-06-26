'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tag, useTags } from '@/hooks/useTags';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import FloatingIcon from '@/components/floatingIcon';
import { Product } from '@/types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { data: tags, isLoading: tagsLoading } = useTags();
  const { data: products, isLoading: productsLoading } = useProducts({
    searchTerm: debouncedQuery,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
    pageIndex: 1,
    pageSize: 12,
  });

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle tag click - populate search box and set category
  const handleTagClick = (tagName: string) => {
    setSearchQuery(tagName);
    setSelectedCategory(tagName);
  };

  // Handle "All" category click - clear search
  const handleAllCategoryClick = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col items-center w-full">
      <FloatingIcon />
      {/* Hero Section */}
      <motion.section
        className="w-full min-h-screen bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="text-center space-y-8 px-4" {...fadeIn}>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Gấu bông nhà Ngân
            <br />
            <br />
          </h1>

          <div className="relative h-64 md:h-96 max-w-md mx-auto">
            <Image
              src="/panda-6260.gif"
              alt="Cute panda animation"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        className="w-full py-16 bg-card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center space-y-8 mb-12" {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins">
              Bộ sưu tập
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                variant={selectedCategory === 'All' ? 'default' : 'outline'}
                className="cursor-pointer transition-colors hover:bg-primary/10"
                onClick={handleAllCategoryClick}
              >
                Tất cả
              </Badge>
              {!tagsLoading && tags?.map((tag: Tag) => (
                <Badge
                  key={tag.id}
                  variant={selectedCategory === tag.name ? 'default' : 'outline'}
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
                placeholder="Tìm kiếm sản phẩm bạn mong muốn"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 py-3"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search indicator */}
            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                Tìm kiếm: "<span className="font-medium text-foreground">{searchQuery}</span>"
              </p>
            )}
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsLoading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-card rounded-xl p-4 border animate-pulse">
                  <div className="bg-muted h-48 rounded-lg mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-4 rounded w-2/3"></div>
                </div>
              ))
            ) : products?.items?.length > 0 ? (
              products.items.map((product: Product) => (
                <motion.div
                  key={product.id}
                  className="bg-card rounded-xl p-4 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Product Image */}

                  <div className="relative w-full h-80 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={product.primaryImageUrl || ''}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>


                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Size: {product.size}</span>
                      <span>SL: {product.quantity}</span>
                    </div>

                    {/* Colors */}
                    {product.color && product.color.length > 0 && (
                      <div className="flex gap-1">
                        {product.color.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-border"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                        {product.color.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{product.color.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold text-primary">
                        {product.price.toLocaleString('vi-VN')}đ
                      </span>
                      <Button variant="outline" size="sm">
                        Chi tiết
                      </Button>
                    </div>

                    {/* Tags - Clickable */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag.id}
                            variant={searchQuery === tag.name ? "default" : "secondary"}
                            className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => handleTagClick(tag.name)}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                        {product.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🧸</div>
                <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `Không tìm thấy sản phẩm cho "${searchQuery}"`
                    : 'Thử tìm kiếm với từ khóa khác'
                  }
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                  >
                    Xóa tìm kiếm
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
