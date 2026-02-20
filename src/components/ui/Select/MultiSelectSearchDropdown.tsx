import { useState, useRef, useEffect } from "react";
import Checkbox from "@/components/ui/Checkbox";
import { HiChevronDown } from "react-icons/hi";
import { TbSearch } from "react-icons/tb";
import Loading from "@/components/shared/Loading";

export type TagOption = {
  value: string;
  label: string;
  id: number;
  tenantID: number;
  tagCategoryID?: number;
};

export type TagCategoryGroup = {
  label: string;
  categoryId: number;
  options: TagOption[];
};

export default function MultiSelectSearchDropdown({
  label,
  categories,
  onChange,
  isLoading,
  hideCategoryHeader = false,
  disableLoader = false,
}: {
  label: string;
  categories: TagCategoryGroup[];
  onChange: (values: TagOption[]) => void;
  isLoading?: boolean;
  hideCategoryHeader?: boolean;
  disableLoader?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !(wrapperRef.current as HTMLElement).contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Add or remove sub item (or single select)
  const toggleSubItem = (item: TagOption) => {
    setSelected((prev) => {
      const updated = prev.includes(item.value)
        ? prev.filter((i) => i !== item.value)
        : [...prev, item.value];

      onChange?.(
        categories
          .flatMap((category) => category.options)
          .filter((option) => updated.includes(option.value))
      );
      return updated;
    });
  };

  // Select / unselect entire category
  const toggleCategory = (categoryItems: TagCategoryGroup) => {
    const allSelected = categoryItems.options.every((i) => selected.includes(i.value));

    let updated = [];

    if (allSelected) {
      updated = selected.filter((i) => !categoryItems.options.map((i) => i.value).includes(i));
    } else {
      updated = [...new Set([...selected, ...categoryItems.options.map((i) => i.value)])];
    }

    setSelected(updated);
    onChange?.(categoryItems.options.filter((i) => updated.includes(i.value)));
  };

  // Filtered via search
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      options: cat.options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.options.length > 0);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className="
          bg-gray-100 text-gray-500 
          rounded-[12px] px-3 py-3 cursor-pointer select-none
          flex justify-between items-center
        "
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">
          {selected.length !== 0
            ? categories
                .flatMap((cat) => cat.options)
                .filter((option) => selected.includes(option.value))
                .map((option) => option.label)
                .join(", ")
            : label}
        </span>
        <div className="flex items-center gap-2">
          <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded-full">
            {selected.length}
          </span>
          <HiChevronDown className={`w-6 h-6`} />
        </div>
      </div>

      {open && (
        <div
          className="
            absolute top-full left-0 mt-1 w-max bg-white
            border border-gray-300 rounded-[3px] shadow-lg z-50
            max-h-72 overflow-y-auto
          "
        >
          <Loading
            loading={isLoading || false}
            type="cover"
            customLoader={disableLoader ? <></> : undefined}
          >
            {/* Search */}
            <div className="p-2 border-b flex flex-row items-center gap-2  mx-3 my-2 border border-gray-300 rounded">
              <input
                type="text"
                value={search}
                className="
              w-full text-sm outline-none
              "
                onChange={(e) => setSearch(e.target.value)}
              />
              <TbSearch className="text-lg" />
            </div>

            {/* Categories + Items */}
            <div className="border-t border-gray-300">
              {filteredCategories.length === 0 ? (
                <div className="p-2 border-b">
                  <p className="text-gray-400 text-sm text-center font-semibold">
                    No results found
                  </p>
                </div>
              ) : (
                filteredCategories.map((category) => {
                  const isCategorySelected = category.options.every((item) =>
                    selected.includes(item.value)
                  );

                  return (
                    <div key={category.label} className="px-3 py-2 space-y-2">
                      {/* Category Header - conditionally rendered */}
                      {!hideCategoryHeader && (
                        <label className="flex items-center space-x-2 font-semibold">
                          <Checkbox
                            checked={isCategorySelected}
                            onChange={() => toggleCategory(category)}
                          />
                          <span>{category.label}</span>
                        </label>
                      )}

                      {/* Sub Items */}
                      <div className={hideCategoryHeader ? "space-y-2" : "pl-6 space-y-2"}>
                        {category.options.map((item) => (
                          <label key={item.value} className="flex items-center space-x-2">
                            <Checkbox
                              checked={selected.includes(item.value)}
                              checkboxClass="text-primary h-4 w-4"
                              onChange={() => toggleSubItem(item)}
                            />
                            <span className="text-sm">{item.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Loading>
        </div>
      )}
    </div>
  );
}
