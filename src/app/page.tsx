'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code, Rocket, Search, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tag, useTags } from '@/hooks/useTags';
import { useProducts, Product } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const { data: tags, isLoading: tagsLoading } = useTags();
  const { data: products, isLoading: productsLoading } = useProducts({
    searchTerm: debouncedQuery,
    sortColumn: 'createdAt',
    sortOrder: 'desc',
    pageIndex: 1,
    pageSize: 10,
  });
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      <motion.section
        className="w-screen h-screen bg-[var(--background)] relative overflow-hidden bg-gradient-to-br from-[var(--primary)]/[0.2] to-[var(--accent)]/[0.2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/[0.1] to-[var(--accent)]/[0.1] pointer-events-none" />
        <div className="px-4 sm:px-6 relative z-10 h-screen flex items-center justify-center">
          <motion.div
            className="flex flex-col items-center space-y-6 text-center"
            {...fadeIn}
          >
            <div className="relative w-screen rounded-lg  p-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-poppins bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent text-center mb-8">
                Gấu bông nhà Ngân
                <br></br>
                <br></br>
              </h1>
              <div className="relative h-64 sm:h-80 md:h-96">
                <img
                  src="/panda-6260.gif"
                  alt="Cute panda animation"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full py-12 sm:py-16 md:py-24 bg-[var(--card)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-4 sm:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 text-center"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl  tracking-tighter font-poppins text-[var(--foreground)]">
              Bộ sưu tập
            </h2>
            <div className="mx-auto max-w-[600px] font-bold text-[var(--muted-foreground)] text-base sm:text-lg px-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-[var(--muted-foreground)]">
                  Categories:
                </span>
                <div className="flex flex-wrap gap-2">
                  {tagsLoading ? (
                    <div>Loading tags...</div>
                  ) : tags && tags.length > 0 ? (
                    tags.map((tag: Tag) => (
                      <Badge
                        key={tag.id}
                        variant={
                          selectedCategory === tag.name ? 'default' : 'outline'
                        }
                        className={`cursor-pointer transition-colors ${selectedCategory === tag.name
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/[0.9]'
                          : 'bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]'
                          }`}
                        onClick={() => setSelectedCategory(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))
                  ) : (
                    <div>No tags available</div>
                  )}
                </div>
              </div>
            </div>
            <div className="relative max-w-lg mx-auto w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm bạn mong muốn"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 py-6 bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] focus-visible:ring-[var(--primary)] placeholder:text-[var(--muted-foreground)]"
              />
            </div>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 px-4">

            {productsLoading ? (
              <div>Loading products...</div>
            ) : products ? (
              products.items.map((product: Product) => (
                <motion.div
                  key={product.id}
                  className="relative flex flex-col rounded-xl bg-[var(--card)] p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[var(--border)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {product.imgUrl && product.imgUrl[0] && (
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={product.imgUrl[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[var(--primary)] font-bold">
                      {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    <span className="text-[var(--primary)] font-bold">
                      {product.quantity}
                    </span>
                    <span className="text-[var(--primary)] font-bold">
                      {product.color?.join(', ')}
                    </span>
                    <span className="text-[var(--primary)] font-bold">
                      {product.size}
                    </span>
                    <Button variant="outline" size="sm">
                      Chi tiết
                    </Button>
                  </div>
                  {product.productTags && product.productTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.productTags.map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-[var(--muted-foreground)]">
                Không tìm thấy sản phẩm nào
              </div>
            )}
            {/* {[
              {
                icon: Zap,
                title: 'Blazing Performance',
                description:
                  'Optimized with Next.js 15 for lightning-fast page loads and seamless user experiences.',
              },
              {
                icon: ShieldCheck,
                title: 'Best Practices',
                description:
                  'TypeScript, ESLint, Prettier, and Husky ensure robust, maintainable codebases.',
              },
              {
                icon: Rocket,
                title: 'Production Ready',
                description:
                  'SEO-optimized, responsive, and accessible, ready for enterprise-grade projects.',
              },
              ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center space-y-4 rounded-xl bg-[var(--background)] p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[var(--border)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] p-3 shadow-md">
                  <feature.icon className="h-6 w-6 text-[var(--accent-foreground)]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] pt-8">
                  {feature.title}
                </h3>
                <p className="text-center text-[var(--muted-foreground)] text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))} */}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="w-full py-12 sm:py-16 md:py-24 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-[var(--primary-foreground)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-4 sm:px-6">
          <motion.div
            className="flex flex-col items-center space-y-6 text-center"
            {...fadeIn}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter font-poppins">
              Start Building Today
            </h2>
            <p className="mx-auto max-w-[600px] text-[var(--primary-foreground)]/[0.9] text-base sm:text-lg px-4">
              Clone the repository and launch your next project with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
              <pre className="bg-[var(--card)]/[0.95] px-4 py-3 rounded-xl font-mono text-xs sm:text-sm text-[var(--foreground)] shadow-inner w-full overflow-x-auto max-w-full">
                <code>
                  git clone
                  https://github.com/AnwarHossainSR/nextjs-15-template.git
                </code>
              </pre>
            </div>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--accent-foreground)] shadow-lg hover:bg-[var(--accent)]/[0.9] transition-all duration-300 hover:scale-105 w-full sm:w-auto mx-4"
            >
              Explore Documentation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
