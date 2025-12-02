import type { Dispatch, SetStateAction } from 'react';
import { HiCalendar, HiEye } from 'react-icons/hi2';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortListboxProps = {
  sortOrder: SortOption;
  onSortOrderChange: Dispatch<SetStateAction<SortOption>>;
};

export function SortListbox({
  sortOrder,
  onSortOrderChange
}: SortListboxProps): React.JSX.Element {
  return (
    <div className='ml-auto w-52'>
      <Select value={sortOrder} onValueChange={(value) => onSortOrderChange(value as SortOption)}>
        <SelectTrigger>
          <div className='flex items-center gap-2 truncate'>
            {sortOrder === 'date' ? <HiCalendar /> : <HiEye />}
            <span>Sort by {sortOrder}</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option} value={option}>
              Sort by {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export type SortOption = (typeof sortOptions)[number];
export const sortOptions = ['date', 'views'] as const;
