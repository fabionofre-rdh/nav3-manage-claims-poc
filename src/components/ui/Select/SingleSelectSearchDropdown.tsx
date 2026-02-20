import { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiX } from "react-icons/hi";
import { TbSearch } from "react-icons/tb";

export type CsaUserOption = {
  value: string;
  label: string;
  id: string;
};

export type HccUserOption = {
  value: string;
  label: string;
  id: string;
};

export default function SingleSelectSearchDropdown({
  label,
  categories,
  onChange,
}: {
  label: string;
  categories: CsaUserOption[] | HccUserOption[];
  onChange: (values: CsaUserOption | HccUserOption | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CsaUserOption | HccUserOption | null>(null);
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

  // Add or remove single item
  const toggleSubItem = (item: CsaUserOption | HccUserOption) => {
    if (item.value === selected?.value) {
      setSelected(null);
      onChange?.(null);
    } else {
      setSelected(item);
      onChange?.(item);
    }
    setOpen(false);
  };

  // Filtered via search
  const filteredCategories = categories.filter((cat) =>
    cat.label.toLowerCase().includes(search.toLowerCase())
  );

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
        <span className="truncate">{selected?.label ?? label}</span>
        <div className="flex items-center gap-1">
          {selected && (
            <HiX
              className="w-4 h-4 hover:text-gray-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelected(null);
                onChange?.(null);
              }}
            />
          )}
          <HiChevronDown className={`w-6 h-6`} />
        </div>
      </div>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 bg-white
            border border-gray-300 rounded-[3px] shadow-lg z-50
            max-h-72 overflow-y-auto 
          "
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
                <p className="text-gray-400 text-sm text-center font-semibold">No results found</p>
              </div>
            ) : (
              filteredCategories.map((category) => {
                return (
                  <div key={category.label} className="px-3 py-1.5 space-y-2">
                    <label
                      className="flex items-center space-x-2"
                      onClick={() => toggleSubItem(category)}
                    >
                      <span>{category.label}</span>
                    </label>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
