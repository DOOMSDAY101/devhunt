'use client';

import ToolName from '@/components/ui/ToolCard/Tool.Name';
import Tags from '@/components/ui/ToolCard/Tool.Tags';
import Title from '@/components/ui/ToolCard/Tool.Title';
import ToolCard from '@/components/ui/ToolCard/ToolCard';
import { createBrowserClient } from '@/utils/supabase/browser';
import ToolVotes from '@/components/ui/ToolCard/Tool.Votes';
import ToolFooter from '@/components/ui/ToolCard/Tool.Footer';
import ToolViews from '@/components/ui/ToolCard/Tool.views';
import { useEffect, useState } from 'react';
import { ProductType } from '@/type';
import ProductsService from '@/utils/supabase/services/products';
import ToolLogo from '@/components/ui/ToolCard/Tool.Logo';

const getTrendingTools = async () => {
  const today = new Date();
  const productService = new ProductsService(createBrowserClient());
  const week = await productService.getWeekNumber(today, 2);
  return await productService.getPrevLaunchWeeks(today.getFullYear(), 2, week, 5);
};

export default () => {
  const [trendingTools, setTrendingTools] = useState<ProductType[]>([]);

  useEffect(() => {
    getTrendingTools().then(tools => {
      console.log(tools);

      const allTools = tools?.map(tool => tool);
      setTrendingTools(allTools as any);
    });
  }, []);

  return (
    <ul className="mt-3 divide-y divide-slate-800/60">
      {trendingTools?.map((group, idx) => (
        <div>
          {group.products.map((tool, idx) => (
            <li key={idx} className="py-3">
              <ToolCard href={'/tool/' + tool.slug}>
                <ToolLogo src={tool.logo_url || ''} alt={tool.name} />
                <div className="w-full space-y-1">
                  <ToolName>{tool.name}</ToolName>
                  <Title className="line-clamp-2">{tool.slogan}</Title>
                  <ToolFooter>
                    <Tags items={[tool.product_pricing_types?.title ?? 'Free', ...(tool.product_categories || []).map(c => c.name)]} />
                    <ToolViews count={tool.views_count} />
                  </ToolFooter>
                </div>
                <ToolVotes count={tool.votes_count} />
              </ToolCard>
            </li>
          ))}
        </div>
      ))}
    </ul>
  );
};