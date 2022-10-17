import { useState, memo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { api } from "../api";

import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const dataSource = {
  // getRows: params => {
  //   console.log(JSON.stringify(params.request, null, 2));
  //   const {} = params.request;

  //   const payload = {
  //     page: 0,
  //     size: 10,
  //     functionalityType: 0,
  //     orders: [],
  //     filters: [],
  //     funcFilters: [],
  //     groupBy: [],
  //   };

  //   api
  //     .getStaffs(payload)
  //     .then(data => {
  //       params.successCallback(data.value, 499);
  //     })
  //     .catch(error => {
  //       params.failCallback();
  //     });
  // },
  getRows: params => {
    const payload = params.request;

    console.log(JSON.stringify(payload, null, 2));

    const { startRow, endRow, sortModel } = payload;

    let url = `http://localhost:4000/olympics?_start=${startRow}&_end=${endRow}`;

    if (sortModel.length) {
      const { colId, sort } = sortModel[0];
      url = `${url}&_sort=${colId}&_order=${sort}`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then(res => res.json())
      .then(data => {
        params.successCallback(data, 499);
      })
      .catch(error => {
        console.log(error);
        params.failCallback();
      });
  },
};

const toCamelCase = s => s.charAt(0).toLowerCase() + s.slice(1);

const mapSchemeToColumnDefs = scheme => {
  return scheme.fields
    .filter(field => field.isVisible)
    .map(field => ({
      field: toCamelCase(field.fieldName),
      flex: 1,
    }));
};

const Grid = () => {
  const [columnDefs, setColumnDefs] = useState(() => {
    // const staffRdt = localStorage.getItem("staffRdt");
    // const defs = mapSchemeToColumnDefs(JSON.parse(staffRdt).schema);
    // console.log(defs);

    // return defs;

    return [
      { field: "athlete", minWidth: 220, sortable: true },
      { field: "country", minWidth: 200 },
      { field: "year", sortable: true },
      { field: "sport", minWidth: 200 },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
    ];
  });

  const onGridReady = useCallback(params => {
    params.api.setServerSideDatasource(dataSource);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }} className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowModelType="serverSide"
        domLayout="autoHeight"
        onGridReady={onGridReady}
        paginationPageSize={10}
        animateRows
        pagination
        serverSideInfiniteScroll
      ></AgGridReact>
    </div>
  );
};

export default memo(Grid);
