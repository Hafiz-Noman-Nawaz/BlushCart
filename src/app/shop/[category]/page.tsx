import { notFound } from 'next/navigation';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import CategoryClient from './CategoryClient';

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.id);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== categorySlug);

  return (
    <CategoryClient
      category={category}
      categoryProducts={categoryProducts}
      otherCategories={otherCategories}
    />
  );
}
