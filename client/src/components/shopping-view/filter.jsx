import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold"> Filters</h2>
      </div>
      <div className="p-4 space-y-6">
        {
          Object.keys(filterOptions).map(keyItem => (
            <Fragment key={keyItem}>
              <div>
                <h3 className="text-base font-bold">{keyItem}</h3>
                <div className="grid gap-2 mt2">
                  {
                    filterOptions[keyItem].map(option => (
                      <Label key={option.id} className="flex font-medium items-center gap-2 ">
                        <input
                          checked={filters && filters[keyItem] && filters[keyItem].includes(option.id)}
                          onChange={() => handleFilter(keyItem, option.id)}
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        {option.label}
                      </Label>
                    ))
                  }
                </div>
              </div>
              <Separator />
            </Fragment>
          ))
        }
      </div>
    </div>
  );
}

export default ProductFilter;
